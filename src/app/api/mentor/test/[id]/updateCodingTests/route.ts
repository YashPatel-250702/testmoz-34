import { updateTestByIdService } from "@/lib/actions/Tests/CodingTestService";
import { GeneratedTestRequest } from "@/lib/model/TechnicalTestModel";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}){
      try {
          const {id}=await params;
          const test:GeneratedTestRequest=await req.json();
          const updatedTest=await updateTestByIdService(id,test);
          return NextResponse.json({message:"Test updated successfully",updatedTest},{status:200});
      } catch (error) {
         console.log(error);
         if(error instanceof CommonErrorHandler){
            return sendCommonError(error.message,error.statusCode)
         }
         return sendCommonError("Internal Server Error",500)
      }
}