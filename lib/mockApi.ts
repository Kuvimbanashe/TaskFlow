import { Todo, User } from '@/types';

// Helper functions to read/write to localStorage

interface newUserI {
  email: string;
  name: string;
  password: string;
}

// Define the database structure
interface Database {
  users: User[];
  todos: Todo[];
}

const readData = (): Database => {
  if (typeof window === 'undefined') {
    return { users: [], todos: [] };
  }
  
  try {
    const data = localStorage.getItem('todo-app-data');
    return data ? JSON.parse(data) : { users: [], todos: [] };
  } catch (error) {
    console.log(error)
    return { users: [], todos: [] };
  }
};

const writeData = (data: Database) => { // Changed from Todo to Database
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('todo-app-data', JSON.stringify(data));
  } catch (error) {
    throw new Error('Failed to save data');
  }
};

// Initialize with default data if empty
const initializeData = () => {
  const data = readData();
  if (data.users.length === 0) {
    const defaultData: Database = { // Add type annotation
      users: [
        {
          id: "1",
          name: "Camaraderie Mavenga",
          email: "cama@todo.com",
          password: "password123",
          createdAt: "2024-01-01T00:00:00.000Z"
        }
      ],
      todos: [
        {
          id: "1",
          title: "Welcome to Todo App",
          description: "This is your first task",
          completed: false,
          dueDate: "2024-12-31",
          userId: "1",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        }
      ]
    };
    writeData(defaultData);
  }
};

// Initialize on first import
if (typeof window !== 'undefined') {
  initializeData();
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Users API
export const authApi = {
  login: async (email: string, password: string): Promise<Omit<User, 'password'>> => {
    await delay(500);
    const data = readData();
    const user = data.users.find((u: User) => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  register: async (userData: newUserI): Promise<Omit<User, 'password'>> => {
    await delay(500);
    const data = readData();
    
    if (data.users.find((u: User) => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    data.users.push(newUser);
    writeData(data);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
};

// Todos API
export const todoApi = {
  getTodos: async (userId: string): Promise<Todo[]> => {
    await delay(300);
    const data = readData();
    return data.todos.filter((todo: Todo) => todo.userId === userId);
  },

  createTodo: async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
    await delay(500);
    const data = readData();
    
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    data.todos.push(newTodo);
    writeData(data);
    return newTodo;
  },

  updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    await delay(500);
    const data = readData();
    const todoIndex = data.todos.findIndex((todo: Todo) => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo: Todo = {
      ...data.todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    data.todos[todoIndex] = updatedTodo;
    writeData(data);
    return updatedTodo;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await delay(300);
    const data = readData();
    const todoIndex = data.todos.findIndex((todo: Todo) => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    data.todos.splice(todoIndex, 1);
    writeData(data);
  },
};