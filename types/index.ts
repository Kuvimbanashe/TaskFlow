export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // plain text for mock (never do this in production)
}

export type TodoStatus = "pending" | "completed" | "overdue";

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO string
  status: TodoStatus;
  priority: "low" | "medium" | "high";
  assignedTo: number; // user id
  createdAt: string;
  updatedAt: string;
}
