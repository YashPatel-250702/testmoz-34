"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Menu, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "react-toastify"

interface TestFormData {
  conceptsList: string[]
  duration: number
  complexity: string
  numberOfQuestions: number
  codingPercentage: number
  theoryPercentage: number
  skills: string
}

interface TestQuestion {
  problemStatement: string
  options?: string[]
  answer?: string
  complexity: string
  sampleInput?: string
  sampleOutput?: string
  constraints?: string
}

interface GeneratedTest {
  title: string
  description: string
  questions: TestQuestion[]
}

export default function CreateTestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const testTypeParam = searchParams.get("type")?.toUpperCase() || "APPTITUDE"
const [savedTestId, setSavedTestId] = useState<string | null>(null)

  const isAptitude = testTypeParam === "APPTITUDE"
  const testType = testTypeParam
  const [isSaving, setIsSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [formData, setFormData] = useState<TestFormData>({
    conceptsList: [""],
    duration: 30,
    complexity: "Easy",
    numberOfQuestions: 10,
    codingPercentage: isAptitude ? 0 : 100,
    theoryPercentage: isAptitude ? 100 : 0,
    skills: isAptitude ? "aptitude" : "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null)
const [isSaveDone, setIsSaveDone] = useState(false)

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
      const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null
      const res = await fetch(`/api/mentor/${mentorId}/createTests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || "Failed to generate test")

      setGeneratedTest(result.generatedTest)
    } catch (err) {
      console.error("Error:", err)
      alert("Failed to generate tests.")
    } finally {
      setIsGenerating(false)
    }
  }

  const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const handleSaveTest = async () => {
    if (!mentorId) return alert("Mentor ID not found.")
    if (!generatedTest) return alert("No test to save.")

    const testTypeRaw = searchParams.get("type")?.toUpperCase()
    const isAptitude = testTypeRaw === "APPTITUDE"
    const isCodingTest = testTypeRaw === "TECHNICAL" || testTypeRaw === "COLLEGE"

    const endpoint = isCodingTest
      ? `/api/mentor/${mentorId}/saveCodingTests`
      : `/api/mentor/${mentorId}/manageTests`

    const payload = isCodingTest
      ? {
          title: generatedTest.title,
          description: generatedTest.description,
          durationMinutes: formData.duration,
          numberOfQuestions: formData.numberOfQuestions,
          complexity: formData.complexity.toLowerCase(),
          conceptList: formData.conceptsList,
          type: testTypeRaw,
          questions: generatedTest.questions.map((q) => ({
            problemStatement: q.problemStatement,
            sampleInput: q.sampleInput,
            sampleOutput: q.sampleOutput,
            constraints: q.constraints,
            complexity: q.complexity,
          })),
        }
      : {
          generatedTest,
          ...formData,
          testType,
        }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
       if (!res.ok) throw new Error(data.message || "Failed to save test")

    toast.success("Test saved successfully!")

    // Store the saved test ID from response
    setSavedTestId(data.testResult?.id || null)
    setIsSaveDone(true)  // mark save completed
  } catch (err) {
    console.error("Save test error:", err)
    toast.error("Error saving test.")
  }
}


  const handleEditQuestions = () => {
  if (!savedTestId) {
    toast.error("Test ID not found. Please save the test first.")
    return
  }

  router.push(`/mentor/edit-test/${savedTestId}`)
}


  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}
      <SidebarInset>
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Link href="/mentor/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/college">
              <Button variant="outline" size="sm">
                College
              </Button>
            </Link>
            <Link href="/placement">
              <Button variant="outline" size="sm">
                Placement
              </Button>
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="min-h-screen bg-muted/20 p-4 md:p-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Test Config Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">✨ Create New Test</CardTitle>
                  <CardDescription>Configure test parameters and generate AI questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Concept Names */}
                    <div className="space-y-2">
                      <Label>Concept Names</Label>
                      {(formData.conceptsList || [""]).map((concept, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            placeholder={`Concept ${idx + 1}`}
                            value={concept}
                            onChange={(e) => {
                              const updatedConcepts = [...formData.conceptsList]
                              updatedConcepts[idx] = e.target.value
                              setFormData({ ...formData, conceptsList: updatedConcepts })
                            }}
                          />
                          {!isAptitude && formData.conceptsList.length > 1 && (
                            <button
                              type="button"
                              className="px-3 py-1 bg-red-500 text-white rounded"
                              onClick={() => {
                                const updatedConcepts = formData.conceptsList.filter((_, i) => i !== idx)
                                setFormData({ ...formData, conceptsList: updatedConcepts })
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      {!isAptitude && (
                        <button
                          type="button"
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              conceptsList: [...(formData.conceptsList || []), ""],
                            })
                          }
                        >
                          + Add Concept
                        </button>
                      )}
                    </div>

                    {/* Skills input (only for coding tests) */}
                  
                   <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Input
                        id="skills"
                        placeholder="e.g., python, javascript, c++"
                        value={formData.skills}
                        readOnly={isAptitude}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        required
                        disabled={isGenerating || isSaving}
                      />
                    </div>
 

                    {/* Duration & No. of Questions */}
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

                    {/* Complexity */}
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

                    <Button type="submit" className="w-full" disabled={isGenerating}>
                      {isGenerating ? "⏳ Generating Test..." : "✨ Generate Test"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Generated Test Preview */}
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
                          <p className="text-sm mb-2">Problem Statement: {q.problemStatement}</p>

                          {/* Aptitude: Show options with correct answer */}
                          {isAptitude && Array.isArray(q.options) && q.options.length > 0 && (
                            <div className="space-y-1">
                              {q.options.map((opt, i) => {
                                const label = String.fromCharCode(65 + i) // A, B, C...
                                const isCorrect = opt === q.answer
                                return (
                                  <div
                                    key={i}
                                    className={`p-2 border rounded ${
                                      isCorrect ? "bg-green-100 font-semibold" : "bg-white"
                                    }`}
                                  >
                                    {label}. {opt}
                                  </div>
                                )
                              })}
                              {q.answer && (
                                <p className="mt-2 text-sm text-green-600 font-semibold">
                                  Correct Answer: {q.answer}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Coding/Technical: Keep sample input/output */}
                          {!isAptitude && (
                            <>
                              <p className="text-sm mb-2">Sample Input: {q.sampleInput}</p>
                              <p className="text-sm mb-2">Sample Output: {q.sampleOutput}</p>
                              <p className="text-sm mb-2">Constraints: {q.constraints}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                    <Button
  className="flex-1"
  onClick={handleSaveTest}
  disabled={isSaving || isGenerating || isSaveDone}  // disable if already saved
>
  {isSaving ? "💾 Saving..." : "💾 Save Test"}
</Button>

<Button
  variant="outline"
  className="flex-1 bg-transparent"
  onClick={() => {
    if (!savedTestId) {
      toast.error("Test ID not found. Please save the test first.")
      return
    }
    router.push(`/mentor/edit-test/${savedTestId}`)
  }}
  disabled={!isSaveDone || isSaving || isGenerating} // enable only after save success
>
  ✏️ Edit Questions
</Button>

                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
