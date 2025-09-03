"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultItem {
  id: string;
  userEmail: string;
  userMobile: string;
  userName: string;
  score: number;
  status: "PASSED" | "FAILED";
  createdAt: string;
  question_ids: string[];
  test_cases_passed: string[];
  isCorrect: string[];
}

export default function ViewResultsPage() {
  const { testId } = useParams();
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔑 new filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/mentor/test/${testId}/viewResults`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [testId]);

  const allQuestions = results[0]?.question_ids || [];

  // 🔑 build dynamic headers
  const headers = [
    "Name",
    "Email",
    "Mobile",
    "Score",
    "Status",
    ...allQuestions.map((_, idx) => `Q${idx + 1}`),
    "Date",
  ];

  // 🔑 filtering logic
  const filteredResults = results.filter((r) => {
    const rowValues: Record<string, string> = {
      Name: r.userName,
      Email: r.userEmail,
      Mobile: r.userMobile,
      Score: r.score.toString(),
      Status: r.status,
      Date: new Date(r.createdAt).toLocaleString(),
    };

    // add dynamic question columns
    allQuestions.forEach((qId, idx) => {
      const qIndex = r.question_ids.indexOf(qId);
      if (qIndex !== -1) {
        const testCaseValue = r.test_cases_passed?.[qIndex];
        const correctnessValue = r.isCorrect?.[qIndex];
        rowValues[`Q${idx + 1}`] =
          testCaseValue != null && testCaseValue !== ""
            ? testCaseValue
            : correctnessValue === "C"
            ? "✔️"
            : correctnessValue === "IC"
            ? "❌"
            : "-";
      } else {
        rowValues[`Q${idx + 1}`] = "-";
      }
    });

    if (!search) return true;

    if (selectedColumn === "all") {
      return Object.values(rowValues).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return String(rowValues[selectedColumn] || "")
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📊 Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Total Attempts: {results.length}</p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>

              {filterOpen && (
                <div className="flex items-center gap-2">
                  <SelectPrimitive.Root
                    value={selectedColumn}
                    onValueChange={(val) => setSelectedColumn(val)}
                  >
                    <SelectTrigger className="w-48 border border-gray-300 focus:ring-2 focus:ring-orange-500">
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg border rounded-md">
                      <SelectItem value="all">All Columns</SelectItem>
                      {headers.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectPrimitive.Root>

                  <Input
                    placeholder={
                      selectedColumn === "all"
                        ? "Search all results..."
                        : `Search in ${selectedColumn}`
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                  />
                </div>
              )}
            </div>
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
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow className="bg-gray-100 whitespace-nowrap">
                    <TableHead>#</TableHead>
                    {headers.map((h) => (
                      <TableHead key={h}>{h}</TableHead>
                    ))}
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
                      {allQuestions.map((qId) => {
                        const qIndex = r.question_ids.indexOf(qId);
                        let cellValue = "-";

                        if (qIndex !== -1) {
                          const testCaseValue = r.test_cases_passed?.[qIndex];
                          const correctnessValue = r.isCorrect?.[qIndex];
                          cellValue =
                            testCaseValue != null && testCaseValue !== ""
                              ? testCaseValue
                              : correctnessValue === "C"
                              ? "✔️"
                              : correctnessValue === "IC"
                              ? "❌"
                              : "-";
                        }

                        return <TableCell key={qId}>{cellValue}</TableCell>;
                      })}

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
  );
}
