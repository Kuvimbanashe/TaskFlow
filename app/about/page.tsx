"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Navbar1 from "@/components/Navbar1";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
export default function AboutPage() {
  
  const { isAuthenticated } = useAuthStore();
  
  return (
    <main className="min-h-screen bg-gray-50">
      {isAuthenticated ? <Navbar/> : <Navbar1/>}

      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text- lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1e1e3f] mb-6">
            About <span className="text-orange-300">TaskFlow</span>
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            TaskFlow, a personal task management application designed to help you stay on top of your daily responsibilities. Organize your tasks, track deadlines, and maintain focus with ease.
          </p>
          <p className="text-gray-600 text-lg mb-4 pb-4">
            Developed by Camaraderie Mavenga using Next.js, TypeScript, Tailwind CSS, Framer Motion, and Zustand, TaskFlow provides a fast, responsive, and interactive experience for managing your personal todos.
          </p>
          <Link
          href={`https://cama-1z3r.onrender.com`}
          className="text-blue-700"
            View My Web Portfolio
           </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <img
            src="notebook-with-list-desk-with-cup-coffee-beside.jpg"
            alt="About TaskFlow"
            className="w-full max-w-md max-h-[500px] rounded-md mx-auto"
          />
        </motion.div>
      </div>

      {/* Features / Advantages */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "Simple & Intuitive",
            description: "A clean interface designed for personal task management.",
            icon: "🧩",
          },
          {
            title: "Fast & Responsive",
            description: "Optimized for performance on desktop and mobile devices.",
            icon: "⚡",
          },
          {
            title: "Secure & Private",
            description: "Your tasks are stored locally and only visible to you.",
            icon: "🔒",
          },
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
