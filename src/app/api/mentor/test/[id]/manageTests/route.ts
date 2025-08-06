import { deleteTestService, getTestByIdService, updateTestService } from "@/lib/actions/Tests/SaveTest";
import { AIGeneratedTestResponse } from "@/lib/model/TestRequest";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { AIGeneratedTestResponseSchema } from "@/lib/shared/Validation/TestDataValidation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try {
        const {id}=await params;
        const deletedTest=await deleteTestService(id);
        return NextResponse.json({message:"Test deleted successfully"},{status:200});

        
    } catch (error) {
        console.log(error);

        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal server error while deleteing test", 500);
    }
}

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try {
        const {id}=await params;
        const test=await getTestByIdService(id);
        return NextResponse.json({message:"Test fetched successfully",test},{status:200});

        
    } catch (error) {
        console.log(error);

        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal server error while getting test", 500);
    }
}

export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try {
        const {id}=await params;
        const test:AIGeneratedTestResponse=await req.json();
        const updatedTest=await updateTestService(id,test);
        return NextResponse.json({message:"Test updated successfully",updatedTest},{status:200});

        
    } catch (error) {
        console.log(error);

        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal server error while updating test", 500);
    }
}
    
    