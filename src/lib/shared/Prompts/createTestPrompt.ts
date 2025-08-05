

import { TestRequestBody } from '@/lib/model/TestRequest';

export function generateTestPrompt(body: TestRequestBody): string {
	const prompt = `You are a system designed to generate a weekly test for students in a full-stack Java or data science training program. The following inputs have been collected from the user:
                    Concept Name: ${body.conceptName}
                    Duration: ${body.duration} minutes
                    Complexity: ${body.complexity}
                    Code/Theory: ${body.codingPercentage}% Coding, ${body.theoryPercentage}% Theory
                    Number of Questions: ${body.numberOfQuestions}
                    Using these inputs, generate a weekly test that includes:
                    An introduction text for students, which:
                    Welcomes students to the weekly test.
                    Specifies the concept being tested as ${body.conceptName}.
                    Mentions the test duration as ${body.duration} minutes.
                    Indicates the complexity level as ${body.complexity} and the mix of ${body.codingPercentage}% coding and ${body.theoryPercentage}% theoretical questions.
                    Provides instructions for attempting the test, such as: "Read each question carefully, manage your time, and ensure code is syntactically correct for coding questions."
                    A set of ${body.numberOfQuestions} questions or practical scenarios that:
                    Align with the concept ${body.conceptName} and complexity level ${body.complexity}.
                    Test practical skills (e.g., writing code, debugging, or implementing algorithms) for coding questions and conceptual knowledge (e.g., multiple-choice or short-answer questions) for theoretical questions.
                    For coding questions, include problem statements, input/output examples, and constraints.
                    For theoretical questions, ensure clarity and relevance to ${body.conceptName}.
                    Reflect the ${body.codingPercentage}% coding and ${body.theoryPercentage}% theory ratio in the distribution of question types (e.g., for 10 questions with 80% code, generate 8 coding and 2 theory questions).
                    Are allocated to fit within ${body.duration} minutes, with estimated time per question based on complexity (e.g., Beginner: 3-5 min, Intermediate: 5-8 min, Advanced: 8-12 min).
                    Ensure the total estimated time for all questions fits within ${body.duration} minutes.
                    Format the output as follows: 
                    # Weekly Test Introduction
                    Welcome to this week's test on ${body.conceptName}! This test is designed to assess your understanding and skills through a mix of ${body.codingPercentage}% coding and ${body.theoryPercentage}% theoretical questions. You have ${body.duration} minutes to complete ${body.numberOfQuestions} questions at ${body.complexity} level. Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!
                    ## Questions
                    - **Question 1**: [Type: Coding/Theory] [Complexity: ${body.complexity}] [Problem Statement/Question] [Input/Output Examples for Coding] [Expected Time: X minutes]
                    - **Question 2**: [Type: Coding/Theory] [Complexity: ${body.complexity}] [Problem Statement/Question] [Input/Output Examples for Coding] [Expected Time: X minutes]
                    ...
                    - **Question ${body.numberOfQuestions}**: [Type: Coding/Theory] [Complexity: ${body.complexity}] [Problem Statement/Question] [Input/Output Examples for Coding] [Expected Time: X minutes]
                    Ensure the questions are varied, relevant to ${body.conceptName}, and appropriate for the ${body.complexity} level. For coding questions, provide clear problem statements with example inputs and outputs, and specify constraints. For theoretical questions, use formats like multiple-choice or short-answer to test conceptual understanding. Distribute the questions to closely match the ${body.codingPercentage}%/${body.theoryPercentage}% ratio, rounding to whole questions as needed.`;
	return prompt;
}