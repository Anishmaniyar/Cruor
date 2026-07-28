import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import bcrypt from "bcrypt";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";
import prisma from "../../db.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo, gender } = req.body;

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        phoneNo,
        dateOfBirth,
        gender,
      },
    });

    // Generate JWT tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (!accessToken || !refreshToken) {
      return next(new AppError("Failed to generate tokens", 500));
    }

    // Set httpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

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
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNo: user.phoneNo,
  };

  return res.status(200).json({
    status: "success",
    data: {
      user: safeUser,
    },
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isMatch) {
    return next(new AppError("Current password does not match", 403));
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHashedPassword },
  });

  await NotificationService.send({
    type: NotificationType.PASSWORD_CHANGED,

    recipient: {
      userId: user.id,
    },

    payload: {
      name: user.name,
    },
  });

  return res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return next(new AppError("Invalid email", 401));
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {});

export const registerHospital = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNo } = req.body;

  if (!password) {
    return next(new AppError("Password is required", 400));
  }
  const existingHospital = await prisma.hospital.findFirst({
    where: {
      OR: [{ email }, { phoneNo }],
    },
  });

  if (existingHospital) {
    return next(
      new AppError("Hospital with this email or phone already exists", 400),
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  if (!accessToken || !refreshToken) {
    return next(new AppError("Failed to generate tokens", 500));
  }

  // Set httpOnly cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const newHospital = await prisma.hospital.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      phoneNo,
      isVerified: false,
    },
  });

  return res.status(201).json({
    status: "success",
    message: "Hospital registered successfully",
    data: {
      newHospital,
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
  const hospital = req.hospital;

  const safeHospital = {
    id: hospital.id,
    name: hospital.name,
    email: hospital.email,
    phoneNo: hospital.phoneNo,
    isVerified: hospital.isVerified,
  };

  return res.status(200).json({
    status: "success",
    data: {
      hospital: safeHospital,
    },
  });
});

export const changeHospitalPassword = asyncHandler(async (req, res, next) => {
  const hospital = req.hospital;
  const { currentPassword, newPassword } = req.body;

  const isMatch = await bcrypt.compare(currentPassword, hospital.passwordHash);

  if (!isMatch) {
    return next(new AppError("Current password does not match", 403));
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.hospital.update({
    where: { id: hospital.id },
    data: { passwordHash: newHashedPassword },
  });

  return res.status(200).json({
    status: "success",
    message: "Hospital password changed successfully",
  });
});

export const forgotHospitalPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const existingHospital = await prisma.hospital.findUnique({
    where: { email },
  });

  if (!existingHospital) {
    return next(new AppError("Invalid email", 401));
  }
});
