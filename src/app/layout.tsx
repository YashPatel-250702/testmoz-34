// File: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: "Test Creation Portal",
  description: "Assessment platform for students and placement drives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
