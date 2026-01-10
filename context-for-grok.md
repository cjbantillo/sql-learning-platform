# Context for AI Understanding

This document provides context about the current state of the SQL Learning Platform project, including implementation details, workflows, and the comprehensive curriculum that has been created.

## Project Overview

**CSU Digital Academy - SQL Learning Platform**  
A Next.js 16 / React 19 web application designed to teach SQL through an interactive, gamified learning experience. The platform features:

- Email-based authentication (@carsu.edu.ph domain)
- Progressive lesson unlocking system
- Visual learning aids (Mermaid diagrams, animated JOIN visualizations)
- Professional Monaco SQL editor
- 9 learning modules containing 16 comprehensive lessons
- Progress tracking with localStorage persistence

## Architecture & Data Flow

### Authentication Flow

```
User lands on / (Landing Page)
  ↓
Clicks "Get Started" → Redirects to /sign-in
  ↓
Enters @carsu.edu.ph email → Validates format
  ↓
On success: localStorage.setItem('isAuthenticated', 'true') + localStorage.setItem('userEmail', email)
  ↓
Redirects to /dashboard
  ↓
AuthGuard protects /dashboard and /practice routes (checks localStorage.getItem('isAuthenticated'))
```

### Progress Tracking System

```
User completes lesson → Clicks "Mark as Complete" button
  ↓
practice/page.tsx handleMarkComplete() reads localStorage.getItem('completedLessons')
  ↓
Parses JSON array, adds current lesson ID if not present
  ↓
localStorage.setItem('completedLessons', JSON.stringify(updatedArray))
  ↓
Dashboard calculates module progress: (completedLessons.filter(id => module.lessons.includes(id)).length / module.lessons.length) * 100
  ↓
Module unlocks when all previous module lessons completed
```

### Component Hierarchy

```
app/layout.tsx (root)
  ├─ app/page.tsx (Landing)
  │    ├─ components/sections/navigation.tsx (Auth-aware navbar)
  │    ├─ components/sections/hero.tsx (Animated hero)
  │    ├─ components/sections/footer.tsx
  │    ├─ components/ui/BackToTop.tsx
  │    └─ components/ui/Chatbot.tsx
  │
  ├─ app/sign-in/page.tsx (Email auth)
  │
  ├─ app/dashboard/page.tsx (9 modules dashboard)
  │    └─ components/ui/AuthGuard.tsx wrapper
  │
  └─ app/practice/page.tsx (Main lesson interface)
       ├─ components/ui/AuthGuard.tsx wrapper
       ├─ practice/PracticeAppBar.tsx (Breadcrumb)
       ├─ practice/LessonSidebar.tsx (16 lessons navigation)
       ├─ practice/EditorArea.tsx (Monaco SQL editor)
       └─ Dynamic lesson component from practice/lessons/
            ├─ components/visuals/MermaidDiagram.tsx (for ER diagrams)
            └─ components/visuals/JoinVisualizer.tsx (for JOIN animations)
```

## Curriculum Structure

### Learning Pathway (16 Lessons across 9 Modules)

**Module 1: Database Fundamentals** (Foundational Knowledge)

- **Lesson 1 - What is a Database?** (`WhatIsDatabase.tsx`)
  - Structured vs unstructured data
  - RDBMS concepts with Mermaid comparison diagram (flat file vs relational)
  - Real-world analogies (library catalog, phonebook)
- **Lesson 2 - Why Use Databases?** (`WhyUseDatabases.tsx`)
  - Benefits: Scalability, data integrity, performance, concurrency, security
  - Framer Motion animations for each benefit card
  - CSU-specific examples (student records, course management)
- **Lesson 3 - When to Use Databases** (`WhenToUseDatabases.tsx`)
  - Decision tree flowchart (Mermaid)
  - Use cases: Persistent data, concurrent access, complex queries, data relationships
  - Anti-patterns: Small datasets, simple key-value, temporary data
- **Lesson 4 - Alternatives to Databases** (`NoDatabaseAlternatives.tsx`)
  - In-memory storage (Redis, Memcached)
  - File systems (JSON, CSV, XML)
  - localStorage/IndexedDB for web apps
  - Caching strategies
  - Backend-as-a-Service (Firebase, Supabase)
  - Pros/cons comparison table

**Module 2: Database Design** (Conceptual Modeling)

- **Lesson 5 - ER Modeling** (`ERLesson.tsx`)
  - Entity-Relationship diagrams with Crow&apos;s Foot notation
  - Cardinality: one-to-one, one-to-many, many-to-many
  - Mermaid ER diagram: Student-Course-Enrollment-Instructor relationships
  - Attributes and primary keys
- **Lesson 6 - Schema Design** (`SchemaLesson.tsx`)
  - Converting ER models to relational schemas
  - Normalization concepts (avoiding redundancy)
  - E-commerce schema example (Users, Products, Orders, OrderItems)
  - Foreign key relationships

**Module 3: SQL Basics** (Core Syntax)

