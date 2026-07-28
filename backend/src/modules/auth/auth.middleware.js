import jwt from "jsonwebtoken";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import prisma from "../../db.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  console.log("--- AUTH DEBUG START ---");
  console.log("Raw Cookie Header:", req.headers.cookie);
  console.log("Parsed Cookies Object:", req.cookies);
  console.log("Token Extracted:", req.cookies?.accessToken);
  console.log("--- AUTH DEBUG END ---");

  // Update this line inside your verifyUser middleware
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

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
