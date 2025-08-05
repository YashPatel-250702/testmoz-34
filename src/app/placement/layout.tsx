"use client"

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {/* Sidebar */}
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}

      <SidebarInset>
        {/* Header with Toggle */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-muted/20">{children}</main>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Quiztopher. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
