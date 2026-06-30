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
