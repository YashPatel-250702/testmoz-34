"use client"

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {/* Sidebar */}
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Header with Toggle */}
               <div className="flex items-center justify-between p-4 border-b bg-white">
  <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
      <ArrowLeft className="w-5 h-5" />
    </Button>
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

        {/* Main Content */}
        <main className="flex-1 p-4 bg-muted/20">{children}</main>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tekworks. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
