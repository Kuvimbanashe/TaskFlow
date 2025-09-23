"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function VerifyPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center">
          <span className="text-[#1e1e3f]">Reset </span>
          <span className="text-orange-300">Password</span>
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              New Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1e1e3f] px-4 py-2 font-medium text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Sign In */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-[#1e1e3f] hover:text-orange-300 transition"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
