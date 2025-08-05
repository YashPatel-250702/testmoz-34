"use server"

interface TestFormData {
  conceptName: string
  duration: number
  complexity: "Easy" | "Medium" | "Hard" | "Mixed"
  numberOfQuestions: number
  codingPercentage: number
  theoryPercentage: number
}

export async function generateTest(formData: TestFormData) {
  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const prompt = `You are a system designed to generate a weekly test for students in a full-stack Java or data science training program. The following inputs have been collected from the user:

Concept Name: ${formData.conceptName}
Duration: ${formData.duration} minutes
Complexity: ${formData.complexity}
Code/Theory: ${formData.codingPercentage}% Coding, ${formData.theoryPercentage}% Theory
Number of Questions: ${formData.numberOfQuestions}

Using these inputs, generate a weekly test that includes:

An introduction text for students, which:
- Welcomes students to the weekly test
- Specifies the concept being tested as ${formData.conceptName}
- Mentions the test duration as ${formData.duration} minutes
- Indicates the complexity level as ${formData.complexity} and the mix of ${formData.codingPercentage}% coding and ${formData.theoryPercentage}% theoretical questions
- Provides instructions for attempting the test

A set of ${formData.numberOfQuestions} questions that:
- Align with the concept ${formData.conceptName} and complexity level ${formData.complexity}
- Test practical skills for coding questions and conceptual knowledge for theoretical questions
- For coding questions, include problem statements, input/output examples, and constraints
- For theoretical questions, ensure clarity and relevance to ${formData.conceptName}
- Reflect the ${formData.codingPercentage}% coding and ${formData.theoryPercentage}% theory ratio
- Are allocated to fit within ${formData.duration} minutes

Format the output as follows:

# Weekly Test Introduction

Welcome to this week's test on ${formData.conceptName}! This test is designed to assess your understanding and skills through a mix of ${formData.codingPercentage}% coding and ${formData.theoryPercentage}% theoretical questions. You have ${formData.duration} minutes to complete ${formData.numberOfQuestions} questions at ${formData.complexity} level.

Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!

## Questions

- **Question 1**: [Type: Coding/Theory] [Complexity: ${formData.complexity}]
  [Problem Statement/Question]
  [Input/Output Examples for Coding]
  [Expected Time: X minutes]

[Continue for all questions...]`

  // In a real implementation, this would call an AI service
  // For now, return a mock generated test
  const mockTest = `# Weekly Test Introduction

Welcome to this week's test on ${formData.conceptName}! This test is designed to assess your understanding and skills through a mix of ${formData.codingPercentage}% coding and ${formData.theoryPercentage}% theoretical questions. You have ${formData.duration} minutes to complete ${formData.numberOfQuestions} questions at ${formData.complexity} level.

Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!

## Questions

**Question 1**: [Type: Coding] [Complexity: ${formData.complexity}]
Write a Java program to implement a simple if-else statement that checks if a number is positive, negative, or zero.

Input: An integer number
Output: "Positive", "Negative", or "Zero"
Expected Time: 3 minutes

**Question 2**: [Type: Theory] [Complexity: ${formData.complexity}]
Which of the following is the correct syntax for a for loop in Java?
a) for(int i=0; i<10; i++)
b) for(i=0; i<10; i++)
c) for(int i=0, i<10, i++)
d) for(int i=0; i<=10; i++)

Expected Time: 2 minutes

[Additional questions would be generated based on the specified parameters...]`

  return mockTest
}
