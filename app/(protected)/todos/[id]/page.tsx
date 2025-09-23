
"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo, User } from "@/types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  completed: "bg-green-200 text-green-800",
  overdue: "bg-red-200 text-red-800",
};

const priorityColors: Record<string, string> = {
  low: "bg-blue-200 text-blue-800",
  medium: "bg-orange-200 text-orange-800",
  high: "bg-red-300 text-red-900",
};

export default function TodoDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); // string id from URL
  const todoId = Number(id);

  // Find the todo
  const todo: Todo | undefined = mockData.todos.find((t) => t.id === todoId);

  if (!todo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-[#1e1e3f]">
        Todo not found
      </div>
    );
  }

  // Find assigned user
  const assignedUser: User | undefined = mockData.users.find(
    (u) => u.id === todo.assignedTo
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto rounded-xl bg-white p-6 shadow"
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-4 rounded-lg bg-[#1e1e3f] px-3 py-1 text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          &larr; Back
        </button>

        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-2">{todo.title}</h1>
        <p className="text-gray-600 mb-4">{todo.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[todo.status]}`}>
            {todo.status.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
            {todo.priority.toUpperCase()}
          </span>
        </div>

        <div className="mb-4 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Assigned to:</strong> {assignedUser?.fullName || "N/A"}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(todo.dueDate).toLocaleString()}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(todo.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(todo.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Edit button (placeholder) */}
        <button
          onClick={() => router.push(`/todos/edit/${todo.id}`)}
          className="rounded-lg bg-orange-300 px-4 py-2 font-medium text-[#1e1e3f] hover:bg-[#1e1e3f] hover:text-orange-300 transition"
        >
          Edit Todo
        </button>
      </motion.div>
    </main>
  );
}
