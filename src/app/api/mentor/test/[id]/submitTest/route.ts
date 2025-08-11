import { submitTechnicalTestService, submitTestService } from "@/lib/actions/Tests/TestResultService";
import { TechnicalTestResults, TestResults } from "@/lib/model/TestResult";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { TestResultsSchema } from "@/lib/shared/Validation/TestResultValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const type: string | null = searchParams.get("type");

    if (!type) {
      throw new CommonErrorHandler("Type not provided", 400);
    }

    let result = null;

    if (type === "APPTITUDE") {
      const testResult: TestResults = await req.json();
      const validatedResultData = TestResultsSchema.safeParse(testResult);
      if (!validatedResultData.success) {
        return sendValidationResponse(validatedResultData);
      }
      result = await submitTestService(id, testResult);
    } 
    else if (type === "TECHNICAL" || type === "COLLEGE") {
      const testResult: TechnicalTestResults = await req.json();
      const validatedResultData = TestResultsSchema.safeParse(testResult);
      if (!validatedResultData.success) {
        return sendValidationResponse(validatedResultData);
      }
      result = await submitTechnicalTestService(id, testResult);
    }

    return NextResponse.json(
      { message: "Test submitted successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal server error while submitting test", 500);
  }
}
