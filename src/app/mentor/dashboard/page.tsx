"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardLandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter();

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {/* Toggleable Sidebar */}
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Toggle Button */}
         <div className="flex items-center justify-between p-4 border-b bg-white">
  <div className="flex items-center gap-2">
      {/* <Button variant="ghost" size="sm" onClick={() => router.back()}>
      <ArrowLeft className="w-5 h-5" />
    </Button> */}
    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
      <Menu className="w-5 h-5" />
    </Button>
  
  </div>
  <div className="flex gap-2">
    <Link href="/mentor/dashboard">
      <Button variant="outline" size="sm">Dashboard</Button>
    </Link>
    <Link href="/college">
      <Button variant="outline" size="sm">College</Button>
    </Link>
    <Link href="/placement">
      <Button variant="outline" size="sm">Placement</Button>
    </Link>
  </div>
</div>

        {/* Main Dashboard Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/20">

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <Card className="hover:shadow-lg transition-shadow col-span-2">
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
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      {/* Row with 4 cards */}
  
  {/* Performance */}
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>📊 Performance</CardTitle>
      <CardDescription>Avg. score: 72%</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-16 flex items-center justify-center">
        <span className="text-2xl font-semibold text-orange-500">72%</span>
      </div>
    </CardContent>
  </Card>

  {/* Active Tests */}
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>📝 Active Tests</CardTitle>
      <CardDescription>Aptitude Test — In progress</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">45 of 120 completed</p>
    </CardContent>
  </Card>

  {/* Recent Activity */}
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>🆕 Recent Activity</CardTitle>
      <CardDescription>3 tests created this week</CardDescription>
    </CardHeader>
  </Card>

  {/* NEW Card — Example: Upcoming Tests */}
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>📅 Upcoming Tests</CardTitle>
      <CardDescription>Weekly Test — Aug 18</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">46 students</p>
    </CardContent>
  </Card>


</div>
           
        </main>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tekworks. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
