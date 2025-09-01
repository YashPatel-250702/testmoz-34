"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ import for query params
import { PlusCircle, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "phone"
  | "email"
  | "radio"
  | "checkbox"
  | "review";

interface FormField {
  id: number;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
}

export default function FormBuilder({ mentorId }: { mentorId: string }) {
  const searchParams = useSearchParams();
  const formId = searchParams.get("id") ?? undefined; 

  const [title, setTitle] = useState("Untitled Form");
  const [fields, setFields] = useState<FormField[]>([
    { id: Date.now(), label: "Untitled Question", type: "text", required: false },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (formId) {
      const fetchForm = async () => {
        try {
          const res = await fetch(`/api/forms/${formId}`);
          if (!res.ok) throw new Error("Failed to fetch form");

          const data = await res.json();
    const form = data.form;

    setTitle(form.title);
    setFields(form.fields || []);
  } catch (err: any) {
    toast.error("❌ " + err.message);
  }
      };
      fetchForm();
    }
  }, [formId]);

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), label: "New Question", type: "text", required: false },
    ]);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateField = (id: number, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const saveForm = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const payload = { title, fields, mentorId };

      const response = await fetch(
        formId
          ? `/api/forms/${formId}/updateForm` 
          : `/api/forms/${mentorId}`,         
        {
          method: formId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save form");
      }

      const data = await response.json();
      toast.success(formId ? "✅ Form updated successfully!" : "✅ Form created successfully!");
      console.log("Form saved:", data);
    } catch (error: any) {
      toast.error("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedField = fields.find((f) => f.id === selectedId);

  return (
    <div className="flex min-h-screen">
      <aside className="w-80 border-r p-4">
        {selectedField ? (
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Edit Field</h2>

            <div>
              <label className="text-sm font-medium text-gray-700">Label</label>
              <input
                className="w-full border focus:border-orange-500 focus:ring-orange-500 p-2 rounded"
                value={selectedField.label}
                onChange={(e) =>
                  updateField(selectedField.id, { label: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="w-full border focus:border-orange-500 focus:ring-orange-500 p-2 rounded"
                value={selectedField.type}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    type: e.target.value as FieldType,
                    options: ["radio", "checkbox"].includes(e.target.value)
                      ? ["Option 1"]
                      : undefined,
                  })
                }
              >
                <option value="text">Text</option>
                <option value="textarea">Paragraph</option>
                <option value="number">Number</option>
                <option value="phone">Phone Number</option>
                <option value="email">Email</option>
                <option value="radio">Radio Buttons</option>
                <option value="checkbox">Checkboxes</option>
                <option value="review">Review (1–5 stars)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedField.required || false}
                onChange={(e) =>
                  updateField(selectedField.id, { required: e.target.checked })
                }
              />
              <label className="text-sm font-medium text-gray-700">Required</label>
            </div>

            {["radio", "checkbox"].includes(selectedField.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Options</label>
                {selectedField.options?.map((opt, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      className="flex-1 border p-2 rounded"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...(selectedField.options || [])];
                        newOpts[i] = e.target.value;
                        updateField(selectedField.id, { options: newOpts });
                      }}
                    />
                    <button
                      className="text-red-500"
                      onClick={() => {
                        const newOpts = selectedField.options?.filter(
                          (_, idx) => idx !== i
                        );
                        updateField(selectedField.id, { options: newOpts });
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  className="text-sm text-orange-600 hover:text-orange-700"
                  onClick={() =>
                    updateField(selectedField.id, {
                      options: [...(selectedField.options || []), "New Option"],
                    })
                  }
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">Select a card to edit</p>
        )}
      </aside>

      <main className="flex-1 p-6">
        <input
          className="text-2xl font-bold mb-6 w-full border-b-2 focus:border-orange-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`bg-white p-4 rounded-lg shadow border-2 cursor-pointer ${
                selectedId === field.id ? "border-orange-500" : "border-transparent"
              }`}
              onClick={() => setSelectedId(field.id)}
            >
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-800 break-words whitespace-pre-wrap">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteField(field.id);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-2">
                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder="Short answer"
                    className="w-full border p-2 rounded"
                    disabled
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    placeholder="Long answer"
                    className="w-full border p-2 rounded"
                    disabled
                  />
                )}
                {field.type === "number" && (
                  <input
                    type="number"
                    placeholder="Enter number"
                    className="w-full border p-2 rounded"
                    disabled
                  />
                )}
                {field.type === "phone" && (
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full border p-2 rounded"
                    disabled
                  />
                )}
                {field.type === "email" && (
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full border p-2 rounded"
                    disabled
                  />
                )}
                {field.type === "radio" &&
                  field.options?.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" disabled />
                      <span>{opt}</span>
                    </div>
                  ))}
                {field.type === "checkbox" &&
                  field.options?.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      <span>{opt}</span>
                    </div>
                  ))}
                {field.type === "review" && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-orange-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            onClick={addField}
          >
            <PlusCircle size={18} />
            Add Question
          </button>

          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={saveForm}
            disabled={loading}
          >
            <Save size={18} />
            {loading ? "Saving..." : formId ? "Update Form" : "Save Form"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
        )}
      </main>
    </div>
  );
}
