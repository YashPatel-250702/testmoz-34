// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import axios from "axios"

// interface Question {
//   id: string
//   question: string
//   options: string[]
//   answer: string
// }

// interface Test {
//   id: string
//   name: string
//   description: string
//   duration: number
//   noOfQuestions: number
//   status: string
//   type: string
//   createdAt: string
//   questions: Question[]
// }

// export default function PreviewTestPage() {
//   const { id } = useParams()
//   const [test, setTest] = useState<Test | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const response = await axios.get(`/api/mentor/test/${id}/manageTests`)
//         setTest(response.data.test)
//       } catch (error) {
//         console.error("Error fetching test:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) fetchTest()
//   }, [id])

//   if (loading) return <p className="p-4">Loading...</p>
//   if (!test) return <p className="p-4 text-red-500">Test not found</p>

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
//       <p className="text-gray-600 mb-4">{test.description}</p>

//       <div className="text-sm text-gray-500 mb-6">
//         <p>🕒 Duration: {test.duration} mins</p>
//         <p>📝 Questions: {test.noOfQuestions}</p>
//         <p>Status: {test.status}</p>
//         <p>Type: {test.type}</p>
//         <p>Created At: {new Date(test.createdAt).toLocaleString()}</p>
//       </div>

//       <hr className="my-4" />

//       <h2 className="text-xl font-semibold mb-4">Questions</h2>
//       <div className="space-y-6">
//         {test.questions.map((q, index) => (
//           <div key={q.id} className="p-4 border rounded-md bg-white shadow-sm">
//             <p className="font-semibold mb-2">
//               Q{index + 1}. {q.question}
//             </p>
//             <ul className="space-y-1 pl-5 list-disc text-sm">
//               {q.options.map((opt, i) => (
//                 <li key={i} className={opt === q.answer ? "text-green-700 font-medium" : ""}>
//                   {opt}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }







// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import axios from "axios"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// interface Question {
//   id: string
//   problemStatement: string
//   sampleInput?: string
//   sampleOutput?: string
//   constraints?: string
//   answer: string
// }

// interface Test {
//   id: string
//   name: string
//   description: string
//   duration: number
//   noOfQuestions: number
//   status: string
//   type: string
//   createdAt: string
// //   questions: Question[]
//   technicalQuestions?: Question[]  
// }

// export default function PreviewTestPage() {
//   const { id } = useParams()
//   const [test, setTest] = useState<Test | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const response = await axios.get(`/api/mentor/test/${id}/manageTests`)
//         setTest(response.data.test)
//       } catch (error) {
//         console.error("Error fetching test:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) fetchTest()
//   }, [id])

//   if (loading) return <p className="p-4">Loading...</p>
//   if (!test) return <p className="p-4 text-red-500">Test not found</p>

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
//       <p className="text-gray-600 mb-4">{test.description}</p>

//       <div className="text-sm text-gray-500 mb-6">
//         <p>🕒 Duration: {test.duration} mins</p>
//         <p>📝 Questions: {test.noOfQuestions}</p>
//         <p>Status: {test.status}</p>
//         <p>Type: {test.type}</p>
//         <p>Created At: {new Date(test.createdAt).toLocaleString()}</p>
//       </div>

//       <hr className="my-4" />

//       <h2 className="text-xl font-semibold mb-4">Questions</h2>
//       <div className="space-y-6">
//       {Array.isArray(test?.technicalQuestions) && test?.technicalQuestions.length > 0 ? (
//   test.technicalQuestions.map((question, index) => (
//     <Card key={index} className="w-full mb-4">
//       <CardHeader>
        
//         <CardTitle>Question {index + 1}</CardTitle>
//         <CardDescription>{question.problemStatement}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-2">
//           <strong>Sample Input:</strong>
//           <pre className="bg-gray-100 p-2 rounded">{question.sampleInput}</pre>
//         </div>
//         <div className="mb-2">
//           <strong>Sample Output:</strong>
//           <pre className="bg-gray-100 p-2 rounded">{question.sampleOutput}</pre>
//         </div>
//         <div className="mb-2">
//           <strong>Constraints:</strong>
//           <p>{question.constraints}</p>
//         </div>
   
//       </CardContent>
//     </Card>
//   ))
// ) : (
//   <p>No questions available.</p>
// )}

//       </div>
//     </div>
//   )
// }


"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface APPTITUDEQuestion {
  id: string
  question: string
  options: string[]
  answer: string
}

interface CodingQuestion {
  id: string
  problemStatement: string
  sampleInput?: string
  sampleOutput?: string
  constraints?: string
  answer: string
}

interface Test {
  id: string
  name: string
  description: string
  duration: number
  noOfQuestions: number
  status: string
  type: string
  createdAt: string
  questions?: APPTITUDEQuestion[]
  technicalQuestions?: CodingQuestion[]
}

export default function PreviewTestPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)

  const testType = searchParams.get("type")?.toUpperCase()

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/api/mentor/test/${id}/manageTests`)
        setTest(response.data.test)
      } catch (error) {
        console.error("Error fetching test:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTest()
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!test) return <p className="p-4 text-red-500">Test not found</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
      <p className="text-gray-600 mb-4">{test.description}</p>

      <div className="text-sm text-gray-500 mb-6">
        <p>🕒 Duration: {test.duration} mins</p>
        <p>📝 Questions: {test.noOfQuestions}</p>
        <p>Status: {test.status}</p>
        <p>Type: {test.type}</p>
        <p>Created At: {new Date(test.createdAt).toLocaleString()}</p>
      </div>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-4">Questions</h2>
      <div className="space-y-6">
        {testType === "APTITUDE" && Array.isArray(test.questions) && test.questions.length > 0 ? (
          test.questions.map((q, index) => (
            <div key={q.id} className="p-4 border rounded-md bg-white shadow-sm">
              <p className="font-semibold mb-2">
                Q{index + 1}. {q.question}
              </p>
              <ul className="space-y-1 pl-5 list-disc text-sm">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={opt === q.answer ? "text-green-700 font-medium" : ""}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : testType !== "APTITUDE" && Array.isArray(test.technicalQuestions) && test.technicalQuestions.length > 0 ? (
          test.technicalQuestions.map((question, index) => (
            <Card key={index} className="w-full mb-4">
              <CardHeader>
                <CardTitle>Question {index + 1}</CardTitle>
                <CardDescription>{question.problemStatement}</CardDescription>
              </CardHeader>
              <CardContent>
                {question.sampleInput && (
                  <div className="mb-2">
                    <strong>Sample Input:</strong>
                    <pre className="bg-gray-100 p-2 rounded">{question.sampleInput}</pre>
                  </div>
                )}
                {question.sampleOutput && (
                  <div className="mb-2">
                    <strong>Sample Output:</strong>
                    <pre className="bg-gray-100 p-2 rounded">{question.sampleOutput}</pre>
                  </div>
                )}
                {question.constraints && (
                  <div className="mb-2">
                    <strong>Constraints:</strong>
                    <p>{question.constraints}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No questions available.</p>
        )}
      </div>
    </div>
  )
}
