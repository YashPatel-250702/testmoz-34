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

  const sidebarWidth = 260 

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Header */}
        <div
          className="fixed top-0 right-0 z-50 flex items-center justify-between p-4 border-b bg-white shadow-sm transition-all duration-300 overflow-auto"
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

        {/* Main with horizontal scroll */}
        <main className="flex-1 p-4 bg-muted/20 pt-[72px] overflow-x-auto h-[calc(100vh-72px-56px)]">
  {children}
</main>


        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground overflow-auto">
          © {new Date().getFullYear()} Tekworks. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
