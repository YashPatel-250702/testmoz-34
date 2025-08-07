import { submitTestService } from "@/lib/actions/Tests/TestResultService";
import { TestResults } from "@/lib/model/TestResult";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { TestResultsSchema } from "@/lib/shared/Validation/TestResultValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){

    try {
        const {id}=await params;
        const testResult:TestResults=await req.json();
        const validatedResultData=TestResultsSchema.safeParse(testResult);
        if(!validatedResultData.success){
            return sendValidationResponse(validatedResultData);
        }
        const result=await submitTestService(id,testResult);
        return NextResponse.json({message:"Test submitted successfully",result},{status:201});

    } catch (error) {
        console.log(error);
        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal server error while submitting test", 500);
    }

}