import { z } from "zod";

export const updateBloodUnitStatusSchema = z.object({
  body: z.object({
    // Checks that the status is a string AND matches one of your allowed states
    newStatus: z.enum(
      ["AVAILABLE", "RESERVED", "USED", "EXPIRED", "REJECTED"],
      {
        errorMap: () => ({ message: "Invalid status value provided." }),
      },
    ),
  }),
});
