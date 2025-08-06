// src/services/createTestService.ts

import { generateCollegeTestPrompt } from '@/lib/shared/Prompts/College/CollegeTestPrompt'
import { generateTestWithGemini } from './GeminiAIService'
import { TestRequestBody } from '@/lib/model/TestRequest'
import { CommonErrorHandler } from '@/lib/shared/Common/CommonError'
import { generateAptitudeTestPrompt } from '@/lib/shared/Prompts/Placements/AptitudeTestPrompt'
import { generateTechnicalTestPrompt } from '@/lib/shared/Prompts/Placements/TechnicalTestPrompt'

export async function createTest(body: TestRequestBody) {
   try {
    let prompt = '';
    switch (body.testType) {
      case 'COLLEGE':
        prompt = generateCollegeTestPrompt(body);
        break;
      case 'PLACEMENT':
        if(body.conceptName.toLowerCase().includes('aptitude')) {
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
   } catch (error) {
    throw new CommonErrorHandler("Gemini Service is down", 500);

   }
  }