- **Lesson 7 - SQL Fundamentals** (`SQLBasics.tsx`)
  - SELECT statements with column selection
  - DISTINCT for unique values
  - WHERE clause with comparison operators (=, !=, >, <, >=, <=)
  - ORDER BY for sorting (ASC/DESC)
  - Operator reference table
- **Lesson 8 - Data Manipulation** (`DataManipulation.tsx`)
  - INSERT: Single and multiple rows
  - UPDATE: Modifying existing records with WHERE clause
  - DELETE: Removing records with safety warnings
  - Red warning callouts for destructive operations
  - CSU course registration examples

**Module 4: Filtering & Patterns** (Advanced WHERE Clauses)

- **Lesson 9 - Pattern Matching** (`FilteringPatterns.tsx`)
  - LIKE operator with wildcards (% for multiple chars, \_ for single char)
  - IN operator for multiple values
  - BETWEEN for range queries
  - Wildcard examples table
  - Real-world scenarios (name searches, date ranges)

**Module 5: Aggregation** (Statistical Functions)

- **Lesson 10 - Aggregate Functions** (`Aggregates.tsx`)
  - COUNT: Counting rows/non-null values
  - SUM: Total calculation
  - AVG: Average calculation
  - MIN/MAX: Finding extremes
  - Calculator icon visualizations
  - Student grades and enrollment statistics examples

**Module 6: Joins & Grouping** (Multi-Table Operations)

- **Lesson 11 - SQL Joins** (`JoinsLesson.tsx`)
  - INNER JOIN: Matching records from both tables
  - LEFT JOIN: All left table + matching right
  - RIGHT JOIN: All right table + matching left
  - FULL OUTER JOIN: All records from both tables
  - JoinVisualizer integration (animated Customers + Orders demo)
  - Venn diagrams for each join type
- **Lesson 12 - Grouping & Conditions** (`GroupingConditions.tsx`)
  - GROUP BY: Aggregating by categories
  - HAVING: Filtering grouped results
  - WHERE vs HAVING comparison (WHERE filters rows, HAVING filters groups)
  - Department salary analysis example

**Module 7: Advanced Queries** (Complex SQL)

- **Lesson 13 - Subqueries** (`Subqueries.tsx`)
  - Scalar subqueries (single value)
  - Multi-row subqueries
  - EXISTS operator for existence checks
  - ANY/ALL operators for comparisons
  - Nested query examples with course prerequisites
- **Lesson 14 - SQL Functions** (`Functions.tsx`)
  - String functions: CONCAT, UPPER, LOWER, LENGTH, SUBSTRING
  - Numeric functions: ROUND, ABS, CEILING, FLOOR
  - Date functions: NOW, CURDATE, DATEDIFF, DATE_FORMAT
  - Function chaining examples

**Module 8: Database Management** (DDL & Administration)

- **Lesson 15 - Schema Management** (`DatabaseManagement.tsx`)
  - CREATE DATABASE/TABLE
  - DROP DATABASE/TABLE (with warnings)
  - Primary key constraints
  - Foreign key constraints with referential integrity
  - Indexes for query optimization
  - CREATE VIEW for virtual tables
  - Complete CSU course management schema example

**Module 9: Professional SQL** (Best Practices & Security)

- **Lesson 16 - Production Readiness** (`AdvancedTopics.tsx`)
  - CASE statements for conditional logic
  - NULL handling: COALESCE, NULLIF, IS NULL, IS NOT NULL
  - SQL injection prevention (parameterized queries)
  - Transaction management: BEGIN, COMMIT, ROLLBACK
  - ACID properties (Atomicity, Consistency, Isolation, Durability)
  - Performance optimization tips
  - Security best practices

## Visual Components

### Mermaid Diagrams (`components/visuals/MermaidDiagram.tsx`)

- **Initialization**: `mermaid.initialize({theme: 'forest', startOnLoad: false})`
- **Rendering**: useEffect with `mermaid.contentLoaded()` on mount
- **Use cases**: ER diagrams (Lesson 5), decision trees (Lesson 3), comparison charts (Lesson 1)

### Join Visualizer (`components/visuals/JoinVisualizer.tsx`)

- **Animation**: Framer Motion staggered animations
- **Data**: Customers table (ID, Name, Location) + Orders table (OrderID, CustomerID, Product)
- **Visual flow**: Tables slide in → Matching records highlight → Result table appears
- **Use case**: Lesson 11 (JoinsLesson.tsx) demonstration

### Monaco Editor (`practice/EditorArea.tsx`)

- **Language**: SQL with built-in syntax highlighting
- **Theme**: vs-dark
- **Configuration**: `automaticLayout: true`, `minimap: {enabled: false}`
- **Features**: Copy code, reset to default, run button (stub)
- **Default query**: SELECT statement with example data

## State Management

### localStorage Schema

```javascript
{
  isAuthenticated: "true" | null,
  userEmail: "student@carsu.edu.ph",
  completedLessons: "[1, 2, 3, 4, 5, ...]"  // JSON stringified array of lesson IDs
}
```

### React State Patterns

- **Authentication check**: `useState(false)` with `useEffect(() => setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true'), [])`
- **Lesson completion**: `useState(() => JSON.parse(localStorage.getItem('completedLessons') || '[]'))` (lazy initializer)
- **Active lesson**: `useState(1)` in practice/page.tsx

