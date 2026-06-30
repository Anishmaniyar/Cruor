import { z } from "zod";

export const registerUserScema = z.object({
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

    gender: z.enum(["male", "female", "ohter"]).optional().default("other"),

    phone: z
      .string()
      .optional()
      .min(10, "Phone number must be 10 characters long")
      .max(10, "Phone number must be 10 characters long"),
  }),
});
