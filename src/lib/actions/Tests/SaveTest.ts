import { AIGeneratedTestResponse, TestType } from "@/lib/model/TestRequest";
import { saveGeneratedTest } from "@/lib/repository/menotrRepository/CreateTestRepository";
import { deleteTest, getAllTestsByType, getTestById, updateTestData } from "@/lib/repository/menotrRepository/TestRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function saveTestService(mentorId:string, testData:AIGeneratedTestResponse) {
     const savedTest=await saveGeneratedTest(mentorId,testData);
     if(savedTest==null){
        throw new CommonErrorHandler("Failed to save test",500);
     }
     return savedTest
}

export async function getTestByIdService(id:string){
    const testData=await getTestById(id);
    if(testData==null){
        throw new CommonErrorHandler("Test not found",404);
    }
    return testData
}

export async function deleteTestService(id:string){
   const testData=await getTestById(id);
   if(testData==null){
    throw new CommonErrorHandler("Test not found",404);
   }
   const deletedTest=await deleteTest(id);
   if(deletedTest==null){
    throw new CommonErrorHandler("Failed to delete test",500);
   }
   return deletedTest
}

export async function updateTestService(id:string, testData:any){
   const existing=await getTestById(id);
   if(existing==null){
    throw new CommonErrorHandler("Test not found",404);
   }
   testData.mentorId=existing.mentorId;
    const updatedTest=await updateTestData(id,testData);
    if(updatedTest==null){
       throw new CommonErrorHandler("Failed to update test",500);
    }
    return updatedTest
}

export async function getAllTestsByTypeService(menotrId:string, type:TestType){
   const tests=await getAllTestsByType(menotrId,type);
   if(tests==null || tests.length==0){
    throw new CommonErrorHandler("No test found",404);
   }
   return tests
}