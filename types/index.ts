export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // plain text for mock (never do this in production)
}

export type TodoStatus = "pending" | "completed" | "overdue";

// types/index.ts
export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO string
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  userId: number; // the owner of this todo
  createdAt: string;
  updatedAt: string;
}
