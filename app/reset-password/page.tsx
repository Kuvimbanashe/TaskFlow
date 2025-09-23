"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const success = resetPassword(password);
    if (success) router.push("/signin");
    else setError("Something went wrong");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Reset Password</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="password"
          placeholder="New password"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1e1e3f] text-orange-300 rounded-lg py-2 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          Reset Password
        </button>
      </form>
    </main>
  );
}
