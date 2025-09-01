import { NextRequest, NextResponse } from "next/server";
import { updateForm } from "@/lib/actions/Tests/FormService";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      throw new CommonErrorHandler("Form ID is required", 400);
    }

    const formResult = await updateForm(id, body);

    return NextResponse.json(
      { message: "Form updated successfully", formResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating form:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}
