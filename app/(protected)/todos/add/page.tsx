'use client';

import { TodoForm } from '@/components/todos/TodoForm';

export default function AddTodoPage() {
  return (
    <div className="space-y-6 py-20">
      <h1 className="text-3xl text-center font-bold gradient-heading">Add New Task</h1>
      <TodoForm mode="create" />
    </div>
  );
}