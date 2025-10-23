# SQL Learning Platform - Implementation Plan

Based on the current codebase structure and project requirements from `.github/copilot-instructions.md`, here's what needs to be built:

## 🏗️ Current State

- ✅ React 19 + Vite 7 + TypeScript 5.8 scaffold
- ✅ ESLint configuration with strict TypeScript
- ✅ Basic App.tsx shell ("hello world")
- ✅ Empty directory structure: `components/`, `pages/`, `routes/`

## 📦 Phase 1: Foundation & Dependencies

### Install Core Dependencies

```bash
# Routing
npm install react-router-dom
npm install -D @types/react-router-dom

# UI Framework
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# State Management
npm install zustand

# Authentication & Database
npm install @supabase/supabase-js

# HTTP Client
npm install axios

# AI Integration
npm install @langchain/google-genai langchain

# SQL Editor
npm install @monaco-editor/react monaco-editor

# Data Visualization
npm install recharts

# Icons (optional)
npm install lucide-react
```

### Configure TailwindCSS

Create/update `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};
```

Create `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🗂️ Phase 2: Project Structure

### Complete File Structure to Build

```
src/
├── main.tsx                    # ✅ Exists - needs TailwindCSS import
├── App.tsx                     # ✅ Exists - needs router setup
├── index.css                   # ⚠️ CREATE - TailwindCSS styles
├── vite-env.d.ts              # ✅ Exists
│
├── components/
│   ├── Editor/
│   │   ├── SQLEditor.tsx           # Monaco-based SQL editor
│   │   ├── ResultsTable.tsx        # Display query results
│   │   ├── QueryExplanation.tsx    # AI-powered query explanation
│   │   └── EditorToolbar.tsx       # Execute, clear, hint buttons
│   │
│   ├── Chatbot/
│   │   ├── AIChatbot.tsx           # Gemini-powered chatbot
│   │   ├── ChatMessage.tsx         # Individual message component
│   │   └── ChatInput.tsx           # Text input with send button
│   │
│   ├── VoiceInput/
│   │   ├── VoiceCommandInput.tsx   # Web Speech API integration
│   │   └── VoiceButton.tsx         # Microphone button component
│   │
│   ├── Dashboard/
│   │   ├── ProgressCard.tsx        # User progress overview
│   │   ├── BadgeDisplay.tsx        # Achievement badges
│   │   ├── StatsChart.tsx          # Recharts visualization
│   │   └── LessonList.tsx          # List of available lessons
│   │
│   ├── Admin/
│   │   ├── LessonEditor.tsx        # Create/edit lessons
│   │   ├── ExerciseManager.tsx     # Manage SQL exercises
│   │   └── UserAnalytics.tsx       # View user statistics
│   │
│   ├── Auth/
│   │   ├── LoginForm.tsx           # Supabase email/password login
│   │   ├── SignupForm.tsx          # User registration
│   │   └── ProtectedRoute.tsx      # Route guard component
│   │
│   ├── Layout/
│   │   ├── Navbar.tsx              # Top navigation bar
│   │   ├── Sidebar.tsx             # Lesson navigation sidebar
│   │   ├── Footer.tsx              # Footer component
│   │   └── PageLayout.tsx          # Main layout wrapper
│   │
│   └── Common/
│       ├── Button.tsx              # Reusable button component
│       ├── Card.tsx                # Card container component
│       ├── Modal.tsx               # Modal dialog component
│       ├── LoadingSpinner.tsx      # Loading indicator
│       └── ErrorBoundary.tsx       # Error boundary wrapper
│
├── pages/
│   ├── HomePage.tsx                # Landing page with overview
│   ├── LessonPage.tsx              # Individual lesson with editor
│   ├── DashboardPage.tsx           # User progress dashboard
│   ├── AdminPage.tsx               # Admin panel (protected)
│   ├── LoginPage.tsx               # Login/signup page
│   └── NotFoundPage.tsx            # 404 error page
│
├── routes/
│   ├── AppRouter.tsx               # Main routing configuration
│   └── routes.ts                   # Route path constants
│
├── hooks/
│   ├── useAuth.tsx                 # Supabase authentication hook
│   ├── useUserProgress.ts          # User progress tracking
│   ├── useSQLExecution.ts          # SQL query execution
│   ├── useGemini.ts                # Gemini AI integration hook
│   └── useVoiceRecognition.ts      # Web Speech API hook
│
├── services/
│   ├── supabase.ts                 # Supabase client initialization
│   ├── apiService.ts               # Django API client
│   ├── geminiService.ts            # Gemini AI service layer
│   └── sqlService.ts               # SQL execution service
│
├── stores/
│   ├── userProgressStore.ts        # Zustand store for progress
│   ├── lessonStore.ts              # Zustand store for lessons
│   └── authStore.ts                # Zustand store for auth state
│
├── types/
│   ├── lesson.ts                   # Lesson type definitions
│   ├── user.ts                     # User type definitions
│   ├── exercise.ts                 # Exercise type definitions
│   └── api.ts                      # API response types
│
└── utils/
    ├── sqlValidator.ts             # SQL syntax validation
    ├── formatters.ts               # Data formatting utilities
    ├── constants.ts                # App-wide constants
    └── helpers.ts                  # General helper functions
