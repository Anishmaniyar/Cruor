import { z } from "zod";
import { BLOOD_GROUPS } from "./auth";

export const recordDonationSchema = z.object({
  donationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  bloodGroup: z.enum(BLOOD_GROUPS, {
    error: "Please select a valid blood group",
  }),

  volume: z.coerce.number().int().positive("Volume must be greater than 0"),

  status: z.enum(["COMPLETED", "REJECTED"]).default("COMPLETED"),
});

// Input type (pre-coercion) — the correct form values type for react-hook-form
// with zodResolver, since z.coerce.number() has an `unknown` input type.
export type RecordDonationFormValues = z.input<typeof recordDonationSchema>;
