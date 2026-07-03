import { z } from "zod";

export const createAppointmentDonationSchema = z.object({
  params: z.object({
    appointmentId: z.string().uuid("Invalid appointment ID"),
  }),

  body: z.object({
    donationDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .transform((val) => new Date(val)),

    bloodType: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),

    volume: z.number().int().positive("Volume must be greater than 0"),

    status: z.enum(["COMPLETED", "REJECTED"]).default("COMPLETED"),
  }),
});

export const createCampaignDonationSchema = z.object({
  params: z.object({
    registrationId: z.string().uuid("Invalid campaign registration ID"),
  }),

  body: z.object({
    donationDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .transform((val) => new Date(val)),

    bloodType: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),

    volume: z.number().int().positive("Volume must be greater than 0"),

    status: z.enum(["COMPLETED", "REJECTED"]).default("COMPLETED"),
  }),
});
