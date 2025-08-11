import { AIGeneratedTestResponse, TestType } from "@/lib/model/TestRequest";
import { saveGeneratedTest } from "@/lib/repository/menotrRepository/CreateTestRepository";
import { deleteTest, getAllTestsByType, getCondingTestsByID, getTestById, getTestType, updateTestData, updateTestPublicLink, viewAptitudeResults, viewTechnicalResults } from "@/lib/repository/menotrRepository/TestRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";
import { customAlphabet } from 'nanoid'
export async function saveTestService(mentorId: string, testData: AIGeneratedTestResponse) {
   const savedTest = await saveGeneratedTest(mentorId, testData);
   if (savedTest == null) {
      throw new CommonErrorHandler("Failed to save test", 500);
   }
   return savedTest
}



export async function getTestByIdService(id: string) {
   let testData = null;
   const testType = await getTestType(id);
   if (testType == null) {
      throw new CommonErrorHandler("Test type not found", 404);
   }
   if (testType?.type === 'APPTITUDE') {
      testData = await getTestById(id);
   } else {
      testData = await getCondingTestsByID(id);
   }
   if (testData == null) {
      throw new CommonErrorHandler("Test not found", 404);
   }
   return testData
}

export async function deleteTestService(id: string) {
   const testData = await getTestById(id);
   if (testData == null) {
      throw new CommonErrorHandler("Test not found", 404);
   }
   const deletedTest = await deleteTest(id);
   if (deletedTest == null) {
      throw new CommonErrorHandler("Failed to delete test", 500);
   }
   return deletedTest
}

export async function updateTestService(id: string, testData: any) {
   const existing = await getTestById(id);
   if (existing == null) {
      throw new CommonErrorHandler("Test not found", 404);
   }
   testData.mentorId = existing.mentorId;
   const updatedTest = await updateTestData(id, testData);
   if (updatedTest == null) {
      throw new CommonErrorHandler("Failed to update test", 500);
   }
   return updatedTest
}

export async function getAllTestsByTypeService(menotrId: string, type: TestType) {
   const tests = await getAllTestsByType(menotrId, type);
   if (tests == null || tests.length == 0) {
      throw new CommonErrorHandler("No test found", 404);
   }
   return tests
}


export async function viewResultsService(id: string) {
   const testData = await getTestById(id);
   if (testData == null) {
      throw new CommonErrorHandler("Test not found", 404);
   }
   console.log(testData.type);

   if (testData.type === "TECHNICAL" || testData.type === "COLLEGE") {
      const testResults = await viewTechnicalResults(testData.id);
      return testResults;
   }
   else if (testData.type === "APPTITUDE") {
      const testResults = await viewAptitudeResults(testData.id);
      return testResults;
   }

   return null;
}



export async function generatePublicLink(testId: string) {
   const domainLink = process.env.NEXT_PUBLIC_DOMAIN_LINK;
   const test = await getTestById(testId);
   if (test == null) {
      throw new CommonErrorHandler("Test not found", 404);
   }
   const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10)
   const linkId = nanoid();
   const publicId = `${domainLink}/test/${test.id}?${linkId}`;
   const updatedTest = await updateTestPublicLink(testId, linkId);
   if (updatedTest == null) {
      throw new CommonErrorHandler("Failed to update test", 500);
   }
   return publicId;
}