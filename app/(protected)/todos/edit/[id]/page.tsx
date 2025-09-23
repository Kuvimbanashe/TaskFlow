"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import mockData from "@/mockData.json";
import { Todo, User } from "@/types";

export default function EditTodoPage() {
  const { id } = useParams();
  const router = useRouter();
  const isEditMode = !!id;
  const todoId = Number(id);

  // Mock users
  const users: User[] = mockData.users;

  // Find todo if editing
  const existingTodo = mockData.todos.find((t) => t.id === todoId);

  // Form state
  const [title, setTitle] = useState(existingTodo?.title || "");
  const [description, setDescription] = useState(existingTodo?.description || "");
  const [dueDate, setDueDate] = useState(
    existingTodo ? existingTodo.dueDate.substring(0, 16) : ""
  ); // format YYYY-MM-DDTHH:mm
  const [status, setStatus] = useState(existingTodo?.status || "pending");
  const [priority, setPriority] = useState(existingTodo?.priority || "medium");
  const [assignedTo, setAssignedTo] = useState(existingTodo?.assignedTo || users[0]?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: isEditMode ? todoId : mockData.todos.length + 1,
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      status: status as Todo["status"],
      priority: priority as Todo["priority"],
      assignedTo: Number(assignedTo),
      createdAt: isEditMode ? existingTodo!.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEditMode) {
      const index = mockData.todos.findIndex((t) => t.id === todoId);
      mockData.todos[index] = newTodo;
    } else {
      mockData.todos.push(newTodo);
    }

    // Redirect to All Todos page
    router.push("/todos");
  };

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

        <h1 className="text-2xl font-bold text-[#1e1e3f] mb-4">
          {isEditMode ? "Edit Todo" : "Create New Todo"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Title
            </label>
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
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Due Date
            </label>
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
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Status
            </label>
            <select
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Priority
            </label>
            <select
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Assigned User */}
          <div>
            <label className="block text-sm font-medium text-[#1e1e3f]">
              Assigned To
            </label>
            <select
              className="w-full rounded-lg border px-3 py-2 mt-1"
              value={assignedTo}
              onChange={(e) => setAssignedTo(Number(e.target.value))}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName}
                </option>
              ))}
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
