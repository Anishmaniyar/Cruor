import { z } from "zod";

const campaignBodySchema = z.object({
  campName: z
    .string()
    .trim()
    .min(5, "Campaign name must be at least 5 characters")
    .max(100, "Campaign name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),

  campaignDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .transform((val) => new Date(val)),

  startTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Time must be in HH:MM (24-hour) format",
    ),

  endTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Time must be in HH:MM (24-hour) format",
    ),

  targetDonors: z
    .number()
    .int()
    .positive("Target donors must be greater than 0"),
});

export const createCampaignSchema = z.object({
  body: campaignBodySchema,
});

export const updateCampaignSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid campaign ID"),
  }),

  body: campaignBodySchema.partial(),
});

export const campaignIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid campaign ID"),
  }),
});

export const registerCampaignSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid campaign id"),
  }),
});
