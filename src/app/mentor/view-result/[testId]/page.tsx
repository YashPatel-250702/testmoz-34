"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface ResultItem {
  id: string
  userEmail: string
  userMobile: string
  userName: string
  score: number
  status: "PASSED" | "FAILED"
  createdAt: string
}

export default function ViewResultsPage() {
  const { testId } = useParams()
  const [results, setResults] = useState<ResultItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/mentor/test/${testId}/viewResults`)
        setResults(response.data.results || [])
      } catch (error) {
        console.error("Failed to fetch results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [testId])

  const filteredResults = results.filter((r) =>
    r.userName.toLowerCase().includes(search.toLowerCase()) ||
    r.userEmail.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📊 Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Total Attempts: {results.length}</p>
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
              <span className="ml-2 text-gray-500">Loading results...</span>
            </div>
          ) : filteredResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No results found.</p>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((r, index) => (
                    <TableRow key={r.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{r.userName}</TableCell>
                      <TableCell>{r.userEmail}</TableCell>
                      <TableCell>{r.userMobile}</TableCell>
                      <TableCell>{r.score}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "PASSED" ? "default" : "destructive"}>
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
