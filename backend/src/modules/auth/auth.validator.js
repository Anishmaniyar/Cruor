import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(25, "Name must be at most 25 characters long"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),

    gender: z.enum(["male", "female", "other"]).optional().default("other"),

    phoneNo: z
      .string()
      .min(10, "Phone number must be 10 characters long")
      .optional(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 charatcers long")
      .toLowerCase(),

    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 charatcers long")
      .toLowerCase(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),
  }),
});

export const registerHospitalSchema = z.object({
  body: z.object({}),
});

export const loginHospitalSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
  }),
});
