import { TestType } from "./TestRequest";


export interface CodingQuestion {
  problemStatement: string;
  sampleInput: string[];
  sampleOutput: string[];
  constraints?: string;
  complexity: string;
}

export interface GeneratedTestRequest {
  title: string;
  conceptList:string[]
  description: string;
  durationMinutes: number;
  numberOfQuestions: number;
  complexity: string;
  questions: CodingQuestion[];
  type:TestType;
}
