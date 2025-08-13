import { register } from "@/lib/actions/userActions/UserActions";
import { Mentor } from "@/lib/model/UserModel";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { LoginValidation } from "@/lib/shared/Validation/loginValidation";
import { MentorValidation } from "@/lib/shared/Validation/MentorValidation";
import { NextRequest, NextResponse } from "next/server";




/**
 * @swagger
 * /api/auth/register/:
 *   post:
 *     summary: Register a Mentor
 *     description: Registers a new mentor with the provided details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: mentor@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *             required:
 *               - name
 *               - email
 *               - password
 *               - mobile
 *     responses:
 *       '201':
 *         description: Mentor registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mentor Registered Successfully
 *       '400':
 *         description: Validation failed or email/mobile already exists.
 *       '500':
 *         description: Internal Server Error.
 */
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