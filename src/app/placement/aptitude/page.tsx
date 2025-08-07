import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AptitudeDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Aptitude Test Management</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create, manage, and view aptitude tests for placement drives.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📝 Create Aptitude Test</CardTitle>
            <CardDescription>Design and generate new aptitude assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mentor/create-test?type=aptitude">
              {" "}
              {/* Updated link */}
              <Button className="w-full">Start Creating</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📊 Manage Aptitude Tests</CardTitle>
            <CardDescription>View, edit, and manage existing aptitude tests.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mentor/manage-tests?type=APPTITUDE">
              <Button variant="outline" className="w-full bg-transparent">
                View & Manage
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">👁️ View Aptitude Tests</CardTitle>
            <CardDescription>See available aptitude tests and generate student links.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/placement/aptitude/view-tests">
              <Button variant="outline" className="w-full bg-transparent">
                View Available
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
