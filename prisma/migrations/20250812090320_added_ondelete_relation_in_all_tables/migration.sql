-- DropForeignKey
ALTER TABLE "TechnicalTestResults" DROP CONSTRAINT "TechnicalTestResults_testId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "TestResults" DROP CONSTRAINT "TestResults_testId_fkey";

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalTestResults" ADD CONSTRAINT "TechnicalTestResults_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResults" ADD CONSTRAINT "TestResults_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
