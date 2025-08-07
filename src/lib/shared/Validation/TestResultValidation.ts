import { z } from "zod";

export const TestResultsSchema = z.object({

  userEmail: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  userMobile: z
    .string({ invalid_type_error: "Mobile number must be a string" })
    .nullable()
    .optional(),

  userName: z
    .string({ invalid_type_error: "User name must be a string" })
    .nullable()
    .optional(),

  score: z
    .number({ invalid_type_error: "Score must be a number" })
    .int("Score must be an integer")
    .nullable()
    .optional(),

  status: z
    .enum(["PASSED", "FAILED"], {
      invalid_type_error: "Status must be either 'PASSED' or 'FAILED'",
    })
    .nullable()
    .optional(),

});


