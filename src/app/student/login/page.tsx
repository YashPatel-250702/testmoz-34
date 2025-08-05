"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export default function StudentLogin() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    testId: ""
  })

  const handleJoinTest = () => {
    console.log("Student Data:", form)
    // POST to backend to authenticate student and join test via testId
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle> Join Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          <Input
            placeholder="Test ID"
            value={form.testId}
            onChange={(e) => setForm({ ...form, testId: e.target.value })}
          />
          <Button className="w-full" onClick={handleJoinTest}>
            Join Test
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
