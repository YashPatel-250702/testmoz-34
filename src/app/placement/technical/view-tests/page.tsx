import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TechnicalViewTestsPage() {
  const technicalTests = [
    {
      id: "technical-java-core",
      title: "Java Core Concepts Test",
      duration: 60,
      questions: 25,
      complexity: "Medium",
      description: "Covers fundamental Java programming concepts.",
      status: "active",
    },
    {
      id: "technical-data-structures",
      title: "Data Structures & Algorithms Test",
      duration: 90,
      questions: 20,
      complexity: "Hard",
      description: "Assesses knowledge of common data structures and algorithms.",
      status: "active",
    },
    {
      id: "technical-web-dev",
      title: "Web Development Basics Test",
      duration: 75,
      questions: 30,
      complexity: "Medium",
      description: "Covers HTML, CSS, JavaScript, and basic web concepts.",
      status: "draft",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
    
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Technical Tests</h1>

      <div className="grid gap-6">
        {technicalTests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{test.title}</CardTitle>
                <Badge variant={test.status === "active" ? "default" : "secondary"}>
                  {test.status === "active" ? "Active" : "Draft"}
                </Badge>
              </div>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700">
                <p>⏱️ **Duration**: {test.duration} minutes</p>
                <p>📝 **Questions**: {test.questions}</p>
                <p>📊 **Complexity**: {test.complexity}</p>
              </div>
              <Link href={`/test/${test.id}`}>
                <Button>Generate Student Link</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
