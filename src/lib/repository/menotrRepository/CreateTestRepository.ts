import prisma from "@/lib/shared/Common/PrismaClient"

export async function saveGeneratedTest(generatedTest: any) {
  // REMOVE: const testData = generatedTest.testDetails

  const createdTest = await prisma.test.create({
    data: {
      name: generatedTest.title,
      description: generatedTest.description,
      conceptsCovered: generatedTest.title, 
      type: 'COLLEGE',
      status: 'ACTIVE',
      duration: generatedTest.durationMinutes,
      noOfQuestions: generatedTest.numberOfQuestions,
      noOfAttempts: 0,

      questions: {
        create: generatedTest.questions.map((q: any) => ({
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
