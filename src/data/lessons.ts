export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  content: string;
  exercises: Exercise[];
  estimatedTime: number; // in minutes
}

export interface Exercise {
  id: string;
  question: string;
  expectedQuery: string;
  hint?: string;
  solution: string;
}

export const lessons: Lesson[] = [
  {
    id: "intro-select",
    title: "Introduction to SELECT",
    description:
      "Learn the basics of retrieving data from a database using SELECT statements",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 15,
    content: `
# Introduction to SELECT

The SELECT statement is the most commonly used SQL command. It allows you to retrieve data from one or more tables.

## Basic Syntax

\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

## Select All Columns

To select all columns from a table, use the asterisk (*):

\`\`\`sql
SELECT * FROM students;
\`\`\`

## Select Specific Columns

You can specify exactly which columns you want:

\`\`\`sql
SELECT name, course FROM students;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question: "Select all columns from the students table",
        expectedQuery: "SELECT * FROM students",
        hint: "Use the asterisk (*) to select all columns",
        solution: "SELECT * FROM students;",
      },
      {
        id: "ex2",
        question: "Select only the name and course columns from students",
        expectedQuery: "SELECT name, course FROM students",
        hint: "List the column names separated by commas",
        solution: "SELECT name, course FROM students;",
      },
    ],
  },
  {
    id: "where-clause",
    title: "Filtering with WHERE",
    description:
      "Learn how to filter data using the WHERE clause with various conditions",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 20,
    content: `
# Filtering with WHERE

The WHERE clause allows you to filter records based on specific conditions.

## Basic WHERE Syntax

\`\`\`sql
SELECT * FROM students WHERE year = 3;
\`\`\`

## Comparison Operators

- \`=\` Equal to
- \`<>\` or \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

## Example

\`\`\`sql
SELECT name, course FROM students WHERE course = 'BSIT';
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question: "Select all students where year equals 3",
        expectedQuery: "SELECT * FROM students WHERE year = 3",
        hint: "Use WHERE clause with the year column",
        solution: "SELECT * FROM students WHERE year = 3;",
      },
      {
        id: "ex2",
        question: "Select names of students in BSCS course",
        expectedQuery: "SELECT name FROM students WHERE course",
        hint: "Filter by course = 'BSCS'",
        solution: "SELECT name FROM students WHERE course = 'BSCS';",
      },
    ],
  },
  {
    id: "joins",
    title: "JOINs & Relationships",
    description:
      "Master table relationships and combining data from multiple tables",
    difficulty: "Intermediate",
    category: "Advanced Queries",
    estimatedTime: 30,
    content: `
# JOINs & Relationships

JOINs allow you to combine rows from two or more tables based on related columns.

## Types of JOINs

### INNER JOIN
Returns records that have matching values in both tables.

\`\`\`sql
SELECT students.name, courses.course_name
FROM students
INNER JOIN courses ON students.course_id = courses.id;
\`\`\`

### LEFT JOIN
Returns all records from the left table and matched records from the right table.

\`\`\`sql
SELECT students.name, courses.course_name
FROM students
LEFT JOIN courses ON students.course_id = courses.id;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Join students and courses tables to show student names with their course names",
        expectedQuery:
          "SELECT students.name, courses.course_name FROM students JOIN courses",
        hint: "Use INNER JOIN with ON clause",
        solution:
          "SELECT students.name, courses.course_name FROM students INNER JOIN courses ON students.course_id = courses.id;",
      },
    ],
  },
  {
    id: "aggregations",
    title: "Aggregate Functions",
    description: "Learn to use COUNT, SUM, AVG, MIN, MAX, and GROUP BY",
    difficulty: "Intermediate",
    category: "Data Analysis",
    estimatedTime: 25,
    content: `
# Aggregate Functions

Aggregate functions perform calculations on multiple rows and return a single value.

## Common Aggregate Functions

- \`COUNT()\` - Count the number of rows
- \`SUM()\` - Calculate the sum of values
- \`AVG()\` - Calculate the average
- \`MIN()\` - Find the minimum value
- \`MAX()\` - Find the maximum value

## Examples

\`\`\`sql
SELECT COUNT(*) FROM students;
SELECT AVG(grade) FROM students;
SELECT course, COUNT(*) FROM students GROUP BY course;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question: "Count the total number of students",
        expectedQuery: "SELECT COUNT(*) FROM students",
        hint: "Use COUNT(*) function",
        solution: "SELECT COUNT(*) FROM students;",
      },
      {
        id: "ex2",
        question: "Count students grouped by course",
        expectedQuery: "SELECT course, COUNT(*) FROM students GROUP BY course",
        hint: "Use GROUP BY with COUNT",
        solution: "SELECT course, COUNT(*) FROM students GROUP BY course;",
      },
    ],
  },
  {
    id: "insert-update",
    title: "INSERT & UPDATE",
    description: "Learn how to add and modify data in tables",
    difficulty: "Beginner",
    category: "Data Manipulation",
    estimatedTime: 20,
    content: `
# INSERT & UPDATE

Learn how to add new data and modify existing records.

## INSERT Statement

Add new rows to a table:

\`\`\`sql
INSERT INTO students (name, course, year)
VALUES ('John Doe', 'BSIT', 1);
\`\`\`

## UPDATE Statement

Modify existing records:

\`\`\`sql
UPDATE students
SET year = 2
WHERE name = 'John Doe';
\`\`\`

**Important:** Always use WHERE clause with UPDATE to avoid modifying all rows!
    `,
    exercises: [
      {
        id: "ex1",
        question: 'Insert a new student named "Maria Cruz" in BSCS, year 1',
        expectedQuery: "INSERT INTO students",
        hint: "Use INSERT INTO with VALUES",
        solution:
          "INSERT INTO students (name, course, year) VALUES ('Maria Cruz', 'BSCS', 1);",
      },
      {
        id: "ex2",
        question: "Update the year to 2 for all year 1 students",
        expectedQuery: "UPDATE students SET year",
        hint: "Use UPDATE with SET and WHERE",
        solution: "UPDATE students SET year = 2 WHERE year = 1;",
      },
    ],
  },
  {
    id: "delete",
    title: "DELETE Statement",
    description: "Learn how to safely remove data from tables",
    difficulty: "Beginner",
    category: "Data Manipulation",
    estimatedTime: 15,
    content: `
# DELETE Statement

The DELETE statement removes rows from a table.

## Basic Syntax

\`\`\`sql
DELETE FROM students WHERE year = 4;
\`\`\`

## ⚠️ Important Safety Note

**Always use a WHERE clause with DELETE!**

Without a WHERE clause, you'll delete ALL rows:

\`\`\`sql
-- DANGER: This deletes everything!
DELETE FROM students;
\`\`\`

## Best Practice

Always test with SELECT first:

\`\`\`sql
-- First, preview what will be deleted
SELECT * FROM students WHERE year = 4;

-- Then, if it looks correct, delete
DELETE FROM students WHERE year = 4;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question: "Delete all students with year = 5",
        expectedQuery: "DELETE FROM students WHERE year = 5",
        hint: "Use DELETE FROM with WHERE clause",
        solution: "DELETE FROM students WHERE year = 5;",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter((lesson) => lesson.category === category);
}

export function getLessonsByDifficulty(
  difficulty: Lesson["difficulty"]
): Lesson[] {
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
}
