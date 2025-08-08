import { TestResults } from "@/lib/model/TestResult";
import { getTestById, updateNoOfAttempts } from "@/lib/repository/menotrRepository/TestRepository";
import { submitTestResult } from "@/lib/repository/menotrRepository/TestResultRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function submitTestService(id:string,testResult:TestResults){
    const test=await getTestById(id);
    if(test==null){
        throw new CommonErrorHandler("Test not found",404);
    }
     testResult.testId=test.id;
    const result=await submitTestResult(testResult);
    if(result==null){
        throw new CommonErrorHandler("Failed to submit test",500);
    }
    const noOfAttempts=test.noOfAttempts?test.noOfAttempts+1:0;
    const res=await updateNoOfAttempts(id,noOfAttempts+1);
    return result;
   
    
}