```

## 🎯 Phase 3: Core Components Implementation

### 1. Update `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Add TailwindCSS

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 2. Create `src/routes/AppRouter.tsx`

```tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LessonPage from "../pages/LessonPage.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ProtectedRoute from "../components/Auth/ProtectedRoute.tsx";
import PageLayout from "../components/Layout/PageLayout.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="lessons/:lessonId" element={<LessonPage />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Update `src/App.tsx`

```tsx
import AppRouter from "./routes/AppRouter.tsx";

export default function App() {
  return <AppRouter />;
}
```

### 4. Create `src/services/supabase.ts`

```tsx
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          role: "student" | "admin";
          created_at: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          difficulty: "beginner" | "intermediate" | "advanced";
          order: number;
          created_at: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          score: number;
          completed_at: string | null;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          badge_type: string;
          earned_at: string;
        };
      };
    };
  };
}
```

### 5. Create `src/services/geminiService.ts`

````tsx
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey,
  temperature: 0.7,
  maxOutputTokens: 2048,
});

export async function explainSQLQuery(sqlCode: string): Promise<string> {
  if (!apiKey) throw new Error("Gemini API key not configured");

  const messages = [
    new SystemMessage(
      "You are a SQL tutor. Explain SQL queries in simple, clear terms. " +
        "Break down each clause and explain what it does."
    ),
    new HumanMessage(`Explain this SQL query:\n\n${sqlCode}`),
  ];

  const response = await model.invoke(messages);
  return response.content.toString();
}

export async function naturalLanguageToSQL(
  userInput: string,
  schema?: string
): Promise<string> {
  if (!apiKey) throw new Error("Gemini API key not configured");

  const schemaContext = schema ? `\n\nDatabase schema:\n${schema}` : "";

  const messages = [
    new SystemMessage(
      "You are a SQL expert. Convert natural language requests to valid SQL queries. " +
        "Only respond with the SQL code, no explanations. " +
        "Use standard SQL syntax." +
        schemaContext
    ),
    new HumanMessage(userInput),
  ];

  const response = await model.invoke(messages);
  return response.content
    .toString()
    .replace(/```sql\n?|\n?```/g, "")
    .trim();
}

export async function generateHint(
  exercise: string,
  userAttempt: string,
  attemptCount: number
): Promise<string> {
  if (!apiKey) throw new Error("Gemini API key not configured");

  const hintLevel =
    attemptCount === 1
      ? "subtle"
      : attemptCount === 2
      ? "moderate"
      : "detailed";

  const messages = [
    new SystemMessage(
      `You are a helpful SQL tutor. Provide a ${hintLevel} hint without giving away the full answer. ` +
        "Be encouraging and educational."
    ),
    new HumanMessage(
      `Exercise: ${exercise}\n` +
        `User's attempt: ${userAttempt}\n` +
        `Attempt number: ${attemptCount}\n` +
        `Provide a hint.`
    ),
  ];

  const response = await model.invoke(messages);
  return response.content.toString();
}

export async function correctSQLErrors(
  sqlCode: string,
  error: string
): Promise<{ suggestion: string; explanation: string }> {
  if (!apiKey) throw new Error("Gemini API key not configured");

  const messages = [
    new SystemMessage(
      "You are a SQL expert. Analyze SQL errors and suggest corrections. " +
        "Provide both a corrected query and an explanation of what was wrong."
    ),
    new HumanMessage(
      `SQL Query:\n${sqlCode}\n\n` +
        `Error:\n${error}\n\n` +
        `Provide:\n1. Corrected query\n2. Explanation of the error`
    ),
  ];

  const response = await model.invoke(messages);
  const content = response.content.toString();

  // Parse response (simplified - adjust based on actual response format)
  const parts = content.split("\n\n");
  return {
    suggestion: parts[0] || "No suggestion available",
    explanation: parts[1] || "No explanation available",
  };
}
````

