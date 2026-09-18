import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../db.js";

export const verifyHospital = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Logged so a 401 explains itself in the deployed logs. The token value is
    // never logged.
    console.warn(
      `[auth:hospital] 401 ${req.method} ${req.originalUrl} - no Bearer token sent ` +
        `(origin=${req.headers.origin ?? "-"})`,
    );
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn(
      `[auth:hospital] 401 ${req.method} ${req.originalUrl} - Bearer prefix with no token`,
    );
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    // Catch structural errors like expiration here
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const currentHospital = await prisma.hospital.findUnique({
      where: { id: decoded.id },
    });

    if (!currentHospital) {
      console.warn(
        `[auth:hospital] 401 ${req.method} ${req.originalUrl} - token is valid but hospital ${decoded.id} no longer exists`,
      );
      return next(
        new AppError(
          "The hospital belonging to this token no longer exists.",
          401,
        ),
      );
    }

    req.hospital = currentHospital;
    next();
  } catch (error) {
    // Explicitly handle token issues without a 500 crash
    if (error.name === "TokenExpiredError") {
      console.warn(
        `[auth:hospital] 401 ${req.method} ${req.originalUrl} - access token expired`,
      );
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    }
    console.warn(
      `[auth:hospital] 401 ${req.method} ${req.originalUrl} - invalid token: ${error.message}`,
    );
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    const currentRole = req.user?.role || req.hospital?.role;

    if (!currentRole || !allowedRoles.includes(currentRole)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};
