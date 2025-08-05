"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation" // Import useSearchParams
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface TestFormData {
  conceptName: string
  duration: number
  complexity: string
  numberOfQuestions: number
  codingPercentage: number
  theoryPercentage: number
}

export default function CreateTestPage() {
  const searchParams = useSearchParams()
  const testType = searchParams.get("type") // 'college', 'aptitude', 'technical', 'general'

  const initialCodingPercentage = testType === "aptitude" ? 0 : 80
  const initialTheoryPercentage = testType === "aptitude" ? 100 : 20

  const [formData, setFormData] = useState<TestFormData>({
    conceptName: "",
    duration: 30,
    complexity: "Easy",
    numberOfQuestions: 10,
    codingPercentage: initialCodingPercentage,
    theoryPercentage: initialTheoryPercentage,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTest, setGeneratedTest] = useState<string | null>(null)

  const handleSliderChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      codingPercentage: value,
      theoryPercentage: 100 - value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    const dataToSend = { ...formData }
    if (testType === "aptitude") {
      dataToSend.codingPercentage = 0
      dataToSend.theoryPercentage = 100
    }

    // Simulate AI generation
    setTimeout(() => {
      const mockTestIntro = `Welcome to this week's test on ${dataToSend.conceptName}! This test is designed to assess your understanding and skills through a mix of ${testType === "aptitude" ? "100% theoretical questions" : `${dataToSend.codingPercentage}% coding and ${dataToSend.theoryPercentage}% theoretical questions`}. You have ${dataToSend.duration} minutes to complete ${dataToSend.numberOfQuestions} questions at ${dataToSend.complexity} level.

Please read each question carefully, manage your time effectively, and ensure any code written is syntactically correct. Good luck!`

      const mockQuestions =
        testType === "aptitude"
          ? `
**Question 1**: [Type: Theory] [Complexity: ${dataToSend.complexity}]
What is the capital of France?
Expected Time: 1 minute

**Question 2**: [Type: Theory] [Complexity: ${dataToSend.complexity}]
If a car travels at 60 km/h, how far will it travel in 30 minutes?
Expected Time: 2 minutes
`
          : `
**Question 1**: [Type: Coding] [Complexity: ${dataToSend.complexity}]
Write a Java program to implement a simple if-else statement that checks if a number is positive, negative, or zero.

Input: An integer number
Output: "Positive", "Negative", or "Zero"
Expected Time: 3 minutes

**Question 2**: [Type: Theory] [Complexity: ${dataToSend.complexity}]
Which of the following is the correct syntax for a for loop in Java?
a) for(int i=0; i<10; i++)
b) for(i=0; i<10; i++)
c) for(int i=0, i<10, i++)
d) for(int i=0; i<=10; i++)

Expected Time: 2 minutes
`

      const mockTest = `# Weekly Test Introduction

${mockTestIntro}

## Questions

${mockQuestions}

[Additional questions would be generated based on the specified parameters...]`

      setGeneratedTest(mockTest)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">✨ Create New Test</CardTitle>
              <CardDescription>Configure your test parameters and generate AI-powered questions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="conceptName">Concept Name</Label>
                  <Input
                    id="conceptName"
                    placeholder="e.g., Control Statements, Data Structures"
                    value={formData.conceptName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, conceptName: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="5"
                      max="180"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfQuestions">Number of Questions</Label>
                    <Input
                      id="numberOfQuestions"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.numberOfQuestions}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, numberOfQuestions: Number.parseInt(e.target.value) }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexity Level</Label>
                  <Select
                    id="complexity"
                    value={formData.complexity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, complexity: e.target.value }))}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Mixed">Mixed</option>
                  </Select>
                </div>

                {testType !== "aptitude" && ( // Conditionally render this section
                  <div className="space-y-4">
                    <Label>Question Type Distribution</Label>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Coding Questions</span>
                          <span className="text-sm text-gray-600">{formData.codingPercentage}%</span>
                        </div>
                        <Slider value={formData.codingPercentage} onChange={handleSliderChange} max={100} step={5} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Theory/MCQ Questions</span>
                          <span className="text-sm text-gray-600">{formData.theoryPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${formData.theoryPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? "⏳ Generating Test..." : "✨ Generate Test"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {generatedTest && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Test Preview</CardTitle>
                <CardDescription>Review your AI-generated test content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 border">
                  <pre className="whitespace-pre-wrap text-sm">{generatedTest}</pre>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">💾 Save Test</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    ✏️ Edit Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
