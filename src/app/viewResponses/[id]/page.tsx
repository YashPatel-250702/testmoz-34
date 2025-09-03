"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUp, ChevronDown } from "lucide-react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResponseItem {
  id: string;
  formId: string;
  createdAt: string;
  responses: {
    order: string[];
    responses: Record<string, any>;
  };
}

export default function FormResponsesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = use(params);
  const router = useRouter();

  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("all");
  const [search, setSearch] = useState("");

  // 🔑 new state for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`/api/forms/${id}/getSavedResponses`);
        setResponses(res.data.responses || []);
      } catch (err) {
        console.error("Error fetching responses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);

  const headers = responses.length > 0 ? responses[0].responses.order : [];

  // 🔑 handle sorting toggle
  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev?.key === column) {
        return { key: column, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key: column, direction: "asc" };
    });
  };

  // 🔑 filter responses
  const filteredResponses = responses.filter((r) => {
    const values = r.responses.responses;

    if (!search) return true;

    if (selectedColumn === "all") {
      return Object.values(values).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return String(values[selectedColumn] || "")
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  });

  // 🔑 apply sorting after filtering
  const sortedResponses = [...filteredResponses].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    let aValue =
      key === "Date"
        ? new Date(a.createdAt).getTime()
        : a.responses.responses[key] ?? "";
    let bValue =
      key === "Date"
        ? new Date(b.createdAt).getTime()
        : b.responses.responses[key] ?? "";

    // normalize values
    aValue = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
    bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue;

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const truncateWithTooltip = (text: any) => {
    if (!text) return "-";
    const str = String(text);
    const words = str.split(" ");
    const truncated = words.slice(0, 4).join(" ");
    const needsTruncate = words.length > 4;
    return (
      <span title={str} className="cursor-default">
        {needsTruncate ? truncated + "..." : str}
      </span>
    );
  };

  return (
    <div className="mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">📄 Form Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <p className="text-sm text-gray-500">
            Total Responses: {responses.length}
          </p>

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
                {/* shadcn Select dropdown */}
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
                      ? "Search all responses..."
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
            <span className="ml-2 text-gray-500">Loading responses...</span>
          </div>
        ) : sortedResponses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No responses found.</p>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow className="bg-orange-50 text-orange-700 border-b border-orange-200">
                  <TableHead className="font-semibold">#</TableHead>
                  {headers.map((h) => (
                    <TableHead
                      key={h}
                      onClick={() => handleSort(h)}
                      className="font-semibold cursor-pointer select-none hover:text-orange-500"
                    >
                      <div className="flex items-center gap-1">
                        {truncateWithTooltip(h)}

                        {/* show correct icon only when this column is sorted */}
                        {sortConfig?.key === h &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          ))}
                      </div>
                    </TableHead>
                  ))}

                  <TableHead
                    onClick={() => handleSort("Date")}
                    className="font-semibold cursor-pointer select-none hover:text-orange-500"
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortConfig?.key === "Date" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        ))}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResponses.map((r, index) => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    {headers.map((h) => (
                      <TableCell key={h}>
                        {Array.isArray(r.responses.responses[h])
                          ? r.responses.responses[h].join(", ")
                          : truncateWithTooltip(r.responses.responses[h])}
                      </TableCell>
                    ))}
                    <TableCell>
                      {new Date(r.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </div>
  );
}
