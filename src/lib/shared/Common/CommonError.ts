import { NextResponse } from "next/server";


export class CommonErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = "CommonErrorHandler";
    }
  }
  

export function sendCommonError(message:string,statusCode:number) {
    return NextResponse.json({ error: message }, { status: statusCode });
}

export function sendValidationResponse(validatedData: any): NextResponse {
  const error: Record<string, string> = {};
 
  validatedData.error.issues.map((issue: any) => {
    error[issue.path[0]] = issue.message;
  });
 
  return NextResponse.json(error, { status: 400 });
}