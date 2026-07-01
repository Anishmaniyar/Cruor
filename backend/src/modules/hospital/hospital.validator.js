export const updateHospitalSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .optional()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(20, { message: "Name must be at most 20 characters long" }),

    phoneNo: z
      .string()
      .trim()
      .optional()
      .min(10, { message: "Phone number must be at least 10 characters long" })
      .max(15, { message: "Phone number must be at most 15 characters long" }),

    email: z
      .string()
      .trim()
      .optional()
      .email({ message: "Invalid email address" }),
  }),
});

export const searchHospitalSchema = z.object({
  query: z.object({
    city: z.string().trim().optional(),
  }),
});
