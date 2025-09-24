"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo } from "@/types";
import useAuthStore from "@/store/authStore";

export default function AddTodoPage() {
  const router = useRouter();
  const { currentUser } = useAuthStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Todo["status"]>("pending");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newTodo: Todo = {
      id: mockData.todos.length + 1,
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      status,
      priority,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockData.todos.push(newTodo);
    router.push("/todos");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto rounded-xl bg-white p-6 shadow"
      >
        <button
          onClick={() => router.back()}
          className="mb-4 rounded-lg bg-[#1e1e3f] px-3 py-1 text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          &larr; Back
        </button>

        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Add New Todo</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Title</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Description</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Due Date</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Status</label>
            <select
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value as Todo["status"])}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Priority</label>
            <select
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo["priority"])}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-[#1e1e3f] px-4 py-2 font-medium text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Add Todo
          </button>
        </form>
      </motion.div>
    </main>
  );
}
