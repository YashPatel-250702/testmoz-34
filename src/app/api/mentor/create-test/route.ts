// src/app/api/mentor/create-test/route.ts

import { createTest } from "@/lib/actions/createTest/createTestService";
import {
  CommonErrorHandler,
  sendCommonError,
} from "@/lib/shared/Common/CommonError";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received test data:", body);

    const testResult = await createTest(body);
    return NextResponse.json(testResult);
  } catch (error) {
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}
