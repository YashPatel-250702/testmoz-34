import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlacementMetricsCards } from "@/components/placement-metrics-cards" // Import the new component

export default function PlacementHomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Placement Test Portal</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select a category to manage and access placement-specific tests.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🧠 Aptitude Tests</CardTitle>
            <CardDescription>
              Manage and access tests for logical reasoning, quantitative aptitude, and verbal ability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/placement/aptitude">
              <Button className="w-full">Go to Aptitude Portal</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">💻 Technical Tests</CardTitle>
            <CardDescription>Manage and access tests for programming, data structures, and algorithms.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/placement/technical">
              <Button className="w-full">Go to Technical Portal</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Placement Metrics Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
        <PlacementMetricsCards /> Display placement-specific metrics here
      </div> */}
    </div>
  )
}
