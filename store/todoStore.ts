import { create } from 'zustand';
import { TodoState, Todo, DashboardStats } from '@/types';
import { todoApi } from '@/lib/mockApi';

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const todos = await todoApi.getTodos(userId);
      set({ todos, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addTodo: async (todoData) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await todoApi.createTodo(todoData);
      set((state) => ({ 
        todos: [...state.todos, newTodo], 
        loading: false 
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await todoApi.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },
}));

export const getDashboardStats = (todos: Todo[]): DashboardStats => {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    pending: todos.filter(todo => !todo.completed).length,
    dueToday: todos.filter(todo => 
      !todo.completed && todo.dueDate === today
    ).length,
    overdue: todos.filter(todo => 
      !todo.completed && todo.dueDate && todo.dueDate < today
    ).length,
  };
};