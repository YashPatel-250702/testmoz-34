"use client";

import { useEffect, useState } from "react";

export default function FormResponsesPage({ params }: { params: { id: string } }) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await fetch(`/api/forms/${params.id}/getSavedResponses`);
        const data = await res.json();
        setResponses(data.responses || []);
      } catch (err) {
        console.error("Error fetching responses:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, [params.id]);

  if (loading) return <p className="p-4">Loading responses...</p>;

  if (!responses.length) {
    return <p className="p-4">No responses submitted yet.</p>;
  }

  const headers = Object.keys(responses[0].responses);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Responses</h1>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b">
              <th className="px-4 py-3 font-semibold">#</th>
              {headers.map((key) => (
                <th key={key} className="px-4 py-3 font-semibold">
                  {key}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((resp, index) => (
              <tr
                key={resp.id}
                className="hover:bg-gray-50 even:bg-gray-50/40 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                {headers.map((key) => (
                  <td key={key} className="px-4 py-3">
                    {Array.isArray(resp.responses[key])
                      ? (resp.responses[key] as any[]).join(", ")
                      : String(resp.responses[key])}
                  </td>
                ))}
                <td className="px-4 py-3 text-gray-500">
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
