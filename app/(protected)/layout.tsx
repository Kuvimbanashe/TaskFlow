// app/(protected)/layout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
