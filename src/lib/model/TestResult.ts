export type TesResultStatus = 'PASSED' | 'FAILED';

export interface TestResults {
  id: string;
  userEmail: string;
  userMobile?: string | null;
  userName?: string | null;
  score?: number | null;
  status?: TesResultStatus | null;
  createdAt: Date;
  updatedAt: Date;

  testId: string;
}
