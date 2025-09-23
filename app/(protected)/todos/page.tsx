"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo } from "@/types";
import Link from "next/link";

// Status colors
const statusColors: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  completed: "bg-green-200 text-green-800",
  overdue: "bg-red-200 text-red-800",
};

// Priority colors
const priorityColors: Record<string, string> = {
  low: "bg-blue-200 text-blue-800",
  medium: "bg-orange-200 text-orange-800",
  high: "bg-red-300 text-red-900",
};

export default function AllTodosPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  let todos: Todo[] = mockData.todos;

  // Apply filters
  if (statusFilter !== "all") {
    todos = todos.filter((t) => t.status === statusFilter);
  }
  if (priorityFilter !== "all") {
    todos = todos.filter((t) => t.priority === priorityFilter);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-[#1e1e3f]">All </span>
        <span className="text-orange-300">Todos</span>
      </h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="rounded-lg border px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          className="rounded-lg border px-3 py-2"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Todos List */}
      <div className="grid gap-4">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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

            <div className="flex gap-2 mt-2 md:mt-0">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[todo.status]}`}
              >
                {todo.status.toUpperCase()}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}
              >
                {todo.priority.toUpperCase()}
              </span>
            </div>
          </motion.div>
        ))}

        {todos.length === 0 && (
          <p className="text-gray-500">No todos found with the selected filters.</p>
        )}
      </div>
    </main>
  );
}
