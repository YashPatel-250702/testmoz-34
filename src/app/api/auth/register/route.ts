import { register } from "@/lib/actions/userActions/UserActions";
import { Mentor } from "@/lib/model/UserModel";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { LoginValidation } from "@/lib/shared/Validation/loginValidation";
import { MentorValidation } from "@/lib/shared/Validation/MentorValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const mentor:Mentor = await request.json();
        const validation = MentorValidation.safeParse(mentor);
        if(!validation.success){     
            return sendValidationResponse(validation);
        }
        const result=await register(mentor);
        return NextResponse.json({message:"Mentor Registered Successfully"},{status:201})

    } catch (error) {
        if(error instanceof CommonErrorHandler) {
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal Server Error",500);
    }

}   