import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CollegeMetricsCards } from "@/components/college-metrics-cards" // Import the new component

export default function CollegeDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
    
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">College Test Portal</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage and access tests specifically for college students.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📝 Create Test</CardTitle>
            <CardDescription>Design and generate new college-specific assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mentor/create-test?type=college">
              <Button className="w-full">Start Creating</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📊 Manage Tests</CardTitle>
            <CardDescription>View, edit, and manage existing college tests.</CardDescription>
          </CardHeader>
          <CardContent>
           <Link href="/mentor/manage-tests?type=COLLEGE">
  <Button variant="outline" className="w-full bg-transparent">
    View & Manage
  </Button>
</Link>

          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">👁️ View Tests</CardTitle>
            <CardDescription>See available college tests and generate student links.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/college/view-tests">
              <Button variant="outline" className="w-full bg-transparent">
                View Available
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">College Metrics Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
        <CollegeMetricsCards /> Display college-specific metrics here
      </div> */}
    </div>
  )
}
