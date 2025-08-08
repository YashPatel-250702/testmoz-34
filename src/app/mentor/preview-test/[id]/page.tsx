"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import axios from "axios"

export default function PreviewTestPage() {
  const params = useParams() as any
  const testId = params?.id || params?.testId
  const searchParams = useSearchParams()
  const queryType = searchParams.get("type")?.toUpperCase()

  const [testData, setTestData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!testId) {
      setError("No test id provided.")
      return
    }

    async function fetchTest() {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(`/api/mentor/test/${testId}/manageTests`)
        const test = res.data.test
        if (!test) throw new Error("Test data not found")
        if (!test.type) throw new Error("Test type not found")

        setTestData(test)
      } catch (err: any) {
        setError(err.message || "Failed to fetch test")
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  if (loading) return <p className="p-6 text-center text-lg">Loading test...</p>
  if (error) return <p className="p-6 text-center text-red-600 font-semibold">Error: {error}</p>
  if (!testData) return <p className="p-6 text-center text-gray-600">No test data available.</p>

  const type = (testData.type || queryType || "").toUpperCase()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">{testData.name || "Untitled Test"}</h1>
        <p className="text-gray-700 mb-1">{testData.description}</p>
        <div className="text-sm text-gray-500 space-x-4">
          <span>🕒 Duration: <strong>{testData.duration} mins</strong></span>
          <span>📝 Questions: <strong>{testData.noOfQuestions}</strong></span>
          <span>Status: <strong>{testData.status || "N/A"}</strong></span>
          <span>Type: <strong>{type}</strong></span>
        </div>
      </header>

      {/* MCQ Questions */}
      {type === "APPTITUDE" && testData.questions && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">MCQ Questions</h2>
          <div className="space-y-4">
            {testData.questions.map((q: any, i: number) => (
              <div
                key={q.id || i}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <p className="font-semibold text-lg mb-2">
                  Q{i + 1}: {q.question}
                </p>

                <ul className="pl-5 list-disc space-y-1">
                  {q.options?.map((opt: string, idx: number) => {
                    const isCorrect = opt?.trim().toLowerCase() === q.answer?.trim().toLowerCase()
                    return (
                      <li
                        key={idx}
                        className={`text-base ${isCorrect ? "text-green-700 font-semibold" : ""}`}
                      >
                        {opt}
                        {isCorrect && <span className="ml-2 text-green-500">✔</span>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coding Questions */}
{(type === "COLLEGE" || type === "TECHNICAL") && testData.technicalQuestions && (
  <section>
    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Coding Questions</h2>
    <div className="space-y-6">
      {testData.technicalQuestions.map((q: any, i: number) => (
        <div key={q.id || i} className="border rounded-lg bg-white shadow p-6">
          {/* Question Title */}
          <p className="font-semibold text-lg mb-3">Question {i + 1}</p>

          {/* Problem Statement */}
          <p className="mb-4 whitespace-pre-line">{q.problemStatement}</p>

          {/* Paired Sample Inputs & Outputs */}
          {q.sampleInput && q.sampleOutput && (
            <div className="mb-3 space-y-4">
              {(Array.isArray(q.sampleInput) ? q.sampleInput : [q.sampleInput]).map(
                (input: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded">
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm whitespace-pre-wrap mb-2">
                      <strong>Sample Input {idx + 1}:</strong>
                      <pre>{input}</pre>
                    </div>
                    {q.sampleOutput[idx] && (
                      <div className="bg-gray-100 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                        <strong>Sample Output {idx + 1}:</strong>
                        <pre>{q.sampleOutput[idx]}</pre>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {/* Constraints */}
          {q.constraints && (
            <p className="text-sm italic text-gray-600">
              <strong>Constraints:</strong> {q.constraints}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
)}


    </div>
  )
}
