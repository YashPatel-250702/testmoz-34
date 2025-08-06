-- DropForeignKey
ALTER TABLE "TestQuestions" DROP CONSTRAINT "TestQuestions_testId_fkey";

-- AddForeignKey
ALTER TABLE "TestQuestions" ADD CONSTRAINT "TestQuestions_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
