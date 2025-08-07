-- CreateTable
CREATE TABLE "TechnicalTestQuestions" (
    "id" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "sampleInput" TEXT NOT NULL,
    "sampleOutput" TEXT NOT NULL,
    "constraints" TEXT,
    "complexity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "TechnicalTestQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TechnicalTestQuestions_testId_idx" ON "TechnicalTestQuestions"("testId");

-- AddForeignKey
ALTER TABLE "TechnicalTestQuestions" ADD CONSTRAINT "TechnicalTestQuestions_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
