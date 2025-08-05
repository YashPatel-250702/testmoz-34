"use client"

import React from "react"
import Homenavbar from "@/components/Homenavbar"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Homenavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
