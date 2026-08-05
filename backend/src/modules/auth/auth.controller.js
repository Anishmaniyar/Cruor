import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import bcrypt from "bcrypt";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";
import prisma from "../../db.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNo, gender, dateOfBirth, bloodGroup } =
    req.body;

  // 1. Defensively trim inputs to avoid hidden spaces affecting your password hash bytes
  const cleanPassword = password.trim();

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, ...(phoneNo ? [{ phoneNo }] : [])],
    },
  });

  if (existingUser) {
    return next(
      new AppError(
        existingUser.email === email
          ? "Email is already registered."
          : "Phone number is already registered.",
        409,
      ),
    );
  }

  // 2. Hash using the explicitly sanitized, clean string reference
  const hashedPassword = await bcrypt.hash(cleanPassword, 10);

  // 3. Ensure dateOfBirth is saved safely as an explicit Date string instance if it was mutated into an object
  const finalizedDob =
    dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      phoneNo: phoneNo || null, // Normalizes empty strings down to clean database null values
      dateOfBirth: finalizedDob,
      bloodGroup,
      gender,
    },
  });

  // 4. Auto-login: issue tokens exactly like the login flow
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  if (!accessToken || !refreshToken) {
    return next(new AppError("Failed to generate tokens", 500));
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return next(new AppError("Invalid email or password", 401));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  if (!accessToken || !refreshToken) {
    return next(new AppError("Failed to generate tokens", 500));
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  return res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Unauthorized", 401));
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 401));
  }

  const accessToken = generateAccessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    message: "Access token refreshed",
    data: { accessToken },
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      dateOfBirth: true,
      bloodGroup: true,
      phoneNo: true,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "User profile fetched successfully",
    data: user,
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  // 1. Fetch the user profile from your database using Prisma
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 2. Add a defensive safety guard clause
  if (!user || !user.passwordHash) {
    return next(new AppError("User account not found or invalid", 404));
  }

  // 3. This will now safely work because user.passwordHash is a valid string
  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isMatch) {
    return next(new AppError("Current password does not match", 403));
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  // 4. Update password using the correct clean variable names
  await prisma.user.update({
    where: { id: user.id }, // item works cleanly now
    data: { passwordHash: newHashedPassword },
  });

  // await NotificationService.send({
  //   type: NotificationType.PASSWORD_CHANGED,
  //   recipient: {
  //     userId: user.id,
  //   },
  //   payload: {
  //     name: user.name, // Will resolve cleanly to their name string now
  //   },
  // });

  return res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

// IMPLEMENT WHEN WE INTEGRATE EMAIL IN THIS
// export const forgotPassword = asyncHandler(async (req, res, next) => {
//   const { email } = req.body;

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!existingUser) {
//     return next(new AppError("Invalid email", 401));
//   }
// });

// export const resetPassword = asyncHandler(async (req, res, next) => {});

export const registerHospital = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNo, registrationId } = req.body;

  if (!password) {
    return next(new AppError("Password is required", 400));
  }

  // 1. Conflict Check (Includes checking for duplicate registration IDs)
  const existingHospital = await prisma.hospital.findFirst({
    where: {
      OR: [
        { email },
        { phoneNo },
        { registrationId }, // Crucial addition to block duplicate licenses
      ],
    },
  });

  if (existingHospital) {
    if (existingHospital.email === email)
      return next(new AppError("Hospital with this email already exists", 400));
    if (existingHospital.phoneNo === phoneNo)
      return next(
        new AppError("Hospital with this phone number already exists", 400),
      );
    if (existingHospital.registrationId === registrationId)
      return next(
        new AppError("This Registration ID is already registered", 400),
      );
  }

  // 2. Hash Password Safely
  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  // 3. Create the Database Entry FIRST
  const newHospital = await prisma.hospital.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      phoneNo,
      registrationId,
    },
  });

  // 4. Generate Tokens using the freshly created database object
  const accessToken = generateAccessToken(newHospital);
  const refreshToken = generateRefreshToken(newHospital);

  if (!accessToken || !refreshToken) {
    return next(new AppError("Failed to generate tokens", 500));
  }

  // 5. Set secure httpOnly cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 6. Return response safely
  return res.status(201).json({
    status: "success",
    message: "Hospital registered successfully",
    data: {
      hospital: {
        id: newHospital.id,
        name: newHospital.name,
        email: newHospital.email,
        registrationId: newHospital.registrationId,
      },
      accessToken,
    },
  });
});

export const loginHospital = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const hospitalExists = await prisma.hospital.findUnique({
    where: { email },
  });

  if (!hospitalExists) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    hospitalExists.passwordHash,
  );

  if (!isPasswordValid) {
    return next(new AppError("Invalid email or password", 401));
  }

  const accessToken = generateAccessToken(hospitalExists);
  const refreshToken = generateRefreshToken(hospitalExists);

  if (!accessToken || !refreshToken) {
    return next(new AppError("Failed to generate tokens", 500));
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    data: {
      message: "Hospital logged in successfully",
      accessToken,
      hospital: {
        id: hospitalExists.id,
        name: hospitalExists.name,
      },
    },
  });
});

export const getCurrentHospital = asyncHandler(async (req, res, next) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: req.hospital.id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNo: true,
      address: true,
      registrationId: true,
    },
  });

  if (!hospital) {
    return next(new AppError("Hospital not found", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Hospital profile fetched successfully",
    data: hospital,
  });
});

export const logoutHospital = asyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  return res.status(200).json({
    status: "success",
    message: "Hospital logged out successfully",
  });
});

export const changeHospitalPassword = asyncHandler(async (req, res, next) => {
  // 1. Save the ID into a clear, distinct variable name
  const hospitalId = req.hospital.id;
  const { currentPassword, newPassword } = req.body;

  // 2. Fetch the full hospital data object from Prisma
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  // 3. Safety guard clause to protect against missing data
  if (!hospital || !hospital.passwordHash) {
    return next(new AppError("Hospital account not found", 404));
  }

  // 4. This will now safely work because hospital.passwordHash exists
  const isMatch = await bcrypt.compare(currentPassword, hospital.passwordHash);

  if (!isMatch) {
    return next(new AppError("Current password does not match", 403));
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  // 5. Run the update using the explicit database variables
  await prisma.hospital.update({
    where: { id: hospital.id },
    data: { passwordHash: newHashedPassword },
  });

  return res.status(200).json({
    status: "success",
    message: "Hospital password changed successfully",
  });
});

// IMPLEMENT WHEN WE INTEGRATE EMAIL IN THIS
// export const forgotHospitalPassword = asyncHandler(async (req, res, next) => {
//   const { email } = req.body;

//   const existingHospital = await prisma.hospital.findUnique({
//     where: { email },
//   });

//   if (!existingHospital) {
//     return next(new AppError("Invalid email", 401));
//   }
// });
