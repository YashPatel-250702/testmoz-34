import { NextRequest, NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

interface CompileRequest {
  language: string;
  code: string;
  testCases?: string[];
}

interface LambdaResult {
  exitCode?: number;
  stdout?: string;
  stderr?: string;
  timedOut?: boolean;
  input?: string;
  output?: string;
  error?: string;
}

interface LambdaResponse {
  language: string;
  count: number;
  results: LambdaResult[];
}

export async function POST(req: NextRequest) {
  try {
    const body: CompileRequest = await req.json();
    const { language, code, testCases = [] } = body;

    console.log("📥 Received in API:", { language, code, testCases });

    if (!language || !code) {
      return NextResponse.json(
        { error: "language and code required" },
        { status: 400 }
      );
    }

    const payload = { language, code, testCases };
    let lambdaResponse: LambdaResponse;

    if (process.env.LAMBDA_LINK) {
      const res = await fetch(`${process.env.LAMBDA_LINK}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      lambdaResponse = await res.json();
    } else {
      const lambda = new LambdaClient({
        region: process.env.AWS_REGION,
        credentials:
          process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
            ? {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              }
            : undefined,
      });

      const cmd = new InvokeCommand({
        FunctionName: process.env.LAMBDA_FUNCTION_NAME!,
        Payload: Buffer.from(JSON.stringify(payload)),
        InvocationType: 'RequestResponse',
      });

      const res = await lambda.send(cmd);
      const outStr = Buffer.from(res.Payload as Uint8Array).toString();
      lambdaResponse = JSON.parse(outStr);
    }

    return NextResponse.json({
      count: Array.isArray(lambdaResponse?.results)
        ? lambdaResponse.results.length
        : 0,
      results: lambdaResponse?.results || [],
      language: lambdaResponse?.language || language,
    });
  } catch (error: unknown) {
    console.error("Error invoking Lambda:", error);
    return NextResponse.json(
      { error: "Lambda invocation failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}
