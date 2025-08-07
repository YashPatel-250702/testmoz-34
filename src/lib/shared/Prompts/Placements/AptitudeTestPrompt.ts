import { TestRequestBody } from "@/lib/model/TestRequest";
import { Test } from "@/lib/types";

export function generateAptitudeTestPrompt(body:TestRequestBody): string {
const prompt = `You are a system designed to generate an aptitude test for placement drives at colleges. The following inputs have been collected from the user through an interactive interface (e.g., form, command-line input, or dialog):
Concepts in Aptitude: ${body.conceptsList} (e.g., Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Interpretation), some times you will receive multiple concepts separated by commas.
Complexity: ${body.complexity} (Easy, Moderate, or Hard)
Duration: ${body.duration} minutes (e.g., 30 or 60 minutes)
Number of Questions: ${body.numberOfQuestions} (e.g., 20 questions)
Using these inputs, generate an aptitude test that includes:
An introduction text for students, which:
Welcomes candidates to the aptitude test for the placement drive.
Specifies the concepts being tested as ${body.conceptsList}.
Mentions the test duration as ${body.duration} minutes.
Indicates the complexity level as ${body.complexity}.
Provides instructions for attempting the test, such as: "Read each question carefully, select the correct option for multiple-choice questions, and manage your time effectively."
A set of ${body.numberOfQuestions} questions that:
Align with the specified concepts ${body.conceptsList} and complexity level ${body.complexity}.
Are suitable for a timed test, using multiple-choice or short-answer formats.
Are distributed across the specified concepts (e.g., if multiple concepts are provided, allocate questions approximately equally, such as 25% per concept for four concepts).
For multiple-choice questions, include four answer options (A, B, C, D) with one correct answer.
For short-answer questions (if applicable), ensure clarity and brevity.
Are allocated to fit within ${body.duration} minutes, with estimated time per question based on complexity (e.g., Easy: 1-2 min, Moderate: 2-3 min, Hard: 3-4 min).
Ensure the total estimated time for all questions fits within ${body.duration} minutes.
Format the output as follows:
# Aptitude Test Introduction
Welcome to the aptitude test for this placement drive! This test assesses your skills in ${body.conceptsList}. You have ${body.duration} minutes to complete ${body.numberOfQuestions} questions at ${body.complexity} level. Please read each question carefully, select the correct option for multiple-choice questions, and manage your time effectively. Good luck!
## Questions
- **Question 1**: [Concept: ${body.conceptsList}] [Complexity: ${body.complexity}] [Question] [Options: A, B, C, D] [Correct Answer: X] [Expected Time: X minutes]
- **Question 2**: [Concept: ${body.conceptsList}] [Complexity: ${body.complexity}] [Question] [Options: A, B, C, D] [Correct Answer: X] [Expected Time: X minutes]
...
- **Question ${body.numberOfQuestions}**: [Concept: ${body.conceptsList}] [Complexity: ${body.complexity}] [Question] [Options: A, B, C, D] [Correct Answer: X] [Expected Time: X minutes]
Ensure the questions are varied, relevant to ${body.conceptsList}, and appropriate for the ${body.complexity} level. Distribute questions across the specified concepts as evenly as possible. For multiple-choice questions, provide clear questions with four distinct answer options and specify the correct answer. Ensure the total estimated time aligns with ${body.duration}.
Only return valid **pure JSON** in the following format:

{
  "title": "Weekly Test on ${body.conceptsList}",
  "description": "Welcome to this week's test on ${body.conceptsList}. This test is designed to assess your knowledge through ${body.numberOfQuestions} questions over ${body.duration} minutes. All questions are of ${body.complexity} complexity.",
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
`
    return prompt;
}