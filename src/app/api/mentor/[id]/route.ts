import { saveTestService } from "@/lib/actions/Tests/SaveTest";
import { AIGeneratedTestResponse } from "@/lib/model/TestRequest";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { AIGeneratedTestResponseSchema } from "@/lib/shared/Validation/TestDataValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{ params }: { params: Promise<{ id: string } >}){
    try {
        const {id}=await params;
        const body:AIGeneratedTestResponse=await req.json();
        const validatedData=AIGeneratedTestResponseSchema.safeParse(body);
        if(!validatedData.success){
            return sendValidationResponse(validatedData);
        }
        const testResult=await saveTestService(id, body);
        return NextResponse.json({message:"Test saved successfully",testResult},{status:201});
    } catch (error) {
        console.error("Error saving test:", error);
        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal Server Error",500);
    }
}