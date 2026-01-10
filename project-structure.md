# Project Structure (Next.js App Router)

```
sql-learning-platform-frontend/
├─ package.json               # scripts: dev/build/start/lint; deps: next 16, react 19, framer-motion 12, lucide-react, mermaid 12, @monaco-editor/react
├─ tsconfig.json              # TypeScript config (app router defaults)
├─ eslint.config.mjs          # Next.js ESLint config
├─ next.config.ts             # Next config (default)
├─ postcss.config.mjs         # Tailwind v4 postcss wiring
├─ geojson.d.ts               # Type definitions for geojson
├─ components.json            # shadcn/ui configuration
├─ globals: app/globals.css   # Tailwind import + CSS vars (green #1B5E20, yellow #FFC727); body font Arial
├─ app/
│  ├─ layout.tsx              # Root layout; Geist fonts; metadata: "CSU Digital Academy - Learn SQL"
│  ├─ page.tsx                # Landing page; mounts Navbar, Hero, Footer, BackToTop, Chatbot
│  ├─ sign-in/
│  │  └─ page.tsx             # Email authentication (@carsu.edu.ph only); stores to localStorage; redirects to /dashboard
│  ├─ dashboard/
│  │  └─ page.tsx             # Learning dashboard; 9 modules with progress tracking; reads completedLessons from localStorage; module unlocking logic
│  ├─ practice/
│  │  ├─ page.tsx             # Main lesson interface; 16 lessons with dynamic loading; completion tracking; integrates LessonSidebar + EditorArea
│  │  ├─ PracticeAppBar.tsx   # Breadcrumb (Home → SQL Tutorial)
│  │  ├─ LessonSidebar.tsx    # Collapsible lesson navigation; completion badges (CheckCircle2); active lesson highlighting
│  │  ├─ ContentArea.tsx      # [DEPRECATED - not currently used]
│  │  ├─ EditorArea.tsx       # Monaco SQL editor with syntax highlighting; copy/reset/run buttons; static results table
│  │  └─ lessons/
│  │     ├─ WhatIsDatabase.tsx           # Lesson 1: Database fundamentals with Mermaid comparison diagrams
│  │     ├─ WhyUseDatabases.tsx          # Lesson 2: Benefits with Framer Motion animations (scalability, integrity, performance)
│  │     ├─ WhenToUseDatabases.tsx       # Lesson 3: Decision tree flowchart (Mermaid)
│  │     ├─ NoDatabaseAlternatives.tsx   # Lesson 4: In-memory, files, localStorage, caching, BaaS
│  │     ├─ ERLesson.tsx                 # Lesson 5: ER modeling with Crow's Foot notation (Mermaid)
│  │     ├─ SchemaLesson.tsx             # Lesson 6: Converting ER models to database schemas
│  │     ├─ SQLBasics.tsx                # Lesson 7: SELECT, DISTINCT, WHERE, ORDER BY with examples
│  │     ├─ DataManipulation.tsx         # Lesson 8: INSERT, UPDATE, DELETE with safety warnings
│  │     ├─ FilteringPatterns.tsx        # Lesson 9: LIKE, IN, BETWEEN, wildcards with pattern examples
│  │     ├─ Aggregates.tsx               # Lesson 10: COUNT, SUM, AVG, MIN, MAX with visualizations
│  │     ├─ JoinsLesson.tsx              # Lesson 11: SQL JOINs with interactive JoinVisualizer component
│  │     ├─ GroupingConditions.tsx       # Lesson 12: GROUP BY, HAVING with WHERE comparison
│  │     ├─ Subqueries.tsx               # Lesson 13: Nested queries, EXISTS, ANY, ALL
│  │     ├─ Functions.tsx                # Lesson 14: String (CONCAT, UPPER), Numeric (ROUND, ABS), Date functions
│  │     ├─ DatabaseManagement.tsx       # Lesson 15: DDL (CREATE/DROP), constraints, indexes, views
│  │     └─ AdvancedTopics.tsx           # Lesson 16: CASE statements, NULL handling, SQL injection prevention, transactions, ACID
│  └─ components/
│     ├─ sections/
│     │  ├─ navigation.tsx    # Navbar with auth-aware links; localStorage check; Dashboard/Sign In toggle; Sign Out button; mobile responsive
│     │  ├─ hero.tsx          # Animated hero (mouse-follow glow, stats cards, CTAs to /dashboard, /practice)
│     │  └─ footer.tsx        # 4-column footer (brand/social, quick links, resources, contact)
│     ├─ ui/
│     │  ├─ AuthGuard.tsx     # Route protection component (checks localStorage auth)
│     │  ├─ BackToTop.tsx     # Scroll-aware FAB to top (framer-motion)
│     │  ├─ Chatbot.tsx       # Floating chat widget; local state; canned SQL responses
│     │  └─ [shadcn components] # accordion, badge, button, card, dialog, input, label, progress, skeleton, tabs
│     └─ visuals/
│        ├─ MermaidDiagram.tsx    # ER diagram renderer with forest theme
│        └─ JoinVisualizer.tsx    # Animated INNER JOIN demonstration (Customers + Orders)
├─ components/ui/                 # shadcn/ui components directory
└─ lib/
   └─ utils.ts                   # shadcn utility functions (cn helper)
```

