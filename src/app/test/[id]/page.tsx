"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for tests (in a real app, this would come from a database)
const mockTests = {
  "college-java-basics": {
    title: "Java Basics for College Students",
    conceptName: "Java Control Statements",
    duration: 60,
    complexity: "Easy",
    codingPercentage: 70,
    theoryPercentage: 30,
    numberOfQuestions: 20,
    introduction: `Welcome to this week's test on Java Control Statements! This test is designed to assess your understanding and skills through a mix of 70% coding and 30% theoretical questions. You have 60 minutes to complete 20 questions at Easy level. Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!`,
  },
  "aptitude-reasoning": {
    title: "Aptitude Reasoning Test",
    conceptName: "Logical Reasoning",
    duration: 45,
    complexity: "Mixed",
    codingPercentage: 0,
    theoryPercentage: 100,
    numberOfQuestions: 30,
    introduction: `Welcome to the Aptitude Reasoning Test! This test assesses your logical reasoning and problem-solving skills. You have 45 minutes to complete 30 questions at Mixed complexity. Please read each question carefully and manage your time effectively. Good luck!`,
  },
  "aptitude-english": {
    title: "Aptitude English Test",
    conceptName: "English Language",
    duration: 30,
    complexity: "Easy",
    codingPercentage: 0,
    theoryPercentage: 100,
    numberOfQuestions: 20,
    introduction: `Welcome to the Aptitude English Test! This test evaluates your verbal ability, grammar, and comprehension. You have 30 minutes to complete 20 questions at Easy complexity. Please read each question carefully and manage your time effectively. Good luck!`,
  },
  "technical-java-core": {
    title: "Java Core Concepts Test",
    conceptName: "Java Core Concepts",
    duration: 60,
    complexity: "Medium",
    codingPercentage: 80,
    theoryPercentage: 20,
    numberOfQuestions: 25,
    introduction: `Welcome to the Java Core Concepts Test! This test covers fundamental Java programming concepts. You have 60 minutes to complete 25 questions at Medium complexity. Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!`,
  },
  "technical-data-structures": {
    title: "Data Structures & Algorithms Test",
    conceptName: "Data Structures & Algorithms",
    duration: 90,
    complexity: "Hard",
    codingPercentage: 90,
    theoryPercentage: 10,
    numberOfQuestions: 20,
    introduction: `Welcome to the Data Structures & Algorithms Test! This test assesses your knowledge of common data structures and algorithms. You have 90 minutes to complete 20 questions at Hard complexity. Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!`,
  },
  "technical-web-dev": {
    title: "Web Development Basics Test",
    conceptName: "Web Development Basics",
    duration: 75,
    complexity: "Medium",
    codingPercentage: 70,
    theoryPercentage: 30,
    numberOfQuestions: 30,
    introduction: `Welcome to the Web Development Basics Test! This test covers HTML, CSS, JavaScript, and basic web concepts. You have 75 minutes to complete 30 questions at Medium complexity. Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!`,
  },
}

export default function TestIntroductionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const testId = params.id
  const test = mockTests[testId as keyof typeof mockTests]

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center p-8">
          <CardTitle>Test Not Found</CardTitle>
          <CardDescription className="mt-2">The test you are looking for does not exist.</CardDescription>
          <Button onClick={() => router.push("/")} className="mt-6">
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  const handleStartTest = () => {
    // In a real application, this would navigate to the actual test-taking interface
    // For now, we'll just log and simulate starting
    console.log(`Starting test: ${test.title}`)
    alert(`Simulating start of test: ${test.title}. In a real app, you'd go to the questions now!`)
    // Example: router.push(`/test/${testId}/start`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{test.title}</CardTitle>
          <CardDescription className="text-center">Test Introduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none mb-6 p-4 border rounded-md bg-gray-50">
            <p className="whitespace-pre-wrap">{test.introduction}</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleStartTest} className="w-full max-w-xs py-3 text-lg">
              🚀 Start Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
