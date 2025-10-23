# SQL Learning Platform - AI Agent Guide

## Project Overview

An interactive SQL learning web application with AI-powered tutoring, inspired by W3Schools and SoloLearn. The platform combines hands-on SQL practice with real-time AI feedback, voice commands, gamification, and progress tracking.

**Current State**: Early development phase - core React+Vite+TypeScript scaffold established, planned features documented in `AI-Guide/ai_guide.md`.

## Architecture & Tech Stack

### Frontend (Current Implementation)

- **Framework**: React 19 + Vite 7 + TypeScript 5.8
- **Build Tool**: Vite with SWC for fast refresh (@vitejs/plugin-react-swc)
- **Type System**: Strict TypeScript with bundler module resolution
- **Entry Points**: `src/main.tsx` → `src/App.tsx`
- **Empty Directories Ready for Implementation**: `src/components/`, `src/pages/`, `src/routes/`

### Planned Backend (Not Yet Implemented)

- Django REST API for lesson management and query execution
- Supabase (PostgreSQL) for data persistence and authentication
- OpenAI GPT-4/GPT-4o-mini via LangChain for AI tutoring features
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
└── services/        # API client logic (Supabase, Django REST)
```

### TypeScript Standards

- **React 19 with TSX**: Use `.tsx` extension for components
- **No implicit any**: Strict typing enforced
- **Module imports**: Use `.tsx` extension explicitly in imports (required by `verbatimModuleSyntax`)
- **JSX Transform**: `react-jsx` - no need to import React in component files

### ESLint Configuration

- Extends `@eslint/js` recommended + `typescript-eslint` recommended
- Uses `eslint-plugin-react-hooks` (recommended-latest) and `eslint-plugin-react-refresh` (Vite preset)
- Ignores `dist/` directory automatically
- Targets ES2020 with browser globals

## Key Integration Points (Planned)

### AI Features Architecture (See `AI-Guide/ai_guide.md`)

1. **SQL Editor**: Sandbox execution via Django API endpoint
2. **AI Tutor Chatbot**: LangChain + GPT-4o-mini with conversational memory in sessionStorage
3. **Voice Commands**: Web Speech API → natural language → AI interpretation
4. **Use Cases**:
   - Query explanation: "Explain what this SQL query does"
   - Syntax correction: AI suggests improvements
   - Natural language to SQL: "Show all students older than 20"

### Data Flow (Planned)

```
User Input (Editor/Voice) → Frontend (React)
                          ↓
            Django REST API (validation + sandbox)
                          ↓
            Supabase (PostgreSQL + Auth)
                          ↓
            LangChain + OpenAI (AI analysis)
                          ↓
            Frontend (results + AI feedback)
```

### Environment Variables (Planned)

**Frontend (`.env`)**:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_KEY` - Supabase anon/public key
- `VITE_API_URL` - Django backend endpoint

**Backend (`.env` - not in repo)**:

- `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`, `DJANGO_SECRET_KEY`

## Critical Context for Development

### Current State vs. Planned Features

- **Implemented**: Vite scaffold, TypeScript config, ESLint setup, minimal React shell
- **Not Yet Built**: All features in `AI-Guide/ai_guide.md` (SQL editor, AI tutor, authentication, backend, database)
- **Next Steps**: Implement component structure in `src/components/` and routing in `src/routes/`

### Design Decisions

- **Vite with SWC over Babel**: Faster builds and HMR for development
- **Strict TypeScript**: Catch errors early with comprehensive type checking
- **Modular tsconfig**: Separates app code from build tooling for cleaner IDE experience
- **React 19**: Latest features including improved hooks and concurrent rendering

### Dependencies to Add (Per AI Guide)

- **UI**: TailwindCSS (styling), Monaco Editor or CodeMirror 6 (SQL editor)
- **Data Viz**: Chart.js or Recharts (query result visualization)
- **Routing**: React Router (for lesson pages, dashboard, admin)
- **HTTP**: Axios or fetch wrapper (API communication)
- **State**: Context API or Zustand (user progress, auth state)

## Testing & Debugging (Not Yet Configured)

- No test framework configured yet - consider Vitest (Vite-native) or Jest
- React DevTools recommended for component inspection
- Browser DevTools for Web Speech API testing

## Deployment Strategy (Planned)

- **Frontend**: Vercel (connect GitHub repo, auto-deploy main branch)
- **Backend**: Supabase Edge Functions or Render (Django hosting)
- **CORS**: Ensure Django allows frontend domain in production

## Reference Files

- **Project Vision**: `AI-Guide/ai_guide.md` (comprehensive feature spec)
- **Build Config**: `vite.config.ts` (minimal SWC plugin setup)
- **Type Config**: `tsconfig.app.json` (strict compiler options)
- **Lint Config**: `eslint.config.js` (flat config format with TypeScript parser)
