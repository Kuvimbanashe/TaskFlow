// app/(protected)/todos/edit/[id]/page.tsx
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

    const t = mockData.todos
      .filter((t) => t.userId === currentUser.id)
      .map((t) => ({
        ...t,
        status: t.status as "pending" | "completed" | "overdue",
        priority: t.priority as "low" | "medium" | "high",
      }))
      .find((t) => t.id === Number(params.id));

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

  if (!todo) return <p className="p-6 mt-24">Todo not found or you don&apost have access.</p>;

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
          Back
        </button>

        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">Edit Todo</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="rounded-lg border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
          
            placeholder="Description"
            className="rounded-lg border px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="datetime-local"
            className="rounded-lg border px-3 py-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            className="rounded-lg border px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as Todo["status"])}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            className="rounded-lg border px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo["priority"])}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-[#1e1e3f] px-4 py-2 text-orange-300 hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Save
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
