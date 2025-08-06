




"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
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

interface TestQuestion {
  problemStatement: string
  options?: string[]
  answer?: string
  complexity: string
}

interface GeneratedTest {
  title: string
  description: string
  questions: TestQuestion[]
}

export default function CreateTestPage() {
  const searchParams = useSearchParams()
  const testTypeParam = searchParams.get("type")?.toUpperCase() || "GENERAL"

  // Transform TECHNICAL/APTITUDE to PLACEMENT as per your logic
  const testType =
    testTypeParam === "TECHNICAL" || testTypeParam === "APTITUDE" ? "PLACEMENT" : testTypeParam

  const isAptitude = testTypeParam === "APTITUDE"

  const [formData, setFormData] = useState<TestFormData>({
    conceptName: "",
    duration: 30,
    complexity: "Easy",
    numberOfQuestions: 10,
    codingPercentage: isAptitude ? 0 : 80,
    theoryPercentage: isAptitude ? 100 : 20,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null)

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

    const dataToSend = {
      testType,
      ...formData,
    }

    if (isAptitude) {
      dataToSend.codingPercentage = 0
      dataToSend.theoryPercentage = 100
    }

    try {
      const res = await fetch("http://localhost:3000/api/mentor/create-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.message || "Failed to generate test")

      setGeneratedTest(result.generatedTest)
    } catch (err) {
      console.error("Error:", err)
      alert("Failed to generate test.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">✨ Create New Test</CardTitle>
              <CardDescription>Configure test parameters and generate AI questions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="conceptName">Concept Name</Label>
                  <Input
                    id="conceptName"
                    placeholder="e.g., Control Statements"
                    value={formData.conceptName}
                    onChange={(e) => setFormData({ ...formData, conceptName: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
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
                        setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })
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
                    onChange={(e) => setFormData({ ...formData, complexity: e.target.value })}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Mixed">Mixed</option>
                  </Select>
                </div>

                {!isAptitude && (
                  <div className="space-y-4">
                    <Label>Question Type Distribution</Label>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Coding Questions</span>
                          <span className="text-sm text-gray-600">{formData.codingPercentage}%</span>
                        </div>
                        <Slider
                          value={formData.codingPercentage}
                          onChange={handleSliderChange}
                          max={100}
                          step={5}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Theory Questions</span>
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
            <Card className="max-h-[calc(100vh-4rem)] overflow-y-auto">
              <CardHeader>
                <CardTitle>{generatedTest.title}</CardTitle>
                <CardDescription>{generatedTest.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedTest.questions.map((q, index) => (
                    <div key={index} className="p-4 border rounded-md bg-white shadow-sm">
                      <h4 className="font-medium text-sm mb-2">
                        Question {index + 1} ({q.complexity})
                      </h4>
                      <p className="text-sm mb-2">{q.problemStatement}</p>
                      {!isAptitude && Array.isArray(q.options) && q.options.length > 0 && (
                        <ul className="list-disc ml-6 text-sm space-y-1">
                          {q.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
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
