import { TestType } from "@prisma/client";

export interface CodingQuestion {
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  constraints?: string;
  complexity: string;
}

export interface GeneratedTestRequest {
  title: string;
  description: string;
  durationMinutes: number;
  numberOfQuestions: number;
  complexity: string;
  questions: CodingQuestion[];
  type:TestType;
}
