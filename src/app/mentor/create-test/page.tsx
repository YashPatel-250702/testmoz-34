// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"

// interface TestFormData {
//   conceptName: string
//   duration: number
//   complexity: string
//   numberOfQuestions: number
//   codingPercentage: number
//   theoryPercentage: number
// }

// interface TestQuestion {
//   problemStatement: string
//   options?: string[]
//   answer?: string
//   complexity: string
// }

// interface GeneratedTest {
//   title: string
//   description: string
//   questions: TestQuestion[]
// }

// export default function CreateTestPage() {
//   const searchParams = useSearchParams()
//   const testTypeParam = searchParams.get("type")?.toUpperCase() || "GENERAL"

//   // Transform TECHNICAL/APTITUDE to PLACEMENT as per your logic
//   const testType =
//     testTypeParam === "TECHNICAL" || testTypeParam === "APTITUDE" ? "PLACEMENT" : testTypeParam

//   const isAptitude = testTypeParam === "APTITUDE"

//   const [formData, setFormData] = useState<TestFormData>({
//     conceptName: "",
//     duration: 30,
//     complexity: "Easy",
//     numberOfQuestions: 10,
//     codingPercentage: isAptitude ? 0 : 80,
//     theoryPercentage: isAptitude ? 100 : 20,
//   })

//   const [isGenerating, setIsGenerating] = useState(false)
//   const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null)

//   const handleSliderChange = (value: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       codingPercentage: value,
//       theoryPercentage: 100 - value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsGenerating(true)

//     const dataToSend = {
//       testType,
//       ...formData,
//     }

//     if (isAptitude) {
//       dataToSend.codingPercentage = 0
//       dataToSend.theoryPercentage = 100
//     }

//     try {
//       const res = await fetch("/api/mentor/create-test", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(dataToSend),
//       })
//       console.log("Request sent:", dataToSend)

//       const result = await res.json()

//       if (!res.ok) throw new Error(result.message || "Failed to generate test")
//               console.log("Request sent:", dataToSend)


//       setGeneratedTest(result.generatedTest)
//     } catch (err) {
//       console.error("Error:", err)
//                   console.log("Request sent:", dataToSend)

//       alert("Failed to generate tests.")

//     } finally {
//       setIsGenerating(false)
//     }
//   }



//   // Get mentorId and token from localStorage
//   const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null;
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   // Save test function
//   const handleSaveTest = async () => {
//     if (!mentorId) {
//       alert("Mentor ID not found. Please login again.");
//       return;
//     }
//     if (!generatedTest) {
//       alert("No test to save.");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/mentor/${mentorId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // send token for auth
//         },
//         body: JSON.stringify({
//           generatedTest: generatedTest,
//           conceptName: formData.conceptName,
//           duration: formData.duration,
//           complexity: formData.complexity,
//           numberOfQuestions: formData.numberOfQuestions,
//           codingPercentage: formData.codingPercentage,
//           theoryPercentage: formData.theoryPercentage,
//           testType,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to save test");
//       }

//       alert("Test saved successfully!");
//     } catch (error) {
//       console.error("Save test error:", error);
//       alert("Error saving test: " + (error instanceof Error ? error.message : String(error)));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-6xl">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">✨ Create New Test</CardTitle>
//               <CardDescription>Configure test parameters and generate AI questions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="conceptName">Concept Name</Label>
//                   <Input
//                     id="conceptName"
//                     placeholder="e.g., Control Statements"
//                     value={formData.conceptName}
//                     onChange={(e) => setFormData({ ...formData, conceptName: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="duration">Duration (minutes)</Label>
//                     <Input
//                       id="duration"
//                       type="number"
//                       min="5"
//                       max="180"
//                       value={formData.duration}
//                       onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="numberOfQuestions">Number of Questions</Label>
//                     <Input
//                       id="numberOfQuestions"
//                       type="number"
//                       min="1"
//                       max="50"
//                       value={formData.numberOfQuestions}
//                       onChange={(e) =>
//                         setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="complexity">Complexity Level</Label>
//                   <Select
//                     id="complexity"
//                     value={formData.complexity}
//                     onChange={(e) => setFormData({ ...formData, complexity: e.target.value })}
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                     <option value="Mixed">Mixed</option>
//                   </Select>
//                 </div>

//                 {!isAptitude && (
//                   <div className="space-y-4">
//                     <Label>Question Type Distribution</Label>
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-sm font-medium">Coding Questions</span>
//                           <span className="text-sm text-gray-600">{formData.codingPercentage}%</span>
//                         </div>
//                         <Slider
//                           value={formData.codingPercentage}
//                           onChange={handleSliderChange}
//                           max={100}
//                           step={5}
//                         />
//                       </div>
//                       <div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-sm font-medium">Theory Questions</span>
//                           <span className="text-sm text-gray-600">{formData.theoryPercentage}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-green-600 h-2 rounded-full transition-all duration-300"
//                             style={{ width: `${formData.theoryPercentage}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <Button type="submit" className="w-full" disabled={isGenerating}>
//                   {isGenerating ? "⏳ Generating Test..." : "✨ Generate Test"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {generatedTest && (
//             <Card className="max-h-[calc(100vh-4rem)] overflow-y-auto">
//               <CardHeader>
//                 <CardTitle>{generatedTest.title}</CardTitle>
//                 <CardDescription>{generatedTest.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {generatedTest.questions.map((q, index) => (
//                     <div key={index} className="p-4 border rounded-md bg-white shadow-sm">
//                       <h4 className="font-medium text-sm mb-2">
//                         Question {index + 1} ({q.complexity})
//                       </h4>
//                       <p className="text-sm mb-2">{q.problemStatement}</p>
//                      {Array.isArray(q.options) && q.options.length > 0 && (
//   <ul className="list-disc ml-6 text-sm space-y-1">
//     {q.options.map((opt, i) => (
//       <li key={i}>{opt}</li>
//     ))}
//   </ul>
// )}

