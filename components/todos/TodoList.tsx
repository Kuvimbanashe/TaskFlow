'use client';

import { Todo } from '@/types';
import { TodoItem } from './TodoItem';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  filter?: 'all' | 'pending' | 'completed';
}

export const TodoList = ({ todos, loading, filter = 'all' }: TodoListProps) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filter === 'completed' 
            ? 'No completed tasks yet.' 
            : filter === 'pending'
            ? 'No pending tasks. Great job!'
            : 'No tasks found. Add your first task!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};