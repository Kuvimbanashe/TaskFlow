# Todo Application

A modern, full-featured todo application built with Next.js, TypeScript, and Tailwind CSS. This application was created as part of a frontend developer position application to demonstrate competency in modern React development.

 **Live url**
 [https://task-flow-green.vercel.app](https://task-flow-green.vercel.app)
 

##  Features

- **User Authentication** - Secure login and registration system
-  **Dashboard** - Overview with task statistics (pending, due today, overdue)
- **Task Management** - Full CRUD operations for todos
-  **Due Date Tracking** - Set and track task deadlines
-  **Smart Filtering** - Filter tasks by status (all, pending, completed)
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
-  **Persistent Data** - Mock API with simulated persistence
- ⚡ **Real-time Updates** - Instant UI updates with Zustand state management
-  **Modern UI** - Beautiful gradient headings and consistent color scheme

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Components**: Custom component library
- **Development**: Hot reload, TypeScript strict mode

##  Design System

### Color Scheme
- **Headings**: Gradient from `#1e1e3f` to `orange-300`
- **Backgrounds**: `bg-white` or `bg-gray-50`
- **CTA Buttons**: `bg-[#1e1e3f]` with `text-orange-300`
- **Spacing**: Consistent padding (`py-2 px-4` for buttons)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Gradient text with bold weights
- **Body**: Clean, readable text with proper hierarchy

##  Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes (login, signup)
│   ├── (protected)/       # Authenticated routes (dashboard, todos)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components (navbar, etc.)
│   ├── protected/         # Protected route wrapper
│   ├── todos/             # Todo-specific components
│   └── ui/                # Base UI components
├── lib/                   # Utility libraries
│                  # Mock API implementation
│            # Zustand stores
│             # Helper functions
├── types/                 # TypeScript type definitions

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Kuvimbanashe/TaskFlow.git
   cd TaskFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Test Account

You can use the following credentials to test the application:

- **Email**: `cama@todo.com`
- **Password**: `password123`

Or create a new account using the registration form.

## 📖 Usage Guide

### For Users

1. **Landing Page**: Learn about the app features and navigate to login/signup
2. **Registration**: Create a new account with name, email, and password
3. **Dashboard**: View your task statistics and recent pending tasks
4. **All Tasks**: Browse, filter, and manage all your tasks in one place
5. **Task Details**: Click on any task to view details and perform actions
6. **Add Task**: Use the "Add Task" button to create new todos
7. **Edit Task**: Update task details, mark as complete, or set due dates

### For Developers

The application demonstrates:

- **Modern React Patterns**: Hooks, custom hooks, component composition
- **TypeScript Best Practices**: Strict typing, interfaces, type safety
- **State Management**: Global state with Zustand, local state with useState
- **API Integration**: Mock REST API with proper error handling
- **UI/UX Principles**: Loading states, error handling, responsive design
- **Code Organization**: Modular architecture, separation of concerns

## 🔧 Key Features Implementation

### Mock API System
The application uses a sophisticated mock API that simulates real backend behavior:

- **Simulated Network Delay**: All API calls have artificial delays
- **Error Handling**: Proper error simulation and handling
- **Data Persistence**: In-memory storage that persists during development
- **RESTful Patterns**: GET, POST, PUT, DELETE operations

### Authentication Flow
- JWT-like token simulation
- Protected route implementation
- Persistent login state
- Secure logout functionality

### Task Management
- **Create**: Add new tasks with title, description, and due date
- **Read**: View tasks in list or detail view
- **Update**: Edit task details or toggle completion status
- **Delete**: Remove tasks with confirmation
- **Filter**: View tasks by status (all, pending, completed)

### Dashboard Analytics
- **Pending Tasks**: Count of incomplete tasks
- **Due Today**: Tasks with today's due date
- **Overdue Tasks**: Tasks past their due date

## 🎯 Competency Demonstration

This project showcases expertise in:

### Frontend Development
- ✅ React with TypeScript
- ✅ Next.js App Router
- ✅ Component design and reusability
- ✅ State management patterns
- ✅ API integration and data fetching
- ✅ Error boundary implementation

### UI/UX Excellence
- ✅ Responsive design principles
- ✅ Loading states and skeleton screens
- ✅ Form validation and user feedback
- ✅ Accessibility considerations
- ✅ Consistent design system

### Code Quality
- ✅ TypeScript strict mode
- ✅ Clean, readable code structure
- ✅ Proper commenting and documentation
- ✅ Error handling throughout
- ✅ Performance optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed to any platform that supports Next.js:

```bash
# Build the application
npm run build

# Start production server
npm start
```

Supported platforms include:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify
- Heroku

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run dev
   ```

2. **TypeScript Errors**
   - Ensure all TypeScript strict rules are satisfied
   - Check type definitions in `/types` directory

3. **Mock Data Not Persisting**
   - The mock API uses in-memory storage
   - Data persists during development hot reloads
   - Page refresh will reset to initial seed data






---

**Built with ❤️ for modern frontend development demonstration**

*This application successfully demonstrates competency in React, TypeScript, state management, API integration, and user experience design.*