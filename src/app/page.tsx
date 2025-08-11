"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Users, LayoutDashboard, ShieldCheck } from "lucide-react"
import Homenavbar from "@/components/Homenavbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Homenavbar />
    

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Assessments with Precision</h2>
        <p className="max-w-xl text-muted-foreground mb-6">
         Tekworks is a comprehensive platform designed for college and placement assessments.
          Crafted to simplify test management for mentors and elevate student evaluation.
        </p>
        <Link href="/mentor/auth">
          <Button size="lg">Get Started as a Mentor</Button>
        </Link>
      </section>

      {/* Feature Section */}
      <section className="px-6 py-16 bg-white">
        <h3 className="text-2xl font-bold text-center mb-12">Key Features for Mentors</h3>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Rocket className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Test Creation</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Create customized tests for college or placement scenarios with flexible question types.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Track student progress, assign tests, and review attempts in real-time.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <LayoutDashboard className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Mentor Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Access insights, test statistics, and recent activity from a dedicated mentor dashboard.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <ShieldCheck className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Secure & Scalable</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Built with secure auth and scalable test management for institutions and enterprises.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-muted-foreground mt-auto">
        © {new Date().getFullYear()} Tekworks. All rights reserved.
      </footer>
    </div>
  )
}
