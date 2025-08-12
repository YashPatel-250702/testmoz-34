export type TesResultStatus = 'PASSED' | 'FAILED';

export interface TestResults {
  id: string;
  testType: string;
  userEmail: string;
  userMobile?: string | null;
  userName?: string | null;
  score?: number | null;
  status?: TesResultStatus | null;
  createdAt: Date;
  updatedAt: Date;
  question_ids: string[];
  answers: string[];
  isCorrect: boolean[];

  testId: string;
}


export interface TechnicalTestResults{
  testType: string;
  userEmail: string;
  userMobile?: string | null;
  userName?: string | null;
  score?: number | null;
  status?: TesResultStatus | null;
  question_ids: string[];        
  answers: string[];              
  test_cases_passed: string[];
  createdAt: Date;
  updatedAt: Date;
  testId: string;
}