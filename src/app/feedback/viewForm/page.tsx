"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Form {
  id: string;
  title: string;
  createdAt: string;
}

export default function MentorFormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const domain = process.env.NEXT_PUBLIC_DOMAIN_LINK;
  const router = useRouter();

  useEffect(() => {
    const mentorId = localStorage.getItem("mentorId");
    if (!mentorId) return;

    const fetchForms = async () => {
      try {
        const res = await fetch(`/api/mentor/${mentorId}/viewAllForms`);
        const data = await res.json();
        setForms(data.forms || []);
      } catch (error) {
        console.error("Error fetching forms:", error);
        toast.error("Failed to fetch forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-orange-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Your Forms
      </h1>

      {forms.length === 0 ? (
        <p className="text-center text-gray-600">No forms created yet.</p>
      ) : (
        forms
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((form) => (
            <Card
              key={form.id}
              className="mb-6 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-orange-600">{form.title}</CardTitle>
                <CardDescription>
                  Created on {new Date(form.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {/* ✅ Copy Form Link */}
                  <Button
                    variant="outline"
                    disabled={copiedId === form.id}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${domain}/form/${form.id}`
                      );
                      toast.success("Form link copied!");
                      setCopiedId(form.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                  >
                    {copiedId === form.id ? "Copied!" : "Copy Public Form Link"}
                  </Button>

                  {/* ✅ Open Form */}
                  <Button
                    variant="default"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <a
                      href={`/form/${form.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Form
                    </a>
                  </Button>

                  {/* ✅ View Responses Button */}
                  <Button
                    variant="default"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() =>
                      router.push(`/feedback/viewResponses/${form.id}`)
                    }
                  >
                    View Responses
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
      )}
    </div>
  );
}
