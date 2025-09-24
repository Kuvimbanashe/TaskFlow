"use client";

import { useParams } from "next/navigation";
import mockData from "@/mockData.json";
import { Todo } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TodoDetailPage() {
  const params = useParams();
  const todoId = Number(params.id);

  // Find the todo and cast status & priority to correct union types
  const found = mockData.todos.find((t) => t.id === todoId);

  const todo: Todo | undefined = found && {
    ...found,
    status: found.status as "pending" | "completed" | "overdue",
    priority: found.priority as "low" | "medium" | "high",
  };

  if (!todo)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Todo not found.</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-block mb-4 px-4 py-2 rounded-lg bg-[#1e1e3f] text-orange-300 font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
      >
        &larr; Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-white p-6 shadow-md"
      >
        <h1 className="text-3xl font-bold text-[#1e1e3f] mb-4">
          {todo.title}
        </h1>
        <p className="text-gray-600 mb-4">{todo.description}</p>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className={`px-3 py-1 rounded-full font-medium text-sm 
            ${
              todo.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : todo.status === "completed"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            Status: {todo.status.toUpperCase()}
          </div>

          <div className="px-3 py-1 rounded-full font-medium text-sm 
            ${
              todo.priority === "low"
                ? "bg-blue-200 text-blue-800"
                : todo.priority === "medium"
                ? "bg-purple-200 text-purple-800"
                : "bg-pink-200 text-pink-800"
            }"
          >
            Priority: {todo.priority.toUpperCase()}
          </div>

          <div className="px-3 py-1 rounded-full font-medium text-sm bg-gray-200 text-gray-800">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          Created At: {new Date(todo.createdAt).toLocaleString()}
        </div>
        <div className="text-gray-500 text-sm">
          Updated At: {new Date(todo.updatedAt).toLocaleString()}
        </div>
      </motion.div>
    </main>
  );
}
