import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../db.js";

export const verifyHospital = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const currentHospital = await prisma.hospital.findUnique({
    where: { id: decoded.id },
  });

  if (!currentHospital) {
    return next(
      new AppError(
        "The hospital belonging to this token no longer exists.",
        401,
      ),
    );
  }

  req.hospital = currentHospital;
  next();
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user was populated by the protect middleware above
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};
