import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
export async function generatToken(payload: JWTPayload): Promise<string> {
   const token = await new SignJWT(payload)
       .setProtectedHeader({ alg: 'HS256' })
       .sign(secret);
   return token;
}

export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        throw new Error("Invalid JWT Token");
    }
}