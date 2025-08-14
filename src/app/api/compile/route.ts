// app/api/compile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, code, stdin, count } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: "language and code are required" },
        { status: 400 }
      );
    }

    const invocations = Array.from({ length: count || 1 }).map(() => {
      const payload = {
        language,
        code,
        stdin: stdin || "",
      };

      const cmd = new InvokeCommand({
        FunctionName: process.env.LAMBDA_FUNCTION_NAME!,
        Payload: Buffer.from(JSON.stringify(payload)),
        InvocationType: "RequestResponse",
      });

      return lambda
        .send(cmd)
        .then((res) => {
          const outStr = Buffer.from(res.Payload as Uint8Array).toString();
          try {
            return JSON.parse(outStr);
          } catch {
            return outStr;
          }
        })
        .catch((err) => ({ error: err.message }));
    });

    const results = await Promise.all(invocations);

    return NextResponse.json({ count: results.length, results });
  } catch (error: any) {
    console.error("Error invoking Lambda:", error);
    return NextResponse.json(
      { error: "Lambda invocation failed", details: error.message },
      { status: 500 }
    );
  }
}
