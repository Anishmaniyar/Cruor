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

    dateOfBirth: z.coerce
      .date({
        required_error: "Date of birth is required",
        invalid_type_error: "That's not a valid date",
      })
      .max(new Date(), { message: "Birth date cannot be in the future" })
      .refine(
        (date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          // Returns true if user is at least 13 years old
          return age >= 13;
        },
        { message: "You must be at least 13 years old" },
      ),

    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      error_map: () => ({ message: "Please select a valid blood group" }),
    }),

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
      .min(6, "Password must be atleast 6 charatcers long"),

    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 charatcers long"),
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
  body: z.object({
    name: z
      .string({ required_error: "Hospital name is required" })
      .trim()
      .min(3, "Hospital name must be at least 3 characters long"),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Please provide a valid official email address"),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),

    // Matches your @db.VarChar(20) constraint
    phoneNo: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .min(10, "Phone number must be at least 10 characters long")
      .max(20, "Phone number cannot exceed 20 characters"),

    registrationId: z
      .string({ required_error: "Registration ID is required" })
      .trim()
      .min(3, "Registration ID must be at least 3 characters long"),
  }),
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
