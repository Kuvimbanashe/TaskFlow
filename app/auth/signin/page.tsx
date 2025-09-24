"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import {motion} from "framer-motion"
export default function SignInPage() {
  const router = useRouter();
  const { signin, currentUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signin(email, password);
    
    
    if (!success) return setError("Invalid email or password");
    return router.push("/dashboard")

  };


  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Sign In</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

 <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="submit"
  className="w-full bg-[#1e1e3f] text-orange-300 rounded-lg py-2 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
>
  Sign In
</motion.button>


        <p className="mt-4 text-sm pr-5">
          {"Don't"} have an account?
          <span
            className="text-orange-300 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </main>
  );
}
