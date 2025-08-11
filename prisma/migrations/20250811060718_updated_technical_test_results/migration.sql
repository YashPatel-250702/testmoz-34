-- CreateEnum
CREATE TYPE "TestResultStatus" AS ENUM ('PASSED', 'FAILED');

-- AlterEnum
ALTER TYPE "TesResultStatus" ADD VALUE 'IN_PROGRESS';

-- CreateTable
CREATE TABLE "TechnicalTestResults" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userMobile" TEXT,
    "userName" TEXT,
    "question_ids" TEXT[],
    "answers" TEXT[],
    "test_cases_passed" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER,
    "status" "TesResultStatus",
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "TechnicalTestResults_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechnicalTestResults" ADD CONSTRAINT "TechnicalTestResults_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
