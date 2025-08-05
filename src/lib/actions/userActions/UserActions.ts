import { Mentor } from "@/lib/model/UserModel";
import { findByEmail, registerMentor } from "@/lib/repository/userRepository/UserRepository";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";
import bcrypt from "bcrypt";
import { create } from "domain";
import { JWTPayload} from 'jose';
import { MentorLoginResponse } from "@/lib/shared/Common/JwtResponse";
import { generatToken } from "@/lib/utils/JwtUtil";

export async function login(email: string, password: string) {
    const mentor = await findByEmail(email);
    if (!mentor) {
        throw new CommonErrorHandler("Mentor not found", 404);
    }
    const isPasswordMatch = await bcrypt.compare(password, mentor.password);
    if (!isPasswordMatch) {
        throw new CommonErrorHandler("Invalid password", 401);
    }

    const userPayload: JWTPayload = {
        id: mentor.id,
        email: mentor.email,
        name: mentor.name,
    };

    const token:string=await generatToken(userPayload);
    const response:MentorLoginResponse={
        mentorId: mentor.id ,
        email: mentor.email,
        token: token
    }
    return response;
  }

export async function register(mentor: Mentor) {
    
  const mentorByEmail= await findByEmail(mentor.email);
  if(mentorByEmail){
     throw new CommonErrorHandler("Mentor Already Exist with email",400);
  }
  const encryptedPassword=await bcrypt.hash(mentor.password,10);
  mentor.password = encryptedPassword;
  const result=await registerMentor(mentor);
  if(!result){
    throw new CommonErrorHandler("Mentor registration failed",500);
  }

  return result;
}