'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTodoStore, getDashboardStats } from '@/store/todoStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';



import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { todos, loading, fetchTodos } = useTodoStore();
  
  const stats = getDashboardStats(todos);

  useEffect(() => {
    if (user) {
      fetchTodos(user.id);
    }
  }, [user, fetchTodos]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 py-20">
    
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 md:items-center md:justify-between">
          <h1 className="text-3xl font-bold  text-[#1e1e3f] ">
        Dashboard
      </h1>
      

        <div className="flex space-x-3 mt-4 sm:mt-0">
              <Link href={`/todos/add`}>
                <Button>

                  Add New Task
                </Button>
              </Link>
              
              <Link href={`/todos`}>
              <Button
                variant="outline"
                
                className="text-[#1e1e3f] bg-gray-50 hover:bg-orange-50 inline-flex"
              >
              View All Tasks
              </Button>
              
               </Link>
            </div>
    
        
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
          <p className="text-3xl font-bold text-[#1e1e3f]">{stats.pending}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Due Today</h3>
          <p className="text-3xl font-bold text-orange-500">{stats.dueToday}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Overdue</h3>
          <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
        </div>
      </div>

      {/*  pending todos */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-2xl font-semibold"> Pending <span className="text-orange-300">
            Tasks
          </span></h3>
        </div>
        <div className="divide-y divide-gray-200">
          {todos.filter(todo => !todo.completed).map((todo) => (
           <div key={todo.id}>
             
             <Link   href={`/todos/${todo.id}`}  >
            <div className="px-6 py-4 bordert border-gray-200" >

              <h4 className="font-medium">{todo.title}</h4>
              <p className="text-sm text-gray-600">{todo.description}</p>
             
            </div>
             </Link>
             
           </div>
          
          ))}
        </div>
      </div>
    </div>
  );
}