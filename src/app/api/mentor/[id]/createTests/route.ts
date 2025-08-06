// src/app/api/mentor/create-test/route.ts

import { createTest } from "@/lib/actions/Tests/createTestService";
import { TestRequestBody } from "@/lib/model/TestRequest";
import {
  CommonErrorHandler,
  sendCommonError,
  sendValidationResponse,
} from "@/lib/shared/Common/CommonError";
import { TestRequestSchema } from "@/lib/shared/Validation/TestRequestValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: TestRequestBody = await request.json();
    const result=TestRequestSchema.safeParse(body);
    if(!result.success){
        return sendValidationResponse(result);  
    }

    const testResult = await createTest(body);
    return NextResponse.json(testResult);
  } catch (error) {
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}
