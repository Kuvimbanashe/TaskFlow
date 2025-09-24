// app/(protected)/todos/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import mockData from "@/mockData.json";
import Link from "next/link";
import { Todo } from "@/types";

type FilterType = "all" | "pending" | "completed" | "overdue";
type SortType = "dueAsc" | "dueDesc" | "priority";

export default function TodosPage() {
  const { currentUser } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("dueAsc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    // Cast each todo to correct types
    const userTodos: Todo[] = mockData.todos
      .filter((t) => t.userId === currentUser.id)
      .map((t) => ({
        ...t,
        status: t.status as "pending" | "completed" | "overdue",
        priority: t.priority as "low" | "medium" | "high",
      }));

    setTodos(userTodos);
  }, [currentUser]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filter !== "all") result = result.filter((t) => t.status === filter);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (sort === "dueAsc")
      result.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    if (sort === "dueDesc")
      result.sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    if (sort === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return result;
  }, [todos, filter, sort, search]);

  if (!currentUser)
    return <p className="p-6">Please sign in to see your todos.</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-5 md:px-20 py-20">
      <div className="flex flex-co md:flex-row justify-between items-start md:items-center my-6 md:mt-16 md:pr-10 gap-4">
        <h1 className="text-3xl font-bold text-[#1e1e3f]">All Tasks</h1>

        <div className="flex flex-wrap gap-2">
          <Link href="/todos/add">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1e1e3f] text-orange-300 px-6 py-2 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
            >
              + Add Todo
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Filters, Sort, Search */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between my-6">
        <div className="flex gap-2 overflow-scroll w-full">
          {["all", "pending", "completed", "overdue"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as FilterType)}
              className={`px-3 py-1 rounded-lg font-medium ${
                filter === f
                  ? "bg-[#1e1e3f] text-orange-300"
                  : "bg-white border border-gray-300 text-[#1e1e3f] hover:bg-[#1e1e3f] hover:text-orange-300 transition"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full mt-6 md:mt-0">
  
          <select
          className="rounded-lg w-full md:w-fit border px-6 py-3 md:py-2 md:px-4 ml-auto md:ml-0"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
        >
          <option value="dueAsc">Due Date ↑</option>
          <option value="dueDesc">Due Date ↓</option>
          <option value="priority">Priority</option>
        </select>

        <input
          type="text"
          placeholder="Search todos..."
          className="rounded-lg border px-6 py-3 md:mt-0 md:ml-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
  
</div>
      </div>

      {/* Todos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTodos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-500"
            >
              No todos found.
            </motion.p>
          )}

          {filteredTodos.map((todo) => (
            <Link
            key={todo.id}
            href={`/todos/${todo.id}`}>
            
            <motion.div
              
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.12)",
              }}
              className={`bg-white p-6 rounded-xl shadow cursor-pointer  transition-colors ${
                todo.priority === "high"
                  ? "border-red-500"
                  : todo.priority === "medium"
                  ? "border-yellow-400"
                  : "border-green-400"
              }`}
            >
              <h3 className="text-[#1e1e3f] font-bold text-xl">{todo.title}</h3>
              <p className="text-gray-600 mt-2">{todo.description}</p>
              <p className="mt-3 hidden text-sm text-gray-500">
                Due: {new Date(todo.dueDate).toLocaleString()}
              </p>
              <p
                className={`mt-1 hidden font-medium ${
                  todo.status === "pending"
                    ? "text-yellow-500"
                    : todo.status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
              </p>
              <div className="mt-4 flex gap-3">
                
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-[#1e1e3f] hidden text-orange-300 rounded hover:bg-orange-300 hover:text-[#1e1e3f] transition"
                  >
                    Edit
                  </motion.button>
               
              </div>
            </motion.div>
             </Link>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
