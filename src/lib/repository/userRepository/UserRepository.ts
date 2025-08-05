import { Mentor } from "@/lib/model/UserModel";
import  prisma  from "../../shared/Common/PrismaClient";
import { count } from "console";

export async function login(email: string, password: string) {

}

export async function findByEmail(email: string) {
    const result = await prisma.mentor.findUnique({
        where: { email }
    });
    return result;
}

export async function registerMentor(mentor: Mentor) {
    const result = await prisma.mentor.create({
        data: mentor
    });
    return result;
}