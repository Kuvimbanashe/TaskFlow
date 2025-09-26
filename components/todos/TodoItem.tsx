'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Edit, Trash2, Calendar } from 'lucide-react';
import { Todo } from '@/types';
import { useTodoStore } from '@/store/todoStore';
import { Button } from '@/components/ui/Button';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggleComplete = async () => {
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getDueDateColor = () => {
    if (!todo.dueDate) return 'text-gray-500';
    
    const today = new Date().toISOString().split('T')[0];
    const dueDate = todo.dueDate;
    
    if (dueDate < today) return 'text-red-500';
    if (dueDate === today) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <Link href={`/todos/${todo.id}`}  >
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
      todo.completed 
        ? 'border-l-green-500 bg-green-50' 
        : 'border-l-[#1e1e3f]'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={handleToggleComplete}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {todo.completed && <Check className="w-3 h-3 text-white" />}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-medium ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
            
            {todo.dueDate && (
              <div className="hidden items-center mt-2 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span className={getDueDateColor()}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="hidden items-center space-x-2 ml-4">
          <Link href={`/todos/edit/${todo.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
    
    </Link>
  );
};