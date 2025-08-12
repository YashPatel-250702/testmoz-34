"use client"

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  // Match your actual DashboardSidebar width
  const sidebarWidth = 260 // px for expanded state

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {/* Sidebar */}
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Fixed Header that respects sidebar */}
        <div
          className="fixed top-0 right-0 z-50 flex items-center justify-between p-4 border-b bg-white shadow-sm transition-all duration-300"
          style={{
            left: sidebarOpen ? `${sidebarWidth}px` : "0px",
          }}
        >
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

        {/* Main Content with padding to avoid hiding behind navbar */}
        <main className="flex-1 p-4 bg-muted/20 pt-[72px]">{children}</main>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tekworks. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
