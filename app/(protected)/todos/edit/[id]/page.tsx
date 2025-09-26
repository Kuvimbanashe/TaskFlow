'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import  {useAuthStore}  from '@/store/authStore';
import { useTodoStore } from '@/store/todoStore';
import { TodoForm } from '@/components/todos/TodoForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Todo } from '@/types';

export default function EditTodoPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { user } = useAuthStore();
  const { todos, fetchTodos } = useTodoStore();
  const [todo, setTodo] = useState<Todo | undefined>();

  useEffect(() => {
    if (user) {
      fetchTodos(user.id);
    }
  }, [user, fetchTodos]);

  useEffect(() => {
    if (todos.length > 0) {
      const foundTodo = todos.find(t => t.id === id);
      setTodo(foundTodo);
    }
  }, [todos, id]);

  if (!todo) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-20">
      <h1 className="text-3xl text-center font-bold gradient-heading">Edit Task</h1>
      <TodoForm todo={todo} mode="edit" />
    </div>
  );
}