//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex gap-2">
//                   <Button className="flex-1" onClick={handleSaveTest}>💾 Save Test</Button>
//                   <Button variant="outline" className="flex-1 bg-transparent">
//                     ✏️ Edit Questions
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Menu } from "lucide-react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


interface TestFormData {
  conceptName: string
  duration: number
  complexity: string
  numberOfQuestions: number
  codingPercentage: number
  theoryPercentage: number
}

interface TestQuestion {
  problemStatement: string
  options?: string[]
  answer?: string
  complexity: string
}

interface GeneratedTest {
  title: string
  description: string
  questions: TestQuestion[]
}

export default function CreateTestPage() {
  const router = useRouter();

  const searchParams = useSearchParams()
  const testTypeParam = searchParams.get("type")?.toUpperCase() || "GENERAL"

  const testType =
    testTypeParam === "TECHNICAL" || testTypeParam === "APTITUDE" ? "PLACEMENT" : testTypeParam
  const isAptitude = testTypeParam === "APTITUDE"

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [formData, setFormData] = useState<TestFormData>({
    conceptName: "",
    duration: 30,
    complexity: "Easy",
    numberOfQuestions: 10,
    codingPercentage: isAptitude ? 0 : 80,
    theoryPercentage: isAptitude ? 100 : 20,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null)

  const handleSliderChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      codingPercentage: value,
      theoryPercentage: 100 - value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    const dataToSend = {
      testType,
      ...formData,
    }

    if (isAptitude) {
      dataToSend.codingPercentage = 0
      dataToSend.theoryPercentage = 100
    }

    try {
      const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null
      const res = await fetch(`/api/mentor/${mentorId}/create-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || "Failed to generate test")

      setGeneratedTest(result.generatedTest)
    } catch (err) {
      console.error("Error:", err)
      alert("Failed to generate tests.")
    } finally {
      setIsGenerating(false)
    }
  }

  const mentorId = typeof window !== "undefined" ? localStorage.getItem("mentorId") : null
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const handleSaveTest = async () => {
    if (!mentorId) return alert("Mentor ID not found.")
    if (!generatedTest) return alert("No test to save.")

    try {
      const res = await fetch(`/api/mentor/${mentorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          generatedTest,
          ...formData,
          testType,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to save test")
      alert("Test saved successfully!")
    } catch (err) {
      console.error("Save test error:", err)
      alert("Error saving test.")
    }
  }

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      {sidebarOpen && <DashboardSidebar collapsible="icon" />}
      <SidebarInset>
        {/* Navbar */}
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


        {/* Page content */}
        <div className="min-h-screen bg-muted/20 p-4 md:p-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Test Config Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">✨ Create New Test</CardTitle>
                  <CardDescription>Configure test parameters and generate AI questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="conceptName">Concept Name</Label>
                      <Input
                        id="conceptName"
                        placeholder="e.g., Control Statements"
                        value={formData.conceptName}
                        onChange={(e) => setFormData({ ...formData, conceptName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="5"
                          max="180"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numberOfQuestions">Number of Questions</Label>
                        <Input
                          id="numberOfQuestions"
                          type="number"
                          min="1"
                          max="50"
                          value={formData.numberOfQuestions}
                          onChange={(e) =>
                            setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complexity">Complexity Level</Label>
                      <Select
                        id="complexity"
                        value={formData.complexity}
                        onChange={(e) => setFormData({ ...formData, complexity: e.target.value })}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Mixed">Mixed</option>
                      </Select>
                    </div>

                    {!isAptitude && (
                      <div className="space-y-4">
                        <Label>Question Type Distribution</Label>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Coding Questions</span>
                            <span className="text-sm text-gray-600">{formData.codingPercentage}%</span>
                          </div>
                          <Slider
                            value={formData.codingPercentage}
                            onChange={handleSliderChange}
                            max={100}
                            step={5}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Theory Questions</span>
                            <span className="text-sm text-gray-600">{formData.theoryPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${formData.theoryPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isGenerating}>
                      {isGenerating ? "⏳ Generating Test..." : "✨ Generate Test"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Generated Test Preview */}
              {generatedTest && (
                <Card className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                  <CardHeader>
                    <CardTitle>{generatedTest.title}</CardTitle>
                    <CardDescription>{generatedTest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedTest.questions.map((q, index) => (
                        <div key={index} className="p-4 border rounded-md bg-white shadow-sm">
                          <h4 className="font-medium text-sm mb-2">
                            Question {index + 1} ({q.complexity})
                          </h4>
                          <p className="text-sm mb-2">{q.problemStatement}</p>
                          {Array.isArray(q.options) && q.options.length > 0 && (
                            <ul className="list-disc ml-6 text-sm space-y-1">
                              {q.options.map((opt, i) => (
                                <li key={i}>{opt}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1" onClick={handleSaveTest}>
                        💾 Save Test
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        ✏️ Edit Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-4 border-t bg-white text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
