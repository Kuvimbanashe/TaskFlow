"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar1";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-32 gap-12">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-[#1e1e3f]">
            Manage your{" "}
            <span className="text-orange-300">Tasks</span> with <span className="text-orange-300">TaskFlow</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Stay on top of your tasks and deadlines with a clean, simple, and elegant personal todo manager.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start gap-4 flex-wrap">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1e1e3f] text-orange-300 px-6 py-3 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#1e1e3f] text-[#1e1e3f] px-6 py-3 rounded-lg font-medium hover:bg-[#1e1e3f] hover:text-orange-300 transition"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 hidden"
        >
          <img
            src="/illustration.png"
            alt="TaskFlow illustration"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>

      {/* Features section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: "Track Deadlines", description: "See tasks due today and overdue.", icon: "🕒" },
          { title: "Organize Tasks", description: "Create, edit, and prioritize your todos.", icon: "🗂️" },
          { title: "Stay Focused", description: "Focus on what matters with a clean dashboard.", icon: "🎯" },
        ].map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-2xl transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-[#1e1e3f] mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
