import { TechnicalTestResults, TestResults } from "@/lib/model/TestResult";
import prisma from "@/lib/shared/Common/PrismaClient";

export async function submitTestResult(testResult:TestResults){
    console.log("Submitting test result...");
    const result=await prisma.testResults.create({data:testResult})
    return result
}

export async function submitTechnicalTestResult(testResult:TechnicalTestResults){
    const result=await prisma.technicalTestResults.create({data:testResult})
    return result
}