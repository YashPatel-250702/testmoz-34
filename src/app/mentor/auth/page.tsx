"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

export default function MentorAuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  })

  const handleSubmit = () => {
    if (!isLogin && form.password !== form.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    if (isLogin) {
      console.log("Mentor Login:", {
        email: form.email,
        password: form.password,
      })
      // Call login API
    } else {
      console.log("Mentor Registration:", form)
      // Call registration API
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      

      {/* Main Auth Container */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className="w-1/2"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className="w-1/2"
            >
              Signup
            </Button>
          </div>

          {/* Auth Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center">
                {isLogin ? "Mentor Login" : "Mentor Registration"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    placeholder="Full Name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Mobile Number"
                    type="tel"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                  />
                </>
              )}
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <Input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              {!isLogin && (
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              )}
              <Button className="w-full" onClick={handleSubmit}>
                {isLogin ? "Login" : "Register"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
