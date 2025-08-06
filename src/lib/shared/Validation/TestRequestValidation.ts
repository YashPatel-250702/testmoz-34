import {z} from "zod";


export const TestRequestSchema = z.object({
  conceptName: z.string({
    required_error: "Concept name is required"
  }).min(1, "Concept name cannot be empty"),

  complexity: z.enum(["easy", "medium", "hard"], {
    required_error: "Complexity is required"
  }),

  duration: z.number({
    required_error: "Duration is required"
  }).positive("Duration must be a positive number"),

  numberOfQuestions: z.number({
    required_error: "Number of questions is required"
  }).int("Must be an integer").positive("Must be greater than 0"),

  codingPercentage: z.number({
    required_error: "Coding percentage is required"
  }).min(0, "Must be at least 0").max(100, "Cannot exceed 100"),

  theoryPercentage: z.number({
    required_error: "Theory percentage is required"
  }).min(0, "Must be at least 0").max(100, "Cannot exceed 100")
});
