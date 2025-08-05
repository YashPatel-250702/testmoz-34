import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CollegeViewTestsPage() {
  // Mock data for the single college test
  const collegeTest = {
    id: "college-java-basics",
    title: "Java Basics for College Students",
    duration: 60,
    questions: 20,
    complexity: "Easy",
    description: "A foundational test covering core Java concepts for college students.",
    status: "active", // Added status for consistency
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available College Tests</h1>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{collegeTest.title}</CardTitle>
            <Badge variant={collegeTest.status === "active" ? "default" : "secondary"}>
              {collegeTest.status === "active" ? "Active" : "Draft"}
            </Badge>
          </div>
          <CardDescription>{collegeTest.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-gray-700">
            <p>⏱️ **Duration**: {collegeTest.duration} minutes</p>
            <p>📝 **Questions**: {collegeTest.questions}</p>
            <p>📊 **Complexity**: {collegeTest.complexity}</p>
          </div>
          {/* This link would be given to students directly */}
          <Link href={`/test/${collegeTest.id}`}>
            <Button>Generate Student Link</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
