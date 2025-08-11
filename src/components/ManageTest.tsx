"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"

interface TestItem {
  id: string
  name: string
  description: string
  duration: number
  noOfQuestions: number
  complexity?: string
  codingRatio?: number
  theoryRatio?: number
  createdAt: string
  noOfAttempts: number
  status: string
}

export default function ManageTestsPage() {
  const [tests, setTests] = useState<TestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState("") 

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get type from searchParams safely on client
    const paramType = searchParams.get("type")
    if (paramType) setType(paramType)
  }, [searchParams])

  const fetchTests = async () => {
    try {
      const mentorId = localStorage.getItem("mentorId")
      if (!mentorId) {
        console.error("Mentor ID not found in localStorage.")
        return
      }

      const response = await axios.get(
        `/api/mentor/${mentorId}/manageTests?type=${type}`
      )
      setTests(response.data.testResult || [])
    } catch (error) {
      console.error("Error fetching tests:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (type) fetchTests()
  }, [type])

  const handleDeleteTest = async (id: string) => {
    try {
      const response = await axios.delete(`/api/mentor/test/${id}/manageTests`)
      if (response.status === 200) {
        toast.success("Test deleted successfully")
        fetchTests()
      }
    } catch (error) {
      toast.error("Error deleting test")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage {type} Tests</h1>
          <p className="text-gray-600">View and manage your created assessments</p>
        </div>
        <Link href={`/mentor/create-test?type=${type.toLowerCase()}`}>
          <Button>➕ Create New Test</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p>No tests found.</p>
      ) : (
        <div className="grid gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{test.name}</CardTitle>
                    <CardDescription className="mt-2">
                      Created on {new Date(test.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      test.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {test.status === "ACTIVE" ? "Active" : "InActive"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">⏱️</span>
                    <span className="text-sm text-gray-600">{test.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📝</span>
                    <span className="text-sm text-gray-600">{test.noOfQuestions} questions</span>
                  </div>
                  <div className="text-sm text-gray-600 col-span-2">
                    👥 {test.noOfAttempts} students attempted
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/mentor/preview-test/${test.id}`)}
                  >
                    👁️ Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/mentor/edit-test/${test.id}`)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/mentor/view-result/${test.id}`)}
                  >
                    📊 View Results
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTest(test.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
