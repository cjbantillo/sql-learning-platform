# SQL Learning Platform - AI Agent Guide

## Project Overview

An interactive SQL learning web application with AI-powered tutoring, inspired by W3Schools and SoloLearn. The platform combines hands-on SQL practice with real-time AI feedback, voice commands, gamification, and progress tracking.

**Current State**: Initial implementation phase - CSU-branded landing page with interactive SQL playground built using React components and inline styles. Core architecture established with reusable component patterns.

## Architecture & Tech Stack

### Frontend (Current Implementation)

- **Framework**: React 19 + Vite 7 + TypeScript 5.8
- **Build Tool**: Vite with SWC for fast refresh (@vitejs/plugin-react-swc)
- **Type System**: Strict TypeScript with bundler module resolution
- **Styling**: CSS Variables + Inline Styles (CSS-in-JS pattern via React style prop)
- **Entry Points**: `src/main.tsx` → `src/App.tsx`
- **Implemented Components**: Header, Footer, Card, Button, Modal, SQLPlayground, HomePage
- **Component Architecture**: Functional components with TypeScript interfaces for props

### Planned Backend (Not Yet Implemented)

- Django REST API for lesson management and query execution
- Supabase (PostgreSQL) for data persistence and authentication
- **Google Gemini AI** (Gemini 1.5 Flash/Pro) via LangChain for AI tutoring features
- Web Speech API integration for voice commands

## Development Workflow

### Essential Commands

```bash
npm run dev          # Start dev server with HMR (default: http://localhost:5173)
npm run build        # Type-check with tsc + production build
npm run lint         # ESLint with TypeScript parser
npm run preview      # Preview production build locally
```

### Type Checking Strategy

- Uses **project references** via `tsconfig.json` splitting app (`tsconfig.app.json`) and tooling (`tsconfig.node.json`) configs
- **Strict mode enabled**: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
- Build includes type-checking (`tsc -b`) before Vite bundle

## Code Conventions & Patterns

### Implemented Component Structure

```
src/
├── components/
│   ├── Button.tsx        # Reusable button with variant system (primary, accent, default)
│   ├── Card.tsx          # Container component with CSU design system
│   ├── Header.tsx        # Navigation with dark mode toggle
│   ├── Footer.tsx        # Footer with copyright info
│   ├── Modal.tsx         # Accessible modal dialog with keyboard support
│   └── SQLPlayground.tsx # Interactive SQL editor with mock query execution
├── pages/
│   └── HomePage.tsx      # Main landing page with hero, features, lessons
├── index.css             # Global styles and CSS variables
├── App.tsx               # Root component orchestrating layout
└── main.tsx              # React root initialization with CSS import
```

### Component Design Patterns

#### 1. **CSS Variables for Design System**

All colors defined in `src/index.css` using CSS custom properties:

```css
:root {
  --csu-green: #006400; /* Primary brand color */
  --csu-gold: #ffc727; /* Accent color */
  --charcoal: #1a1a1a; /* Dark backgrounds */
  --light: #f4f4f4; /* Light backgrounds */
  --text: #2b2b2b; /* Primary text */
  --muted: #7a7a7a; /* Secondary text */
  --success: #2ecc71; /* Success states */
}
```

#### 2. **Inline Styles Pattern**

Components use React's `style` prop for styling to avoid build dependencies:

- **Pros**: No CSS-in-JS library needed, component-scoped styles, TypeScript support
- **Cons**: No pseudo-classes (`:hover`), larger bundle size for repeated styles
- **Usage**: Combine inline styles with CSS variables for maintainability

```tsx
<button
  style={{
    background: "var(--csu-green)",
    padding: "12px 18px",
    borderRadius: "10px",
  }}
>
  Click me
</button>
```

#### 3. **Component Props with TypeScript Interfaces**

All components use explicit TypeScript interfaces:

```tsx
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "accent" | "default";
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  className?: string;
}
```

#### 4. **Modal State Management**

- Header triggers modal open via callback prop `onModalOpen`
- HomePage manages modal content and state
- Modal component handles accessibility (Escape key, backdrop click, aria attributes)

#### 5. **Mock Data Pattern**

SQLPlayground uses regex pattern matching to simulate query execution:

```tsx
if (/WHERE.*year.*=\s*3/i.test(query)) {
  // Return filtered mock data
}
```

### File Organization (Planned Structure from AI Guide)

```
src/
├── components/
│   ├── Editor/      # Interactive SQL Editor (Monaco/CodeMirror planned)
│   ├── Chatbot/     # AI Tutor chat interface
│   ├── VoiceInput/  # Web Speech API integration
│   ├── Dashboard/   # Progress tracking + gamification
│   ├── Admin/       # Lesson management (protected routes)
│   └── Charts/      # Query result visualization (Recharts/Chart.js)
├── pages/           # Route-level components
├── utils/           # Helper functions
├── hooks/           # Custom React hooks
└── services/        # API client logic (Supabase, Django REST, Gemini)
```

### TypeScript Standards

- **React 19 with TSX**: Use `.tsx` extension for components
- **No implicit any**: Strict typing enforced
- **Module imports**: Use `.tsx` extension explicitly in imports (required by `verbatimModuleSyntax`)
- **JSX Transform**: `react-jsx` - no need to import React in component files
- **Props Interfaces**: Define explicit interfaces for all component props
- **CSSProperties Type**: Use React's `CSSProperties` for inline style objects

### ESLint Configuration