### 6. Create `src/hooks/useAuth.tsx`

```tsx
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase.ts";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
}
```

### 7. Create `src/stores/userProgressStore.ts`

```tsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProgress {
  completedLessons: string[];
  currentLesson: string | null;
  points: number;
  badges: string[];
  lessonScores: Record<string, number>;

  // Actions
  addCompletedLesson: (lessonId: string, score: number) => void;
  addPoints: (amount: number) => void;
  addBadge: (badgeType: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useUserProgressStore = create<UserProgress>()(
  persist(
    (set) => ({
      completedLessons: [],
      currentLesson: null,
      points: 0,
      badges: [],
      lessonScores: {},

      addCompletedLesson: (lessonId, score) =>
        set((state) => ({
          completedLessons: [...new Set([...state.completedLessons, lessonId])],
          lessonScores: { ...state.lessonScores, [lessonId]: score },
        })),

      addPoints: (amount) =>
        set((state) => ({ points: state.points + amount })),

      addBadge: (badgeType) =>
        set((state) => ({
          badges: [...new Set([...state.badges, badgeType])],
        })),

      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      resetProgress: () =>
        set({
          completedLessons: [],
          currentLesson: null,
          points: 0,
          badges: [],
          lessonScores: {},
        }),
    }),
    {
      name: "user-progress-storage",
    }
  )
);
```

## 🎨 Phase 4: Key UI Components

### 8. Create `src/components/Editor/SQLEditor.tsx`

```tsx
import { useState } from "react";
import Editor from "@monaco-editor/react";

interface SQLEditorProps {
  initialCode?: string;
  onExecute: (code: string) => Promise<void>;
  readOnly?: boolean;
  height?: string;
}

export default function SQLEditor({
  initialCode = "",
  onExecute,
  readOnly = false,
  height = "300px",
}: SQLEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await onExecute(code);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setCode("");
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Editor
        height={height}
        defaultLanguage="sql"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleExecute}
            disabled={readOnly || isExecuting || !code.trim()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isExecuting ? "⏳ Executing..." : "▶️ Execute"}
          </button>
          <button
            onClick={handleClear}
            disabled={readOnly || !code.trim()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            🗑️ Clear
          </button>
        </div>
        <span className="text-gray-400 text-sm">
          {code.split("\n").length} lines
        </span>
      </div>
    </div>
  );
}
```

### 9. Create `src/components/Editor/ResultsTable.tsx`

```tsx
interface ResultsTableProps {
  data: Record<string, unknown>[];
  columns: string[];
  error?: string;
}

export default function ResultsTable({
  data,
  columns,
  error,
}: ResultsTableProps) {
  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-lg p-4">
        <h3 className="text-error font-semibold mb-2">❌ Error</h3>
        <pre className="text-sm text-error whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border rounded-lg p-8 text-center">
        <p className="text-gray-500">No results to display</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-sm text-gray-900">
                    {String(row[col] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600">
        {data.length} row{data.length !== 1 ? "s" : ""} returned
      </div>
    </div>
  );
}
```

### 10. Create `src/components/Chatbot/AIChatbot.tsx`

```tsx
import { useState, useRef, useEffect } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your SQL tutor. Ask me anything about SQL!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<ConversationChain | null>(null);

  useEffect(() => {
    // Initialize LangChain conversation
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      temperature: 0.8,
    });

    const memory = new BufferMemory();
    chainRef.current = new ConversationChain({ llm: model, memory });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chainRef.current) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chainRef.current.call({ input });
      const assistantMessage: Message = {
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 rounded-t-lg">
        <h3 className="font-semibold">🤖 AI SQL Tutor</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
              <span className="text-sm">AI is typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about SQL..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 
                   disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
```

## 🔐 Phase 5: Authentication & Protected Routes

