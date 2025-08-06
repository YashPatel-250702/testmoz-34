import { AIGeneratedTestResponse } from "@/lib/model/TestRequest"
import prisma from "@/lib/shared/Common/PrismaClient"

export async function saveGeneratedTest(mentorId: string, testData: AIGeneratedTestResponse) {


  const createdTest = await prisma.test.create({
    data: {
      name: testData.generatedTest.title,
      description: testData.generatedTest.description,
      conceptsCovered: testData.generatedTest.title, 
      type: testData.testType,
      status: 'ACTIVE',
      duration: testData.generatedTest.durationMinutes,
      noOfQuestions: testData.generatedTest.numberOfQuestions,
      noOfAttempts: 0,
      mentorId: mentorId,

      questions: {
        create: testData.generatedTest.questions.map((q: any) => ({
          question: q.problemStatement || q.question,
          options: q.options,
          answer: q.answer,
        }))
      }
    },
    include: {
      questions: true
    }
  })

  return createdTest
}
