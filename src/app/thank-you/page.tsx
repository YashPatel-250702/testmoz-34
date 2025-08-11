"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Test  Successfully Completed!</h1>
      {/* <p className="mt-3 text-xl font-bold text-green-600">
        Successfully Completed
      </p> */}
      {/* <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Go to Home
      </button> */}
    </div>
  );
}
