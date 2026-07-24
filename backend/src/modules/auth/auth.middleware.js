import jwt from "jsonwebtoken";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import prisma from "../../db.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  req.user = currentUser;
  next();
});
