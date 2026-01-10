# Component Architecture & Data Flow

## Component Hierarchy

```
App (/practice/page.tsx)
│
├─ Navbar (Navigation)
│
├─ PracticeAppBar (Breadcrumb Navigation)
│
├─ CourseHeader (New)
│  ├─ Course Title Display
│  ├─ Current Module Display
│  ├─ Progress Bar (Linear)
│  └─ Progress Circle (Circular Visual)
│
├─ Main Content Container
│  │
│  ├─ CiscoSidebar (New)
│  │  ├─ Course Progress Section
│  │  │  ├─ Progress Counter
│  │  │  └─ Progress Bar
│  │  │
│  │  └─ Modules List
│  │     └─ For each Module:
│  │        ├─ Module Header (Expandable)
│  │        │  ├─ Module Title
│  │        │  ├─ Module Progress Bar
│  │        │  └─ Lesson Count
│  │        │
│  │        └─ Lessons List (Animated)
│  │           └─ For each Lesson:
│  │              ├─ Completion Icon
│  │              ├─ Lesson Title
│  │              └─ Active State
│  │
│  └─ Content Area
│     ├─ Lesson Title
│     ├─ Module Context
│     ├─ Lesson Content (Component)
│     ├─ Mark Complete Button
│     └─ SQL Editor
│
├─ Footer
│
└─ Chatbot
```

---

## Data Flow

### State Management

```typescript
PracticePage
  ├─ selectedLessonId: number (useState)
  ├─ completedLessons: number[] (useState + localStorage)
  ├─ modules: Module[] (constant array)
  └─ flatLessons: Lesson[] (constant array)
```

### Props Flow

```
PracticePage
  │
  ├─ CourseHeader
  │  ├─ courseTitle: "SQL Fundamentals & Advanced Concepts"
  │  ├─ totalLessons: 16
  │  ├─ completedLessons: number (from state)
  │  └─ currentModule: string (derived from state)
  │
  └─ CiscoSidebar
     ├─ modules: Module[] (from constant)
     ├─ lessons: Lesson[] (from constant)
     ├─ selectedLessonId: number (from state)
     ├─ onSelectLesson: (id: number) => void
     └─ completedLessons: number[] (from state)
```

---

## Module Interface Definition

```typescript
// Type definitions in CiscoSidebar.tsx

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  moduleId: number;
}

interface CiscoSidebarProps {
  modules: Module[];
  lessons: Lesson[];
  selectedLessonId: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
}

interface CourseHeaderProps {
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  currentModule: string;
}
```

---

## Data Structure Example

### Module Array

```typescript
const modules: Module[] = [
  {
    id: 1,
    title: "Database Fundamentals",
    lessons: [
      { id: 1, title: "What is a Database?", moduleId: 1 },
      { id: 2, title: "Why Use Databases?", moduleId: 1 },
      // ... more lessons
    ],
  },
  {
    id: 2,
    title: "Database Design",
    lessons: [
      { id: 5, title: "ER Modeling", moduleId: 2 },
      { id: 6, title: "Schema Design", moduleId: 2 },
    ],
  },
  // ... more modules
];
```

### Flat Lessons Array

```typescript
const flatLessons = [
  {
    id: 1,
    title: "What is a Database?",
    component: WhatIsDatabase,
    moduleId: 1,
  },
  {
    id: 2,
    title: "Why Use Databases?",
    component: WhyUseDatabases,
    moduleId: 1,
  },
  // ... all 16 lessons with their components
];
```

---

## Event Flow

### Selecting a Lesson

```
User clicks lesson
    ↓
CiscoSidebar.onSelectLesson(lessonId)
    ↓
PracticePage.setSelectedLessonId(lessonId)
    ↓
State updates
    ↓
CourseHeader re-renders with new currentModule
    ↓
Content area loads new LessonComponent
    ↓
Button state updates (isCompleted boolean changes)
```

### Marking a Lesson Complete

```
User clicks "Mark as Complete"
    ↓
handleMarkComplete() fires
    ↓
Add lessonId to completedLessons state
    ↓
Save to localStorage
    ↓
completedLessons state updates
    ↓
CiscoSidebar progress indicators update
    ↓
CourseHeader progress metrics update
    ↓
Button changes to green "Completed" state
```

### Progress Calculation

```
CourseHeader:
  progressPercentage = (completedLessons.length / totalLessons) * 100

CiscoSidebar (per module):
  moduleLessons = lessons.filter(l => l.moduleId === module.id)
  completed = moduleLessons.filter(l => completedLessons.includes(l.id)).length
  percentage = (completed / moduleLessons.length) * 100
```

---

## Rendering Flow

### Initial Load

```
1. Page mounts
2. Load completedLessons from localStorage
3. Set selectedLessonId to 1
4. Render CourseHeader with initial progress
5. Render CiscoSidebar with modules
6. Render first lesson content
```

### On Lesson Select

