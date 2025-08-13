import { NextRequest, NextResponse } from "next/server";
import { runCode } from "@/lib/utils/codeCompiler";

// In-memory concurrency tracker
let activeExecutions = 0;
const MAX_CONCURRENT = 200;

export async function POST(req: NextRequest) {
  try {
    if (activeExecutions >= MAX_CONCURRENT) {
      return NextResponse.json(
        { error: "Server is busy, please try again shortly." },
        { status: 429 }
      );
    }

    activeExecutions++;
    const { code, language, input } = await req.json();

    if (!code || !language) {
      activeExecutions--;
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const start = Date.now();
    const { output, error } = await runCode({
      code,
      language,
      input,
      timeout: 15000 
    });
    const duration = Date.now() - start;

    activeExecutions--;

    return NextResponse.json({
      language,
      output,
      error,
      durationMs: duration
    });
  } catch (err) {
    activeExecutions--;
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
