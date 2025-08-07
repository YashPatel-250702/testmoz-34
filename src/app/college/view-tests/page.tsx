"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { Test } from "@/lib/model/Test"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"

export default function CollegeViewTestsPage() {
  const [activeTests, setActiveTests] = useState<Test[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [linkLoadingId, setLinkLoadingId] = useState<string | null>(null)
  const domain=process.env.NEXT_PUBLIC_DOMAIN_LINK;
  const fetchTests = async () => {
    setLoading(true)
    try {
      const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null
      const response = await axios.get(`/api/mentor/${mentorId}/viewActiveTests?type=COLLEGE`)
      if (response.status === 200) {
        setActiveTests(response.data.activeTests)
      }
    } catch (error) {
      console.error("Error fetching tests:", error)
      alert("Error fetching tests. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTests()
  }, [])

  const handleGenerateLink = async (testId: string) => {
    try {
      setLinkLoadingId(testId)
      const response = await axios.get(`/api/mentor/test/${testId}/generateLink`)
      if (response.status === 200) {
        await fetchTests()
        
        toast.success("Public link generated successfully.")
        
      }
    } catch (error) {
      console.error("Error generating link:", error)
      alert("Failed to generate public link.")
    } finally {
      setLinkLoadingId(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Available College Tests</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        </div>
      ) : activeTests?.length === 0 ? (
        <p className="text-center text-gray-600">No active college tests available.</p>
      ) : (
        activeTests?.map((test) => (
          <Card key={test.id} className="mb-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{test.name}</CardTitle>
                <Badge variant={test.status === "ACTIVE" ? "default" : "secondary"}>
                  {test.status}
                </Badge>
              </div>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700 space-y-1">
                <p>⏱️ <strong>Duration</strong>: {test.duration} minutes</p>
                <p>📝 <strong>Questions</strong>: {test.noOfQuestions}</p>
                <p>🔁 <strong>Attempts</strong>: {test.noOfAttempts}</p>
              </div>

              {test.publicLink ? (
                <div className="flex gap-2 flex-wrap">
                  <Link href={`${domain}/test/${test.id}?${test.publicLink}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">Open Public Test Link</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleGenerateLink(test.id)}
                    disabled={linkLoadingId === test.id}
                  >
                    {linkLoadingId === test.id && (
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    )}
                    Regenerate Link
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleGenerateLink(test.id)}
                  disabled={linkLoadingId === test.id}
                >
                  {linkLoadingId === test.id && (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  )}
                  Generate Student Link
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
