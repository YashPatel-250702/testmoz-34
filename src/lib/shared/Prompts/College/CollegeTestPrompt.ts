import { TestRequestBody } from '@/lib/model/TestRequest';

export function generateCollegeTestPrompt(body: TestRequestBody): string {
  const prompt = `
You are an AI system tasked with generating a weekly test for students in a full-stack Java or data science training program.

Inputs:
- Concept: ${body.conceptName}
- Duration: ${body.duration} minutes
- Complexity: ${body.complexity}
- Number of Questions: ${body.numberOfQuestions}
- Coding Percentage: ${body.codingPercentage}%
- Theory Percentage: ${body.theoryPercentage}%

Generate:
1. A welcome introduction text for students.
2. A test object with:
   - "title": "Test Title" (should include the concept name)
   - "description": A brief summary of the test, its objective, duration, and structure.
   - "durationMinutes": total test duration in minutes
   - "numberOfQuestions": total number of questions
   - "complexity": overall complexity level of the test
   - "questions": an array of ${body.numberOfQuestions} questions, each containing:
     - "problemStatement": the question or task
     - "options": an array of exactly 4 options
     - "answer": the correct option (full string, not just a/b/c/d)
     - "complexity": same as overall complexity

Question distribution must reflect ${body.codingPercentage}% coding and ${body.theoryPercentage}% theory.
All questions should be relevant to "${body.conceptName}" and at a "${body.complexity}" level.

Only return valid **pure JSON** in the following format:

{
  "title": "Weekly Test on ${body.conceptName}",
  "description": "Welcome to this week's test on ${body.conceptName}. This test is designed to assess your knowledge through ${body.numberOfQuestions} questions over ${body.duration} minutes. The complexity level is ${body.complexity}, with a mix of ${body.codingPercentage}% coding and ${body.theoryPercentage}% theory.",
  "durationMinutes": ${body.duration},
  "numberOfQuestions": ${body.numberOfQuestions},
  "complexity": "${body.complexity}",
  "questions": [
    {
      "problemStatement": "Your question here...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct full answer string",
      "complexity": "${body.complexity}"
    }
    // repeat for all questions
  ]
}

**Rules:**
- Ensure exactly 4 options per question.
- Include 1 correct answer per question.
- The answer should be the full text (not "A", "B", etc.).
- Do not return any extra explanation, markdown, or formatting — just valid JSON.
`;

  return prompt;
}
