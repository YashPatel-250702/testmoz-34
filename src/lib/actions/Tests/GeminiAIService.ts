import { CommonErrorHandler } from '@/lib/shared/Common/CommonError'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
  }
})

export async function generateTestWithGemini(prompt: string): Promise<any> {
  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = await response.text()

    const cleaned = text
      .replace(/^\s*```json\s*/i, '') 
      .replace(/^\s*```\s*/i, '')    
      .replace(/```\s*$/, '')  
      .replace(/#\s*$/, '')          
      .trim()

    const parsed = JSON.parse(cleaned)
    return parsed
  } catch (error) {
    console.error("Error generating test with Gemini:", error)
    throw new CommonErrorHandler("Failed to generate test", 500)
  }
}
