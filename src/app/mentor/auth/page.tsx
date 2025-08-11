"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

export default function MentorAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "email":
        return /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Please enter a valid email.";
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(value)
          ? ""
          : "Must include upper, lower, number, special char, min 6 chars.";
      case "confirmPassword":
        return value !== form.password ? "Passwords do not match." : "";
      case "mobile":
        return /^[6-9]\d{9}$/.test(value)
          ? ""
          : "Must be a valid 10-digit number starting with 6-9.";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate immediately
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const fields = isLogin
      ? ["email", "password"]
      : ["name", "email", "password", "confirmPassword", "mobile"];

    fields.forEach((field) => {
      const error = validateField(field, form[field as keyof typeof form]);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : {
          name: form.name,
          email: form.email,
          password: form.password,
          mobile: form.mobile,
        };

    const response = await fetch(
      `/api/auth/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404 && isLogin) {
        toast.error("Invalid credentials.");
      } else if (response.status === 400 && !isLogin) {
        toast.error("Email already exists.");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
      return;
    }

    if (isLogin) {
      // On login success: store token etc, then navigate
      const { token, mentorId, email } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("mentorId", mentorId);
      localStorage.setItem("mentorEmail", email);

      toast.success("Login successful!");
      setTimeout(() => router.push("/mentor/dashboard"), 1500);
    } else {
      // On registration success: show success toast, then switch to login mode
      toast.success("Registration successful! Please login.");
      // Reset form fields (optional)
      setForm({ name: "", email: "", password: "", confirmPassword: "", mobile: "" });
      setErrors({ name: "", email: "", password: "", confirmPassword: "", mobile: "" });
      setIsLogin(true);
    }
  } catch (error) {
    toast.error("Network error. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ToastContainer />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className="w-1/2"
            >
              Login
            </Button>
            {/* <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className="w-1/2"
            >
              Signup
            </Button> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {isLogin ? "Mentor Login" : "Mentor Registration"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLogin && (
                <>
                  <div className="flex flex-col space-y-1 items-end">
                    <Input
                      placeholder="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1 items-end">
                    <Input
                      placeholder="Mobile Number"
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      maxLength={10}
                      onChange={handleChange}
                    />
                    {errors.mobile && (
                      <p className="text-sm text-red-500">{errors.mobile}</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex flex-col space-y-1 items-end">
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1 items-end relative">
                <Input
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="flex flex-col space-y-1 items-end">
                  <Input
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
