// src/app/api/mentor/create-test/route.ts

import { createTest } from "@/lib/actions/Tests/createTestService";
import { TestRequestBody } from "@/lib/model/TestRequest";
import {
  CommonErrorHandler,
  sendCommonError,
  sendValidationResponse,
} from "@/lib/shared/Common/CommonError";
import { TestRequestSchema } from "@/lib/shared/Validation/TestRequestValidation";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/mentor/{id}/createTests:
 *   post:
 *     summary: Create a Test for a Mentor with AI-Generated Questions
 *     description: Creates a new test associated with the specified mentor ID, including AI-generated questions based on the provided parameters.
 *     tags:
 *       - Tests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the mentor creating the test.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Introduction to Algorithms"
 *                 description: The name of the test.
 *               description:
 *                 type: string
 *                 example: "A test covering basic algorithms and data structures."
 *                 description: A brief description of the test.
 *               testType:
 *                 type: string
 *                 enum: [COLLEGE, TECHNICAL, APPTITUDE]
 *                 example: TECHNICAL
 *                 description: The type of test.
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: ACTIVE
 *                 description: The status of the test.
 *               duration:
 *                 type: integer
 *                 example: 60
 *                 description: Duration of the test in minutes.
 *               numberOfQuestions:
 *                 type: integer
 *                 example: 10
 *                 description: Number of questions in the test.
 *               noOfAttempts:
 *                 type: integer
 *                 example: 2
 *                 description: Number of allowed attempts for the test.
 *               conceptsList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Sorting", "Searching", "Graphs"]
 *                 description: List of concepts covered in the test.
 *               skills:
 *                 type: string
 *                 example: "JavaScript, Python, Algorithms"
 *                 description: Comma-separated list of skills required for the test.
 *               complexity:
 *                 type: string
 *                 example: "Medium"
 *                 description: The complexity level of the test (e.g., Easy, Medium, Hard).
 *             required:
 *               - name
 *               - testType
 *               - status
 *               - duration
 *               - numberOfQuestions
 *               - noOfAttempts
 *               - conceptsList
 *               - skills
 *               - complexity
 *     responses:
 *       '200':
 *         description: Test created successfully with AI-generated questions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Test successfully created with AI"
 *                 generatedTest:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Weekly Coding Test on Sorting,Searching,Graphs"
 *                       description: The generated title of the test.
 *                     description:
 *                       type: string
 *                       example: "Welcome to this week's coding test on Sorting,Searching,Graphs. This test evaluates your coding ability through 10 hands-on programming questions over 60 minutes. All questions are of Medium complexity."
 *                       description: The generated description of the test.
 *                     durationMinutes:
 *                       type: integer
 *                       example: 60
 *                       description: Duration of the test in minutes.
 *                     numberOfQuestions:
 *                       type: integer
 *                       example: 10
 *                       description: Number of questions in the test.
 *                     complexity:
 *                       type: string
 *                       example: "Medium"
 *                       description: The complexity level of the test.
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           problemStatement:
 *                             type: string
 *                             example: "Implement merge sort algorithm to sort an array of integers."
 *                             description: The problem statement for the question.
 *                           sampleInput:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["[5,2,8,1,9,4]", "[10,7,3,1,5,9,2]", "[]"]
 *                             description: Sample inputs for the question.
 *                           sampleOutput:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["[1,2,4,5,8,9]", "[1,2,3,5,7,9,10]", "[]"]
 *                             description: Sample outputs for the question.
 *                           constraints:
 *                             type: string
 *                             example: "Time complexity O(n log n), Space complexity O(n)"
 *                             description: Constraints for the question.
 *                           complexity:
 *                             type: string
 *                             example: "Medium"
 *                             description: The complexity level of the question.
 *       '400':
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 testType:
 *                   type: string
 *                   example: "Test type is required"
 *                 skills:
 *                   type: string
 *                   example: "Expected string, received array"
 *                 conceptsList:
 *                   type: string
 *                   example: "Required"
 *                 complexity:
 *                   type: string
 *                   example: "Complexity is required"
 *                 numberOfQuestions:
 *                   type: string
 *                   example: "Number of questions is required"
 *       '401':
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

export async function POST(request: NextRequest) {
  try {
    const body: TestRequestBody = await request.json();
    const result=TestRequestSchema.safeParse(body);
    if(!result.success){
        return sendValidationResponse(result);  
    }

    const testResult = await createTest(body);
    return NextResponse.json(testResult);
  } catch (error) {
    console.log("Error in createTest API:", error);
    if (error instanceof CommonErrorHandler) {
      return sendCommonError(error.message, error.statusCode);
    }
    return sendCommonError("Internal Server Error", 500);
  }
}
