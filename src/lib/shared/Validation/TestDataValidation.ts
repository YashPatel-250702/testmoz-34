import { z } from "zod";

export const QuestionSchema = z.object({
  problemStatement: z.string({ required_error: "Problem statement is required" }),
  options: z
    .array(z.string().min(1, "Option cannot be empty"), {
      required_error: "Options are required"
    })
    .min(1, { message: "At least one option is required" }),
  answer: z.string({ required_error: "Answer is required" }),
  complexity: z.enum(["easy", "medium", "hard"], {
    required_error: "Question complexity is required"
  })
});

export const GeneratedTestSchema = z.object({
  title: z.string({ required_error: "Test title is required" }),
  description: z.string({ required_error: "Test description is required" }),
  durationMinutes: z
    .number({ required_error: "Duration in minutes is required" })
    .positive({ message: "Duration must be a positive number" }),
  numberOfQuestions: z
    .number({ required_error: "Number of questions is required" })
    .int({ message: "Must be an integer" })
    .positive({ message: "Must be greater than 0" }),
  complexity: z.enum(["easy", "medium", "hard"], {
    required_error: "Test complexity is required"
  }),
  questions: z
    .array(QuestionSchema, {
      required_error: "At least one question is required"
    })
    .min(1, { message: "At least one question must be provided" })
});

export const AIGeneratedTestResponseSchema = z.object({
  generatedTest: GeneratedTestSchema
});
