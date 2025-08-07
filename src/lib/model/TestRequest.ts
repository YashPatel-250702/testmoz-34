export type TestType = 'COLLEGE' | 'PLACEMENT';

export interface TestRequestBody {
  testType: TestType;
  skills?: string;
  conceptsList: string;
  complexity: string;
  duration: number;
  numberOfQuestions: number;
}



type Question = {
  problemStatement: string;
  options: string[];
  answer: string;
  complexity: string; 
};

type GeneratedTest = {
  title: string;
  description: string;
  durationMinutes: number;
  numberOfQuestions: number;
  complexity: string; 
  questions: Question[];
};

export type AIGeneratedTestResponse = {
  message: string;
  generatedTest: GeneratedTest;
  testType: TestType;
};
