'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Calendar, Check, Clock, User } from 'lucide-react';
import {useAuthStore} from '@/store/authStore';
import { todoApi } from '@/lib/mockApi';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { Todo } from '@/types';

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const { user } = useAuthStore();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      
      
      try {
        setLoading(true);
        // Fetch all user's todos and find the specific one
        const todos = await todoApi.getTodos(user.id);
        const foundTodo = todos.find(t => t.id === id);
        setTodo(foundTodo || null);
      } catch (error) {
        console.error('Failed to fetch todo:', error);
        setTodo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleToggleComplete = async () => {
    if (!todo ) return;
    
    setIsToggling(true);
    try {
      const updatedTodo = await todoApi.updateTodo(todo.id, { 
        completed: !todo.completed 
      });
      setTodo(updatedTodo);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!todo ) return;
    
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await todoApi.deleteTodo(todo.id);
      router.push('/todos');
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Todo Not Found</h1>
          <p className="text-gray-600 mb-6">The task you are looking for does not exist or you do not have permission to view it.</p>
          <Button className="inline-flex" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getDueDateInfo = () => {
    if (!todo.dueDate) return null;
    
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const isOverdue = dueDate < today && !todo.completed;
    const isDueToday = dueDate.toDateString() === today.toDateString() && !todo.completed;
    
    return {
      date: dueDate,
      isOverdue,
      isDueToday,
      color: todo.completed ? 'text-green-600' : isOverdue ? 'text-red-600' : isDueToday ? 'text-orange-600' : 'text-gray-600'
    };
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="mb-6 inline-flex"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Previous Page
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Task Details</h1>
              <p className="text-gray-600 mt-2">View and manage your task</p>
            </div>
            

          </div>
        </div>

        {/* Todo Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Status Header */}
          <div className={`px-6 py-4 ${
            todo.completed 
              ? 'bg-green-50 border-b border-green-200' 
              : dueDateInfo?.isOverdue 
                ? 'bg-red-50 border-b border-red-200'
                : dueDateInfo?.isDueToday
                  ? 'bg-orange-50 border-b border-orange-200'
                  : 'bg-gray-50 border-b border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleComplete}
                  disabled={isToggling}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                  } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todo.completed
                    ? 'bg-green-100 text-green-800'
                    : dueDateInfo?.isOverdue
                      ? 'bg-red-100 text-red-800'
                      : dueDateInfo?.isDueToday
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                }`}>
                  {todo.completed ? 'Completed' : 
                   dueDateInfo?.isOverdue ? 'Overdue' :
                   dueDateInfo?.isDueToday ? 'Due Today' : 'In Progress'}
                </span>
              </div>
              
              <div className="text-sm text-gray-500">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h2 className={`text-2xl font-bold mb-4 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h2>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                {todo.description || 'No description provided.'}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className={dueDateInfo?.color || 'text-gray-600'}>
                    {todo.dueDate 
                      ? new Date(todo.dueDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'No due date'
                    }
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-600">
                    {new Date(todo.updatedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Check className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={todo.completed ? 'text-green-600' : 'text-orange-600'}>
                    {todo.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>

              {/* Owner */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Created By</p>
                  <p className="text-gray-600">{ 'You'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6  py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex md:w-fit space-x-3 mt-4 sm:mt-0">
              <Link href={`/todos/edit/${todo.id}`}>
                <Button>
                  <Edit className="w-4 h-4 mr-2 flex-1 inline-flex" />
                  Edit Task
                </Button>
              </Link>
              
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 border-red-200 hover:bg-red-50  inline-flex md:w-fit"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}