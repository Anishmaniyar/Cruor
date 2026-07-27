import { z } from "zod";

export const appointmentSchema = z.object({
  hospitalId: z.string().min(1),

  appointmentDate: z.string().min(1),

  appointmentTime: z.string().min(1),
});

export type appointmentSchemaType = z.infer<typeof appointmentSchema>;
