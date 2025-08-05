"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function DashboardLandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {/* Toggleable Sidebar */}
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold">Dashboard Overview</h2>
        </div>

        {/* Main Dashboard Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/20">

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
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
          </div>

          {/* Activities + Quick Actions */}
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Overview of latest test creations and student attempts.</CardDescription>
                </div>
                <Button size="sm" className="ml-auto gap-1">
                  <Link href="/mentor/manage-tests">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Java Basics Test Created</p>
                      <p className="text-xs text-muted-foreground">By Mentor John Doe</p>
                    </div>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Student Alice completed Aptitude Test</p>
                      <p className="text-xs text-muted-foreground">Score: 85%</p>
                    </div>
                    <span className="text-sm">1 day ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">New Technical Test Drafted</p>
                      <p className="text-xs text-muted-foreground">By Placement Team</p>
                    </div>
                    <span className="text-sm">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="w-full">
                  <Link href="/mentor/create-test?type=general">Create New Test</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link href="/mentor/manage-tests">Manage Existing Tests</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link href="/reports">View Reports</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
