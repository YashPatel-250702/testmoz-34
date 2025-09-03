import { NextRequest, NextResponse } from "next/server";
import { saveFormResponse } from "@/lib/actions/Tests/FormService";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { responses, order } = body;

    const result = await saveFormResponse(params.id, {responses, order});

    return NextResponse.json(
      { message: "Response submitted successfully", result },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving form response:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}

