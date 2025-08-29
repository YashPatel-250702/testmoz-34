import { NextRequest, NextResponse } from "next/server";
import { getFormResponsesByFormIdService } from "@/lib/actions/Tests/FormService";
import { CommonErrorHandler, sendCommonError } from "@/lib/shared/Common/CommonError";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const responses = await getFormResponsesByFormIdService(params.id);
    return NextResponse.json({ responses }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching responses:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}
