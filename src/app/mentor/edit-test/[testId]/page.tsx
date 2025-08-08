"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EditTestPage() {
  const { testId } = useParams()
  const [testData, setTestData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`/api/mentor/test/${testId}/manageTests`)
        setTestData(res.data.test)
      } catch (err: any) {
        setError(err.message || "Failed to fetch test")
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  const type = testData?.type?.toUpperCase()

  // Handle input change for test-level fields
  const handleInputChange = (field: string, value: any) => {
    setTestData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  // For Aptitude MCQ questions
  const handleAptitudeQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[index][field] = value
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  // For Aptitude question options
  const handleAptitudeOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[qIndex].options[optIndex] = value
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  const addAptitudeOption = (qIndex: number) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[qIndex].options.push("")
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  // For Coding questions
  const handleCodingQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...testData.technicalQuestions]
    updatedQuestions[index][field] = value
    setTestData((prev: any) => ({
      ...prev,
      technicalQuestions: updatedQuestions,
    }))
  }

  // Save handler for both types
  const handleSave = async () => {
    try {
      if (type === "APPTITUDE") {
        const updatedQuestions = testData.questions.map((q: any) => ({
          ...q,
          testId: testData.id,
        }))

        const payload = {
          test: {
            ...testData,
            questions: updatedQuestions,
          }
        }

        await axios.put(`/api/mentor/test/${testId}/manageTests`, payload)
      } else if (type === "COLLEGE" || type === "TECHNICAL") {
        const updatedQuestions = testData.technicalQuestions.map((q: any) => ({
          ...q,
          testId: testData.id,
        }))

        const payload = {
          title: testData.name,
          description: testData.description,
          durationMinutes: testData.duration,
          numberOfQuestions: testData.noOfQuestions,
          complexity: updatedQuestions[0]?.complexity || "easy", // example
          questions: updatedQuestions,
        }

        await axios.put(`/api/mentor/test/${testId}/updateCodingTests`, payload)
      }

      alert("✅ Test updated successfully!")
    } catch (error) {
      console.error("Failed to update test:", error)
      alert("❌ Failed to update test.")
    }
  }

  if (loading) return <p>Loading test details...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>
  if (!testData) return <p>Test not found.</p>

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">✏️ Edit Test</h1>

      <Input
        placeholder="Test Name"
        value={testData.name || ""}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />

      <textarea
        className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
        rows={4}
        placeholder="Description"
        value={testData.description || ""}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />

      <Input
        placeholder="Concepts Covered"
        value={testData.conceptsCovered || ""}
        onChange={(e) => handleInputChange("conceptsCovered", e.target.value)}
      />

      <Input
        placeholder="Type (e.g., COLLEGE, APPTITUDE)"
        value={testData.type || ""}
        onChange={(e) => handleInputChange("type", e.target.value)}
        disabled // usually you might not want to allow changing test type here
      />

      <Input
        placeholder="Status (e.g., ACTIVE)"
        value={testData.status || ""}
        onChange={(e) => handleInputChange("status", e.target.value)}
      />

      <Input
        type="number"
        placeholder="Duration (mins)"
        value={testData.duration || 0}
        onChange={(e) => handleInputChange("duration", +e.target.value)}
      />

      <Input
        type="number"
        placeholder="Number of Questions"
        value={testData.noOfQuestions || 0}
        onChange={(e) => handleInputChange("noOfQuestions", +e.target.value)}
      />

      {/* Aptitude questions editing */}
      {type === "APPTITUDE" && testData.questions && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Aptitude Questions</h2>
          {testData.questions.map((q: any, index: number) => (
            <div key={q.id || index} className="border rounded-lg p-4 space-y-2">
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={2}
                placeholder="Question"
                value={q.question || ""}
                onChange={(e) => handleAptitudeQuestionChange(index, "question", e.target.value)}
              />

              {q.options?.map((opt: string, optIndex: number) => (
                <Input
                  key={optIndex}
                  value={opt}
                  onChange={(e) => handleAptitudeOptionChange(index, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                />
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addAptitudeOption(index)}
              >
                ➕ Add Option
              </Button>

              <Input
                placeholder="Correct Answer"
                value={q.answer || ""}
                onChange={(e) => handleAptitudeQuestionChange(index, "answer", e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Coding questions editing */}
      {(type === "COLLEGE" || type === "TECHNICAL") && testData.technicalQuestions && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Coding Questions</h2>
          {testData.technicalQuestions.map((q: any, index: number) => (
            <div key={q.id || index} className="border rounded-lg p-4 space-y-2">
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={4}
                placeholder="Problem Statement"
                value={q.problemStatement || ""}
                onChange={(e) => handleCodingQuestionChange(index, "problemStatement", e.target.value)}
              />

              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={2}
                placeholder="Sample Input"
                value={q.sampleInput || ""}
                onChange={(e) => handleCodingQuestionChange(index, "sampleInput", e.target.value)}
              />

              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={2}
                placeholder="Sample Output"
                value={q.sampleOutput || ""}
                onChange={(e) => handleCodingQuestionChange(index, "sampleOutput", e.target.value)}
              />

              <Input
                placeholder="Constraints"
                value={q.constraints || ""}
                onChange={(e) => handleCodingQuestionChange(index, "constraints", e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <Button onClick={handleSave}>💾 Save Changes</Button>
    </div>
  )
}
