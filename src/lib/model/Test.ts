export interface Test {
  id: string;
  name: string;
  description: string;
  conceptsCovered: string[];
  type: 'COLLEGE' | 'PLACEMENT'; 
  status: 'ACTIVE' | 'INACTIVE'; 
  duration: number; 
  noOfQuestions: number;
  noOfAttempts: number;
  createdAt: string; 
  updatedAt: string; 
  mentorId: string;
  publicLink: string | null;
}
