"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank you for your feedback</h1>
    </div>
  );
}
