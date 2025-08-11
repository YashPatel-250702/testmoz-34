import { TechnicalTestResults, TestResults } from "@/lib/model/TestResult";
import { getTestById, updateNoOfAttempts } from "@/lib/repository/menotrRepository/TestRepository";
import { submitTechnicalTestResult, submitTestResult } from "@/lib/repository/menotrRepository/TestResultRepository";
import { CommonErrorHandler, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import {  TestResultsSchema } from "@/lib/shared/Validation/TestResultValidation";

export async function submitTestService(id: string, testResult: object) {
    const test = await getTestById(id);
    if (test == null) {
        throw new CommonErrorHandler("Test not found", 404);
    }
    
    const type = test.type;
    let result = null;
    
    if (type === "APPTITUDE") {
        console.log("Aptitude test result submission initiated");
        result = await submitTestResult(testResult as TestResults);
        console.log("Aptitude test result submitted successfully");
    }
    else if (type === "TECHNICAL" || type === "COLLEGE") {
        if(!testResult.hasOwnProperty("test_cases_passed")) {
            throw new CommonErrorHandler("Test cases are required for technical tests", 400);
        }
        result = await submitTechnicalTestResult(testResult as TechnicalTestResults);
        console.log("Technical test result submitted successfully");
    } else {
        throw new CommonErrorHandler(`Unsupported test type: ${type}`, 400);
    }
    
    if (!result || 
        (Array.isArray(result) && result.length === 0) || 
        (typeof result === "object" && Object.keys(result).length === 0)) {
        throw new CommonErrorHandler("Failed to submit test", 500);
    }

    const noOfAttempts = (test.noOfAttempts ?? 0) + 1;
    await updateNoOfAttempts(id, noOfAttempts);

    return result;
}