## Key Features

### Authentication System

- **Email validation**: Restricted to @carsu.edu.ph domain
- **Storage**: localStorage-based (isAuthenticated, userEmail)
- **Flow**: Sign In → Dashboard → Practice with gated progression

### Dashboard (9 Modules)

1. **Database Fundamentals** (Lessons 1-4): What, Why, When, Alternatives
2. **Database Design** (Lessons 5-6): ER Modeling, Schema Design
3. **SQL Basics** (Lessons 7-8): SELECT, Data Manipulation
4. **Filtering & Patterns** (Lesson 9): LIKE, IN, BETWEEN
5. **Aggregation** (Lesson 10): COUNT, SUM, AVG, MIN, MAX
6. **Joins & Grouping** (Lessons 11-12): JOINs, GROUP BY, HAVING
7. **Advanced Queries** (Lessons 13-14): Subqueries, Functions
8. **Database Management** (Lesson 15): DDL, Constraints, Indexes
9. **Professional SQL** (Lesson 16): CASE, NULL, Security, Best Practices

### Progress Tracking

- **Completion storage**: localStorage.setItem('completedLessons', JSON.stringify([...]))
- **Module progress**: Calculated from completed lessons per module
- **Unlocking logic**: Each module unlocks after completing previous module's final lesson
- **Visual indicators**: CheckCircle2 badges, progress bars, locked icons

### Lesson Components

- **Visual-first approach**: Mermaid diagrams, Framer Motion animations
- **Interactive elements**: Color-coded sections (blue=tips, green=success, yellow=warning, red=danger)
- **Code examples**: Dark-themed code blocks with SQL syntax
- **Real-world scenarios**: CSU-themed examples (students, courses, enrollments)
- **Professional standards**: Security warnings, performance tips, best practices

### SQL Editor (Monaco)

- **Syntax highlighting**: Built-in SQL language support
- **Features**: Copy, reset, run buttons (run is stub)
- **Theme**: vs-dark with automatic layout
- **Integration**: Available on each lesson page under "Try It Yourself"

## Styling Theme

- **Primary**: Deep green #1B5E20 (CSU brand color)
- **Accent**: Yellow #FFC727
- **Gradients**: Green to black backgrounds
- **Glass effects**: Frosted glass in hero, footer
- **Animations**: Framer Motion for page transitions, hover effects, lesson reveals

## Technical Notes

- **React 19** with Next.js 16 app router
- **TypeScript** strict mode enabled
- **Tailwind CSS v4** with custom color variables
- **No external API**: All data stored in localStorage
- **No authentication backend**: Client-side only validation
- **Mermaid v12**: For ER diagrams and flowcharts with forest theme
- **Monaco Editor**: Professional code editing experience
