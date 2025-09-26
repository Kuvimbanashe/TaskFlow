'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types';
import { useTodoStore } from '@/store/todoStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

interface TodoFormProps {
  todo?: Todo;
  mode: 'create' | 'edit';
}

export const TodoForm = ({ todo, mode }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { addTodo, updateTodo } = useTodoStore();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate || '');
    }
  }, [mode, todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'create' && user) {
        await addTodo({
          title: title.trim(),
          description: description.trim(),
          completed: false,
          dueDate: dueDate || undefined,
          userId: user.id,
        });
        router.push('/todos');
      } else if (mode === 'edit' && todo) {
        await updateTodo(todo.id, {
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDate || undefined,
        });
        router.push('/todos');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shaow-sm py-2 px-4 focus:border-[#1e1e3f] focus:ring focus:ring-[#1e1e3f] focus:ring-opacity-50"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 border py-2 px-4 block w-full rounded-md border-gray-300 shaow-sm focus:border-[#1e1e3f] focus:ring focus:ring-[#1e1e3f] focus:ring-opacity-50"
            placeholder="Enter task description"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 border py-2 px-4 block w-full rounded-md border-gray-300 shad-sm focus:border-[#1e1e3f] focus:ring focus:ring-[#1e1e3f] focus:ring-opacity-50"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading 
              ? (mode === 'create' ? 'Creating...' : 'Updating...')
              : (mode === 'create' ? 'Create Task' : 'Update Task')
            }
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};