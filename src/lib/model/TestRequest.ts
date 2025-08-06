export type TestType = 'COLLEGE' | 'PLACEMENT';

export interface TestRequestBody {
  testType: TestType;
  conceptName: string;
  complexity: string;
  duration: number;
  numberOfQuestions: number;
  codingPercentage: number;
  theoryPercentage: number;
}