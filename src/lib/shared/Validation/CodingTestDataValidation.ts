import { z } from "zod";

export const CodingQuestionSchema = z.object({
  problemStatement: z
    .string()
    .min(10, { message: "Problem statement must be at least 10 characters long." }),
  sampleInput: z
    .string()
    .min(1, { message: "Sample input is required." }),
  sampleOutput: z
    .string()
    .min(1, { message: "Sample output is required." }),
  constraints: z
    .string()
    .optional(),
  complexity: z
    .string()
    .min(3, { message: "Complexity level is required (e.g., Easy, Intermediate, Hard)." }),
});

export const GeneratedTestResponseSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  durationMinutes: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute." }),
  numberOfQuestions: z
    .number()
    .min(1, { message: "There must be at least 1 question." }),
  complexity: z
    .string()
    .min(3, { message: "Complexity is required." }),
  questions: z
    .array(CodingQuestionSchema)
    .min(1, { message: "At least one question must be provided." }),
});
