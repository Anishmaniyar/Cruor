import { z } from "zod";

export const cancelTransferSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid transfer ID"),
  }),
});