### 11. Create `src/components/Auth/ProtectedRoute.tsx`

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check admin role if required
  if (adminOnly) {
    const userRole = user.user_metadata?.role;
    if (userRole !== "admin") {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
```

## 📊 Phase 6: Dashboard & Progress Tracking

### 12. Create `src/components/Dashboard/ProgressCard.tsx`

```tsx
import { useUserProgressStore } from "../../stores/userProgressStore.ts";

interface ProgressCardProps {
  totalLessons: number;
}

export default function ProgressCard({ totalLessons }: ProgressCardProps) {
  const { completedLessons, points, badges } = useUserProgressStore();
  const progressPercentage = (completedLessons.length / totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📈 Your Progress
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-medium">Lessons Completed</span>
          <span className="font-semibold text-primary">
            {completedLessons.length}/{totalLessons}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {progressPercentage.toFixed(0)}% Complete
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary">{points}</div>
          <div className="text-sm text-gray-600 mt-1">Points Earned</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-secondary">
            {badges.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Badges Collected</div>
        </div>
      </div>
    </div>
  );
}
```

## 🎤 Phase 7: Voice Commands

### 13. Create `src/hooks/useVoiceRecognition.ts`

```tsx
import { useState, useEffect, useRef } from "react";

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError("Speech recognition is not supported in this browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setError(null);
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
    isSupported: !!recognitionRef.current,
  };
}
```

## 🌐 Phase 8: Environment Variables

### 14. Create `.env.example`

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-key

# Django Backend API
VITE_API_URL=http://localhost:8000/api

# Google Gemini AI
VITE_GEMINI_API_KEY=your-gemini-api-key

# Optional: Feature Flags
VITE_ENABLE_VOICE_COMMANDS=true
VITE_ENABLE_AI_CHATBOT=true
```

### 15. Update `.gitignore`

```
# Environment variables
.env
.env.local
.env.development
.env.production

# Existing entries remain...
```

## 📋 Implementation Checklist

### Frontend Foundation

- [ ] Install all dependencies
- [ ] Configure TailwindCSS
- [ ] Set up routing with React Router
- [ ] Create environment variables (.env)
- [ ] Set up Zustand stores

### Authentication & Security

- [ ] Initialize Supabase client
- [ ] Create useAuth hook
- [ ] Build Login/Signup forms
- [ ] Implement ProtectedRoute component
- [ ] Set up role-based access control

### Core Features - SQL Editor

- [ ] Integrate Monaco Editor
- [ ] Create SQLEditor component
- [ ] Build ResultsTable component
- [ ] Implement query execution service
- [ ] Add syntax highlighting

### AI Integration - Gemini

- [ ] Set up Gemini service layer
- [ ] Create AI Chatbot component
- [ ] Implement query explanation feature
- [ ] Build natural language to SQL converter
- [ ] Add progressive hint system

### Voice Commands

- [ ] Create useVoiceRecognition hook
- [ ] Build VoiceCommandInput component
- [ ] Integrate with Gemini for interpretation
- [ ] Add voice-to-SQL conversion

### Progress & Gamification

- [ ] Build Dashboard page
- [ ] Create ProgressCard component
- [ ] Implement BadgeDisplay component
- [ ] Add StatsChart with Recharts
- [ ] Sync progress with Supabase

### Admin Panel

- [ ] Build LessonEditor component
- [ ] Create ExerciseManager
- [ ] Add user analytics view
- [ ] Implement CRUD operations

### UI/UX Polish

- [ ] Create consistent Layout components
- [ ] Build reusable UI components (Button, Card, Modal)
- [ ] Add loading states and error handling
- [ ] Implement responsive design
- [ ] Add animations and transitions

### Testing & Deployment

- [ ] Test all components individually
- [ ] Integration testing
- [ ] Configure Vercel deployment
- [ ] Set up production environment variables
- [ ] Test with real Supabase database

## 🚀 Development Priority Order

1. **Week 1: Foundation**

   - Install dependencies
   - Set up routing and layout
   - Configure authentication

2. **Week 2: SQL Editor**

   - Build SQL editor with Monaco
   - Implement query execution
   - Add results display

3. **Week 3: AI Features**

   - Integrate Gemini AI
   - Build chatbot interface
   - Add query explanation

4. **Week 4: Gamification**

   - Implement progress tracking
   - Add badges and points
   - Build dashboard

5. **Week 5: Voice & Polish**

   - Add voice commands
   - Complete admin panel
   - UI/UX improvements

6. **Week 6: Testing & Deployment**
   - End-to-end testing
   - Deploy to Vercel
   - Production setup

## 📚 Additional Resources Needed

- **Database Schema**: Create Supabase tables for lessons, users, progress, badges
- **Sample Lessons**: Prepare SQL lesson content and exercises
- **Django Backend**: Build REST API endpoints for SQL execution
- **Design System**: Define color schemes, typography, spacing
- **Test Data**: Create sample datasets for SQL practice

---

**Next Steps**: Start with Phase 1 by installing dependencies and setting up the basic routing structure!
