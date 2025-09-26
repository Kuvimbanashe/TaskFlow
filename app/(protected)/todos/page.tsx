'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTodoStore } from '@/store/todoStore';
import { TodoList } from '@/components/todos/TodoList';
import { TodoFilters } from '@/components/todos/TodoFilters';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TodosPage() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthStore();
  const { todos, loading, fetchTodos } = useTodoStore();

  useEffect(() => {
    if (user) {
      fetchTodos(user.id);
    }
  }, [user, fetchTodos]);

  return (
    <div className="space-y-6 py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-heading">My Tasks</h1>
        <Link href="/todos/add">
          <Button>Add New Task</Button>
        </Link>
      </div>

      <TodoFilters 
        currentFilter={currentFilter} 
        onFilterChange={setCurrentFilter} 
      />

      <TodoList 
        todos={todos} 
        loading={loading}
        filter={currentFilter as 'all' | 'pending' | 'completed' }
      />
    </div>
  );
}