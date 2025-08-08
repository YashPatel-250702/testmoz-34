"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

export default function TestIntroductionPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isValidGmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
  }

  const isValidMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile)
  }

  const handleStartTest = () => {
    const { name, email, mobile } = formData

    if (!name || !email || !mobile) {
      alert("Please fill all the fields")
      return
    }

    if (!isValidGmail(email)) {
      alert("Please enter a valid Gmail address (e.g., user@gmail.com)")
      return
    }

    if (!isValidMobile(mobile)) {
      alert("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9")
      return
    }

    localStorage.setItem("candidateInfo", JSON.stringify(formData))
    router.push(`/test/${params.id}/start`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 shadow-lg rounded-2xl">
        {/* Instructions Section */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-blue-900">Important Instructions</h2>
          </div>
          <ul className="list-disc pl-5 text-base text-gray-800 space-y-3">
            <li><strong>Duration:</strong> This test has a strict time limit.</li>
            <li><strong>Do not refresh</strong> or close the tab during the test.</li>
            <li>Switching tabs may lead to disqualification.</li>
            <li>Ensure you have a <strong>stable internet connection</strong>.</li>
            <li>Click "Start Test" only when you're fully prepared.</li>
          </ul>
        </div>

        {/* Form Section */}
        <div className="space-y-6 flex flex-col justify-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl text-gray-800 text-center md:text-left">
              Candidate Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-0">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. john@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                maxLength={10}
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <Button className="w-full mt-4" onClick={handleStartTest}>
              Start Test
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
