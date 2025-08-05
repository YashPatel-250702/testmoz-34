"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// Removed imports for ListChecks, Users, BarChart as they are now in specific metric components

export default function HomePage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar collapsible="icon" />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/20">

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
            {/* Portal Options */}
            <Card className="hover:shadow-lg transition-shadow col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🎓 College Tests</CardTitle>
                <CardDescription>Manage and access tests specifically for college students.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/college">
                  <Button className="w-full">Go to College Portal</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">💼 Placement Tests</CardTitle>
                <CardDescription>Manage and access tests for placement drives.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/placement">
                  <Button className="w-full">Go to Placement Portal</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Removed all general dashboard metric cards from here */}
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Overview of latest test creations and student attempts.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/mentor/manage-tests">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Java Basics Test Created</p>
                      <p className="text-sm text-muted-foreground">By Mentor John Doe</p>
                    </div>
                    <div className="ml-auto font-medium text-sm">2 hours ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Student Alice completed Aptitude Test</p>
                      <p className="text-sm text-muted-foreground">Score: 85%</p>
                    </div>
                    <div className="ml-auto font-medium text-sm">1 day ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">New Technical Test Drafted</p>
                      <p className="text-sm text-muted-foreground">By Placement Team</p>
                    </div>
                    <div className="ml-auto font-medium text-sm">3 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button asChild className="w-full">
                  <Link href="/mentor/create-test?type=general">Create New Test</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/mentor/manage-tests">Manage Existing Tests</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/reports">View Reports</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
