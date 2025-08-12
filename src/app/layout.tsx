// File: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Tekworks",
  description: "Assessment platform for students and placement drives",
   icons: {
    icon: "/favicon.png", // path from public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
       {children}
        <ToastContainer />
      </body>
    </html>
  );
}