```
1. User clicks lesson
2. selectedLessonId state updates
3. React re-renders affected components:
   - CourseHeader (currentModule changes)
   - CiscoSidebar (active state changes)
   - Content area (LessonComponent changes)
4. Smooth transition animations play
```

### On Module Expand/Collapse

```
1. User clicks module header
2. expandedModules state in CiscoSidebar updates
3. Framer Motion animate component triggers
4. Lessons list slides in/out smoothly
5. Module progress bar remains visible
```

---

## LocalStorage Schema

```typescript
// Stored keys:
{
  "completedLessons": [1, 2, 5, 7, ...],           // Array of completed lesson IDs
  "progress_lesson_1": "true",                      // Individual lesson progress
  "progress_lesson_2": "true",
  // ... etc
}
```

---

## Component Dependencies

```
Dependencies used across components:

CourseHeader:
  ├─ Built-in React hooks
  └─ Tailwind CSS classes

CiscoSidebar:
  ├─ React (useState, useEffect)
  ├─ Framer Motion (motion, AnimatePresence)
  ├─ Lucide React (ChevronDown, CheckCircle2, etc.)
  └─ Tailwind CSS classes

PracticePage:
  ├─ React (useState)
  ├─ Next.js (Components)
  ├─ Lucide React (CheckCircle2)
  ├─ Components (Button, EditorArea, etc.)
  └─ Tailwind CSS classes
```

---

## Performance Optimizations

### Memoization Opportunities

```typescript
// Could add React.memo() for:
- CiscoSidebar (prevents re-render if props unchanged)
- CourseHeader (prevents re-render if numbers unchanged)
- Individual module items (prevents unnecessary list re-renders)
```

### State Optimization

```typescript
// Current approach (sufficient for app size):
- State only in PracticePage
- Props passed down to children
- No context provider needed (small app)

// For future scaling:
- Could use Context API for theme/settings
- Could use Redux for complex state management
```

### Rendering Optimization

```typescript
// Current optimizations:
- Sidebar animations handled by Framer Motion (GPU accelerated)
- CSS transforms for progress bar updates
- Conditional rendering to avoid loading unused components
- Lesson components lazy-loaded via import
```

---

## Module/Lesson Organization Algorithm

```typescript
// How lessons are organized into modules:

1. flatLessons array has moduleId property
2. Filter lessons by moduleId to create module.lessons
3. Map over modules array for rendering
4. Each module controls visibility of its lessons
5. Progress calculated per module dynamically

// Example filter:
const moduleLessons = flatLessons.filter(l => l.moduleId === 1);
// Results: [lesson1, lesson2, lesson3, lesson4]
```

---

## Progress Tracking Algorithm

```typescript
// Course-wide progress:
function calculateCourseProgress(completedLessons, totalLessons) {
  return Math.round((completedLessons / totalLessons) * 100);
}
// Example: (10 / 16) * 100 = 62.5% → rounds to 62%

// Module-level progress:
function calculateModuleProgress(module, completedLessons) {
  const moduleLessons = lessons.filter((l) => l.moduleId === module.id);
  const completedInModule = moduleLessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  return Math.round((completedInModule / moduleLessons.length) * 100);
}
```

---

## Browser API Usage

```typescript
// localStorage for persistence:
localStorage.getItem("completedLessons"); // Read
localStorage.setItem("completedLessons", JSON.stringify(array)); // Write

// These operations maintain state across page refreshes
// Data persists until user clears browser data
```

---

## Animation Flow

```
Module Expand Animation:
  Initial: opacity 0, height 0
    ↓
  Animate: opacity 1, height auto (duration 300ms)
    ↓
  Final: List fully visible and interactive

Module Collapse Animation:
  Initial: opacity 1, height auto
    ↓
  Exit: opacity 0, height 0 (duration 300ms)
    ↓
  Final: List removed from DOM
```

---

## Accessibility Features

```
1. Semantic HTML
   ├─ <nav> for navigation
   ├─ <button> for interactive elements
   ├─ <ul>/<li> for lists
   └─ Proper heading hierarchy

2. ARIA Attributes
   ├─ aria-label for icon buttons
   ├─ aria-expanded for expandable sections
   └─ Role attributes where needed

3. Keyboard Navigation
   ├─ Tab through interactive elements
   ├─ Enter/Space to activate buttons
   ├─ Escape to collapse (future enhancement)

4. Color Contrast
   ├─ WCAG AA compliant ratios
   ├─ Not relying on color alone
   └─ Clear visual indicators
```

---

## Summary

The component architecture follows React best practices:

✅ **Unidirectional Data Flow** - Props down, callbacks up  
✅ **Single Responsibility** - Each component has clear purpose  
✅ **Reusable Components** - Sidebar and header are self-contained  
✅ **Type Safety** - Full TypeScript interfaces  
✅ **Performance** - Optimized rendering and animations  
✅ **Accessibility** - Semantic HTML and ARIA support  
✅ **Maintainability** - Clear structure and documentation

This architecture scales well for future enhancements!
