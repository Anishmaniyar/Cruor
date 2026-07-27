import { z } from "zod";

export const hospitalSignUpSchema = z.object({
  hospitalName: z
    .string()
    .trim()
    .min(2, "Hospital name must be at least 2 characters long")
    .max(100, "Hospital name must be at most 100 characters long"),

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

  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
});

export type HospitalSignUpSchemaType = z.infer<typeof hospitalSignUpSchema>;

export const hospitalLogInSchema = z.object({
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
});

export type HospitalLogInSchemaType = z.infer<typeof hospitalLogInSchema>;
