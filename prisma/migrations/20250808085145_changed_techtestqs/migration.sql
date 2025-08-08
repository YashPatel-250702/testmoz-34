/*
  Warnings:

  - The `sampleInput` column on the `TechnicalTestQuestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sampleOutput` column on the `TechnicalTestQuestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TechnicalTestQuestions" DROP COLUMN "sampleInput",
ADD COLUMN     "sampleInput" TEXT[],
DROP COLUMN "sampleOutput",
ADD COLUMN     "sampleOutput" TEXT[];
