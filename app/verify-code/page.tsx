"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function VerifyCodePage() {
  const router = useRouter();
  const { verifyCode } = useAuthStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyCode(code);
    if (success) router.push("/reset-password");
    else setError("Invalid verification code");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Verify Code</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Enter verification code"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1e1e3f] text-orange-300 rounded-lg py-2 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          Verify
        </button>
      </form>
    </main>
  );
}
