import { NextRequest, NextResponse } from "next/server";
import { saveForm, getFormByIdService, deleteForm } from "@/lib/actions/Tests/FormService";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; 
    const body = await req.json();

    const formResult = await saveForm(id, body);

    return NextResponse.json(
      { message: "Form saved successfully", formResult },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving form:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const form = await getFormByIdService(params.id);
    return NextResponse.json({ form }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching form:", error);
    return sendCommonError(error.message || "Internal Server Error", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deletedForm = await deleteForm(id);

    return NextResponse.json(
      { message: "Form and related responses deleted successfully", deletedForm },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting form:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}