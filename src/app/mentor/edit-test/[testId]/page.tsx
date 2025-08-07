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

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`/api/mentor/test/${testId}/manageTests`)
        setTestData(res.data.test) // <-- match API structure
      } catch (error) {
        console.error("Failed to fetch test:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  const handleInputChange = (field: string, value: any) => {
    setTestData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[index][field] = value
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

const handleSave = async () => {
  try {
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
    alert("✅ Test updated successfully!")
  } catch (error) {
    console.error("Failed to update test:", error)
    alert("❌ Failed to update test.")
  }
}



  if (loading) return <p>Loading test details...</p>
  if (!testData) return <p>Test not found.</p>

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">✏️ Edit Test</h1>

      <Input
        placeholder="Test Name"
        value={testData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />

      <textarea
        className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
        rows={4}
        placeholder="Description"
        value={testData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />

      <Input
        placeholder="Concepts Covered"
        value={testData.conceptsCovered}
        onChange={(e) => handleInputChange("conceptsCovered", e.target.value)}
      />

      <Input
        placeholder="Type (e.g., COLLEGE)"
        value={testData.type}
        onChange={(e) => handleInputChange("type", e.target.value)}
      />

      <Input
        placeholder="Status (e.g., ACTIVE)"
        value={testData.status}
        onChange={(e) => handleInputChange("status", e.target.value)}
      />

      <Input
        type="number"
        placeholder="Duration (mins)"
        value={testData.duration}
        onChange={(e) => handleInputChange("duration", +e.target.value)}
      />

      <Input
        type="number"
        placeholder="Number of Questions"
        value={testData.noOfQuestions}
        onChange={(e) => handleInputChange("noOfQuestions", +e.target.value)}
      />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Questions</h2>
        {testData.questions.map((q: any, index: number) => (
          <div key={q.id || index} className="border rounded-lg p-4 space-y-2">
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
              rows={2}
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
            />

          {q.options.map((opt: string, optIndex: number) => (
  <Input
    key={optIndex}
    value={opt}
    onChange={(e) => {
      const updatedOptions = [...q.options]
      updatedOptions[optIndex] = e.target.value
      handleQuestionChange(index, "options", updatedOptions)
    }}
    placeholder={`Option ${optIndex + 1}`}
  />
))}

<Button
  variant="outline"
  size="sm"
  onClick={() => {
    const updatedOptions = [...q.options, ""]
    handleQuestionChange(index, "options", updatedOptions)
  }}
>
  ➕ Add Option
</Button>


            <Input
              placeholder="Correct Answer"
              value={q.answer}
              onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSave}>💾 Save Changes</Button>
    </div>
  )
}
