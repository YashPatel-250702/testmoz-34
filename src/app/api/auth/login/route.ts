import { login } from "@/lib/actions/userActions/UserActions";
import { CommonErrorHandler, sendCommonError, sendValidationResponse } from "@/lib/shared/Common/CommonError";
import { LoginValidation } from "@/lib/shared/Validation/loginValidation";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Mentor Login
 *     description: Authenticates a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mentor@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The authentication token.
 *       '400':
 *         description: Validation failed.
 *       '401':
 *         description: Login failed or invalid credentials.
 *       '500':
 *         description: Internal Server Error.
 */

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const validation = LoginValidation.safeParse({ email, password });
        if (!validation.success) {
            return sendValidationResponse(validation);
        }
        const loginResponse = await login(email, password);
        if (!loginResponse) {
            return sendCommonError("Login failed", 401);
        }
        return NextResponse.json({ data: loginResponse }, { status: 200 });
    } catch (error) {
        console.log(error)
        if (error instanceof CommonErrorHandler) {
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal Server Error", 500);
    }
}