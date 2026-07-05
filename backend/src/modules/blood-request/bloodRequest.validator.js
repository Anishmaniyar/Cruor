import { z } from "zod";

const BloodGroupEnum = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const bloodRequestBodySchema = z.object({
  bloodGroup: BloodGroupEnum,

  unitsRequested: z
    .number()
    .int()
    .positive("Units requested must be greater than 0")
    .max(50, "Units requested cannot exceed 50 units"),

  priority: PriorityEnum,

  reason: z
    .string()
    .trim()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason cannot exceed 500 characters"),
});

export const cancelBloodRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid blood request ID"),
  }),
});

export const approveBloodRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid blood request ID"),
  }),
});

export const rejectBloodRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid blood request ID"),
  }),
});