- Extends `@eslint/js` recommended + `typescript-eslint` recommended
- Uses `eslint-plugin-react-hooks` (recommended-latest) and `eslint-plugin-react-refresh` (Vite preset)
- Ignores `dist/` directory automatically
- Targets ES2020 with browser globals

## Key Integration Points (Planned)

### AI Features Architecture (See `AI-Guide/ai_guide.md`)

**Core AI System**: Google Gemini via LangChain

- **Primary Model**: Gemini 1.5 Flash (cost-effective, fast responses)
- **Advanced Model**: Gemini 1.5 Pro (complex query optimization, detailed explanations)
- **Framework**: LangChain for orchestration and conversational memory

**AI-Powered Features**:

1. **SQL Editor**: Sandbox execution via Django API endpoint
2. **AI Tutor Chatbot**: LangChain + Gemini 1.5 Flash with conversational memory in sessionStorage
3. **Voice Commands**: Web Speech API → natural language → Gemini interpretation
4. **Query Explanation**: Analyzes user's SQL code with natural language explanations
5. **Natural Language to SQL**: Converts voice/text commands to SQL queries
   - Example: "Show all students older than 20" → `SELECT * FROM students WHERE age > 20;`
6. **Hint System**: Progressive hints for exercises, adaptive based on user mistakes

### Data Flow (Planned)

```
User Input (Editor/Voice) → Frontend (React)
                          ↓
            Django REST API (validation + sandbox)
                          ↓
            Supabase (PostgreSQL + Auth)
                          ↓
            LangChain + Google Gemini (AI analysis)
                          ↓
            Frontend (results + AI feedback)
```

### Environment Variables (Planned)

**Frontend (`.env`)**:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_KEY` - Supabase anon/public key
- `VITE_API_URL` - Django backend endpoint

**Backend (`.env` - not in repo)**:

- `GOOGLE_API_KEY` or `GEMINI_API_KEY` - Google AI Studio API key
- `SUPABASE_URL`, `SUPABASE_KEY`, `DJANGO_SECRET_KEY`

## Critical Context for Development

### Current State vs. Planned Features

- **Implemented**:
  - Vite scaffold with TypeScript and ESLint
  - CSU-branded landing page with hero section
  - Interactive SQL playground with mock query execution
  - Reusable component library (Button, Card, Modal, Header, Footer)
  - Dark mode toggle functionality
  - Modal system for About, Achievements, Contact, Socials
  - Progress tracking UI (static, 42% mock progress)
  - Featured lessons section
- **Not Yet Built**:
  - Backend integration (Django REST API, Supabase)
  - AI tutor chatbot (Google Gemini integration)
  - Voice command system (Web Speech API)
  - Real authentication and user management
  - Database-driven lesson content
  - Progress persistence
  - Real SQL query execution in sandbox
  - Routing system for multiple pages
  - Charts and data visualization
- **Next Steps**:
  - Add React Router for multi-page navigation
  - Integrate backend API for real query execution
  - Implement AI chatbot interface
  - Add authentication flow with Supabase
  - Build lesson management system

### Design Decisions

- **Vite with SWC over Babel**: Faster builds and HMR for development
- **Strict TypeScript**: Catch errors early with comprehensive type checking
- **Modular tsconfig**: Separates app code from build tooling for cleaner IDE experience
- **React 19**: Latest features including improved hooks and concurrent rendering
- **Gemini over OpenAI**: Cost-effective AI solution with competitive performance (Gemini 1.5 Flash offers free tier and lower costs)
- **Inline Styles over CSS Modules**: Simplifies component architecture, avoids build configuration, enables dynamic styling with TypeScript support
- **CSS Variables**: Centralized design system with runtime theming support (dark mode)
- **No External UI Library**: Custom components built from scratch for learning purposes and full control

### Dependencies to Add (Per AI Guide)

- **UI**: TailwindCSS (styling), Monaco Editor or CodeMirror 6 (SQL editor)
- **Data Viz**: Chart.js or Recharts (query result visualization)
- **Routing**: React Router (for lesson pages, dashboard, admin)
- **HTTP**: Axios or fetch wrapper (API communication)
- **State**: Context API or Zustand (user progress, auth state)
- **AI**: `@langchain/google-genai` (Gemini integration), `langchain` (core framework)

### Gemini API Integration Notes

- **SDK**: Use `@langchain/google-genai` for TypeScript/Node.js integration
- **Rate Limits**: Gemini 1.5 Flash has generous free tier (15 RPM, 1M TPM, 1500 RPD)
- **Context Window**: 1M tokens (supports large conversation histories and code analysis)
- **Streaming**: Supports streaming responses for real-time chatbot experience
- **Safety Settings**: Configure content filtering based on educational context

## Testing & Debugging (Not Yet Configured)

- No test framework configured yet - consider Vitest (Vite-native) or Jest
- React DevTools recommended for component inspection
- Browser DevTools for Web Speech API testing
- Google AI Studio for testing Gemini prompts before integration

## Deployment Strategy (Planned)

- **Frontend**: Vercel (connect GitHub repo, auto-deploy main branch)
- **Backend**: Supabase Edge Functions or Render (Django hosting)
- **CORS**: Ensure Django allows frontend domain in production
- **API Keys**: Store Gemini API key securely in backend environment variables (never expose in frontend)

## Reference Files

- **Project Vision**: `AI-Guide/ai_guide.md` (comprehensive feature spec)
- **Build Config**: `vite.config.ts` (minimal SWC plugin setup)
- **Type Config**: `tsconfig.app.json` (strict compiler options)
- **Lint Config**: `eslint.config.js` (flat config format with TypeScript parser)
