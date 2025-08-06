import { AIGeneratedTestResponse, TestType } from "@/lib/model/TestRequest"
import prisma from "@/lib/shared/Common/PrismaClient"


export async function getTestById(id:string){
    const test=await prisma.test.findUnique(
      {where:{id},
      include:{questions:true}
    })
    return test
}

export async function updateTestData(id: string, testData: any) {
  const updatedTest = await prisma.test.update({
    where: { id },
    data: {
      name: testData.generatedTest.title,
      description: testData.generatedTest.description,
      conceptsCovered: testData.generatedTest.title,
      type: testData.testType,
      status: 'ACTIVE',
      duration: testData.generatedTest.durationMinutes,
      noOfQuestions: testData.generatedTest.numberOfQuestions,
      noOfAttempts: 0,

      questions: {
        deleteMany: {}, // clears existing questions
        create: testData.generatedTest.questions.map((q: any) => ({
          question: q.problemStatement || q.question,
          options: q.options,
          answer: q.answer,
        })),
      },
    },
    include: {
      questions: true,
    },
  });

  return updatedTest;
}


export async function deleteTest(id:string){
    const deletedTest=await prisma.test.delete({where:{id}})
    return deletedTest
}

export async function getAllTestsByType(menotrId:string, testType:TestType){
      const tests=await prisma.test.findMany({where:{mentorId:menotrId, type:testType}}); 
      return tests
}

export async function viewResults(id:string) {
   const testResults = await prisma.testResults.findMany({
      where: { testId: id },
   });
   return testResults;
}

export async function updateTestPublicLink(testId:string ,publicLink:string){
  const updatedTest=await prisma.test.update({where:{id:testId},data:{publicLink:publicLink}}); 
  return updatedTest;
}