import { TestResults } from "@/lib/model/TestResult";
import prisma from "@/lib/shared/Common/PrismaClient";

export async function submitTestResult(testResult:TestResults){
    const result=await prisma.testResults.create({data:testResult})
    return result
}