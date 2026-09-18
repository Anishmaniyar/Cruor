import jwt from "jsonwebtoken";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import prisma from "../../db.js";

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Logged so a 401 on a deployed request explains itself. The token itself
    // is never logged - only the fact that one was missing/unusable.
    console.warn(
      `[auth] 401 ${req.method} ${req.originalUrl} - no Bearer token sent ` +
        `(origin=${req.headers.origin ?? "-"})`,
    );
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Add try-catch here too!
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!currentUser) {
      console.warn(
        `[auth] 401 ${req.method} ${req.originalUrl} - token is valid but user ${decoded.id} no longer exists`,
      );
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn(
        `[auth] 401 ${req.method} ${req.originalUrl} - access token expired`,
      );
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    console.warn(
      `[auth] 401 ${req.method} ${req.originalUrl} - invalid token: ${error.message}`,
    );
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
