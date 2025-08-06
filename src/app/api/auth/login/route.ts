import { login } from "@/lib/actions/userActions/UserActions";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { LoginValidation } from "@/lib/shared/Validation/loginValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const { email, password } = await request.json();
        const validation = LoginValidation.safeParse({ email, password });
        if(!validation.success){
            return sendValidationResponse(validation);
        }
        const loginResponse=await login(email, password);
        if(!loginResponse){
            return sendCommonError("Login failed", 401);
        }
        return NextResponse.json({data:loginResponse}, {status: 200});

    } catch (error) {
        console.log(error)
        if(error instanceof CommonErrorHandler) {
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal Server Error",500);
    }

}   