import jwt from "jsonwebtoken";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import prisma from "../../db.js";

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
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
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
