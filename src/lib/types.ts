export interface Test {
  id: string
  title: string
  conceptName: string
  duration: number
  complexity: "Easy" | "Medium" | "Hard" | "Mixed"
  numberOfQuestions: number
  codingPercentage: number
  theoryPercentage: number
  questions: Question[]
  createdAt: Date
  createdBy: string
  status: "draft" | "active" | "archived"
}

export interface Question {
  id: string
  type: "coding" | "theory" | "mcq"
  title: string
  description: string
  options?: string[] // For MCQ questions
  correctAnswer?: string | number
  timeEstimate: number
  complexity: "Easy" | "Medium" | "Hard"
  testCases?: TestCase[] // For coding questions
}

export interface TestCase {
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface UserRole {
  id: string
  name: string
  email: string
  role: "mentor" | "placement_team" | "student"
}

export interface TestAttempt {
  id: string
  testId: string
  studentId: string
  startTime: Date
  endTime?: Date
  answers: Answer[]
  score?: number
  status: "in_progress" | "completed" | "abandoned"
}

export interface Answer {
  questionId: string
  answer: string
  timeSpent: number
  isCorrect?: boolean
}
