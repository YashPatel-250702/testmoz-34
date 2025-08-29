import {  NextResponse } from "next/server";
import { getFormsByMentorService,   } from "@/lib/actions/Tests/FormService";
import {  sendCommonError } from "@/lib/shared/Common/CommonError";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const forms = await getFormsByMentorService(params.id);
    return NextResponse.json({ forms }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching forms:", error);
    return sendCommonError(error.message || "Internal Server Error", 500);
  }
}