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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Trash2, MoreVertical, Pencil, Eye } from "lucide-react";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const handleDelete = async (formId: string) => {
    try {
      setDeletingId(formId);
      const res = await fetch(`/api/forms/${formId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete form");

      toast.success("Form deleted successfully!");
      setForms((prev) => prev.filter((form) => form.id !== formId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete form.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-orange-600" />
      </div>
    );
  }

return (
  <div className="w-full px-6 py-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-left">
        Your Forms
      </h1>

      {forms.length === 0 ? (
        <p className="text-gray-600 text-left">No forms created yet.</p>
      ) : (
        <div className="space-y-6">
          {forms
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((form) => (
              <Card
                key={form.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="space-y-1">
  {/* Top row: title + 3 dots */}
  <div className="flex flex-row items-center justify-between">
    <CardTitle className="text-orange-600">{form.title}</CardTitle>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => router.push(`/viewResponses/${form.id}`)}>
          <Eye className="w-4 h-4 mr-2" /> View Responses
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/feedback/createForm?id=${form.id}`)}>
          <Pencil className="w-4 h-4 mr-2" /> Edit Form
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => handleDelete(form.id)}
          disabled={deletingId === form.id}
        >
          {deletingId === form.id ? (
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <Trash2 className="w-4 h-4 mr-2" />
          )}
          {deletingId === form.id ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  {/* Bottom row: created date */}
  <CardDescription>
    Created on {new Date(form.createdAt).toLocaleDateString()}
  </CardDescription>
</CardHeader>


                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {/* Copy Form Link */}
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

                    {/* Open Form */}
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <a
                        href={`/form/${form.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Form
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  </div>
);


}
