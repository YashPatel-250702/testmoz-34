import { z } from "zod";

export const MentorValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }
    ),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, {
      message: "Mobile number must be 10 digits and start with 6-9",
    }),
});
