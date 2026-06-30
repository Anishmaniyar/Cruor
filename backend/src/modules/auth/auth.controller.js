import asyncHandler from "../../utils/asyncHandler.js";
import appError from "../../utils/appError.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await prisma.user.findfirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    return next(
      new appError("User with this email or phone already exists", 400),
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, name, password: hashedPassword, phone },
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new appError("Invalid email or password", 401));
  }

  const isPasswordVallid = await bcrypt.compare(password, user.password);

  if (!isPasswordVallid) {
    return next(new appError("Invalid email or password", 401));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  if (!accessToken || !refreshToken) {
    return next(new appError("Failed to generate tokens", 500));
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
      },
      accessToken,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  res.status(200).json({
    status: "success",
    data: {
      user: safeUser,
    },
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return next(new appError("Current password does not match", 403));
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: newHashedPassword },
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
    return next(new appError("Invalid email", 401));
  }

  //need to continue forward
});

// continue later
export const resetPassword = asyncHandler(async (req, res, next) => {});

// google auth is not done for now will implement later

export const registerHospital = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNo } = req.body;
});

export const loginHospital = asyncHandler(async (req, res, next) => {});
