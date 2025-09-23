"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { sendVerificationCode } = useAuthStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = sendVerificationCode(email);
    if (success) {
      setSuccessMsg("Verification code sent! Check console (simulated).");
      setTimeout(() => router.push("/verify-code"), 2000);
    } else {
      setError("Email not found");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Forgot Password</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1e1e3f] text-orange-300 rounded-lg py-2 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          Send Verification Code
        </button>
      </form>
    </main>
  );
}
