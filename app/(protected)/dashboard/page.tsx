"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo } from "@/types";
import Link from "next/link";
import useAuthStore from "@/store/authStore";

export default function DashboardPage() {
  const { currentUser } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (currentUser) {
      const userTodos = mockData.todos.filter((t) => t.userId === currentUser.id);
      setTodos(userTodos);
    }
  }, [currentUser]);

  const today = new Date().toISOString().substring(0, 10);

  // Stats
  const pendingCount = todos.filter((t) => t.status === "pending").length;
  const overdueCount = todos.filter((t) => t.status === "overdue").length;
  const dueTodayTodos = todos.filter((t) => t.dueDate.substring(0, 10) === today);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-[#1e1e3f]">Dashboard</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl bg-white p-6 shadow flex flex-col items-start"
        >
          <p className="text-gray-500">Pending Todos</p>
          <p className="text-2xl font-bold text-[#1e1e3f]">{pendingCount}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl bg-white p-6 shadow flex flex-col items-start"
        >
          <p className="text-gray-500">Due Today</p>
          <p className="text-2xl font-bold text-[#1e1e3f]">{dueTodayTodos.length}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl bg-white p-6 shadow flex flex-col items-start"
        >
          <p className="text-gray-500">Overdue Todos</p>
          <p className="text-2xl font-bold text-[#1e1e3f]">{overdueCount}</p>
        </motion.div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-6">
        <Link
          href="/todos/add"
          className="rounded-lg bg-[#1e1e3f] px-4 py-2 text-orange-300 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          Add Todo
        </Link>
        <Link
          href="/todos"
          className="rounded-lg bg-orange-300 px-4 py-2 text-[#1e1e3f] font-medium hover:bg-[#1e1e3f] hover:text-orange-300 transition"
        >
          View All Todos
        </Link>
      </div>

      {/* Quick List: Todos Due Today */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1e1e3f] mb-4">
          Todos Due Today
        </h2>

        {dueTodayTodos.length === 0 ? (
          <p className="text-gray-500">No todos due today.</p>
        ) : (
          <div className="grid gap-4">
            {dueTodayTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg bg-white p-4 shadow hover:shadow-md flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <Link
                    href={`/todos/${todo.id}`}
                    className="font-semibold text-[#1e1e3f] hover:text-orange-300 transition"
                  >
                    {todo.title}
                  </Link>
                  <p className="text-gray-500 text-sm">{todo.description}</p>
                </div>
                <span
                  className={`px-2 py-1 mt-2 md:mt-0 rounded-full text-xs font-medium ${
                    todo.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : todo.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {todo.status.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
