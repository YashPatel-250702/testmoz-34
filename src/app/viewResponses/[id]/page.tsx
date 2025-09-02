"use client";

import { use, useEffect, useState } from "react";
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
 const { id } = use(params);
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

  const headers = responses[0] ? Object.keys(responses[0].responses) : [];
  const filteredResponses = responses.filter((r) =>
  Object.values(r.responses).some((val) =>
    String(val).toLowerCase().includes(search.toLowerCase())
  )
);

  const truncateWithTooltip = (text: string) => {
    const words = String(text).split(" ");
    const truncated = words.slice(0, 4).join(" ");
    const needsTruncate = words.length > 4;
    return (
      <span title={text} className="cursor-default">
        {needsTruncate ? truncated + "..." : text}
      </span>
    );
  };

return (
  <div className="w-full max-w-7xl mx-auto">
    <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📄 Form Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <p className="text-sm text-gray-500">Total Responses: {responses.length}</p>
            <Input
              placeholder="Search responses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64"
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
        </Card>
    </div>
);

}
