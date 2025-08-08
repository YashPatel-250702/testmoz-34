import {z} from "zod";


export const TestRequestSchema = z.object({
  testType: z.enum(['COLLEGE', 'APPTITUDE','TECHNICAL'], {
    required_error: "Test type is required"
  }),

  skills: z.string({
    required_error: "Skills are required"
  }).min(1, "Skills cannot be empty"),

  conceptsList: z.string({
    required_error: "Concept name is required"
  }).min(1, "Concept name cannot be empty"),

  complexity: z.string({
    required_error: "Complexity is required"
  }),
  
  duration: z.number({
    required_error: "Duration is required"
  }).positive("Duration must be a positive number"),

  numberOfQuestions: z.number({
    required_error: "Number of questions is required"
  }).int("Must be an integer").positive("Must be greater than 0"),
});
