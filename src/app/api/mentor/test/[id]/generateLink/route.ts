import { generatePublicLink } from "@/lib/actions/Tests/SaveTest";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try {
         const {id}=await params;
        const test=await generatePublicLink(id);
        return NextResponse.json({message:"Test fetched successfully",test},{status:200});
        
    } catch (error) {
        console.log(error);

        if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal server error while getting test", 500);
        
    }

}