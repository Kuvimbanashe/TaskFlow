"use client";

import { motion } from "framer-motion";
import { ClipboardList, Clock, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  // Mock stats
  const stats = [
    { title: "Pending Todos", value: 12, icon: ClipboardList, color: "text-[#1e1e3f]" },
    { title: "Due Today", value: 5, icon: Clock, color: "text-orange-300" },
    { title: "Overdue", value: 3, icon: AlertCircle, color: "text-red-500" },
  ];

  // Mock tasks for today
  const todaysTasks = [
    { id: 1, title: "Finish project proposal", due: "10:00 AM" },
    { id: 2, title: "Team meeting", due: "2:00 PM" },
    { id: 3, title: "Update client report", due: "4:30 PM" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-[#1e1e3f]">Your </span>
        <span className="text-orange-300">Dashboard</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="rounded-xl bg-white p-6 shadow hover:shadow-md"
          >
            <stat.icon className={`mb-4 h-8 w-8 ${stat.color}`} />
            <h2 className="text-xl font-semibold text-[#1e1e3f]">{stat.value}</h2>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Today's Tasks */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[#1e1e3f] mb-4">
          <span className="text-[#1e1e3f]">Tasks </span>
          <span className="text-orange-300">Due Today</span>
        </h2>
        <div className="space-y-3">
          {todaysTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="rounded-lg bg-white p-4 shadow hover:shadow-md flex justify-between items-center"
            >
              <p className="text-[#1e1e3f] font-medium">{task.title}</p>
              <span className="text-sm text-gray-500">{task.due}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
