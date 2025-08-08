import { TestRequestBody } from '@/lib/model/TestRequest';

export function generateCollegeTestPrompt(body: TestRequestBody): string {
    console.log("Generating technical test prompt with body:", body);
  const prompt = `
You are an AI system tasked with generating a weekly coding test for students in a full-stack Java or data science training program.

Inputs:
- skills: ${body.skills || 'N/A'}
- Concepts: ${body.conceptsList}
- Duration: ${body.duration} minutes
- Complexity: ${body.complexity}
- Number of Questions: ${body.numberOfQuestions}

Generate:
1. A welcome introduction text for students.
2. A test object with:
   - "title": "Test Title" (should include the concept name)
   - "description": A brief summary of the test, its objective, duration, and structure.
   - "durationMinutes": total test duration in minutes
   - "numberOfQuestions": total number of questions
   - "complexity": overall complexity level of the test
   - "questions": an array of ${body.numberOfQuestions} **coding questions**, each containing:
     - "problemStatement": clearly defined problem
     - "sampleInput": sample input to the problem
     - "sampleOutput": expected output for the input
     - "constraints": any constraints (e.g., time/space, input size, valid values)
     - "complexity": same as overall complexity

All questions must:
- Be purely **technical (coding)** problems
- Focus on **hands-on coding** skills based on the skills and concepts provided
- Avoid theory or conceptual questions
- Be relevant to the concepts: **"${body.conceptsList}"**
- Be at **"${body.complexity}"** level

Only return valid **pure JSON** in the following format:

{
  "title": "Weekly Coding Test on ${body.conceptsList}",
  "description": "Welcome to this week's coding test on ${body.conceptsList}. This test evaluates your coding ability through ${body.numberOfQuestions} hands-on programming questions over ${body.duration} minutes. All questions are of ${body.complexity} complexity.",
  "durationMinutes": ${body.duration},
  "numberOfQuestions": ${body.numberOfQuestions},
  "complexity": "${body.complexity}",
  "questions": [
    {
      "problemStatement": "Your coding question here...",
      "sampleInput": "Sample input string here...",
      "sampleOutput": "Expected output here...",
      "constraints": "Any specific constraints",
      "complexity": "${body.complexity}"
    }
    // repeat for all questions
  ]
}

**Rules:**
- Do NOT include theory questions.
- Do NOT return markdown or explanation — only valid JSON.
- Focus on code logic, inputs, outputs, and real-world problem solving.
- Avoid repetitive or trivial problems.
`;

  return prompt;
}
