import { z } from "zod";

export const createBloodRequestSchema = z.object({
  body: z.object({
    bloodGroup: z.enum(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      { required_error: "Blood group is required" },
    ),

    unitsRequired: z
      .number({ required_error: "Units required must be a number" })
      .int()
      .min(1, "You must request at least 1 unit"),

    priority: z.enum(
      ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      { required_error: "Priority level is required" },
    ),

    reason: z
      .string({ required_error: "Reason is required" })
      .trim()
      .min(5, "Please provide a more detailed reason"),
  }),
});

export const requestIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid blood request ID"),
  }),
});

export const selectOfferSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid blood request ID"),
    responseId: z.string().uuid("Invalid response ID"),
  }),
});
