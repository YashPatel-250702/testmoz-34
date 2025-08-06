import { AIGeneratedTestResponse } from "@/lib/model/TestRequest";
import { saveGeneratedTest } from "@/lib/repository/menotrRepository/CreateTestRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function saveTestService(mentorId:string, testData:AIGeneratedTestResponse) {
     const savedTest=await saveGeneratedTest(mentorId,testData);
     if(savedTest==null){
        throw new CommonErrorHandler("Failed to save test",500);
     }
     return savedTest
}