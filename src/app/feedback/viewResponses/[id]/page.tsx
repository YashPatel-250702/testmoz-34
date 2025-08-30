"use client";

import { useEffect, useState } from "react";
import { DataGrid, Column } from "react-data-grid";

import "react-data-grid/lib/styles.css";

export default function FormResponsesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await fetch(`/api/forms/${id}/getSavedResponses`);
        const data = await res.json();
        setResponses(data.responses || []);
      } catch (err) {
        console.error("Error fetching responses:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, [id]);

  if (loading) return <p className="p-4">Loading responses...</p>;
  if (!responses.length) return <p className="p-4">No responses submitted yet.</p>;

  // ✅ Build columns dynamically
  const headers = Object.keys(responses[0].responses || {});
  const columns: Column<any>[] = [
    { key: "#", name: "#", width: 60, frozen: true },
    ...headers.map((h) => ({
      key: h,
      name: h,
      resizable: true,
      width: 200, // default width
    })),
    { key: "submittedAt", name: "Submitted At", width: 180 },
  ];

  // ✅ Build rows
  const rows = responses.map((r, idx) => {
    const row: Record<string, any> = { "#": idx + 1, submittedAt: new Date(r.createdAt).toLocaleString() };
    headers.forEach((h) => {
      row[h] = r.responses[h] ?? "";
    });
    return row;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Responses</h1>

      <div className="border rounded-lg overflow-x-auto" style={{ height: "75vh" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          className="rdg-light"
          defaultColumnOptions={{
            resizable: true,
          }}
        />
      </div>
    </div>
  );
}
