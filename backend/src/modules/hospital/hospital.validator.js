import { z } from "zod";

export const updateHospitalSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(20, { message: "Name must be at most 20 characters long" })
      .optional(),

    phoneNo: z
      .string()
      .trim()
      .min(10, { message: "Phone number must be at least 10 characters long" })
      .max(15, { message: "Phone number must be at most 15 characters long" })
      .optional(),

    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" })
      .optional(),
  }),
});

export const searchHospitalSchema = z.object({
  query: z.object({
    city: z.string().trim().optional(),
  }),
});
