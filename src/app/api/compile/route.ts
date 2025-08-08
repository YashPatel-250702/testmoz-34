import { NextRequest, NextResponse } from "next/server";
import { compileCode } from "@/lib/utils/codeCompiler";

export async function POST(req: NextRequest) {
  try {
    const { code, language, testCases } = await req.json();

    if (!code || !language || !testCases) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const results = await compileCode({ code, language, testCases });

    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
