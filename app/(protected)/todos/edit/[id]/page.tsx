"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo } from "@/types";
import useAuthStore from "@/store/authStore";

export default function EditTodoPage() {
  const router = useRouter();
  const params = useParams();
  const { currentUser } = useAuthStore();
  const [todo, setTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Todo["status"]>("pending");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  useEffect(() => {
    if (!currentUser) return;
    const t = mockData.todos.find(
      (t) => t.id === Number(params.id) && t.userId === currentUser.id
    );
    if (t) {
      setTodo(t);
      setTitle(t.title);
      setDescription(t.description);
      setDueDate(t.dueDate.substring(0, 16));
      setStatus(t.status);
      setPriority(t.priority);
    }
  }, [params.id, currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;

    todo.title = title;
    todo.description = description;
    todo.dueDate = new Date(dueDate).toISOString();
    todo.status = status;
    todo.priority = priority;
    todo.updatedAt = new Date().toISOString();

    router.push("/todos");
  };

  if (!todo) return <p className="p-6">Todo not found or you don&apost have access.</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
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

        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Edit Todo</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">Description</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

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
            Update Todo
          </button>
        </form>
      </motion.div>
    </main>
  );
}
