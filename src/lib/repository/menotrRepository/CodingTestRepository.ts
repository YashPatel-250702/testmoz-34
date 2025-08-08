import { GeneratedTestRequest } from "@/lib/model/TechnicalTestModel";
import prisma from "@/lib/shared/Common/PrismaClient";
import { TestType } from "@prisma/client";

export async function saveCodingTestRepo(menotrId:string, codingTest:GeneratedTestRequest) {

    const result=await prisma.test.create({
         data: {
        name: codingTest.title,
        description: codingTest.description,
        duration: codingTest.durationMinutes,
        noOfQuestions: codingTest.numberOfQuestions,
        type: codingTest.type,
        status: 'ACTIVE',
        mentorId: menotrId,
        noOfAttempts:0,
        conceptsCovered:codingTest.conceptList,
        technicalQuestions: {
          create: codingTest.questions.map((q) => ({
            problemStatement: q.problemStatement,
            sampleInput: q.sampleInput,
            sampleOutput: q.sampleOutput,
            constraints: q.constraints,
            complexity: q.complexity,
            type: TestType.TECHNICAL,
          })),
        },
      },
      include: {
        technicalQuestions: true,
      },
    });
   return result;
  
}

export async function updateCodingTestRepo(testId: string, testData: GeneratedTestRequest) {
  const result = await prisma.test.update({
    where: {
      id: testId,
    },
    data: {
      name: testData.title,
      description: testData.description,
      duration: testData.durationMinutes,
      noOfQuestions: testData.numberOfQuestions,
      technicalQuestions: {
        // Delete existing technical questions
        deleteMany: {},

        // Add new ones
        create: testData.questions.map((q) => ({
          problemStatement: q.problemStatement,
          sampleInput: q.sampleInput,
          sampleOutput: q.sampleOutput,
          constraints: q.constraints,
          complexity: q.complexity,
          type: TestType.TECHNICAL,
        })),
      },
    },
    include: {
      technicalQuestions: true,
    },
  });

  return result;
}