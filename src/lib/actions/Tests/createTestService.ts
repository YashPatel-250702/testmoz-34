// src/services/createTestService.ts

import { TestRequestBody } from "@/lib/model/TestRequest";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";
import { generateCollegeTestPrompt } from "@/lib/shared/Prompts/College/CollegeTestPrompt";
import { generateAptitudeTestPrompt } from "@/lib/shared/Prompts/Placements/AptitudeTestPrompt";
import { generateTechnicalTestPrompt } from "@/lib/shared/Prompts/Placements/TechnicalTestPrompt";
import { generateTestWithGemini } from "../Tests/GeminiAIService";



export async function createTest(body: TestRequestBody) {
   let prompt = '';
   console.log("Creating test with body:", body.skills);
    switch (body.testType) {
      case 'COLLEGE':
        prompt = generateTechnicalTestPrompt(body);
        break;
      case 'PLACEMENT':
        if (body.skills?.toLowerCase().includes('aptitude')) {
          console.log("Generating aptitude test prompt with body:", body);
          prompt = generateAptitudeTestPrompt(body);
        } else {
          prompt = generateTechnicalTestPrompt(body);
        }
        break;
      default:
        throw new CommonErrorHandler("Invalid test type", 400);
    }

    
    const generatedTest = await generateTestWithGemini(prompt)
    
    return {
      message: 'Test successfully created with AI',
      generatedTest: generatedTest,
    }
  }