import { NextResponse } from 'next/server';
import { getAllTestsByTypeService } from '@/lib/actions/Tests/SaveTest';
import { CommonErrorHandler, sendCommonError } from '@/lib/shared/Common/CommonError';
import { TestType } from '@/lib/model/TestRequest';
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const type: string | null = searchParams.get("type");
        
        if (!type) {
            throw new CommonErrorHandler("Type not provided", 400);
        }

        const testResult = await getAllTestsByTypeService(id, type as TestType);
        if (!testResult || testResult.length === 0) {
            return NextResponse.json({ message: "No tests found for the specified type" }, { status: 404 });
        }

        const activeTests = testResult.filter(test => test.status === 'ACTIVE');
        if (activeTests.length === 0) {
            return NextResponse.json({ message: "No active tests found for the specified type" }, { status: 404 });
        }
        return NextResponse.json({ message: "Tests fetched successfully", activeTests }, { status: 200 });
    } catch (error) {
        console.error("Error getting tests:", error);
        if (error instanceof CommonErrorHandler) {
            return sendCommonError(error.message, error.statusCode);
        }
        return sendCommonError("Internal Server Error", 500);
    }
}