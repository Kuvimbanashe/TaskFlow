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
    <div className="gap-y-4 flex flex-col">
      {filteredTodos.map((todo) => (
    <div key={todo.id} >
       <TodoItem todo={todo} />
    </div>
       
      ))}
    </div>
  );
};