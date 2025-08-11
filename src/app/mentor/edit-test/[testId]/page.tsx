

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function EditTestPage() {
  const { testId } = useParams()
  const [testData, setTestData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
     const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

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

  const handleInputChange = (field: string, value: any) => {
    setTestData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Aptitude changes
  const handleAptitudeQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[index][field] = value
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

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

  const removeAptitudeOption = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[qIndex].options.splice(optIndex, 1)
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  // REMOVE aptitude question
  const removeAptitudeQuestion = (index: number) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions.splice(index, 1)
    setTestData((prev: any) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  // Coding changes
  const handleCodingQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...testData.technicalQuestions]
    updatedQuestions[index][field] = value
    setTestData((prev: any) => ({
      ...prev,
      technicalQuestions: updatedQuestions,
    }))
  }

  // REMOVE coding question
  const removeCodingQuestion = (index: number) => {
    const updatedQuestions = [...testData.technicalQuestions]
    updatedQuestions.splice(index, 1)
    setTestData((prev: any) => ({
      ...prev,
      technicalQuestions: updatedQuestions,
    }))
  }




  const handleClick = async () => {
    setIsSaving(true);
    try {
      await handleSave(); // wait for save to finish
      router.push("/mentor/dashboard"); // navigate after save
    } catch (err) {
      console.error("Error saving:", err);
      setIsSaving(false); // reset if save fails
    }
  };

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
          complexity: updatedQuestions[0]?.complexity || "easy",
          questions: updatedQuestions,
        }
        await axios.put(`/api/mentor/test/${testId}/updateCodingTests`, payload)
      }
      toast("✅ Test updated successfully!")
    } catch (error) {
      console.error("Failed to update test:", error)
      toast("❌ Failed to update test.")
    }
  }

  if (loading) return <p>Loading test details...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>
  if (!testData) return <p>Test not found.</p>

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">✏️ Edit Test</h1>

      {/* Test-level fields */}
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
        placeholder="Type"
        value={testData.type || ""}
        disabled
      />
      {/* Status Dropdown */}
<select
  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
  value={testData.status || ""}
  onChange={(e) => handleInputChange("status", e.target.value)}
>
  <option value="ACTIVE">ACTIVE</option>
  <option value="INACTIVE">INACTIVE</option>
</select>

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

      {/* Aptitude Section */}
      {type === "APPTITUDE" && testData.questions && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Aptitude Questions</h2>
          {testData.questions.map((q: any, index: number) => (
            <div key={q.id || index} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Question {index + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeAptitudeQuestion(index)}>
                  ❌ Remove Question
                </Button>
              </div>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={2}
                placeholder="Question"
                value={q.question || ""}
                onChange={(e) => handleAptitudeQuestionChange(index, "question", e.target.value)}
              />
              {q.options?.map((opt: string, optIndex: number) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <Input
                    value={opt}
                    onChange={(e) => handleAptitudeOptionChange(index, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={() => removeAptitudeOption(index, optIndex)}>❌</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addAptitudeOption(index)}>➕ Add Option</Button>
              <Input
                placeholder="Correct Answer"
                value={q.answer || ""}
                onChange={(e) => handleAptitudeQuestionChange(index, "answer", e.target.value)}
              />
            </div>
          ))}
          <Button className="bg-green-500 text-white"
            onClick={() => {
              setTestData((prev: any) => ({
                ...prev,
                questions: [...prev.questions, { question: "", options: ["", ""], answer: "" }]
              }))
            }}
          >
            ➕ Add Question
          </Button>
        </div>
      )}

      {/* Technical Section */}
      {(type === "COLLEGE" || type === "TECHNICAL") && testData.technicalQuestions && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Coding Questions</h2>
          {testData.technicalQuestions.map((q: any, qIndex: number) => (
            <div key={q.id || qIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Question {qIndex + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeCodingQuestion(qIndex)}>
                  ❌ Remove Question
                </Button>
              </div>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                rows={4}
                placeholder="Problem Statement"
                value={q.problemStatement || ""}
                onChange={(e) => handleCodingQuestionChange(qIndex, "problemStatement", e.target.value)}
              />
              {(Array.isArray(q.sampleInput) ? q.sampleInput : [q.sampleInput || ""]).map((input: string, idx: number) => (
                <div key={idx} className="space-y-2 border p-3 rounded">
                  <label>Sample Input {idx + 1}</label>
                  <textarea
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                    rows={2}
                    value={input}
                    onChange={(e) => {
                      const newInputs = [...(q.sampleInput || [])]
                      newInputs[idx] = e.target.value
                      handleCodingQuestionChange(qIndex, "sampleInput", newInputs)
                    }}
                  />
                  <label>Sample Output {idx + 1}</label>
                  <textarea
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                    rows={2}
                    value={q.sampleOutput?.[idx] || ""}
                    onChange={(e) => {
                      const newOutputs = [...(q.sampleOutput || [])]
                      newOutputs[idx] = e.target.value
                      handleCodingQuestionChange(qIndex, "sampleOutput", newOutputs)
                    }}
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-500 text-white" onClick={() => {
                  handleCodingQuestionChange(qIndex, "sampleInput", [...(q.sampleInput || []), ""])
                  handleCodingQuestionChange(qIndex, "sampleOutput", [...(q.sampleOutput || []), ""])
                }}>+ Add Pair</Button>
                {q.sampleInput?.length > 1 && (
                  <Button size="sm" className="bg-red-500 text-white" onClick={() => {
                    handleCodingQuestionChange(qIndex, "sampleInput", q.sampleInput.slice(0, -1))
                    handleCodingQuestionChange(qIndex, "sampleOutput", q.sampleOutput.slice(0, -1))
                  }}>- Remove Pair</Button>
                )}
              </div>
              <Input
                placeholder="Constraints"
                value={q.constraints || ""}
                onChange={(e) => handleCodingQuestionChange(qIndex, "constraints", e.target.value)}
              />
            </div>
          ))}
          <Button className="bg-green-500 text-white"
            onClick={() => {
              setTestData((prev: any) => ({
                ...prev,
                technicalQuestions: [...prev.technicalQuestions, { problemStatement: "", sampleInput: [""], sampleOutput: [""], constraints: "" }]
              }))
            }}
          >
            ➕ Add Question
          </Button>
        </div>
      )}

 <Button onClick={handleClick} disabled={isSaving}>
      {isSaving ? "⏳ Saving..." : "💾 Save Changes"}
    </Button>    </div>
  )
}
