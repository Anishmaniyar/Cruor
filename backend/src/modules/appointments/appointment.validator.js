import { z } from "zod";

// 1. Reusable schema component for route parameter UUID validation
export const appointmentIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid appointment ID format inside URL parameters"),
  }),
});

// 2. Schema for creating a new booking request
export const createAppointmentSchema = z.object({
  body: z.object({
    hospitalId: z.string().uuid("Invalid hospital ID format"),

    appointmentDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .transform((val) => new Date(val)),

    appointmentTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must be in 24-hour HH:MM format",
      )
      .transform((val) => new Date(`1970-01-01T${val}:00Z`)),
  }),
});

// 3. Schema for optional modification requests
export const updateAppointmentSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid appointment ID format inside URL parameters"),
  }),
  body: z.object({
    appointmentDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .transform((val) => new Date(val))
      .optional(),

    appointmentTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must be in 24-hour HH:MM format",
      )
      .transform((val) => new Date(`1970-01-01T${val}:00Z`))
      .optional(),
  }),
});
