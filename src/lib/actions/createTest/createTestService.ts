// src/services/createTestService.ts

import { generateTestPrompt } from '@/lib/shared/Prompts/createTestPrompt'
import { generateTestWithGemini } from './GeminiAIService'
import { TestRequestBody } from '@/lib/model/TestRequest'
import { CommonErrorHandler } from '@/lib/shared/Common/CommonError'

export async function createTest(body: TestRequestBody) {
    const prompt = generateTestPrompt(body)
    const generatedTest = await generateTestWithGemini(prompt)

    return {
      message: 'Test successfully created with AI',
      generatedTest,
    }
  }