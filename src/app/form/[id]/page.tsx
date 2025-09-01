"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormField {
  id: number;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
}

interface FormData {
  id: string;
  title: string;
  fields: FormField[];
}

export default function PublicFormPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<FormData | null>(null);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [existingEmails, setExistingEmails] = useState<string[]>([]);
  const router = useRouter();
  const [isexists, setexists] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/forms/${params.id}`);
        const data = await res.json();
        setForm(data.form);

        const resResponses = await fetch(
          `/api/forms/${params.id}/getSavedResponses`
        );
        const dataResponses = await resResponses.json();
        const responsesArray = dataResponses.responses || [];

        const emails = responsesArray.map((r: any) =>
          r.responses?.Email ? r.responses.Email.toLowerCase().trim() : null
        );

        setExistingEmails(emails.filter(Boolean));
      } catch (err) {
        setMessage("❌ Failed to load form.");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [params.id]);

  const handleChange = (id: number, value: any, label?: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));

    if (label === "Email" && value) {
      const normalizedEmail = value.toLowerCase().trim();
      if (existingEmails.includes(normalizedEmail)) {
        setexists(true);
        toast("⚠️ This email has already submitted a response.");
      } else {
        setexists(false);
        setMessage(null);
      }
    }
  };

  const validateRequiredFields = () => {
    if (!form) return false;
    for (const field of form.fields) {
      if (field.required) {
        const val = responses[field.id];
        if (
          val === undefined ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        ) {
          toast(`⚠️ "${field.label}" is required.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      if (!validateRequiredFields()) {
        setSubmitting(false);
        return;
      }

      const formattedResponses: Record<string, any> = {};
      form?.fields.forEach((field) => {
        if (responses[field.id] !== undefined) {
          formattedResponses[field.label] = responses[field.id];
        }
      });

      if (formattedResponses.Email) {
        const normalizedEmail = formattedResponses.Email.toLowerCase().trim();
        if (existingEmails.includes(normalizedEmail)) {
          setMessage("⚠️ This email has already submitted a response.");
          setSubmitting(false);
          return;
        }
      }

      const res = await fetch(`/api/forms/${params.id}/saveFormResponse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: formattedResponses }),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      toast("✅ Response submitted successfully!");
      setResponses({});
      router.push("/thank-you/formSubmitted");
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-orange-600" />
      </div>
    );
  }

  if (!form) return <p className="text-center text-gray-600">{message}</p>;

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Image Panel */}
      <div className="hidden md:block w-1/4 h-screen fixed top-0 left-0">
        <img
          src="/image.png"
          alt="Form Illustration"
          className="w-full h-full object-contain bg-white rounded-r-2xl shadow-xl"
        />
      </div>

      {/* Form Panel */}
      <div className="md:ml-[25%] w-full md:w-3/4 flex justify-center items-start overflow-y-auto py-10">
        <div className="w-11/12 md:w-3/4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center break-words">
            {form.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div
                key={field.id}
                className="bg-white shadow-md rounded-xl p-6 space-y-4"
              >
                <label className="block font-semibold text-gray-800 break-words">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {["text", "number", "phone", "email"].includes(field.type) && (
                  <input
                    type={field.type === "phone" ? "tel" : field.type}
                    className="w-full border-b-2 border-gray-300 bg-transparent p-2 
             focus:border-orange-500 focus:outline-none 
             overflow-x-auto whitespace-nowrap"
                    value={responses[field.id] || ""}
                    required={field.required}
                    onChange={(e) =>
                      handleChange(field.id, e.target.value, field.label)
                    }
                  />

                )}

                {field.type === "textarea" && (
                  <textarea
                    className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:border-orange-500 focus:outline-none 
             whitespace-pre-wrap break-words break-all resize-y"
                    rows={4}
                    value={responses[field.id] || ""}
                    required={field.required}
                    onChange={(e) =>
                      handleChange(field.id, e.target.value, field.label)
                    }
                  />
                )}

                {field.type === "radio" && field.options && (
                  <div className="space-y-2">
                    {field.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 break-words"
                      >
                        <input
                          type="radio"
                          name={`field-${field.id}`}
                          value={option}
                          checked={responses[field.id] === option}
                          onChange={() =>
                            handleChange(field.id, option, field.label)
                          }
                          required={field.required}
                        />
                        <span className="break-words">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "checkbox" && field.options && (
                  <div className="space-y-2">
                    {field.options.map((option, idx) => {
                      const selected = responses[field.id] || [];
                      return (
                        <label
                          key={idx}
                          className="flex items-center gap-2 break-words"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={selected.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleChange(
                                  field.id,
                                  [...selected, option],
                                  field.label
                                );
                              } else {
                                handleChange(
                                  field.id,
                                  selected.filter((o: string) => o !== option),
                                  field.label
                                );
                              }
                            }}
                          />
                          <span className="break-words">{option}</span>
                        </label>
                      );
                    })}
                    {field.required &&
                      (!responses[field.id] ||
                        responses[field.id].length === 0) && (
                        <p className="text-red-500 text-sm">
                          At least one option is required
                        </p>
                      )}
                  </div>
                )}

                {field.type === "review" && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleChange(field.id, star, field.label)}
                        className={`text-2xl ${responses[field.id] >= star
                          ? "text-yellow-500"
                          : "text-gray-400"
                          }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting || isexists}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center font-medium text-gray-800 break-words">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
