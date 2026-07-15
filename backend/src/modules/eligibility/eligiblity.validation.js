import { z } from "zod";

export const submitScreeningDataValidation = z.object({
  body: z
    .object({
      hasFever: z.boolean().default(false),

      takingMedication: z.boolean().default(false),

      recentTattoo: z.boolean().default(false),

      tattooDate: z.string().datetime().optional(),

      recentSurgery: z.boolean().default(false),

      surgeryDate: z.string().datetime().optional(),

      pregnant: z.boolean().default(false),

      weight: z.coerce.number().min(50),

      travelHistory: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.recentTattoo && !data.tattooDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tattooDate"],
          message: "Tattoo date is required.",
        });
      }

      if (data.recentSurgery && !data.surgeryDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["surgeryDate"],
          message: "Surgery date is required.",
        });
      }
    }),
});
