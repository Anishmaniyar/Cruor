import { z } from "zod";

export const updateBloodUnitStatusSchema = z.object({
  body: z.object({
    // Checks that the status is a string AND matches one of the supported states
    newStatus: z.enum(
      [
        "AVAILABLE",
        "RESERVED",
        "TRANSFERRED",
        "USED",
        "EXPIRED",
        "REJECTED",
      ],
      {
        errorMap: () => ({ message: "Invalid status value provided." }),
      },
    ),
  }),
});
