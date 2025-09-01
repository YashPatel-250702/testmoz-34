"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ResponseItem {
  id: string;
  createdAt: string;
  responses: Record<string, string>;
}

export default function FormResponsesPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  // Get all headers dynamically
  const headers = responses[0] ? Object.keys(responses[0].responses) : [];

  // Filter responses by search (searching in all values)
  const filteredResponses = responses.filter((r) =>
    Object.values(r.responses).some((val) => val.toLowerCase().includes(search.toLowerCase()))
  );

  // Truncate helper: first 4 words + full tooltip
  const truncateWithTooltip = (text: string) => {
    const words = String(text).split(" ");
    const truncated = words.slice(0, 4).join(" ");
    const needsTruncate = words.length > 4;
    return (
      <span title={text} className="cursor-help">
        {needsTruncate ? truncated + "..." : text}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-x-auto">
  <div className="inline-block min-w-full">

        <CardHeader>
          <CardTitle className="text-2xl font-bold">📄 Form Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Total Responses: {responses.length}</p>
            <Input
              placeholder="Search responses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
              <span className="ml-2 text-gray-500">Loading responses...</span>
            </div>
          ) : filteredResponses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No responses found.</p>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow className="bg-gray-100 whitespace-nowrap">
                    <TableHead>#</TableHead>
                    {headers.map((h) => (
                      <TableHead key={h}>{truncateWithTooltip(h)}</TableHead>
                    ))}
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResponses.map((r, index) => (
                    <TableRow key={r.id}>
                      <TableCell>{index + 1}</TableCell>
                      {headers.map((h) => (
                        <TableCell key={h}>{truncateWithTooltip(r.responses[h])}</TableCell>
                      ))}
                      <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

    </div>
    </div>
  );
}
