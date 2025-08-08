import { GeneratedTestRequest } from "@/lib/model/TechnicalTestModel";
import { saveCodingTestRepo, updateCodingTestRepo } from "@/lib/repository/menotrRepository/CodingTestRepository";
import { getTestById } from "@/lib/repository/menotrRepository/TestRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function saveCodingTest(menotrid:string ,testData:GeneratedTestRequest){

    const result=await saveCodingTestRepo(menotrid,testData);
    if(result==null){
        throw new CommonErrorHandler("Failed to save the test data",500);
    }
    return result;
}

export async function updateTestByIdService(testId:string, testdata:GeneratedTestRequest){

   const testData=await getTestById(testId);
      if(testData==null){
       throw new CommonErrorHandler("Test not found",404);
      }
    const result=await updateCodingTestRepo(testId,testdata);
    if(result==null){
        throw new CommonErrorHandler("Failed to update the test data",500);
    }
    return result;
}