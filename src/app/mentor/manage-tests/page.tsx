import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const createdTests = [
  {
    id: 1,
    title: "Control Statements",
    duration: 30,
    questions: 10,
    complexity: "Easy",
    codingRatio: 80,
    theoryRatio: 20,
    createdAt: "2024-01-15",
    studentsAttempted: 25,
    status: "active",
  },
  {
    id: 2,
    title: "Data Structures - Arrays",
    duration: 45,
    questions: 15,
    complexity: "Medium",
    codingRatio: 70,
    theoryRatio: 30,
    createdAt: "2024-01-10",
    studentsAttempted: 18,
    status: "active",
  },
  {
    id: 3,
    title: "Object-Oriented Programming",
    duration: 60,
    questions: 20,
    complexity: "Hard",
    codingRatio: 60,
    theoryRatio: 40,
    createdAt: "2024-01-05",
    studentsAttempted: 12,
    status: "draft",
  },
]

export default function ManageTestsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
    

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tests</h1>
          <p className="text-gray-600">View and manage your created assessments</p>
        </div>
        <Link href="/mentor/create-test?type=general">
          {" "}
          {/* Updated link */}
          <Button>➕ Create New Test</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {createdTests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Created on {new Date(test.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    test.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {test.status === "active" ? "Active" : "Draft"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">⏱️</span>
                  <span className="text-sm text-gray-600">{test.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📝</span>
                  <span className="text-sm text-gray-600">{test.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📊</span>
                  <span className="text-sm text-gray-600">{test.complexity}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {test.codingRatio}% Code, {test.theoryRatio}% Theory
                </div>
                <div className="text-sm text-gray-600">👥 {test.studentsAttempted} students attempted</div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  👁️ Preview
                </Button>
                <Button variant="outline" size="sm">
                  ✏️ Edit
                </Button>
                <Button variant="outline" size="sm">
                  📊 View Results
                </Button>
                <Button variant="destructive" size="sm">
                  🗑️ Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
