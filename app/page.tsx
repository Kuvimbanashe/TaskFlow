"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#1e1e3f]">Task</span>
          <span className="text-orange-300">Flow</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-[#1e1e3f] hover:text-orange-300 transition">
            About
          </Link>
          <Link
            href="/auth/signin"
            className="rounded-lg bg-[#1e1e3f] px-4 py-2 font-medium text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center max-w-2xl mx-auto p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          <span className="text-[#1e1e3f]">Welcome to </span>
          <span className="text-orange-300">TaskFlow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-lg text-gray-600"
        >
          Organize, track, and complete your tasks with ease. Stay productive every day with a clear view of what matters most.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link
            href="/auth/signup"
            className="rounded-lg bg-[#1e1e3f] px-6 py-3 font-medium text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] flex items-center gap-2 transition"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-[#1e1e3f] px-6 py-3 font-medium text-[#1e1e3f] hover:bg-[#1e1e3f] hover:text-orange-300 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl w-full mx-auto p-6">
        {["Track Todos", "View Stats", "Stay Organized"].map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
            className="rounded-xl border p-6 text-center shadow-sm hover:shadow-md bg-white"
          >
            <CheckCircle className="mx-auto mb-4 text-[#1e1e3f]" size={32} />
            <h3 className="text-lg font-semibold text-[#1e1e3f]">{feature}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {feature === "Track Todos" &&
                "Add, update, and complete your daily tasks effortlessly."}
              {feature === "View Stats" &&
                "Get insights on pending, due, and completed tasks."}
              {feature === "Stay Organized" &&
                "Keep everything in one place with categories and filters."}
            </p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}