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
  const [isexists, setexists] = useState(false)

  // ✅ Load form & saved responses once
  useEffect(() => {
    const fetchForm = async () => {
      try {
        console.log("fetching form deatils")
        const res = await fetch(`/api/forms/${params.id}`);
        const data = await res.json();
        setForm(data.form);

        // 🔍 Fetch existing responses JSON (from DB)
        const resResponses = await fetch(
          `/api/forms/${params.id}/getSavedResponses`
        );
        console.log(resResponses)
        const dataResponses = await resResponses.json();
console.log("API raw response:", dataResponses);

// ✅ Extract the array properly
const responsesArray = dataResponses.responses || [];  

const emails = responsesArray.map((r: any) =>
  r.responses?.Email ? r.responses.Email.toLowerCase().trim() : null
);

console.log("Extracted Emails:", emails);
setExistingEmails(emails.filter(Boolean)); // filter out nulls

      } catch (err) {
        setMessage("❌ Failed to load form.");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [params.id]);

  // ✅ Update response values
  const handleChange = (id: number, value: any, label?: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));

    // 📨 Only check duplicates when Email field changes
    if (label === "Email" && value) {
        console.log('checking')
      const normalizedEmail = value.toLowerCase().trim();
       console.log(existingEmails)
        console.log(normalizedEmail)
      if (existingEmails.includes(normalizedEmail)) {
        console.log('checking2')
        console.log(existingEmails)
        console.log(normalizedEmail)
        setexists(true)
        toast("⚠️ This email has already submitted a response.");
      } else {
         setexists(false)
        setMessage(null);
      }
    }
  };

  // ✅ Submit without checking again
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const formattedResponses: Record<string, any> = {};
      form?.fields.forEach((field) => {
        if (responses[field.id] !== undefined) {
          formattedResponses[field.label] = responses[field.id];
        }
      });

      // 🚫 Block submission if duplicate email warning is already set
      if (formattedResponses.Email) {
        const normalizedEmail = formattedResponses.Email.toLowerCase().trim();
        if (existingEmails.includes(normalizedEmail)) {
          setMessage("⚠️ This email has already submitted a response.");
          setSubmitting(false);
          return;
        }
      }

      // ✅ Save new response
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
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <img
          src="/image.png"
          alt="Form Illustration"
          className="w-full h-full object-contain bg-white rounded-r-2xl shadow-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="ml-[25%] w-3/4 flex justify-center items-start overflow-y-auto py-10">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {form.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div
                key={field.id}
                className="bg-white shadow-md rounded-xl p-6 space-y-4"
              >
                <label className="block font-semibold text-gray-800">
                  {field.label}
                </label>

                {/* Text-like inputs */}
                {["text", "number", "phone", "email"].includes(field.type) && (
                  <input
                    type={field.type === "phone" ? "tel" : field.type}
                    className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:border-orange-500 focus:outline-none"
                    value={responses[field.id] || ""}
                    onChange={(e) =>
                      handleChange(field.id, e.target.value, field.label)
                    }
                  />
                )}

                {/* Textarea */}
                {field.type === "textarea" && (
                  <textarea
                    className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:border-orange-500 focus:outline-none"
                    rows={4}
                    value={responses[field.id] || ""}
                    onChange={(e) =>
                      handleChange(field.id, e.target.value, field.label)
                    }
                  />
                )}

                {/* Radio buttons */}
                {field.type === "radio" && field.options && (
                  <div className="space-y-2">
                    {field.options.map((option, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`field-${field.id}`}
                          value={option}
                          checked={responses[field.id] === option}
                          onChange={() =>
                            handleChange(field.id, option, field.label)
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Checkboxes */}
                {field.type === "checkbox" && field.options && (
                  <div className="space-y-2">
                    {field.options.map((option, idx) => {
                      const selected = responses[field.id] || [];
                      return (
                        <label key={idx} className="flex items-center gap-2">
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
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Review (1-5 stars) */}
                {field.type === "review" && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() =>
                          handleChange(field.id, star, field.label)
                        }
                        className={`text-2xl ${
                          responses[field.id] >= star
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
              disabled={submitting || message?.includes("email") || isexists}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center font-medium text-gray-800">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
