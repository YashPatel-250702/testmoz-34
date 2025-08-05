import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AptitudeViewTestsPage() {
  const aptitudeTests = [
    {
      id: "aptitude-reasoning",
      title: "Aptitude Reasoning Test",
      duration: 45,
      questions: 30,
      complexity: "Mixed",
      description: "Assesses logical reasoning and problem-solving skills.",
      status: "active",
    },
    {
      id: "aptitude-english",
      title: "Aptitude English Test",
      duration: 30,
      questions: 20,
      complexity: "Easy",
      description: "Evaluates verbal ability, grammar, and comprehension.",
      status: "active",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
     

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Aptitude Tests</h1>

      <div className="grid gap-6">
        {aptitudeTests.map((test) => (
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