## Styling System

### Color Palette

- **Primary Green**: #1B5E20 (CSU brand, for headers, CTAs, accents)
- **Accent Yellow**: #FFC727 (for highlights, hover states)
- **Background**: Black to dark green gradients
- **Glass effects**: rgba(255,255,255,0.05) with backdrop-blur

### Tailwind CSS Variables (app/globals.css)

```css
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 142 76% 36%; /* #1B5E20 green */
  --primary-foreground: 0 0% 98%;
  --accent: 45 100% 58%; /* #FFC727 yellow */
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
```

### Animation Patterns

- **Framer Motion**: Page transitions with stagger, hover scale effects, entrance animations
- **Lesson reveals**: Sequential card animations with delay
- **Interactive elements**: Hover shadows, color shifts on buttons/cards

## Component Design Patterns

### Lesson Component Structure

```tsx
export default function LessonName() {
  return (
    <motion.div className="space-y-8">
      {/* Header */}
      <div>
        <h2>Lesson Title</h2>
        <p>Lesson description...</p>
      </div>

      {/* Content Sections */}
      <section>
        <h3>Section Title</h3>
        {/* Text, code blocks, visual components */}
      </section>

      {/* Color-coded callouts */}
      <div className="bg-blue-50"> {/* Tips */}
      <div className="bg-green-50"> {/* Success/Key Points */}
      <div className="bg-yellow-50"> {/* Warnings */}
      <div className="bg-red-50"> {/* Dangers */}

      {/* Visual aids */}
      <MermaidDiagram code={...} />
      <JoinVisualizer />

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to previous lesson>
        <Link to next lesson>
      </div>
    </motion.div>
  );
}
```

### AuthGuard Pattern

```tsx
export default function ProtectedPage() {
  return (
    <AuthGuard>{/* Page content only renders if authenticated */}</AuthGuard>
  );
}
```

## Technical Stack Summary

- **Framework**: Next.js 16.1.2 (App Router with Turbopack)
- **React**: 19.0.0 with TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Animations**: Framer Motion 12
- **Code Editor**: @monaco-editor/react 4.6.0
- **Diagrams**: Mermaid 12.0.0 (forest theme)
- **Icons**: Lucide React 0.469.0
- **UI Components**: shadcn/ui (accordion, badge, button, card, dialog, input, label, progress, skeleton, tabs)
- **Development**: ESLint 9, PostCSS, strict TypeScript

## Known Limitations & Future Enhancements

### Current Limitations

1. **No backend**: All data stored in localStorage (cleared on browser data wipe)
2. **No real authentication**: Email validation is client-side only
3. **No SQL execution**: Editor &quot;Run&quot; button is stub (no database connection)
4. **Static results**: Query results in editor are hardcoded examples
5. **No user profiles**: Can&apos;t track cross-device progress

### Potential Enhancements

1. **Backend integration**: Node.js + PostgreSQL for real data persistence
2. **OAuth authentication**: Google/Facebook login with JWT tokens
3. **Live SQL execution**: Sandboxed SQLite/PostgreSQL query runner
4. **Code challenges**: Auto-graded SQL exercises with test cases
5. **Leaderboards**: Competitive learning with badges and points
6. **Responsive improvements**: Mobile-optimized Monaco editor, collapsible lesson sidebar
7. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
8. **Internationalization**: Multi-language support for lessons

## Workflow Summary for AI Agents

When working with this codebase:

1. **Authentication changes**: Update [app/sign-in/page.tsx](app/sign-in/page.tsx) and [app/components/ui/AuthGuard.tsx](app/components/ui/AuthGuard.tsx)
2. **New lessons**: Create in `app/practice/lessons/`, add to lessons array in [app/practice/page.tsx](app/practice/page.tsx), update dashboard module mapping
3. **Dashboard modules**: Edit [app/dashboard/page.tsx](app/dashboard/page.tsx) modules array (ensure lesson IDs match practice/page.tsx)
4. **Visual components**: Use `MermaidDiagram` for diagrams, `JoinVisualizer` for animations, or create new in `app/components/visuals/`
5. **Styling changes**: Update CSS variables in [app/globals.css](app/globals.css) or Tailwind classes
6. **Navigation updates**: Edit [app/components/sections/navigation.tsx](app/components/sections/navigation.tsx) (remember useEffect pattern for localStorage)
7. **Progress tracking**: Modify `handleMarkComplete` in [app/practice/page.tsx](app/practice/page.tsx) and dashboard calculation logic

**Critical patterns**:

- Always use lazy initializers `useState(() => ...)` for localStorage reads to avoid hydration errors
- Escape HTML entities in JSX text (`&apos;` for apostrophes, `&quot;` for quotes)
- Use `type="button"` and `aria-label` on all interactive buttons
- Run `npm run build` to verify no errors after changes
- Check for React hooks errors (no setState in render, only in event handlers or useEffect)

This platform provides a complete, self-contained SQL learning experience optimized for CSU students, with visual-first pedagogy, gamified progression, and professional-grade tooling.
