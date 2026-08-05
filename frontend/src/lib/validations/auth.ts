import { z } from "zod";

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export const signUpSchema = z.object({
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

  gender: z.enum(["male", "female", "other"]),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "That's not a valid date",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "Birth date cannot be in the future",
    })
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        // Returns true if user is at least 13 years old
        return age >= 13;
      },
      { message: "You must be at least 13 years old" },
    ),

  bloodGroup: z.enum(BLOOD_GROUPS, {
    error: "Please select a valid blood group",
  }),

  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const LogInSchema = z.object({
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

export type LogInSchemaType = z.infer<typeof LogInSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long"),

    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
