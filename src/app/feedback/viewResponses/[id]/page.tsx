"use client";

import { use, useEffect, useState } from "react";

export default function FormResponsesPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap the params promise using React.use()
  const { id } = use(params);

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

  if (!responses.length) {
    return <p className="p-4">No responses submitted yet.</p>;
  }

  const headers = Object.keys(responses[0].responses);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Responses</h1>

      {/* ✅ Scroll wrapper with vertical + horizontal scroll */}
      <div className="w-full max-h-[70vh] overflow-auto rounded-xl shadow-lg border border-gray-200">
        <table className="text-sm text-left border-collapse w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="px-4 py-3 font-semibold sticky left-0 top-0 bg-gray-100 z-20 min-w-[60px]">
                #
              </th>
              {headers.map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 font-semibold truncate min-w-[180px] sticky top-0 bg-gray-100 z-10"
                  title={key}
                >
                  {key}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold min-w-[200px] sticky top-0 bg-gray-100 z-10">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody>
            {responses.map((resp, index) => (
              <tr
                key={resp.id}
                className="hover:bg-gray-50 even:bg-gray-50/40 transition-colors"
              >
                <td className="px-4 py-3 sticky left-0 bg-white z-10 min-w-[60px]">
                  {index + 1}
                </td>
                {headers.map((key) => (
                  <td key={key} className="px-4 py-3 align-top min-w-[180px]">
                    <div
                      className="overflow-hidden text-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.5rem",
                        maxHeight: "3rem",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      title={
                        Array.isArray(resp.responses[key])
                          ? (resp.responses[key] as any[]).join(", ")
                          : String(resp.responses[key])
                      }
                    >
                      {Array.isArray(resp.responses[key])
                        ? (resp.responses[key] as any[]).join(", ")
                        : String(resp.responses[key])}
                    </div>
                  </td>
                ))}
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap min-w-[200px]">
                  {new Date(resp.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
