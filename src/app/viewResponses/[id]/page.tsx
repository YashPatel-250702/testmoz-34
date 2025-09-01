"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid, Column } from "react-data-grid";
import { Search, ArrowLeft } from "lucide-react";

import "react-data-grid/lib/styles.css";

export default function FormResponsesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

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

  const headers = Object.keys(responses[0].responses || {});
  const columns: Column<any>[] = [
    { key: "#", name: "#", frozen: true },
    ...headers.map((h) => ({
      key: h,
      name: h,
      resizable: true,
    })),
    { key: "submittedAt", name: "Submitted At" },
  ];

  const allRows = responses.map((r, idx) => {
    const row: Record<string, any> = {
      "#": idx + 1,
      submittedAt: new Date(r.createdAt).toLocaleString(),
    };
    headers.forEach((h) => {
      row[h] = r.responses[h] ?? "";
    });
    return row;
  });

  const filteredRows = allRows.filter((row) =>
    Object.entries(columnFilters).every(([col, val]) =>
      String(row[col] ?? "").toLowerCase().includes(val.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-auto">
      <div className="flex items-center justify-between p-4 border-b border-black">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 px-3 py-1 border-2 border-black rounded-lg bg-white hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Form Responses</h1>
        </div>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1 border-2 border-black rounded-lg bg-white hover:bg-gray-100"
        >
          <Search size={18} />
          <span>Filter</span>
        </button>
      </div>

      {showFilter && (
        <div className="grid grid-cols-[50px_repeat(auto-fill,minmax(150px,1fr))] border-b border-black bg-gray-50">
          <div className="p-2 border-r border-black"></div>

          {headers.map((h) => (
            <input
              key={h}
              type="text"
              placeholder={`Filter ${h}`}
              value={columnFilters[h] || ""}
              onChange={(e) =>
                setColumnFilters((prev) => ({
                  ...prev,
                  [h]: e.target.value,
                }))
              }
              className="p-2 border-r border-black text-sm"
            />
          ))}

          <input
            type="text"
            placeholder="Filter Submitted At"
            value={columnFilters["submittedAt"] || ""}
            onChange={(e) =>
              setColumnFilters((prev) => ({
                ...prev,
                submittedAt: e.target.value,
              }))
            }
            className="p-2 border-r border-black text-sm"
          />
        </div>
      )}

      <div className="flex-1 w-full h-full overflow-auto">
        <DataGrid
          columns={columns}
          rows={filteredRows}
          className="rdg-light 
            [&_.rdg-cell]:border [&_.rdg-cell]:border-black 
            [&_.rdg-cell]:whitespace-normal [&_.rdg-cell]:break-words 
            [&_.rdg-cell]:align-top [&_.rdg-cell]:p-2 
            [&_.rdg-header-row_.rdg-cell]:border [&_.rdg-header-row_.rdg-cell]:border-black 
            [&_.rdg-header-row_.rdg-cell]:font-bold [&_.rdg-header-row_.rdg-cell]:text-center"
          defaultColumnOptions={{
            resizable: true,
          }}
          rowHeight={70}
          style={{
            border: "2px solid black",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
