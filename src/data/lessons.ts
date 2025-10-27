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
    title: "Introduction to SELECT - Your First Database Conversation",
    description:
      "Learn the basics of retrieving data from a database using SELECT statements through relatable examples and storytelling",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 15,
    content: `
# Introduction to SELECT - Your First Database Conversation

## 📖 Story Time: The Digital Library

Imagine you're a librarian at CSU's digital library. Students come to you asking for specific information from thousands of records. Instead of manually searching through file cabinets, you have a magical assistant that can instantly find any information you need. This assistant speaks a special language called SQL, and the most important word it knows is **SELECT**.

## 🎯 What is SELECT?

Think of SELECT as asking a question to your database. Just like you might ask a librarian:
- "Show me all books" (SELECT everything)
- "Show me just the titles and authors" (SELECT specific columns)
- "Show me books by a specific author" (SELECT with conditions)

The SELECT statement is like having a conversation with your data!

## 🚀 Your First Query - The Magic Words

The basic structure is simple - you're literally telling the database what to show you:

\`\`\`sql
SELECT [what you want to see] FROM [which table];
\`\`\`

Think of it as: "SELECT [this information] FROM [this source]"

### Example: Our Student Database
Let's say we have a table called \`students\` with information about CSU students:

| id | name | major | year | gpa |
|----|------|--------|------|-----|
| 1 | Alice Johnson | Computer Science | 3 | 3.8 |
| 2 | Bob Smith | Mathematics | 2 | 3.6 |
| 3 | Carol Brown | Engineering | 4 | 3.9 |

## 🌟 Method 1: See Everything (The "Show Me All" Approach)

When you want to see ALL information about students:

\`\`\`sql
SELECT * FROM students;
\`\`\`

**Translation**: "Show me EVERYTHING from the students table"

The asterisk (*) is like saying "all of it!" - it's a shortcut that gives you every column.

**Real-world analogy**: It's like asking "Tell me everything you know about all students"

## 🎯 Method 2: Choose Specific Information (The "Just What I Need" Approach)

Sometimes you only need specific pieces of information:

\`\`\`sql
SELECT name, major FROM students;
\`\`\`

**Translation**: "Show me just the names and majors from the students table"

This would give you:
| name | major |
|------|--------|
| Alice Johnson | Computer Science |
| Bob Smith | Mathematics |
| Carol Brown | Engineering |

**Real-world analogy**: It's like asking "Just give me the names and what they're studying"

## 💡 Why Choose Specific Columns?

1. **Faster Results**: Less data to process and display
2. **Cleaner Output**: Only see what you actually need
3. **Better Performance**: Especially important with large databases
4. **Focused Analysis**: Easier to understand and work with

## 🎪 Fun Practice Examples

Let's practice with different scenarios:

### Scenario 1: The Academic Advisor
*You're an academic advisor who needs to see all student information for a meeting.*
\`\`\`sql
SELECT * FROM students;
\`\`\`

### Scenario 2: The Email Campaign
*You're sending emails and only need names and email addresses.*
\`\`\`sql
SELECT name, email FROM students;
\`\`\`

### Scenario 3: The Grade Report
*You're creating a grade report and need names and GPAs.*
\`\`\`sql
SELECT name, gpa FROM students;
\`\`\`

## 🎉 Key Takeaways

- **SELECT** is your way to "ask" the database for information
- **FROM** tells the database which table to look in
- **asterisk (*)** means "show me everything"
- **Column names** let you pick exactly what you want to see
- Always end your queries with a semicolon (;) - it's like saying "that's my complete question!"

## 🚀 Ready to Try?

Now you're ready to have your first conversation with a database! Remember:
- Start with SELECT
- Choose what you want to see (* for everything, or specific column names)
- Say FROM and the table name
- End with a semicolon

Think of yourself as a detective gathering clues, a researcher collecting data, or simply someone curious about what information is available. The database is waiting for your questions!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🏫 The registrar needs to see all information about every student for the semester report. Write a query to show everything from the students table.",
        expectedQuery: "SELECT * FROM students",
        hint: "Use the asterisk (*) to select all columns - it's like saying 'show me everything!'",
        solution: "SELECT * FROM students;",
      },
      {
        id: "ex2",
        question:
          "📧 You're creating name tags for orientation and only need student names and their major. Select just the name and major columns.",
        expectedQuery: "SELECT name, major FROM students",
        hint: "List the specific column names you want, separated by commas",
        solution: "SELECT name, major FROM students;",
      },
    ],
  },
  {
    id: "where-clause",
    title: "Filtering with WHERE - Finding Your Perfect Match",
    description:
      "Learn how to filter data using the WHERE clause through real-world scenarios and easy-to-understand examples",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 20,
    content: `
# Filtering with WHERE - Finding Your Perfect Match

## 📖 Story Time: The University Registrar

Meet Maria, the university registrar at CSU. Every day, students and faculty ask her specific questions:
- "Who are all the third-year Computer Science students?"
- "Which students have a GPA above 3.5?"
- "Show me everyone in the Engineering program"

Maria can't show them the entire student database - that would be overwhelming! She needs to **filter** the information to show only what's relevant. This is exactly what the WHERE clause does in SQL.

## 🎯 What is WHERE?

Think of WHERE as your personal filter or search criteria. It's like:
- Setting filters on an online shopping site (price range, brand, color)
- Using search filters on social media (date, location, friends)
- Looking for specific files on your computer (by type, date, name)

WHERE helps you find the needle in the haystack!

## 🏗️ The Structure: SELECT + FROM + WHERE

\`\`\`sql
SELECT [what you want to see] 
FROM [which table] 
WHERE [your conditions];
\`\`\`

Think of it as: "Show me [this info] from [this table] but only for records [that match this condition]"

## 🎪 Real Example: Finding Third-Year Students

Let's use our student database:

| id | name | major | year | gpa |
|----|------|--------|------|-----|
| 1 | Alice Johnson | Computer Science | 3 | 3.8 |
| 2 | Bob Smith | Mathematics | 2 | 3.6 |
| 3 | Carol Brown | Engineering | 4 | 3.9 |
| 4 | David Lee | Computer Science | 3 | 3.7 |

**Query**: "Show me all third-year students"

\`\`\`sql
SELECT * FROM students WHERE year = 3;
\`\`\`

**Result**: Only Alice and David (the students in year 3)

| id | name | major | year | gpa |
|----|------|--------|------|-----|
| 1 | Alice Johnson | Computer Science | 3 | 3.8 |
| 4 | David Lee | Computer Science | 3 | 3.7 |

## 🔍 Comparison Operators - Your Filtering Tools

Think of these as different ways to compare and filter:

### 1. **Equal (=)** - "Exactly This"
\`\`\`sql
SELECT * FROM students WHERE major = 'Computer Science';
\`\`\`
*"Show me students whose major is exactly 'Computer Science'"*

### 2. **Not Equal (<> or !=)** - "Not This"
\`\`\`sql
SELECT * FROM students WHERE year <> 1;
\`\`\`
*"Show me students who are NOT in their first year"*

### 3. **Greater Than (>)** - "More Than This"
\`\`\`sql
SELECT * FROM students WHERE gpa > 3.5;
\`\`\`
*"Show me students with GPA higher than 3.5"*

### 4. **Less Than (<)** - "Less Than This"
\`\`\`sql
SELECT * FROM students WHERE year < 4;
\`\`\`
*"Show me students below their final year"*

### 5. **Greater or Equal (>=)** - "This Much or More"
\`\`\`sql
SELECT * FROM students WHERE gpa >= 3.0;
\`\`\`
*"Show me students with GPA of 3.0 or better"*

### 6. **Less or Equal (<=)** - "This Much or Less"
\`\`\`sql
SELECT * FROM students WHERE year <= 2;
\`\`\`
*"Show me first and second-year students"*

## 🎨 Working with Text vs Numbers

### Text Filtering (Use Quotes!)
\`\`\`sql
SELECT name FROM students WHERE major = 'Engineering';
\`\`\`
*Always use single quotes around text values*

### Number Filtering (No Quotes!)
\`\`\`sql
SELECT name FROM students WHERE year = 3;
\`\`\`
*Numbers don't need quotes*

## 🎯 Real-World Scenarios

### Scenario 1: The Academic Advisor
*"I need to meet with all senior students (year 4)"*
\`\`\`sql
SELECT name, major FROM students WHERE year = 4;
\`\`\`

### Scenario 2: The Scholarship Committee  
*"Show me high-performing students (GPA above 3.8)"*
\`\`\`sql
SELECT name, gpa FROM students WHERE gpa > 3.8;
\`\`\`

### Scenario 3: The Department Head
*"List all Computer Science students"*
\`\`\`sql
SELECT * FROM students WHERE major = 'Computer Science';
\`\`\`

### Scenario 4: The Tutor Coordinator
*"Find students who might need help (GPA below 3.0)"*
\`\`\`sql
SELECT name, gpa, major FROM students WHERE gpa < 3.0;
\`\`\`

## 💡 Pro Tips for Beginners

1. **Text is case-sensitive**: 'Computer Science' ≠ 'computer science'
2. **Use single quotes for text**: 'Engineering' not "Engineering"
3. **No quotes for numbers**: year = 3, not year = '3'
4. **Spaces matter in text**: 'Computer Science' ≠ 'ComputerScience'

## 🎉 Quick Mental Check

Before writing a WHERE clause, ask yourself:
- What am I looking for? (This becomes your condition)
- Is it text or a number? (Determines if you need quotes)
- What comparison am I making? (Determines your operator)

## 🚀 You're Becoming a Data Detective!

With WHERE, you're not just retrieving data - you're asking smart, specific questions. You're becoming a data detective who can:
- Find exactly what you need
- Filter out irrelevant information  
- Answer specific business questions
- Make databases work for you, not against you

Ready to practice your filtering skills? Let's find some data!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🎓 The academic advisor wants to meet with all junior students (year 3) to discuss their upcoming courses. Find all information about third-year students.",
        expectedQuery: "SELECT * FROM students WHERE year = 3",
        hint: "Use WHERE clause to filter: WHERE year = 3 (no quotes needed for numbers!)",
        solution: "SELECT * FROM students WHERE year = 3;",
      },
      {
        id: "ex2",
        question:
          "📋 The Computer Science department needs a list of student names for their department meeting. Show names of students majoring in 'Computer Science'.",
        expectedQuery:
          "SELECT name FROM students WHERE major = 'Computer Science'",
        hint: "Filter by major and remember to use quotes for text: WHERE major = 'Computer Science'",
        solution: "SELECT name FROM students WHERE major = 'Computer Science';",
      },
    ],
  },
  {
    id: "joins",
    title: "JOINs & Relationships - Connecting the Dots",
    description:
      "Master table relationships and combining data from multiple tables through relatable examples and visual thinking",
    difficulty: "Intermediate",
    category: "Advanced Queries",
    estimatedTime: 30,
    content: `
# JOINs & Relationships - Connecting the Dots

## 📖 Story Time: The School Records Office

Imagine you work at CSU's records office. You have information stored in different filing cabinets:

**Cabinet A (Students)**: Contains student personal information
**Cabinet B (Enrollments)**: Contains which courses students are taking  
**Cabinet C (Courses)**: Contains course details like names and credits

A parent calls and asks: *"What courses is my daughter Alice taking this semester?"*

You need information from MULTIPLE cabinets:
1. Find Alice in the Students cabinet (to get her ID)
2. Look up her enrollments in the Enrollments cabinet  
3. Get the course names from the Courses cabinet

This is exactly what a JOIN does - it connects information from different tables!

## 🎯 What Are JOINs?

JOINs are like matchmakers for your data. They find relationships between tables and bring related information together.

Think of JOINs as:
- **Puzzle pieces** that fit together to show the complete picture
- **Bridges** that connect different islands of information
- **Translators** that help tables "talk" to each other

## 🏗️ Understanding Table Relationships

Let's look at our example tables:

### Table 1: Students
| student_id | name | major |
|------------|------|--------|
| 1 | Alice Johnson | Computer Science |
| 2 | Bob Smith | Mathematics |
| 3 | Carol Brown | Engineering |

### Table 2: Enrollments  
| enrollment_id | student_id | course_id | semester |
|---------------|------------|-----------|----------|
| 101 | 1 | 201 | Fall 2023 |
| 102 | 1 | 202 | Fall 2023 |
| 103 | 2 | 203 | Fall 2023 |

### Table 3: Courses
| course_id | course_name | credits |
|-----------|-------------|---------|
| 201 | Database Systems | 3 |
| 202 | Web Development | 3 |
| 203 | Calculus I | 4 |

**The Connection**: student_id links Students to Enrollments, and course_id links Enrollments to Courses.

## 🤝 INNER JOIN - "Show Me What Matches"

INNER JOIN is like saying: *"Only show me records where both tables have matching information"*

**Real-world analogy**: Like a guest list for a party where you only invite people who are both your friends AND available that night.

\`\`\`sql
SELECT students.name, courses.course_name
FROM students
INNER JOIN enrollments ON students.student_id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`

**Result**: Only students who are actually enrolled in courses
| name | course_name |
|------|-------------|
| Alice Johnson | Database Systems |
| Alice Johnson | Web Development |
| Bob Smith | Calculus I |

**Translation**: *"Show me student names and their course names, but only for students who are actually enrolled"*

## 🏠 LEFT JOIN - "Keep Everyone from the First Table"

LEFT JOIN is like saying: *"Show me everyone from the first table, even if they don't have a match in the second table"*

**Real-world analogy**: Like a class roster that shows all registered students, even if some haven't chosen their courses yet.

\`\`\`sql
SELECT students.name, courses.course_name
FROM students
LEFT JOIN enrollments ON students.student_id = enrollments.student_id
LEFT JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`

**Result**: All students, whether enrolled or not
| name | course_name |
|------|-------------|
| Alice Johnson | Database Systems |
| Alice Johnson | Web Development |
| Bob Smith | Calculus I |
| Carol Brown | NULL |

**Translation**: *"Show me all students and their courses. If a student isn't enrolled, show NULL for course"*

## 🎪 Step-by-Step JOIN Process

Think of JOINs as a 3-step process:

### Step 1: Choose Your Tables
\`\`\`sql
FROM students                    -- This is your "main" table
\`\`\`

### Step 2: Connect the Tables
\`\`\`sql
JOIN enrollments ON students.student_id = enrollments.student_id
\`\`\`
*"Connect students to enrollments where the IDs match"*

### Step 3: Choose What to Display
\`\`\`sql
SELECT students.name, courses.course_name
\`\`\`
*"Show the student names and course names from the connected data"*

## 🎯 Easy JOIN Writing Formula

1. **Start with SELECT**: What do you want to see?
2. **FROM**: Which table is your starting point?
3. **JOIN**: Which other table do you want to connect?
4. **ON**: What field connects them?

\`\`\`sql
SELECT [what you want to see]
FROM [starting table]
JOIN [connecting table] ON [how they connect];
\`\`\`

## 🎨 Real-World Scenarios

### Scenario 1: The Academic Report
*"I need a report showing student names and their course names"*

\`\`\`sql
SELECT students.name, courses.course_name
FROM students
JOIN enrollments ON students.student_id = enrollments.student_id
JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`

### Scenario 2: The Email List  
*"Send course updates to all enrolled students"*

\`\`\`sql
SELECT students.name, students.email, courses.course_name
FROM students
JOIN enrollments ON students.student_id = enrollments.student_id
JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`

### Scenario 3: The Credit Count
*"How many credits is each student taking?"*

\`\`\`sql
SELECT students.name, SUM(courses.credits) as total_credits
FROM students
JOIN enrollments ON students.student_id = enrollments.student_id
JOIN courses ON enrollments.course_id = courses.course_id
GROUP BY students.name;
\`\`\`

## 💡 JOIN Success Tips

1. **Identify the connection**: What field links your tables?
2. **Use table names**: Always specify which table each column comes from
3. **Start simple**: Begin with two tables, then add more
4. **Check your results**: Make sure the data makes sense

## 🎉 Think of JOINs as Storytelling

Every JOIN tells a story by connecting different pieces of information:
- Students + Courses = "Who is learning what?"
- Orders + Products = "What did customers buy?"
- Employees + Departments = "Who works where?"

## 🚀 You're Now a Data Connector!

With JOINs, you can:
- Answer complex questions that span multiple tables
- Create comprehensive reports  
- Understand relationships in your data
- Tell complete stories with your database

Ready to start connecting your data? Let's JOIN some tables!
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
    title: "Aggregate Functions - Turning Data into Insights",
    description:
      "Learn to use COUNT, SUM, AVG, MIN, MAX, and GROUP BY through practical examples and storytelling",
    difficulty: "Intermediate",
    category: "Data Analysis",
    estimatedTime: 25,
    content: `
# Aggregate Functions - Turning Data into Insights

## 📖 Story Time: The School Principal's Questions

Meet Dr. Santos, the principal of CSU. Every month, she needs to answer important questions for the school board:
- "How many students do we have in total?"
- "What's the average GPA across all students?"
- "Which program has the most students?"
- "What's the highest GPA achieved this semester?"

Dr. Santos doesn't need to see every single student record. She needs **summaries** and **insights**. This is where aggregate functions shine - they turn lots of individual data points into meaningful summary information.

## 🎯 What Are Aggregate Functions?

Think of aggregate functions as your personal data statisticians. They:
- **Count** things for you (like a census taker)
- **Calculate averages** (like a grade calculator)
- **Find extremes** (like finding the tallest or shortest person)
- **Sum totals** (like adding up all your expenses)

**Key insight**: They take many rows of data and give you ONE meaningful answer.

## 🔢 The Five Essential Functions

Let's use our student data to understand each function:

| student_id | name | major | year | gpa | credits |
|------------|------|--------|------|-----|---------|
| 1 | Alice | Computer Science | 3 | 3.8 | 15 |
| 2 | Bob | Mathematics | 2 | 3.6 | 12 |
| 3 | Carol | Computer Science | 4 | 3.9 | 18 |
| 4 | David | Engineering | 1 | 3.2 | 9 |
| 5 | Eva | Mathematics | 3 | 3.7 | 15 |

### 1. COUNT() - "How Many?"

**Real-world question**: "How many students do we have?"

\`\`\`sql
SELECT COUNT(*) FROM students;
\`\`\`
**Result**: 5

**Think of it as**: Counting people in a room, cars in a parking lot, or items in your shopping cart.

### 2. AVG() - "What's Typical?"

**Real-world question**: "What's the average GPA of our students?"

\`\`\`sql
SELECT AVG(gpa) FROM students;
\`\`\`
**Result**: 3.64

**Think of it as**: The "middle ground" - if all students had the same GPA, what would it be?

### 3. SUM() - "What's the Total?"

**Real-world question**: "How many total credits are students taking?"

\`\`\`sql
SELECT SUM(credits) FROM students;
\`\`\`
**Result**: 69

**Think of it as**: Adding up everything - like your total monthly expenses or total hours worked.

### 4. MIN() - "What's the Smallest?"

**Real-world question**: "What's the lowest GPA we have?"

\`\`\`sql
SELECT MIN(gpa) FROM students;
\`\`\`
**Result**: 3.2

**Think of it as**: Finding the shortest person, the cheapest item, or the earliest date.

### 5. MAX() - "What's the Biggest?"

**Real-world question**: "What's the highest GPA achieved?"

\`\`\`sql
SELECT MAX(gpa) FROM students;
\`\`\`
**Result**: 3.9

**Think of it as**: Finding the tallest person, the most expensive item, or the latest date.

## 🎪 GROUP BY - "Break It Down by Category"

Sometimes you want statistics **for each group** rather than for everyone combined.

**Real-world question**: "How many students are in each major?"

\`\`\`sql
SELECT major, COUNT(*) as student_count
FROM students
GROUP BY major;
\`\`\`

**Result**:
| major | student_count |
|--------|---------------|
| Computer Science | 2 |
| Mathematics | 2 |
| Engineering | 1 |

**Think of it as**: Instead of counting everyone together, count them in separate piles based on their major.

## 🎨 Combining Functions for Deeper Insights

### Example 1: Department Statistics
*"Give me a complete statistical summary for each major"*

\`\`\`sql
SELECT major,
       COUNT(*) as total_students,
       AVG(gpa) as average_gpa,
       MIN(gpa) as lowest_gpa,
       MAX(gpa) as highest_gpa,
       SUM(credits) as total_credits
FROM students
GROUP BY major;
\`\`\`

### Example 2: Year-Level Analysis
*"How are students distributed across year levels?"*

\`\`\`sql
SELECT year,
       COUNT(*) as students_count,
       AVG(gpa) as avg_gpa
FROM students
GROUP BY year
ORDER BY year;
\`\`\`

## 🎯 Real-World Scenarios

### Scenario 1: The Admissions Report
*"We need enrollment statistics for the board meeting"*

\`\`\`sql
SELECT COUNT(*) as total_enrollment,
       AVG(gpa) as overall_gpa,
       COUNT(DISTINCT major) as number_of_majors
FROM students;
\`\`\`

### Scenario 2: The Academic Performance Review
*"Which major has the highest performing students?"*

\`\`\`sql
SELECT major,
       AVG(gpa) as average_gpa,
       COUNT(*) as student_count
FROM students
GROUP BY major
ORDER BY average_gpa DESC;
\`\`\`

### Scenario 3: The Course Load Analysis
*"Are students taking appropriate credit loads by year?"*

\`\`\`sql
SELECT year,
       AVG(credits) as avg_credits,
       MIN(credits) as min_credits,
       MAX(credits) as max_credits
FROM students
GROUP BY year;
\`\`\`

## 💡 Pro Tips for Success

### 1. **Give Your Results Names**
\`\`\`sql
SELECT COUNT(*) as total_students,
       AVG(gpa) as average_gpa
FROM students;
\`\`\`
*Use "AS" to name your columns something meaningful*

### 2. **Round Decimals for Readability**
\`\`\`sql
SELECT major,
       ROUND(AVG(gpa), 2) as average_gpa
FROM students
GROUP BY major;
\`\`\`

### 3. **Order Your Results**
\`\`\`sql
SELECT major, COUNT(*) as student_count
FROM students
GROUP BY major
ORDER BY student_count DESC;
\`\`\`
*Show the largest groups first*

## 🎉 Think Like a Data Analyst

When using aggregate functions, ask yourself:
1. **What question am I trying to answer?**
2. **Do I want one overall answer or answers for each group?**
3. **What would make this information more useful?**

## 🚀 You're Now a Data Summarizer!

With aggregate functions, you can:
- Transform thousands of records into meaningful insights
- Answer "big picture" questions about your data
- Create executive summaries and reports
- Identify trends and patterns
- Make data-driven decisions

Remember: You're not just counting or calculating - you're turning raw data into actionable intelligence that helps people make better decisions!

Ready to start creating insights from your data? Let's aggregate!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📊 The principal needs to report total enrollment to the school board. Count how many students are currently enrolled.",
        expectedQuery: "SELECT COUNT(*) FROM students",
        hint: "Use COUNT(*) to count all rows - the asterisk means 'count everything'",
        solution: "SELECT COUNT(*) FROM students;",
      },
      {
        id: "ex2",
        question:
          "📈 The admissions office wants to see enrollment numbers by major to plan resources. Show each major and how many students are in it.",
        expectedQuery: "SELECT major, COUNT(*) FROM students GROUP BY major",
        hint: "Use GROUP BY major to separate students into groups, then COUNT(*) for each group",
        solution: "SELECT major, COUNT(*) FROM students GROUP BY major;",
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

  // Advanced SQL Lessons
  {
    id: "window-functions",
    title: "Window Functions & Analytics",
    description:
      "Master window functions for advanced analytics including ranking, running totals, and statistical functions",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 45,
    content: `
# Window Functions & Analytics - The Sports Statistician's Toolkit

## 📖 Story Time: The Sports Analytics Department

Imagine you work for CSU's sports analytics department. The basketball coach comes to you with complex questions:
- "Who are our top 3 scorers this season, but I also want to see everyone's stats?"
- "Show me each player's points compared to the team average"
- "I want to see each player's best game and how it compares to their previous game"
- "Calculate running totals of points scored throughout the season"

With regular aggregate functions like COUNT() or AVG(), you'd lose the individual player details. But window functions are like having X-ray vision - they let you see both the individual details AND the analytical insights in the same view!

## 🎯 What Makes Window Functions Special?

Window functions are like having a **smart calculator** that can:
- **Look around**: See other rows while working on the current row
- **Compare**: Rank players while showing all their details  
- **Remember**: Keep track of running totals and trends
- **Group intelligently**: Calculate team averages while showing individual stats

**Key insight**: Unlike aggregate functions that "squash" many rows into one result, window functions **preserve every row** while adding analytical insights.

## 🪟 The "Window" Concept

Think of a window function as looking through different **windows** or **lenses** at your data:
- **Ranking Window**: "Who's #1, #2, #3?" 
- **Comparison Window**: "How does this compare to average?"
- **Time Window**: "What happened before/after this?"
- **Group Window**: "What's happening within each team?"

## 🏗️ The Basic Structure - Your Analytics Formula

\`\`\`sql
SELECT [regular columns], 
       [window function]() OVER (
         [PARTITION BY - which groups?] 
         [ORDER BY - what order?] 
         [ROWS/RANGE - which neighbors?]
       ) AS [analysis name]
FROM [table];
\`\`\`

**Translation**: "Show me regular data PLUS analytical insights calculated OVER a specific window of related rows"

## Ranking Functions

### ROW_NUMBER()
Assigns a unique sequential integer to each row:

\`\`\`sql
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;
\`\`\`

### RANK() and DENSE_RANK()
- RANK(): Leaves gaps in ranking for tied values
- DENSE_RANK(): No gaps in ranking

\`\`\`sql
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) as rank,
       DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;
\`\`\`

## Analytical Functions

### LAG() and LEAD()
Access previous or next row values:

\`\`\`sql
SELECT name, salary,
       LAG(salary, 1) OVER (ORDER BY salary) as prev_salary,
       LEAD(salary, 1) OVER (ORDER BY salary) as next_salary
FROM employees;
\`\`\`

### Running Totals
\`\`\`sql
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) as running_total
FROM sales;
\`\`\`

## Partitioning Data

Use PARTITION BY to perform calculations within groups:

\`\`\`sql
SELECT department, name, salary,
       AVG(salary) OVER (PARTITION BY department) as dept_avg_salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🏆 The dean wants to see the top performers in each major for the honors ceremony. Rank students by GPA within their major (show name, major, gpa, and their rank within the major).",
        expectedQuery:
          "SELECT name, major, gpa, RANK() OVER (PARTITION BY major ORDER BY gpa DESC) as rank FROM students",
        hint: "Use PARTITION BY major to create separate ranking 'windows' for each major, then ORDER BY gpa DESC to rank from highest to lowest",
        solution:
          "SELECT name, major, gpa, RANK() OVER (PARTITION BY major ORDER BY gpa DESC) as major_rank FROM students;",
      },
      {
        id: "ex2",
        question:
          "📈 Track the progression of total credits earned across all years. Create a running total that shows cumulative credits as students advance from year 1 to 4.",
        expectedQuery:
          "SELECT name, year, credits, SUM(credits) OVER (ORDER BY year ROWS UNBOUNDED PRECEDING) as running_total FROM students",
        hint: "Use SUM() with OVER clause and ROWS UNBOUNDED PRECEDING to add up all credits from the beginning through the current row",
        solution:
          "SELECT name, year, credits, SUM(credits) OVER (ORDER BY year ROWS UNBOUNDED PRECEDING) as running_total FROM students;",
      },
    ],
  },

  {
    id: "ctes-recursive",
    title: "Common Table Expressions (CTEs)",
    description:
      "Learn to use CTEs for complex queries and recursive operations on hierarchical data",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 35,
    content: `
# Common Table Expressions (CTEs)

CTEs provide a way to define temporary named result sets that exist only for the duration of a single query.

## Basic CTE Syntax

\`\`\`sql
WITH cte_name (column1, column2) AS (
    SELECT column1, column2
    FROM table_name
    WHERE condition
)
SELECT * FROM cte_name;
\`\`\`

## Multiple CTEs

You can define multiple CTEs in a single query:

\`\`\`sql
WITH 
high_gpa_students AS (
    SELECT * FROM students WHERE gpa > 3.5
),
cs_students AS (
    SELECT * FROM students WHERE major = 'Computer Science'
)
SELECT h.name, h.gpa
FROM high_gpa_students h
JOIN cs_students c ON h.id = c.id;
\`\`\`

## Recursive CTEs

Recursive CTEs are powerful for working with hierarchical data:

\`\`\`sql
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;
\`\`\`

## Use Cases

1. **Complex Data Transformations**: Break down complex queries into readable parts
2. **Hierarchical Queries**: Organization charts, bill of materials
3. **Graph Traversal**: Finding paths in network data
4. **Data Generation**: Creating sequences or test data

## Example: Finding All Subordinates

\`\`\`sql
WITH RECURSIVE subordinates AS (
    SELECT id, name, manager_id
    FROM employees
    WHERE id = 100  -- Starting employee
    
    UNION ALL
    
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    JOIN subordinates s ON e.manager_id = s.id
)
SELECT name FROM subordinates WHERE id != 100;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Create a CTE to find all students with GPA > 3.0 and then count them by major",
        expectedQuery:
          "WITH good_students AS (SELECT * FROM students WHERE gpa > 3.0) SELECT major, COUNT(*) FROM good_students GROUP BY major",
        hint: "Use WITH clause to create the CTE, then GROUP BY major",
        solution:
          "WITH good_students AS (SELECT * FROM students WHERE gpa > 3.0) SELECT major, COUNT(*) as student_count FROM good_students GROUP BY major;",
      },
    ],
  },

  {
    id: "query-optimization",
    title: "Query Optimization & Performance",
    description:
      "Learn techniques to optimize SQL queries for better performance and understand execution plans",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 40,
    content: `
# Query Optimization & Performance

Query optimization is crucial for maintaining database performance as data grows. Understanding how the database executes queries helps write more efficient SQL.

## Understanding Execution Plans

An execution plan shows how the database engine will execute your query:

\`\`\`sql
EXPLAIN SELECT * FROM students WHERE major = 'Computer Science';
\`\`\`

## Indexing Strategies

### When to Use Indexes

1. **Primary Keys**: Always indexed automatically
2. **Foreign Keys**: Should be indexed for join performance
3. **WHERE Clause Columns**: Frequently filtered columns
4. **ORDER BY Columns**: For sorting performance

\`\`\`sql
-- Create index on frequently queried column
CREATE INDEX idx_student_major ON students(major);

-- Composite index for multiple columns
CREATE INDEX idx_student_major_year ON students(major, year);
\`\`\`

## Query Optimization Techniques

### 1. Use Specific Column Names
❌ Avoid: \`SELECT * FROM students\`  
✅ Better: \`SELECT name, major, gpa FROM students\`

### 2. Limit Result Sets
\`\`\`sql
SELECT name, gpa FROM students 
WHERE major = 'Computer Science' 
LIMIT 100;
\`\`\`

### 3. Use EXISTS Instead of IN for Large Subqueries
❌ Slower:
\`\`\`sql
SELECT * FROM students 
WHERE id IN (SELECT student_id FROM enrollments);
\`\`\`

✅ Faster:
\`\`\`sql
SELECT * FROM students s
WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id);
\`\`\`

### 4. JOIN vs Subquery Performance
Sometimes JOINs perform better than subqueries:

\`\`\`sql
-- Using JOIN (often faster)
SELECT s.name, s.gpa
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.course_id = 'CS101';
\`\`\`

### 5. Use UNION ALL Instead of UNION
If you don't need to remove duplicates, UNION ALL is faster:

\`\`\`sql
SELECT name FROM current_students
UNION ALL
SELECT name FROM graduated_students;
\`\`\`

## Analyzing Query Performance

### 1. Check Execution Time
\`\`\`sql
-- Enable timing
SET statistics time ON;
SELECT * FROM students WHERE gpa > 3.5;
\`\`\`

### 2. Analyze Index Usage
\`\`\`sql
-- Show indexes on a table
SHOW INDEXES FROM students;
\`\`\`

### 3. Query Statistics
\`\`\`sql
-- Show query execution statistics
SHOW PROFILES;
\`\`\`

## Common Performance Issues

1. **Missing Indexes**: Queries scan entire tables
2. **Inefficient JOINs**: Cartesian products or missing join conditions
3. **Functions in WHERE Clauses**: Prevents index usage
4. **SELECT ***: Retrieves unnecessary data
5. **Correlated Subqueries**: Execute once per outer row

## Best Practices

1. **Test with Real Data Volumes**: Performance characteristics change with scale
2. **Monitor Query Performance**: Regular analysis of slow queries
3. **Update Table Statistics**: Keep database statistics current
4. **Consider Partitioning**: For very large tables
5. **Use Database-Specific Features**: Leverage your database's optimization features
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Rewrite this inefficient query using EXISTS instead of IN: SELECT * FROM students WHERE id IN (SELECT student_id FROM enrollments WHERE course_id = 'CS101')",
        expectedQuery:
          "SELECT * FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id AND e.course_id = 'CS101')",
        hint: "Use EXISTS with a correlated subquery instead of IN",
        solution:
          "SELECT * FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id AND e.course_id = 'CS101');",
      },
    ],
  },

  {
    id: "transactions-acid",
    title: "Transactions & ACID Properties",
    description:
      "Master database transactions, ACID properties, and handling concurrent access safely",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 30,
    content: `
# Transactions & ACID Properties

A transaction is a unit of work performed against a database that is treated in a coherent and reliable way independent of other transactions.

## ACID Properties

### Atomicity
All operations in a transaction succeed or fail together:

\`\`\`sql
BEGIN TRANSACTION;
    INSERT INTO accounts (id, balance) VALUES (1, 1000);
    INSERT INTO accounts (id, balance) VALUES (2, 500);
COMMIT;  -- Both inserts succeed or both fail
\`\`\`

### Consistency
Database remains in a valid state before and after transaction:

\`\`\`sql
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
    -- Total money in system remains the same
COMMIT;
\`\`\`

### Isolation
Transactions don't interfere with each other:

\`\`\`sql
-- Transaction 1
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;  -- Reads 1000
-- Other transactions can't modify this row until commit
UPDATE accounts SET balance = 900 WHERE id = 1;
COMMIT;
\`\`\`

### Durability
Committed changes persist even after system failure.

## Transaction Control

### Basic Transaction Commands

\`\`\`sql
-- Start a transaction
BEGIN TRANSACTION;
-- or
START TRANSACTION;

-- Save changes
COMMIT;

-- Undo changes
ROLLBACK;
\`\`\`

### Savepoints
Create checkpoints within transactions:

\`\`\`sql
BEGIN TRANSACTION;
    INSERT INTO students (name, major) VALUES ('John', 'CS');
    
    SAVEPOINT sp1;
    
    UPDATE students SET gpa = 3.5 WHERE name = 'John';
    
    -- Something goes wrong, rollback to savepoint
    ROLLBACK TO SAVEPOINT sp1;
    
    -- John is still inserted, but GPA update is undone
COMMIT;
\`\`\`

## Isolation Levels

### Read Uncommitted
Can read uncommitted changes from other transactions (dirty reads):

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
\`\`\`

### Read Committed (Default in most databases)
Only reads committed data:

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
\`\`\`

### Repeatable Read
Same query returns same results throughout transaction:

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
\`\`\`

### Serializable
Strongest isolation, prevents all concurrency issues:

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

## Handling Concurrency Issues

### Deadlock Prevention
Structure transactions to access resources in consistent order:

\`\`\`sql
-- Always update accounts in ID order to prevent deadlocks
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 
    WHERE id = (SELECT MIN(id) FROM (VALUES (1), (2)) AS t(id));
    
    UPDATE accounts SET balance = balance + 100 
    WHERE id = (SELECT MAX(id) FROM (VALUES (1), (2)) AS t(id));
COMMIT;
\`\`\`

### Error Handling
\`\`\`sql
BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO students (name, major) VALUES ('Jane', 'Math');
        UPDATE courses SET enrolled = enrolled + 1 WHERE id = 'MATH101';
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        -- Handle error
    END CATCH;
\`\`\`

## Best Practices

1. **Keep Transactions Short**: Minimize lock duration
2. **Handle Errors Gracefully**: Always have rollback strategy
3. **Use Appropriate Isolation Levels**: Balance consistency vs performance
4. **Avoid User Interaction in Transactions**: Don't wait for user input
5. **Test Concurrent Scenarios**: Verify behavior under load
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Create a transaction that transfers credits between students (subtract 3 from student ID 1, add 3 to student ID 2)",
        expectedQuery:
          "BEGIN TRANSACTION; UPDATE students SET credits = credits - 3 WHERE id = 1; UPDATE students SET credits = credits + 3 WHERE id = 2; COMMIT",
        hint: "Use BEGIN TRANSACTION, two UPDATE statements, and COMMIT",
        solution:
          "BEGIN TRANSACTION; UPDATE students SET credits = credits - 3 WHERE id = 1; UPDATE students SET credits = credits + 3 WHERE id = 2; COMMIT;",
      },
    ],
  },

  {
    id: "security-best-practices",
    title: "Database Security & Best Practices",
    description:
      "Learn essential database security practices including SQL injection prevention and access control",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 35,
    content: `
# Database Security & Best Practices

Database security is critical for protecting sensitive data and maintaining system integrity.

## SQL Injection Prevention

### The Problem
SQL injection occurs when user input is directly concatenated into SQL queries:

❌ **DANGEROUS - Never do this:**
\`\`\`sql
-- If userInput = "'; DROP TABLE students; --"
-- SELECT * FROM students WHERE name = '" + userInput + "';
-- Results in: SELECT * FROM students WHERE name = ''; DROP TABLE students; --';
\`\`\`

### The Solution: Parameterized Queries

✅ **Safe approach using parameters:**
\`\`\`sql
-- Using prepared statements/parameters
SELECT * FROM students WHERE name = ? AND major = ?;
-- Parameters: ['John Smith', 'Computer Science']
\`\`\`

### Input Validation
Always validate and sanitize user input:

\`\`\`sql
-- Validate data types and ranges
WHERE student_id BETWEEN 1 AND 999999
AND major IN ('Computer Science', 'Mathematics', 'Engineering')
\`\`\`

## Access Control & Permissions

### Principle of Least Privilege
Grant only the minimum permissions needed:

\`\`\`sql
-- Create role for read-only users
CREATE ROLE student_reader;
GRANT SELECT ON students TO student_reader;
GRANT SELECT ON courses TO student_reader;

-- Create role for instructors
CREATE ROLE instructor;
GRANT SELECT, INSERT, UPDATE ON grades TO instructor;
GRANT SELECT ON students TO instructor;

-- Assign role to user
GRANT student_reader TO 'john@university.edu';
\`\`\`

### Database Users and Roles
\`\`\`sql
-- Create application-specific users
CREATE USER 'web_app'@'localhost' IDENTIFIED BY 'strong_password';
CREATE USER 'reporting'@'%' IDENTIFIED BY 'another_strong_password';

-- Grant specific permissions
GRANT SELECT, INSERT, UPDATE ON school_db.* TO 'web_app'@'localhost';
GRANT SELECT ON school_db.* TO 'reporting'@'%';
\`\`\`

## Data Protection Strategies

### Encryption at Rest
\`\`\`sql
-- Create encrypted columns for sensitive data
ALTER TABLE students ADD COLUMN ssn_encrypted VARBINARY(255);

-- Use built-in encryption functions
INSERT INTO students (name, ssn_encrypted) 
VALUES ('John Doe', AES_ENCRYPT('123-45-6789', 'encryption_key'));
\`\`\`

### Data Masking
Hide sensitive data in non-production environments:

\`\`\`sql
-- Mask SSN for development/testing
SELECT 
    name,
    CONCAT('XXX-XX-', RIGHT(ssn, 4)) as masked_ssn,
    major
FROM students;
\`\`\`

### Audit Trails
Track database changes:

\`\`\`sql
-- Create audit table
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50),
    operation VARCHAR(10),
    old_values JSON,
    new_values JSON,
    user VARCHAR(50),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit trigger example
CREATE TRIGGER student_audit 
AFTER UPDATE ON students
FOR EACH ROW
INSERT INTO audit_log (table_name, operation, old_values, new_values, user)
VALUES ('students', 'UPDATE', 
        JSON_OBJECT('name', OLD.name, 'gpa', OLD.gpa),
        JSON_OBJECT('name', NEW.name, 'gpa', NEW.gpa),
        USER());
\`\`\`

## Database Security Checklist

### 1. Authentication & Authorization
- [ ] Strong password policies
- [ ] Multi-factor authentication where possible
- [ ] Regular password rotation
- [ ] Role-based access control

### 2. Network Security
- [ ] Firewall rules restricting database access
- [ ] VPN or private networks for remote access
- [ ] SSL/TLS encryption for connections
- [ ] Disable unnecessary network protocols

### 3. Database Configuration
- [ ] Remove default accounts and passwords
- [ ] Disable unnecessary features and services
- [ ] Regular security updates and patches
- [ ] Secure file permissions

### 4. Monitoring & Logging
- [ ] Enable query logging
- [ ] Monitor failed login attempts
- [ ] Alert on suspicious activities
- [ ] Regular security audits

### 5. Data Protection
- [ ] Encrypt sensitive data
- [ ] Regular backups with encryption
- [ ] Test backup restoration procedures
- [ ] Data retention policies

## Common Vulnerabilities

### 1. SQL Injection
**Prevention:** Use parameterized queries, input validation

### 2. Privilege Escalation
**Prevention:** Principle of least privilege, regular permission audits

### 3. Data Exposure
**Prevention:** Encryption, access controls, network security

### 4. Weak Authentication
**Prevention:** Strong passwords, MFA, account lockouts

### 5. Unpatched Systems
**Prevention:** Regular updates, vulnerability scanning
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Create a role called 'student_assistant' that can only SELECT from students and INSERT into grades tables",
        expectedQuery:
          "CREATE ROLE student_assistant; GRANT SELECT ON students TO student_assistant; GRANT INSERT ON grades TO student_assistant",
        hint: "Use CREATE ROLE followed by GRANT statements for each permission",
        solution:
          "CREATE ROLE student_assistant; GRANT SELECT ON students TO student_assistant; GRANT INSERT ON grades TO student_assistant;",
      },
    ],
  },

  {
    id: "data-warehousing",
    title: "Data Warehousing Concepts",
    description:
      "Introduction to data warehousing, dimensional modeling, and analytical queries for business intelligence",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 40,
    content: `
# Data Warehousing Concepts

Data warehouses are designed for analytical processing and business intelligence, optimized for reading large volumes of historical data.

## OLTP vs OLAP

### OLTP (Online Transaction Processing)
- Optimized for transaction processing
- Normalized data structure
- Current data focus
- High concurrency, low latency

### OLAP (Online Analytical Processing)
- Optimized for analytical queries
- Denormalized data structure (star/snowflake schema)
- Historical data focus
- Complex queries, bulk operations

## Dimensional Modeling

### Star Schema
A central fact table surrounded by dimension tables:

\`\`\`sql
-- Fact table: Sales
CREATE TABLE fact_sales (
    sales_id INT PRIMARY KEY,
    date_id INT,
    product_id INT,
    customer_id INT,
    store_id INT,
    quantity INT,
    revenue DECIMAL(10,2),
    cost DECIMAL(10,2),
    FOREIGN KEY (date_id) REFERENCES dim_date(date_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (customer_id) REFERENCES dim_customer(customer_id),
    FOREIGN KEY (store_id) REFERENCES dim_store(store_id)
);

-- Dimension table: Product
CREATE TABLE dim_product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    brand VARCHAR(50),
    price DECIMAL(8,2)
);
\`\`\`

### Slowly Changing Dimensions (SCD)

**Type 1 SCD - Overwrite:**
\`\`\`sql
-- Simply update the record
UPDATE dim_customer 
SET city = 'New York', state = 'NY' 
WHERE customer_id = 123;
\`\`\`

**Type 2 SCD - Add New Record:**
\`\`\`sql
-- Add version tracking
ALTER TABLE dim_customer ADD (
    effective_date DATE,
    expiry_date DATE,
    is_current BOOLEAN DEFAULT TRUE
);

-- When customer moves, close old record and create new one
UPDATE dim_customer 
SET expiry_date = CURRENT_DATE, is_current = FALSE 
WHERE customer_id = 123 AND is_current = TRUE;

INSERT INTO dim_customer (customer_id, name, city, state, effective_date, is_current)
VALUES (123, 'John Smith', 'New York', 'NY', CURRENT_DATE, TRUE);
\`\`\`

## Analytical Queries

### Time-Based Analysis
\`\`\`sql
-- Monthly sales trend
SELECT 
    d.year,
    d.month,
    SUM(f.revenue) as monthly_revenue,
    LAG(SUM(f.revenue)) OVER (ORDER BY d.year, d.month) as prev_month_revenue,
    (SUM(f.revenue) - LAG(SUM(f.revenue)) OVER (ORDER BY d.year, d.month)) / 
    LAG(SUM(f.revenue)) OVER (ORDER BY d.year, d.month) * 100 as growth_rate
FROM fact_sales f
JOIN dim_date d ON f.date_id = d.date_id
GROUP BY d.year, d.month
ORDER BY d.year, d.month;
\`\`\`

### Product Performance Analysis
\`\`\`sql
-- Top performing products by category
SELECT 
    p.category,
    p.product_name,
    SUM(f.revenue) as total_revenue,
    RANK() OVER (PARTITION BY p.category ORDER BY SUM(f.revenue) DESC) as category_rank
FROM fact_sales f
JOIN dim_product p ON f.product_id = p.product_id
JOIN dim_date d ON f.date_id = d.date_id
WHERE d.year = 2023
GROUP BY p.category, p.product_name
HAVING RANK() OVER (PARTITION BY p.category ORDER BY SUM(f.revenue) DESC) <= 5;
\`\`\`

### Customer Segmentation
\`\`\`sql
-- RFM Analysis (Recency, Frequency, Monetary)
WITH customer_metrics AS (
    SELECT 
        c.customer_id,
        c.name,
        MAX(d.date) as last_purchase_date,
        COUNT(DISTINCT f.sales_id) as purchase_frequency,
        SUM(f.revenue) as total_spent,
        DATEDIFF(CURRENT_DATE, MAX(d.date)) as days_since_last_purchase
    FROM fact_sales f
    JOIN dim_customer c ON f.customer_id = c.customer_id
    JOIN dim_date d ON f.date_id = d.date_id
    WHERE d.date >= DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR)
    GROUP BY c.customer_id, c.name
)
SELECT 
    customer_id,
    name,
    days_since_last_purchase,
    purchase_frequency,
    total_spent,
    CASE 
        WHEN days_since_last_purchase <= 30 AND total_spent >= 1000 THEN 'VIP'
        WHEN days_since_last_purchase <= 60 AND purchase_frequency >= 5 THEN 'Loyal'
        WHEN days_since_last_purchase <= 90 THEN 'Regular'
        ELSE 'At Risk'
    END as customer_segment
FROM customer_metrics
ORDER BY total_spent DESC;
\`\`\`

## Data Warehouse ETL Process

### Extract, Transform, Load

**Extract:**
\`\`\`sql
-- Extract new/changed records from source
SELECT * FROM source_orders 
WHERE last_modified >= '2023-01-01';
\`\`\`

**Transform:**
\`\`\`sql
-- Clean and transform data
SELECT 
    order_id,
    UPPER(TRIM(customer_name)) as customer_name,
    CASE 
        WHEN order_status = 'COMP' THEN 'Completed'
        WHEN order_status = 'PEND' THEN 'Pending'
        ELSE 'Unknown'
    END as order_status,
    COALESCE(discount, 0) as discount
FROM staging_orders;
\`\`\`

**Load:**
\`\`\`sql
-- Load into data warehouse
INSERT INTO fact_sales (date_id, product_id, customer_id, quantity, revenue)
SELECT 
    d.date_id,
    p.product_id,
    c.customer_id,
    o.quantity,
    o.amount
FROM staging_orders o
JOIN dim_date d ON o.order_date = d.date
JOIN dim_product p ON o.product_code = p.product_code
JOIN dim_customer c ON o.customer_email = c.email;
\`\`\`

## Performance Optimization

### Partitioning
\`\`\`sql
-- Partition fact table by date
CREATE TABLE fact_sales (
    sales_id INT,
    date_id INT,
    product_id INT,
    revenue DECIMAL(10,2)
) 
PARTITION BY RANGE (date_id) (
    PARTITION p2022 VALUES LESS THAN (20230101),
    PARTITION p2023 VALUES LESS THAN (20240101),
    PARTITION p2024 VALUES LESS THAN (20250101)
);
\`\`\`

### Materialized Views
\`\`\`sql
-- Pre-calculate common aggregations
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT 
    d.year,
    d.month,
    p.category,
    SUM(f.revenue) as total_revenue,
    COUNT(*) as transaction_count
FROM fact_sales f
JOIN dim_date d ON f.date_id = d.date_id
JOIN dim_product p ON f.product_id = p.product_id
GROUP BY d.year, d.month, p.category;
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Write a query to find the top 3 students by total credits in each major (use window functions)",
        expectedQuery:
          "SELECT name, major, total_credits FROM (SELECT name, major, credits as total_credits, ROW_NUMBER() OVER (PARTITION BY major ORDER BY credits DESC) as rn FROM students) ranked WHERE rn <= 3",
        hint: "Use ROW_NUMBER() window function with PARTITION BY major and ORDER BY credits DESC, then filter for top 3",
        solution:
          "SELECT name, major, credits as total_credits FROM (SELECT name, major, credits, ROW_NUMBER() OVER (PARTITION BY major ORDER BY credits DESC) as rn FROM students) ranked WHERE rn <= 3;",
      },
    ],
  },

  {
    id: "performance-tuning",
    title: "Advanced Performance Tuning",
    description:
      "Deep dive into database performance optimization, indexing strategies, and query plan analysis",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 50,
    content: `
# Advanced Performance Tuning

Performance tuning is both an art and a science, requiring deep understanding of database internals and query optimization.

## Query Execution Plans

Understanding how your database executes queries is crucial for optimization.

### Reading Execution Plans

\`\`\`sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT s.name, c.course_name 
FROM students s 
JOIN enrollments e ON s.id = e.student_id 
JOIN courses c ON e.course_id = c.id 
WHERE s.major = 'Computer Science';

-- MySQL
EXPLAIN FORMAT=JSON SELECT s.name, c.course_name 
FROM students s 
JOIN enrollments e ON s.id = e.student_id 
JOIN courses c ON e.course_id = c.id 
WHERE s.major = 'Computer Science';
\`\`\`

### Key Metrics in Execution Plans

- **Cost**: Estimated relative cost of operation
- **Rows**: Estimated number of rows processed
- **Actual Time**: Real execution time
- **Buffers**: I/O operations performed

## Advanced Indexing Strategies

### Composite Indexes
Order columns by selectivity (most selective first):

\`\`\`sql
-- Good: major is more selective than year
CREATE INDEX idx_student_major_year ON students(major, year);

-- Query can use this index efficiently
SELECT * FROM students WHERE major = 'Computer Science' AND year = 3;

-- This query can still use the index (leftmost prefix)
SELECT * FROM students WHERE major = 'Computer Science';
\`\`\`

### Covering Indexes
Include all columns needed by the query:

\`\`\`sql
-- Instead of going back to table, include needed columns
CREATE INDEX idx_student_covering ON students(major, year) INCLUDE (name, gpa);

-- This query doesn't need to access the table
SELECT name, gpa FROM students WHERE major = 'CS' AND year = 4;
\`\`\`

### Partial Indexes
Index only subset of data that's frequently queried:

\`\`\`sql
-- Only index active students
CREATE INDEX idx_active_students ON students(major, gpa) 
WHERE status = 'Active';

-- Much smaller, faster index for common queries
SELECT * FROM students WHERE status = 'Active' AND major = 'CS' AND gpa > 3.5;
\`\`\`

### Functional Indexes
Index expressions and functions:

\`\`\`sql
-- Index for case-insensitive searches
CREATE INDEX idx_student_name_lower ON students(LOWER(name));

-- Now this query can use the index
SELECT * FROM students WHERE LOWER(name) = 'john smith';
\`\`\`

## Query Optimization Techniques

### Avoiding Function Calls on Columns

❌ **Inefficient** (prevents index usage):
\`\`\`sql
SELECT * FROM orders WHERE YEAR(order_date) = 2023;
\`\`\`

✅ **Optimized** (can use index on order_date):
\`\`\`sql
SELECT * FROM orders 
WHERE order_date >= '2023-01-01' 
AND order_date < '2024-01-01';
\`\`\`

### Optimizing OR Conditions

❌ **Inefficient**:
\`\`\`sql
SELECT * FROM students WHERE major = 'CS' OR major = 'Math';
\`\`\`

✅ **Better**:
\`\`\`sql
SELECT * FROM students WHERE major IN ('CS', 'Math');
\`\`\`

✅ **Sometimes even better** (if very different selectivity):
\`\`\`sql
SELECT * FROM students WHERE major = 'CS'
UNION ALL
SELECT * FROM students WHERE major = 'Math';
\`\`\`

### Optimizing LIKE Patterns

❌ **Cannot use index**:
\`\`\`sql
SELECT * FROM students WHERE name LIKE '%john%';
\`\`\`

✅ **Can use index**:
\`\`\`sql
SELECT * FROM students WHERE name LIKE 'john%';
\`\`\`

For full-text search, use specialized indexes:
\`\`\`sql
-- PostgreSQL full-text search
CREATE INDEX idx_student_name_fulltext ON students 
USING gin(to_tsvector('english', name));

SELECT * FROM students 
WHERE to_tsvector('english', name) @@ to_tsquery('english', 'john');
\`\`\`

## Join Optimization

### Join Order Matters
Database optimizer usually handles this, but understanding helps:

\`\`\`sql
-- Filter early to reduce join size
SELECT s.name, c.course_name
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.major = 'Computer Science'  -- Filter applied early
AND c.department = 'Engineering';
\`\`\`

### Join Algorithm Selection

**Nested Loop Join**: Good for small result sets
\`\`\`sql
-- Hint to force nested loop (database-specific syntax)
SELECT /*+ USE_NL(s e) */ s.name, e.course_id
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE s.id = 12345;
\`\`\`

**Hash Join**: Good for large result sets
**Sort-Merge Join**: Good when data is already sorted

## Subquery Optimization

### Correlated vs Non-Correlated

❌ **Correlated** (executes for each outer row):
\`\`\`sql
SELECT s.name
FROM students s
WHERE s.gpa > (
    SELECT AVG(gpa) 
    FROM students s2 
    WHERE s2.major = s.major
);
\`\`\`

✅ **Window function** (more efficient):
\`\`\`sql
SELECT name
FROM (
    SELECT name, gpa,
           AVG(gpa) OVER (PARTITION BY major) as avg_major_gpa
    FROM students
) t
WHERE gpa > avg_major_gpa;
\`\`\`

## Advanced Statistics and Monitoring

### Query Performance Analysis

\`\`\`sql
-- PostgreSQL: Find slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- MySQL: Find slow queries
SELECT 
    sql_text,
    exec_count,
    avg_timer_wait/1000000000 as avg_time_seconds
FROM performance_schema.events_statements_summary_by_digest
ORDER BY avg_timer_wait DESC
LIMIT 10;
\`\`\`

### Index Usage Analysis

\`\`\`sql
-- PostgreSQL: Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_tup_read DESC;

-- MySQL: Check index usage
SELECT 
    object_schema,
    object_name,
    index_name,
    count_read,
    count_fetch
FROM performance_schema.table_io_waits_summary_by_index_usage
ORDER BY count_read DESC;
\`\`\`

## Database-Specific Optimizations

### PostgreSQL
- Use \`ANALYZE\` to update table statistics
- Consider \`CLUSTER\` for physical ordering
- Use \`pg_stat_statements\` for query monitoring

### MySQL
- Use \`OPTIMIZE TABLE\` for MyISAM tables
- Consider query cache for read-heavy workloads
- Use \`SHOW ENGINE INNODB STATUS\` for monitoring

### SQL Server
- Use \`UPDATE STATISTICS\` regularly
- Consider columnstore indexes for analytical workloads
- Use Query Store for performance monitoring

## Performance Testing Methodology

### 1. Establish Baseline
\`\`\`sql
-- Record current performance
SELECT COUNT(*) FROM students;  -- Check data volume
EXPLAIN ANALYZE SELECT ...;     -- Record execution plan
\`\`\`

### 2. Make One Change at a Time
- Add one index
- Rewrite one query
- Measure impact

### 3. Test with Production-like Data
- Same data volume
- Same query patterns
- Same concurrent load

### 4. Monitor Long-term Impact
- Track query performance over time
- Watch for performance regressions
- Monitor resource usage
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Create a composite index on students table for efficient queries filtering by major and year",
        expectedQuery:
          "CREATE INDEX idx_students_major_year ON students(major, year)",
        hint: "Use CREATE INDEX with multiple columns in parentheses",
        solution:
          "CREATE INDEX idx_students_major_year ON students(major, year);",
      },
      {
        id: "ex2",
        question:
          "Rewrite this query to avoid function call on indexed column: SELECT * FROM students WHERE UPPER(name) = 'JOHN SMITH'",
        expectedQuery:
          "SELECT * FROM students WHERE name = 'John Smith' OR name = 'JOHN SMITH' OR name = 'john smith'",
        hint: "Instead of using UPPER() function, check for different case variations",
        solution:
          "SELECT * FROM students WHERE name IN ('John Smith', 'JOHN SMITH', 'john smith');",
      },
    ],
  },
  {
    id: "order-by-limit",
    title: "ORDER BY & LIMIT - Organizing Your Digital World",
    description:
      "Learn to sort and limit your query results like organizing your music playlist or top student rankings",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 20,
    content: `
# ORDER BY & LIMIT - Organizing Your Digital World

## 📖 Story Time: The Spotify Playlist Manager

Imagine you're building the next big music streaming app. Users want to see their songs in different orders - by name, by popularity, by release date. Sometimes they only want the "Top 10" or "Latest 5" tracks. This is exactly what ORDER BY and LIMIT do for your database queries!

Think of ORDER BY as your personal organizer and LIMIT as your "show me only the first X items" filter.

## 🎯 ORDER BY - Your Data Organizer

ORDER BY is like having a super-smart assistant who can instantly arrange any list exactly how you want it:

### Basic Syntax:
\`\`\`sql
SELECT columns FROM table ORDER BY column_name [ASC|DESC];
\`\`\`

**ASC** = Ascending (A to Z, 1 to 100, oldest to newest)
**DESC** = Descending (Z to A, 100 to 1, newest to oldest)

### 🎵 Real Example: Student Rankings
Let's sort our students by GPA to see who's doing best:

\`\`\`sql
-- Top performers first (highest GPA)
SELECT name, gpa FROM students ORDER BY gpa DESC;

-- Alphabetical order by name
SELECT name, major FROM students ORDER BY name ASC;
\`\`\`

**Result (by GPA DESC):**
| name | gpa |
|------|-----|
| Carol Brown | 3.9 |
| Alice Johnson | 3.8 |
| Bob Smith | 3.6 |

## 🎪 Multiple Column Sorting - The Advanced Organizer

Sometimes you need to sort by multiple criteria, like organizing students by major first, then by GPA within each major:

\`\`\`sql
SELECT name, major, gpa 
FROM students 
ORDER BY major ASC, gpa DESC;
\`\`\`

**Translation**: "Group by major alphabetically, then within each major, show highest GPA first"

## 🎯 LIMIT - Your "Top N" Results

LIMIT is like saying "I only want to see the first X results" - perfect for:
- Top 10 lists
- Recent activity feeds  
- Sample data preview

### Basic Syntax:
\`\`\`sql
SELECT columns FROM table LIMIT number;
\`\`\`

### 🏆 Examples:

\`\`\`sql
-- Top 3 students by GPA
SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 3;

-- First 5 students alphabetically
SELECT name FROM students ORDER BY name ASC LIMIT 5;

-- Just a quick peek at the data (first row)
SELECT * FROM students LIMIT 1;
\`\`\`

## 💡 Combining ORDER BY and LIMIT - The Power Combo

This is where the magic happens! You can create powerful queries like:

\`\`\`sql
-- Top 3 performers
SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 3;

-- 5 most recent enrollments
SELECT name, enrollment_date FROM students ORDER BY enrollment_date DESC LIMIT 5;

-- Bottom 2 GPAs (students who need help)
SELECT name, gpa FROM students ORDER BY gpa ASC LIMIT 2;
\`\`\`

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Forgetting ORDER BY with LIMIT
\`\`\`sql
-- BAD: Random 5 students (unpredictable results!)
SELECT name FROM students LIMIT 5;

-- GOOD: First 5 alphabetically (predictable results!)
SELECT name FROM students ORDER BY name LIMIT 5;
\`\`\`

**Why this matters**: Without ORDER BY, LIMIT gives you random results that might change between queries!

### ❌ Mistake 2: Wrong Sort Direction
\`\`\`sql
-- OOPS: Shows LOWEST GPAs first (probably not what you wanted for "top students")
SELECT name, gpa FROM students ORDER BY gpa ASC LIMIT 3;

-- CORRECT: Shows HIGHEST GPAs first
SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 3;
\`\`\`

### ❌ Mistake 3: Sorting Text Numbers
\`\`\`sql
-- PROBLEM: If year is stored as text, this sorts alphabetically: "1", "10", "2", "3"
SELECT name FROM students ORDER BY year_text ASC;

-- SOLUTION: Convert to number for proper sorting: 1, 2, 3, 10
SELECT name FROM students ORDER BY CAST(year_text AS INTEGER) ASC;
\`\`\`

## 🎨 Practical Scenarios

### Scenario 1: Dean's List (Top 10% Students)
\`\`\`sql
SELECT name, major, gpa 
FROM students 
WHERE gpa >= 3.5 
ORDER BY gpa DESC 
LIMIT 10;
\`\`\`

### Scenario 2: Recent Enrollments Report
\`\`\`sql
SELECT name, major, enrollment_date 
FROM students 
ORDER BY enrollment_date DESC 
LIMIT 20;
\`\`\`

### Scenario 3: Alphabetical Class Roster
\`\`\`sql
SELECT name, student_id 
FROM students 
WHERE major = 'Computer Science' 
ORDER BY name ASC;
\`\`\`

## 🎉 Key Takeaways

1. **ORDER BY** organizes your results - always specify ASC or DESC for clarity
2. **LIMIT** restricts how many rows you get back - great for top N queries
3. **Always use ORDER BY with LIMIT** for predictable results
4. **Multiple columns** in ORDER BY work left to right (primary sort, then secondary)
5. **Think about your users** - what order makes most sense for their needs?

Remember: You're not just querying data, you're crafting an experience for whoever will read these results!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📚 The academic advisor wants to see the top 5 students by GPA to recommend for scholarships. Write a query to show their names and GPAs, highest first.",
        expectedQuery:
          "SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 5",
        hint: "Use ORDER BY with DESC for highest first, then LIMIT for top 5",
        solution: "SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 5;",
      },
      {
        id: "ex2",
        question:
          "🎓 Create an alphabetical class roster showing all Computer Science students' names in order from A to Z.",
        expectedQuery:
          "SELECT name FROM students WHERE major = 'Computer Science' ORDER BY name ASC",
        hint: "Filter by major first, then sort names alphabetically (ASC)",
        solution:
          "SELECT name FROM students WHERE major = 'Computer Science' ORDER BY name ASC;",
      },
      {
        id: "ex3",
        question:
          "⏰ Show the 3 most recently enrolled students with their names and enrollment dates, newest first.",
        expectedQuery:
          "SELECT name, enrollment_date FROM students ORDER BY enrollment_date DESC LIMIT 3",
        hint: "Sort by enrollment_date in descending order (newest first) and limit to 3",
        solution:
          "SELECT name, enrollment_date FROM students ORDER BY enrollment_date DESC LIMIT 3;",
      },
    ],
  },
  {
    id: "basic-functions",
    title: "Basic Functions - Your SQL Toolkit",
    description:
      "Master essential SQL functions for text manipulation, math calculations, and date handling like a database wizard",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 25,
    content: `
# Basic Functions - Your SQL Toolkit

## 📖 Story Time: The Digital Swiss Army Knife

Imagine you're a data wizard at CSU's IT department. Students submit forms with messy data - names in ALL CAPS, birth dates in weird formats, inconsistent email addresses. You need a magical toolkit to clean, transform, and make sense of this data. SQL functions are your digital Swiss Army knife!

Just like a Swiss Army knife has different tools for different jobs, SQL has different functions for different data tasks.

## 🎯 Text Functions - The String Manipulators

### UPPER, LOWER, and PROPER CASE
Clean up messy text data like a pro:

\`\`\`sql
-- Fix names that were entered in ALL CAPS
SELECT UPPER(name), LOWER(email), PROPER(name) FROM students;

-- Example results:
-- ALICE JOHNSON, alice@csu.edu, Alice Johnson
\`\`\`

### LENGTH - Count Characters
\`\`\`sql
-- Find students with really long names (maybe they need nickname?)
SELECT name, LENGTH(name) as name_length 
FROM students 
WHERE LENGTH(name) > 20;
\`\`\`

### SUBSTRING - Extract Parts of Text
\`\`\`sql
-- Get first name from full name (assuming space separator)
SELECT SUBSTRING(name, 1, POSITION(' ' IN name) - 1) as first_name
FROM students;

-- Extract domain from email
SELECT SUBSTRING(email, POSITION('@' IN email) + 1) as email_domain
FROM students;
\`\`\`

### CONCAT - Join Text Together
\`\`\`sql
-- Create display name with graduation year
SELECT CONCAT(name, ' (Class of ', graduation_year, ')') as display_name
FROM students;

-- Result: "Alice Johnson (Class of 2025)"
\`\`\`

### TRIM - Remove Extra Spaces
\`\`\`sql
-- Clean up messy data entry with extra spaces
SELECT TRIM(name) as clean_name FROM students;

-- Remove specific characters
SELECT TRIM('Dr. ' FROM name) as name_without_title FROM faculty;
\`\`\`

## 🔢 Math Functions - The Number Crunchers

### Basic Math Operations
\`\`\`sql
-- Calculate age from birth year
SELECT name, (2024 - birth_year) as age FROM students;

-- Round GPAs to 1 decimal place
SELECT name, ROUND(gpa, 1) as rounded_gpa FROM students;

-- Get absolute values (distance from 0)
SELECT ABS(account_balance) as debt_amount FROM student_accounts WHERE account_balance < 0;
\`\`\`

### Statistical Functions  
\`\`\`sql
-- Find the maximum, minimum values
SELECT MAX(gpa), MIN(gpa), AVG(gpa) FROM students;

-- Count students per major
SELECT major, COUNT(*) as student_count FROM students GROUP BY major;
\`\`\`

## 📅 Date Functions - The Time Travelers

### Current Date/Time
\`\`\`sql
-- Get current information
SELECT NOW() as current_timestamp,
       CURRENT_DATE as today,
       CURRENT_TIME as right_now;
\`\`\`

### Date Arithmetic
\`\`\`sql
-- Find students who enrolled in the last 30 days
SELECT name, enrollment_date 
FROM students 
WHERE enrollment_date >= CURRENT_DATE - INTERVAL 30 DAY;

-- Calculate days until graduation
SELECT name, 
       DATEDIFF(graduation_date, CURRENT_DATE) as days_until_graduation
FROM students;
\`\`\`

### Extract Date Parts
\`\`\`sql
-- Group students by enrollment month
SELECT MONTHNAME(enrollment_date) as enrollment_month,
       COUNT(*) as student_count
FROM students 
GROUP BY MONTH(enrollment_date);

-- Find students born on weekends
SELECT name, DAYNAME(birth_date) as day_of_week
FROM students 
WHERE DAYOFWEEK(birth_date) IN (1, 7); -- Sunday = 1, Saturday = 7
\`\`\`

## 🔄 Conditional Functions - The Decision Makers

### CASE Statements - Multiple Conditions
\`\`\`sql
-- Create GPA categories
SELECT name, gpa,
       CASE 
           WHEN gpa >= 3.8 THEN 'Summa Cum Laude'
           WHEN gpa >= 3.6 THEN 'Magna Cum Laude'  
           WHEN gpa >= 3.4 THEN 'Cum Laude'
           ELSE 'Regular Standing'
       END as honors_status
FROM students;
\`\`\`

### COALESCE - Handle Missing Data
\`\`\`sql
-- Use backup values for missing phone numbers
SELECT name, 
       COALESCE(phone_number, emergency_contact, 'No contact info') as contact
FROM students;
\`\`\`

### NULLIF - Convert Values to NULL  
\`\`\`sql
-- Treat empty strings as NULL
SELECT name, NULLIF(middle_name, '') as middle_name FROM students;
\`\`\`

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Case Sensitivity Confusion
\`\`\`sql
-- WRONG: This might miss "SMITH" or "Smith"
SELECT * FROM students WHERE name = 'smith';

-- BETTER: Use LOWER() for consistent comparison  
SELECT * FROM students WHERE LOWER(name) LIKE '%smith%';
\`\`\`

### ❌ Mistake 2: Division by Zero
\`\`\`sql
-- DANGEROUS: Will crash if total_credits is 0
SELECT name, total_points / total_credits as gpa FROM students;

-- SAFE: Check for zero first
SELECT name, 
       CASE 
           WHEN total_credits > 0 THEN total_points / total_credits 
           ELSE NULL 
       END as gpa 
FROM students;
\`\`\`

### ❌ Mistake 3: Date Format Assumptions
\`\`\`sql
-- RISKY: Date format depends on system settings
SELECT * FROM students WHERE birth_date = '01/02/2000';

-- SAFER: Use ISO format (YYYY-MM-DD)
SELECT * FROM students WHERE birth_date = '2000-02-01';
\`\`\`

### ❌ Mistake 4: Function Performance Issues
\`\`\`sql
-- SLOW: Function prevents index usage
SELECT * FROM students WHERE UPPER(name) = 'JOHN SMITH';

-- FASTER: Store data consistently and search directly
SELECT * FROM students WHERE name = 'John Smith';
\`\`\`

## 🎉 Key Takeaways

1. **Text functions** clean and format string data (UPPER, LOWER, TRIM, CONCAT)
2. **Math functions** perform calculations and rounding (ROUND, ABS, MAX, MIN)
3. **Date functions** work with dates and times (NOW, DATEDIFF, EXTRACT)
4. **Conditional functions** make decisions in your queries (CASE, COALESCE)
5. **Always handle edge cases** like NULLs, empty strings, and division by zero
6. **Consider performance** - functions can prevent index usage

Functions turn your raw data into meaningful, clean information. You're not just selecting data anymore - you're transforming it into something useful!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📧 The IT department needs a clean email list. Create a query showing student names in proper case and emails in lowercase, but only for students whose email addresses are not empty.",
        expectedQuery:
          "SELECT PROPER(name), LOWER(email) FROM students WHERE email IS NOT NULL AND email != ''",
        hint: "Use PROPER() for names, LOWER() for emails, and check that email is not NULL or empty",
        solution:
          "SELECT PROPER(name) as clean_name, LOWER(email) as clean_email FROM students WHERE email IS NOT NULL AND email != '';",
      },
      {
        id: "ex2",
        question:
          "🎓 Create an honors classification showing student names and a status based on GPA: 3.8+ = 'Summa Cum Laude', 3.6+ = 'Magna Cum Laude', 3.4+ = 'Cum Laude', below 3.4 = 'Regular'.",
        expectedQuery:
          "SELECT name, CASE WHEN gpa >= 3.8 THEN 'Summa Cum Laude' WHEN gpa >= 3.6 THEN 'Magna Cum Laude' WHEN gpa >= 3.4 THEN 'Cum Laude' ELSE 'Regular' END FROM students",
        hint: "Use CASE statement with multiple WHEN conditions checking GPA ranges",
        solution:
          "SELECT name, CASE WHEN gpa >= 3.8 THEN 'Summa Cum Laude' WHEN gpa >= 3.6 THEN 'Magna Cum Laude' WHEN gpa >= 3.4 THEN 'Cum Laude' ELSE 'Regular' END as honors_status FROM students;",
      },
      {
        id: "ex3",
        question:
          "📞 Create a contact summary showing each student's name and their best available contact method. Use phone_number if available, otherwise use emergency_contact, otherwise show 'No contact available'.",
        expectedQuery:
          "SELECT name, COALESCE(phone_number, emergency_contact, 'No contact available') FROM students",
        hint: "COALESCE returns the first non-NULL value from the list",
        solution:
          "SELECT name, COALESCE(phone_number, emergency_contact, 'No contact available') as best_contact FROM students;",
      },
    ],
  },
  {
    id: "data-types-constraints",
    title: "Data Types & Constraints - Building Solid Foundations",
    description:
      "Learn to create well-structured tables with proper data types and constraints, like building a house with a solid foundation",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 30,
    content: `
# Data Types & Constraints - Building Solid Foundations

## 📖 Story Time: The Digital Architect

Imagine you're designing a new student information system for CSU. Just like an architect needs to choose the right materials for each part of a building (steel for structure, glass for windows, wood for floors), you need to choose the right data types for each piece of information you'll store.

A student's GPA needs precision (decimal), their name needs flexibility (text), their enrollment date needs accuracy (date), and their student ID needs uniqueness (constraints). Getting this foundation right prevents countless problems later!

## 🏗️ Data Types - Choosing the Right Material

### 📝 Text/String Types

#### VARCHAR - Variable Length Text
Perfect for names, addresses, descriptions where length varies:
\`\`\`sql
CREATE TABLE students (
    name VARCHAR(100),        -- Up to 100 characters
    email VARCHAR(255),       -- Standard email length
    major VARCHAR(50)         -- Department names
);
\`\`\`

#### CHAR - Fixed Length Text  
Great for codes, IDs, standardized formats:
\`\`\`sql
CREATE TABLE courses (
    course_code CHAR(8),      -- Always exactly 8: "CS101001" 
    semester CHAR(6),         -- Always "Fall24", "Spr25"
    grade CHAR(2)            -- "A+", "B-", "F "
);
\`\`\`

#### TEXT - Long Content
For essays, descriptions, large content:
\`\`\`sql
CREATE TABLE assignments (
    title VARCHAR(200),
    description TEXT,         -- No length limit
    instructions TEXT
);
\`\`\`

### 🔢 Numeric Types

#### INTEGER - Whole Numbers
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER,       -- Whole numbers: 1, 2, 3...
    age INTEGER,              -- 18, 19, 20...
    credits_completed INTEGER -- 30, 45, 60...
);
\`\`\`

#### DECIMAL/NUMERIC - Precise Decimals
Critical for money, GPAs, grades where precision matters:
\`\`\`sql
CREATE TABLE students (
    gpa DECIMAL(3,2),         -- Format: X.XX (3.85, 2.47)
    tuition DECIMAL(8,2)      -- Format: XXXXXX.XX ($25,000.00)
);
\`\`\`

#### FLOAT/DOUBLE - Approximate Decimals
For scientific calculations where some imprecision is OK:
\`\`\`sql
CREATE TABLE lab_results (
    measurement FLOAT,        -- Approximate decimals
    calculated_value DOUBLE   -- Higher precision approximation
);
\`\`\`

### 📅 Date and Time Types

#### DATE - Just the Date
\`\`\`sql
CREATE TABLE students (
    birth_date DATE,          -- Format: 2000-12-25
    enrollment_date DATE,     -- Format: 2023-08-15
    graduation_date DATE      -- Format: 2027-05-15
);
\`\`\`

#### TIME - Just the Time
\`\`\`sql
CREATE TABLE classes (
    start_time TIME,          -- Format: 14:30:00 (2:30 PM)
    end_time TIME            -- Format: 15:45:00 (3:45 PM)
);
\`\`\`

#### DATETIME/TIMESTAMP - Date and Time Together
\`\`\`sql
CREATE TABLE login_logs (
    login_time TIMESTAMP,     -- 2024-10-27 14:30:25
    last_activity DATETIME    -- Includes date and time
);
\`\`\`

### ✅ Boolean Type
\`\`\`sql
CREATE TABLE students (
    is_active BOOLEAN,        -- TRUE or FALSE
    is_graduate BOOLEAN,      -- TRUE or FALSE
    financial_aid BOOLEAN     -- TRUE or FALSE
);
\`\`\`

## 🛡️ Constraints - The Quality Control Guards

Think of constraints as quality control inspectors who check every piece of data before it goes into your database.

### PRIMARY KEY - The Unique Identifier
Every table needs one! Like a student ID - unique and never changes:
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,  -- Unique, never NULL
    name VARCHAR(100),
    email VARCHAR(255)
);
\`\`\`

### NOT NULL - Required Information
Ensures critical data is never missing:
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,      -- Must have a name!
    email VARCHAR(255) NOT NULL,     -- Must have email!
    phone VARCHAR(20)                -- Phone optional (can be NULL)
);
\`\`\`

### UNIQUE - No Duplicates Allowed
Prevents duplicate data where uniqueness matters:
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE,       -- No two students same email
    social_security CHAR(11) UNIQUE  -- No duplicate SSNs
);
\`\`\`

### CHECK - Custom Rules
Enforce business logic and data quality:
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    age INTEGER CHECK (age >= 16 AND age <= 120),
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    graduation_year INTEGER CHECK (graduation_year >= 2020),
    email VARCHAR(255) CHECK (email LIKE '%@%')  -- Must contain @
);
\`\`\`

### DEFAULT - Automatic Values
Provides sensible defaults when no value is specified:
\`\`\`sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE,    -- Today's date
    status VARCHAR(20) DEFAULT 'Active',          -- Default status
    credits INTEGER DEFAULT 0                     -- Start with 0 credits
);
\`\`\`

### FOREIGN KEY - Relationships Between Tables
Links tables together and ensures data consistency:
\`\`\`sql
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY,
    student_id INTEGER,
    course_id INTEGER,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
\`\`\`

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Wrong Data Type for the Job
\`\`\`sql
-- BAD: Using VARCHAR for numbers
CREATE TABLE students (
    gpa VARCHAR(10)  -- "3.85" stored as text - can't do math!
);

-- GOOD: Use proper numeric type
CREATE TABLE students (
    gpa DECIMAL(3,2)  -- 3.85 stored as number - math works!
);
\`\`\`

### ❌ Mistake 2: Forgetting NOT NULL on Important Fields
\`\`\`sql
-- RISKY: Students without names or emails
CREATE TABLE students (
    name VARCHAR(100),     -- Could be NULL!
    email VARCHAR(255)     -- Could be NULL!  
);

-- BETTER: Require essential information
CREATE TABLE students (
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);
\`\`\`

### ❌ Mistake 3: No Primary Key
\`\`\`sql
-- DANGEROUS: No way to uniquely identify rows
CREATE TABLE students (
    name VARCHAR(100),
    major VARCHAR(50)
);

-- ESSENTIAL: Always have a primary key
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    major VARCHAR(50) 
);
\`\`\`

### ❌ Mistake 4: Inadequate CHECK Constraints
\`\`\`sql
-- WEAK: Allows invalid data
CREATE TABLE students (
    gpa DECIMAL(3,2)  -- Could store negative or > 4.0!
);

-- ROBUST: Enforce realistic ranges
CREATE TABLE students (
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0)
);
\`\`\`

## 🎉 Key Takeaways

1. **Choose data types thoughtfully** - they affect storage, performance, and functionality
2. **Use constraints liberally** - they prevent bad data from entering your system
3. **Always have a PRIMARY KEY** - every table needs a unique identifier
4. **NOT NULL for required fields** - don't let essential data be missing
5. **CHECK constraints for business rules** - enforce your data quality standards
6. **FOREIGN KEYs maintain relationships** - keep related data consistent
7. **Default values save time** - provide sensible defaults for common cases

Remember: A well-designed table structure is like a solid foundation for a house. It supports everything built on top of it and prevents costly problems later. Take time to get it right!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🏗️ Create a table called 'faculty' with: faculty_id (primary key, integer), name (required, up to 100 chars), email (required, unique, up to 255 chars), department (up to 50 chars), and salary (decimal with 2 decimal places, must be positive).",
        expectedQuery:
          "CREATE TABLE faculty (faculty_id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, department VARCHAR(50), salary DECIMAL(10,2) CHECK (salary > 0))",
        hint: "Use PRIMARY KEY, NOT NULL, UNIQUE constraints, and CHECK to ensure salary is positive",
        solution:
          "CREATE TABLE faculty (faculty_id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, department VARCHAR(50), salary DECIMAL(10,2) CHECK (salary > 0));",
      },
      {
        id: "ex2",
        question:
          "📚 Design a 'courses' table with: course_id (primary key), course_code (exactly 8 characters, required, unique), title (required, up to 200 chars), credits (integer, between 1 and 6), and active status (boolean, defaults to true).",
        expectedQuery:
          "CREATE TABLE courses (course_id INTEGER PRIMARY KEY, course_code CHAR(8) NOT NULL UNIQUE, title VARCHAR(200) NOT NULL, credits INTEGER CHECK (credits >= 1 AND credits <= 6), active BOOLEAN DEFAULT true)",
        hint: "Use CHAR for fixed-length course_code, CHECK constraint for credits range, DEFAULT for boolean",
        solution:
          "CREATE TABLE courses (course_id INTEGER PRIMARY KEY, course_code CHAR(8) NOT NULL UNIQUE, title VARCHAR(200) NOT NULL, credits INTEGER CHECK (credits >= 1 AND credits <= 6), active BOOLEAN DEFAULT true);",
      },
      {
        id: "ex3",
        question:
          "🎯 Create a 'grades' table linking students to courses: grade_id (primary key), student_id and course_id (both foreign keys to respective tables), letter_grade (2 chars, must be valid grade), and date_recorded (date, defaults to current date).",
        expectedQuery:
          "CREATE TABLE grades (grade_id INTEGER PRIMARY KEY, student_id INTEGER, course_id INTEGER, letter_grade CHAR(2) CHECK (letter_grade IN ('A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F')), date_recorded DATE DEFAULT CURRENT_DATE, FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (course_id) REFERENCES courses(course_id))",
        hint: "Use FOREIGN KEY constraints for relationships, CHECK constraint with IN for valid grades",
        solution:
          "CREATE TABLE grades (grade_id INTEGER PRIMARY KEY, student_id INTEGER, course_id INTEGER, letter_grade CHAR(2) CHECK (letter_grade IN ('A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F')), date_recorded DATE DEFAULT CURRENT_DATE, FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (course_id) REFERENCES courses(course_id));",
      },
    ],
  },
  {
    id: "subqueries-intro",
    title: "Subqueries - Queries Within Queries",
    description:
      "Master the art of nested queries to solve complex problems by breaking them into smaller, manageable pieces",
    difficulty: "Beginner",
    category: "Fundamentals",
    estimatedTime: 35,
    content: `
# Subqueries - Queries Within Queries

## 📖 Story Time: The Detective's Investigation 

Imagine you're a detective investigating academic fraud at CSU. You need to find "students who have a higher GPA than the average GPA of their major." This isn't a simple single-step question - you need to:

1. First, figure out what the average GPA is for each major
2. Then, compare each student's GPA to their major's average

This is exactly what subqueries do - they let you solve complex problems by breaking them into smaller, manageable pieces. Think of a subquery as asking a question to get information that helps you answer a bigger question!

## 🎯 What are Subqueries?

A subquery is simply a query inside another query. The inner query runs first and provides data for the outer query to use.

**Basic Structure:**
\`\`\`sql
SELECT columns FROM table 
WHERE condition (SELECT ... FROM ...);
\`\`\`

**Think of it like this:**
- Outer query: "Show me students with GPA above average"
- Inner query: "What is the average GPA?" 
- Combined: "Show me students with GPA above (what the inner query calculates)"

## 🌟 Simple Subquery Example

Let's start with something straightforward:

\`\`\`sql
-- Find students with above-average GPA
SELECT name, gpa 
FROM students 
WHERE gpa > (SELECT AVG(gpa) FROM students);
\`\`\`

**How it works:**
1. Inner query \`(SELECT AVG(gpa) FROM students)\` runs first and returns something like 3.2
2. Outer query becomes \`WHERE gpa > 3.2\`
3. Shows all students with GPA above 3.2

**Result Example:**
| name | gpa |
|------|-----|
| Alice Johnson | 3.8 |
| Carol Brown | 3.9 |
| David Wilson | 3.5 |

## 🎪 Types of Subqueries

### 1. Scalar Subqueries (Return Single Value)
Perfect when you need one number, date, or value:

\`\`\`sql
-- Students enrolled after the most recent enrollment
SELECT name, enrollment_date 
FROM students 
WHERE enrollment_date > (SELECT MAX(enrollment_date) FROM students);

-- Courses with enrollment above the average
SELECT course_name, enrollment_count
FROM courses 
WHERE enrollment_count > (SELECT AVG(enrollment_count) FROM courses);
\`\`\`

### 2. List Subqueries (Return Multiple Values) 
Use with IN, NOT IN, ANY, ALL:

\`\`\`sql
-- Students enrolled in Computer Science courses
SELECT name FROM students 
WHERE student_id IN (
    SELECT student_id FROM enrollments 
    WHERE course_id IN (
        SELECT course_id FROM courses 
        WHERE department = 'Computer Science'
    )
);

-- Students NOT enrolled in any Math courses
SELECT name FROM students 
WHERE student_id NOT IN (
    SELECT student_id FROM enrollments 
    WHERE course_id IN (
        SELECT course_id FROM courses 
        WHERE department = 'Mathematics'
    )
);
\`\`\`

### 3. Correlated Subqueries (Reference Outer Query)
The inner query depends on each row of the outer query:

\`\`\`sql
-- Students with above-average GPA for their major
SELECT name, major, gpa 
FROM students s1
WHERE gpa > (
    SELECT AVG(gpa) 
    FROM students s2 
    WHERE s2.major = s1.major  -- This references the outer query!
);
\`\`\`

**How correlated subqueries work:**
- For each student in outer query, inner query calculates average GPA for that student's major
- Then compares that student's GPA to their major's average

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Subquery Returns Multiple Values When One Expected
\`\`\`sql
-- ERROR: This subquery might return multiple values
SELECT name FROM students 
WHERE gpa > (SELECT gpa FROM students WHERE major = 'Computer Science');

-- FIX: Use aggregate function for single value
SELECT name FROM students 
WHERE gpa > (SELECT AVG(gpa) FROM students WHERE major = 'Computer Science');
\`\`\`

### ❌ Mistake 2: Forgetting to Handle NULLs
\`\`\`sql
-- PROBLEM: NOT IN with NULLs can return unexpected results
SELECT name FROM students 
WHERE student_id NOT IN (SELECT student_id FROM enrollments);

-- BETTER: Handle NULL values explicitly  
SELECT name FROM students 
WHERE student_id NOT IN (
    SELECT student_id FROM enrollments WHERE student_id IS NOT NULL
);
\`\`\`

### ❌ Mistake 3: Inefficient Correlated Subqueries
\`\`\`sql
-- SLOW: Subquery runs for every row
SELECT name, 
       (SELECT COUNT(*) FROM enrollments WHERE student_id = s.student_id) as course_count
FROM students s;

-- FASTER: Use JOINs when possible
SELECT s.name, COUNT(e.course_id) as course_count
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id  
GROUP BY s.student_id, s.name;
\`\`\`

### ❌ Mistake 4: Complex Nested Subqueries  
\`\`\`sql
-- CONFUSING: Too many levels of nesting
SELECT name FROM students WHERE student_id IN (
    SELECT student_id FROM enrollments WHERE course_id IN (
        SELECT course_id FROM courses WHERE department_id IN (
            SELECT department_id FROM departments WHERE college = 'Engineering'
        )
    )
);

-- CLEARER: Break into steps or use JOINs
SELECT DISTINCT s.name 
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id  
JOIN departments d ON c.department_id = d.department_id
WHERE d.college = 'Engineering';
\`\`\`

## 🎉 Key Takeaways

1. **Subqueries solve complex problems** by breaking them into manageable pieces
2. **Scalar subqueries return one value** - great for comparisons
3. **List subqueries return multiple values** - use with IN, NOT IN, EXISTS
4. **Correlated subqueries reference outer query** - powerful but can be slow
5. **Handle NULLs carefully** especially with NOT IN
6. **Consider JOINs as alternatives** - often faster than correlated subqueries
7. **Use EXISTS for checking relationships** - more efficient than IN for large datasets

Think of subqueries as your way to ask follow-up questions. Instead of "Show me all students," you can ask "Show me students who meet this specific criteria that I need to calculate first." You're building intelligence into your queries!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🎯 Find all students whose GPA is higher than the overall average GPA of all students. Show their name and GPA.",
        expectedQuery:
          "SELECT name, gpa FROM students WHERE gpa > (SELECT AVG(gpa) FROM students)",
        hint: "Use a scalar subquery with AVG() to get the overall average, then compare each student's GPA to it",
        solution:
          "SELECT name, gpa FROM students WHERE gpa > (SELECT AVG(gpa) FROM students);",
      },
      {
        id: "ex2",
        question:
          "📚 Find students who are enrolled in courses from the 'Computer Science' department. Show only their names.",
        expectedQuery:
          "SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE course_id IN (SELECT course_id FROM courses WHERE department = 'Computer Science'))",
        hint: "Use nested subqueries: first find Computer Science course IDs, then find enrollments in those courses, then find students with those enrollments",
        solution:
          "SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE course_id IN (SELECT course_id FROM courses WHERE department = 'Computer Science'));",
      },
      {
        id: "ex3",
        question:
          "🌟 Find students whose GPA is above the average GPA for their specific major. Show name, major, and GPA.",
        expectedQuery:
          "SELECT name, major, gpa FROM students s1 WHERE gpa > (SELECT AVG(gpa) FROM students s2 WHERE s2.major = s1.major)",
        hint: "Use a correlated subquery where the inner query calculates the average GPA for each student's major using WHERE s2.major = s1.major",
        solution:
          "SELECT name, major, gpa FROM students s1 WHERE gpa > (SELECT AVG(gpa) FROM students s2 WHERE s2.major = s1.major);",
      },
    ],
  },
  {
    id: "recursive-ctes",
    title: "Recursive CTEs - Navigating Hierarchical Data",
    description:
      "Master recursive Common Table Expressions to traverse organizational charts, family trees, and nested data structures",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 40,
    content: `
# Recursive CTEs - Navigating Hierarchical Data

## 📖 Story Time: The Organizational Detective

Imagine you're the new HR director at CSU, and you need to understand the complex organizational structure. You have a table showing each employee and their manager, but you need to answer questions like:
- "Who are all the people that report to Dr. Smith, directly or indirectly?"
- "What's the complete chain of command from a teaching assistant up to the president?"
- "How many levels deep is our organization?"

Traditional queries can't handle this because the data is hierarchical - each row connects to another row in the same table. This is where Recursive CTEs become your superpower!

## 🎯 What are Recursive CTEs?

A Recursive CTE (Common Table Expression) is like a query that can call itself, perfect for traversing tree-like or hierarchical data. Think of it as a digital explorer that can follow a path and then explore all the branches that stem from each point.

**Basic Structure:**
\`\`\`sql
WITH RECURSIVE cte_name AS (
    -- Anchor: Starting point (non-recursive)
    SELECT ... FROM table WHERE condition
    
    UNION ALL
    
    -- Recursive: Follow the connections
    SELECT ... FROM table 
    JOIN cte_name ON connection_condition
)
SELECT * FROM cte_name;
\`\`\`

## 🌳 Simple Example: Employee Hierarchy

Let's start with a basic organizational chart:

**employees table:**
| employee_id | name | manager_id | position |
|-------------|------|------------|----------|
| 1 | Dr. President | NULL | President |
| 2 | Dr. Smith | 1 | Dean |
| 3 | Prof. Johnson | 2 | Department Head |
| 4 | Alice Teacher | 3 | Professor |
| 5 | Bob Assistant | 4 | TA |

### Find Everyone Under Dr. Smith:
\`\`\`sql
WITH RECURSIVE org_chart AS (
    -- Start with Dr. Smith (anchor)
    SELECT employee_id, name, manager_id, position, 0 as level
    FROM employees 
    WHERE name = 'Dr. Smith'
    
    UNION ALL
    
    -- Find everyone who reports to people we've already found
    SELECT e.employee_id, e.name, e.manager_id, e.position, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT 
    REPEAT('  ', level) || name as hierarchy_display,
    position,
    level
FROM org_chart 
ORDER BY level, name;
\`\`\`

**Result:**
| hierarchy_display | position | level |
|-------------------|----------|--------|
| Dr. Smith | Dean | 0 |
|   Prof. Johnson | Department Head | 1 |
|     Alice Teacher | Professor | 2 |
|       Bob Assistant | TA | 3 |

## 🎪 Advanced Patterns

### 1. Build Complete Family Trees
\`\`\`sql
-- Find all descendants of a person
WITH RECURSIVE family_tree AS (
    -- Start with a specific ancestor
    SELECT person_id, name, parent_id, 0 as generation
    FROM people 
    WHERE name = 'John Smith Sr.'
    
    UNION ALL
    
    -- Find their children, grandchildren, etc.
    SELECT p.person_id, p.name, p.parent_id, ft.generation + 1
    FROM people p
    JOIN family_tree ft ON p.parent_id = ft.person_id
)
SELECT 
    REPEAT('→ ', generation) || name as family_line,
    generation
FROM family_tree
ORDER BY generation, name;
\`\`\`

### 2. Category/Subcategory Navigation
\`\`\`sql
-- Navigate through course categories and subcategories
WITH RECURSIVE category_tree AS (
    -- Start with top-level categories (no parent)
    SELECT category_id, name, parent_category_id, 0 as depth
    FROM course_categories 
    WHERE parent_category_id IS NULL
    
    UNION ALL
    
    -- Add subcategories
    SELECT cc.category_id, cc.name, cc.parent_category_id, ct.depth + 1
    FROM course_categories cc
    JOIN category_tree ct ON cc.parent_category_id = ct.category_id
)
SELECT 
    REPEAT('├─ ', depth) || name as category_structure,
    depth
FROM category_tree
ORDER BY depth, name;
\`\`\`

### 3. Path Tracing (Bottom to Top)
\`\`\`sql
-- Trace path from employee to CEO
WITH RECURSIVE management_path AS (
    -- Start with a specific employee
    SELECT employee_id, name, manager_id, name as path
    FROM employees 
    WHERE name = 'Bob Assistant'
    
    UNION ALL
    
    -- Follow the chain upward
    SELECT e.employee_id, e.name, e.manager_id, 
           mp.path || ' → ' || e.name
    FROM employees e
    JOIN management_path mp ON e.employee_id = mp.manager_id
)
SELECT path as chain_of_command
FROM management_path
WHERE manager_id IS NULL;  -- Stop at the top
\`\`\`

**Result:** "Bob Assistant → Alice Teacher → Prof. Johnson → Dr. Smith → Dr. President"

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Infinite Recursion
\`\`\`sql
-- DANGEROUS: Could loop forever if there's circular reference
WITH RECURSIVE bad_example AS (
    SELECT employee_id, name, manager_id FROM employees WHERE employee_id = 1
    UNION ALL
    SELECT e.employee_id, e.name, e.manager_id 
    FROM employees e
    JOIN bad_example b ON e.manager_id = b.employee_id
    -- No stopping condition!
)
SELECT * FROM bad_example;

-- SAFE: Add depth limit and cycle detection
WITH RECURSIVE safe_example AS (
    SELECT employee_id, name, manager_id, 0 as depth, 
           ARRAY[employee_id] as path  -- Track visited nodes
    FROM employees WHERE employee_id = 1
    
    UNION ALL
    
    SELECT e.employee_id, e.name, e.manager_id, se.depth + 1,
           se.path || e.employee_id
    FROM employees e
    JOIN safe_example se ON e.manager_id = se.employee_id
    WHERE se.depth < 10  -- Depth limit
    AND NOT e.employee_id = ANY(se.path)  -- Cycle detection
)
SELECT * FROM safe_example;
\`\`\`

### ❌ Mistake 2: Wrong Join Condition
\`\`\`sql
-- WRONG: Joins on wrong columns
WITH RECURSIVE wrong_join AS (
    SELECT employee_id, name, manager_id FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.name, e.manager_id 
    FROM employees e
    JOIN wrong_join w ON e.employee_id = w.manager_id  -- Should be e.manager_id = w.employee_id
)
SELECT * FROM wrong_join;
\`\`\`

### ❌ Mistake 3: Missing Base Case
\`\`\`sql
-- INCOMPLETE: No proper starting point
WITH RECURSIVE no_base AS (
    SELECT employee_id, name, manager_id FROM employees WHERE 1=0  -- Empty result!
    UNION ALL
    SELECT e.employee_id, e.name, e.manager_id 
    FROM employees e
    JOIN no_base nb ON e.manager_id = nb.employee_id
)
SELECT * FROM no_base;  -- Returns nothing!
\`\`\`

## 🎨 Real-World Applications

### 1. Course Prerequisites Chain
\`\`\`sql
-- Find all prerequisites for advanced courses
WITH RECURSIVE prereq_chain AS (
    -- Start with target course
    SELECT course_id, course_name, prerequisite_id, 0 as prereq_level
    FROM courses 
    WHERE course_name = 'Advanced Database Systems'
    
    UNION ALL
    
    -- Follow prerequisite chain
    SELECT c.course_id, c.course_name, c.prerequisite_id, pc.prereq_level + 1
    FROM courses c
    JOIN prereq_chain pc ON c.course_id = pc.prerequisite_id
)
SELECT 
    REPEAT('  ', prereq_level) || course_name as prerequisite_path,
    prereq_level
FROM prereq_chain
WHERE prereq_level > 0  -- Exclude the starting course
ORDER BY prereq_level DESC;
\`\`\`

### 2. Student Advisory Hierarchy
\`\`\`sql
-- Track academic advisory relationships
WITH RECURSIVE advisory_tree AS (
    -- Start with senior faculty
    SELECT faculty_id, name, advisor_id, 'Faculty' as role, 0 as level
    FROM faculty 
    WHERE advisor_id IS NULL
    
    UNION ALL
    
    -- Add their advisees (could be junior faculty or grad students)
    SELECT a.person_id, a.name, a.advisor_id, a.role, at.level + 1
    FROM advisees a
    JOIN advisory_tree at ON a.advisor_id = at.faculty_id
    WHERE at.level < 5  -- Reasonable depth limit
)
SELECT 
    REPEAT('├─ ', level) || name as advisory_structure,
    role,
    level
FROM advisory_tree
ORDER BY level, name;
\`\`\`

### 3. Budget Allocation Rollup
\`\`\`sql
-- Calculate total budget including all sub-departments
WITH RECURSIVE dept_budgets AS (
    -- Start with a specific department
    SELECT dept_id, dept_name, parent_dept_id, budget, 0 as depth
    FROM departments 
    WHERE dept_name = 'College of Engineering'
    
    UNION ALL
    
    -- Include sub-departments
    SELECT d.dept_id, d.dept_name, d.parent_dept_id, d.budget, db.depth + 1
    FROM departments d
    JOIN dept_budgets db ON d.parent_dept_id = db.dept_id
)
SELECT 
    dept_name,
    budget,
    SUM(budget) OVER () as total_budget_with_subs
FROM dept_budgets;
\`\`\`

## 🎉 Key Takeaways

1. **Recursive CTEs handle hierarchical data** that traditional queries can't
2. **Always include proper base case** (anchor) to start the recursion
3. **Prevent infinite loops** with depth limits and cycle detection
4. **Track levels/depth** to understand hierarchy structure
5. **Use path arrays** to detect cycles in complex hierarchies
6. **Consider performance** - recursive queries can be expensive on large datasets
7. **Test with small datasets** first to verify logic before scaling

Recursive CTEs turn complex hierarchical problems into manageable, readable solutions. You're not just querying flat data anymore - you're navigating relationships and following connections through your data structure!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🏢 Write a recursive CTE to find all employees who report to 'Dr. Wilson' (directly or indirectly) in the organizational hierarchy. Show names and hierarchy levels.",
        expectedQuery:
          "WITH RECURSIVE org_tree AS (SELECT employee_id, name, manager_id, 0 as level FROM employees WHERE name = 'Dr. Wilson' UNION ALL SELECT e.employee_id, e.name, e.manager_id, ot.level + 1 FROM employees e JOIN org_tree ot ON e.manager_id = ot.employee_id) SELECT name, level FROM org_tree WHERE level > 0",
        hint: "Start with Dr. Wilson as anchor (level 0), then recursively join employees where manager_id matches employee_id from previous level",
        solution:
          "WITH RECURSIVE org_tree AS (SELECT employee_id, name, manager_id, 0 as level FROM employees WHERE name = 'Dr. Wilson' UNION ALL SELECT e.employee_id, e.name, e.manager_id, ot.level + 1 FROM employees e JOIN org_tree ot ON e.manager_id = ot.employee_id) SELECT name, level FROM org_tree WHERE level > 0 ORDER BY level, name;",
      },
      {
        id: "ex2",
        question:
          "📚 Find the complete prerequisite chain for course 'CS301'. Show all courses that must be taken before it, with their prerequisite levels.",
        expectedQuery:
          "WITH RECURSIVE prereq_chain AS (SELECT course_id, course_name, prerequisite_id, 0 as prereq_level FROM courses WHERE course_name = 'CS301' UNION ALL SELECT c.course_id, c.course_name, c.prerequisite_id, pc.prereq_level + 1 FROM courses c JOIN prereq_chain pc ON c.course_id = pc.prerequisite_id) SELECT course_name, prereq_level FROM prereq_chain WHERE prereq_level > 0",
        hint: "Start with CS301, then follow prerequisite_id to find courses required before it. Each level represents how many steps back in the chain.",
        solution:
          "WITH RECURSIVE prereq_chain AS (SELECT course_id, course_name, prerequisite_id, 0 as prereq_level FROM courses WHERE course_name = 'CS301' UNION ALL SELECT c.course_id, c.course_name, c.prerequisite_id, pc.prereq_level + 1 FROM courses c JOIN prereq_chain pc ON c.course_id = pc.prerequisite_id) SELECT course_name, prereq_level FROM prereq_chain WHERE prereq_level > 0 ORDER BY prereq_level DESC;",
      },
      {
        id: "ex3",
        question:
          "🌳 Create a recursive CTE to show the complete management path from employee 'John Smith' up to the CEO (where manager_id IS NULL). Display the chain of command as a single path.",
        expectedQuery:
          "WITH RECURSIVE mgmt_path AS (SELECT employee_id, name, manager_id, name as path FROM employees WHERE name = 'John Smith' UNION ALL SELECT e.employee_id, e.name, e.manager_id, mp.path || ' -> ' || e.name FROM employees e JOIN mgmt_path mp ON e.employee_id = mp.manager_id) SELECT path FROM mgmt_path WHERE manager_id IS NULL",
        hint: "Start with John Smith, then join on manager_id = employee_id to go up the chain. Concatenate names to build the path string.",
        solution:
          "WITH RECURSIVE mgmt_path AS (SELECT employee_id, name, manager_id, name as path FROM employees WHERE name = 'John Smith' UNION ALL SELECT e.employee_id, e.name, e.manager_id, mp.path || ' -> ' || e.name FROM employees e JOIN mgmt_path mp ON e.employee_id = mp.manager_id) SELECT path FROM mgmt_path WHERE manager_id IS NULL;",
      },
    ],
  },
  {
    id: "advanced-indexing",
    title: "Advanced Indexing Strategies - Performance Optimization",
    description:
      "Master complex indexing techniques including composite, partial, and functional indexes to supercharge query performance",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 45,
    content: `
# Advanced Indexing Strategies - Performance Optimization

## 📖 Story Time: The Performance Rescue Mission

You're the database administrator for CSU's student information system. Registration day arrives, and suddenly 10,000 students are trying to search for courses simultaneously. The system crawls to a halt - queries that should take milliseconds are taking 30 seconds!

Your mission: Transform this sluggish database into a high-performance machine using advanced indexing strategies. Think of indexes as creating express lanes, shortcuts, and smart organizing systems that help the database find information lightning-fast.

## 🎯 Understanding Index Fundamentals

An index is like a book's index - instead of reading every page to find "Database Design," you look it up in the index and jump directly to page 247. Database indexes work similarly, creating fast lookup paths to your data.

### Basic Index Types Review:
\`\`\`sql
-- Single column index (basic express lane)
CREATE INDEX idx_student_lastname ON students(last_name);

-- Primary key index (automatically created)
-- Unique index (automatically created for UNIQUE constraints)
CREATE UNIQUE INDEX idx_student_email ON students(email);
\`\`\`

## 🚀 Advanced Indexing Strategies

### 1. Composite Indexes - Multi-Column Express Lanes

When queries filter by multiple columns, composite indexes are game-changers:

\`\`\`sql
-- Students often searched by major AND graduation year
CREATE INDEX idx_students_major_grad_year ON students(major, graduation_year);

-- This index helps these queries:
SELECT * FROM students WHERE major = 'Computer Science' AND graduation_year = 2025;
SELECT * FROM students WHERE major = 'Engineering';  -- Uses first part of index

-- But NOT this query efficiently:
SELECT * FROM students WHERE graduation_year = 2025;  -- Can't use this index well
\`\`\`

**Key Rule**: Order matters! Put the most selective/frequently queried columns first.

#### Smart Composite Index Design:
\`\`\`sql
-- For course enrollment queries
CREATE INDEX idx_enrollments_student_semester_course 
ON enrollments(student_id, semester, course_id);

-- Supports all these query patterns:
-- 1. WHERE student_id = 12345
-- 2. WHERE student_id = 12345 AND semester = 'Fall2024'  
-- 3. WHERE student_id = 12345 AND semester = 'Fall2024' AND course_id = 'CS101'
\`\`\`

### 2. Covering Indexes - The All-in-One Solution

Include frequently accessed columns directly in the index:

\`\`\`sql
-- Instead of just indexing search columns...
CREATE INDEX idx_students_major ON students(major);

-- Create a covering index that includes commonly selected columns
CREATE INDEX idx_students_major_covering 
ON students(major) 
INCLUDE (student_id, first_name, last_name, gpa);

-- Now this query can get ALL data from the index without table lookup!
SELECT student_id, first_name, last_name, gpa 
FROM students 
WHERE major = 'Computer Science';
\`\`\`

**Performance Impact**: Can turn 2-step operations (index lookup + table lookup) into 1-step operations.

### 3. Partial Indexes - Targeted Efficiency

Index only the rows you actually query:

\`\`\`sql
-- Only index active students (90% of queries are about active students)
CREATE INDEX idx_active_students_gpa 
ON students(gpa) 
WHERE status = 'Active';

-- Index only recent enrollments
CREATE INDEX idx_recent_enrollments 
ON enrollments(course_id, enrollment_date)
WHERE enrollment_date >= '2024-01-01';

-- Index only high-GPA students for dean's list queries
CREATE INDEX idx_honors_students 
ON students(major, gpa)
WHERE gpa >= 3.5;
\`\`\`

**Benefits**: Smaller indexes = faster queries and less storage space.

### 4. Functional Indexes - Smart Transformations

Index computed values and function results:

\`\`\`sql
-- For case-insensitive name searches
CREATE INDEX idx_students_name_lower ON students(LOWER(last_name));

-- Now this query uses the index:
SELECT * FROM students WHERE LOWER(last_name) = 'smith';

-- For full-name searches
CREATE INDEX idx_students_fullname 
ON students(CONCAT(first_name, ' ', last_name));

-- Date-based queries
CREATE INDEX idx_enrollment_year ON students(EXTRACT(YEAR FROM enrollment_date));
SELECT * FROM students WHERE EXTRACT(YEAR FROM enrollment_date) = 2024;
\`\`\`

### 5. Multi-Column Functional Indexes

Combine functions with multiple columns:

\`\`\`sql
-- For complex search patterns
CREATE INDEX idx_students_search 
ON students(LOWER(CONCAT(first_name, ' ', last_name)), major, graduation_year);

-- Optimizes searches like:
SELECT * FROM students 
WHERE LOWER(CONCAT(first_name, ' ', last_name)) LIKE '%john smith%' 
AND major = 'Engineering' 
AND graduation_year = 2025;
\`\`\`

## 🎪 Advanced Index Patterns

### Pattern 1: The Query-Specific Index
\`\`\`sql
-- Analyze your most common query:
SELECT course_name, credits, professor_name
FROM courses c
JOIN course_sections cs ON c.course_id = cs.course_id  
WHERE c.department = 'Computer Science' 
AND cs.semester = 'Fall2024'
AND cs.available_seats > 0;

-- Create targeted indexes:
CREATE INDEX idx_courses_dept_covering 
ON courses(department) 
INCLUDE (course_id, course_name, credits);

CREATE INDEX idx_sections_semester_seats 
ON course_sections(semester, available_seats) 
INCLUDE (course_id, professor_name);
\`\`\`

### Pattern 2: The Range Query Optimizer
\`\`\`sql
-- For date/numeric range queries
CREATE INDEX idx_students_gpa_range ON students(gpa, major);
CREATE INDEX idx_enrollments_date_range ON enrollments(enrollment_date, student_id);

-- Optimizes queries like:
SELECT * FROM students WHERE gpa BETWEEN 3.5 AND 4.0 AND major = 'Engineering';
SELECT * FROM enrollments WHERE enrollment_date BETWEEN '2024-08-01' AND '2024-12-31';
\`\`\`

### Pattern 3: The Sort Optimization Index
\`\`\`sql
-- For ORDER BY queries
CREATE INDEX idx_students_lastname_firstname ON students(last_name, first_name);
CREATE INDEX idx_courses_enrollment_desc ON courses(current_enrollment DESC);

-- Makes these sorts lightning fast:
SELECT * FROM students ORDER BY last_name, first_name;
SELECT * FROM courses ORDER BY current_enrollment DESC LIMIT 10;
\`\`\`

## 🚨 Common Indexing Mistakes & Solutions

### ❌ Mistake 1: Over-Indexing
\`\`\`sql
-- BAD: Index everything "just in case"
CREATE INDEX idx1 ON students(first_name);
CREATE INDEX idx2 ON students(last_name);  
CREATE INDEX idx3 ON students(email);
CREATE INDEX idx4 ON students(major);
CREATE INDEX idx5 ON students(gpa);
-- ... 15 more indexes

-- BETTER: Strategic composite indexes
CREATE INDEX idx_students_name ON students(last_name, first_name);
CREATE INDEX idx_students_academic ON students(major, gpa);
CREATE UNIQUE INDEX idx_students_email ON students(email);
\`\`\`

**Problem**: Every INSERT/UPDATE/DELETE has to update ALL indexes. Too many indexes slow down writes.

### ❌ Mistake 2: Wrong Column Order
\`\`\`sql
-- BAD: Low selectivity column first
CREATE INDEX idx_bad ON students(graduation_year, major, student_id);
-- graduation_year has only 4-5 values for active students!

-- GOOD: High selectivity first
CREATE INDEX idx_good ON students(student_id, major, graduation_year);
-- student_id is unique, major is more selective than year
\`\`\`

### ❌ Mistake 3: Ignoring Query Patterns
\`\`\`sql
-- Your queries look like this:
SELECT * FROM enrollments WHERE student_id = ? AND grade IS NOT NULL;

-- But your index is:
CREATE INDEX idx_wrong ON enrollments(grade, student_id);  -- BACKWARDS!

-- Should be:
CREATE INDEX idx_right ON enrollments(student_id, grade);
-- OR even better for the specific query:
CREATE INDEX idx_best ON enrollments(student_id) WHERE grade IS NOT NULL;
\`\`\`

### ❌ Mistake 4: Function Misuse
\`\`\`sql
-- SLOW: Function prevents index usage
SELECT * FROM students WHERE UPPER(last_name) = 'SMITH';
-- Even with index on last_name, this won't use it!

-- FAST: Create functional index OR avoid function
CREATE INDEX idx_lastname_upper ON students(UPPER(last_name));
-- OR store data consistently and search directly
SELECT * FROM students WHERE last_name = 'Smith';
\`\`\`

## 🎨 Real-World Index Design

### Scenario: Course Registration System
\`\`\`sql
-- Common queries analysis:
-- 1. Find available courses by department and semester (80% of queries)
-- 2. Check student's current enrollments (15% of queries)  
-- 3. Find courses with available seats (5% of queries)

-- Optimized index strategy:
CREATE INDEX idx_courses_main 
ON courses(department, semester) 
INCLUDE (course_id, course_name, credits, max_enrollment);

CREATE INDEX idx_enrollments_student 
ON enrollments(student_id, semester) 
INCLUDE (course_id, grade, enrollment_date);

CREATE INDEX idx_courses_availability 
ON courses(available_seats) 
WHERE available_seats > 0 
INCLUDE (course_id, course_name, department);
\`\`\`

### Scenario: Student Academic Records
\`\`\`sql
-- Query patterns:
-- 1. GPA calculations by major
-- 2. Dean's list identification  
-- 3. Graduation eligibility checks

-- Strategic indexes:
CREATE INDEX idx_students_academic_standing 
ON students(major, gpa DESC, total_credits);

CREATE INDEX idx_honors_candidates 
ON students(gpa DESC) 
WHERE gpa >= 3.5 
INCLUDE (student_id, major, total_credits);

CREATE INDEX idx_graduation_eligible 
ON students(total_credits, major) 
WHERE total_credits >= 120;
\`\`\`

## 🔧 Index Maintenance & Monitoring

### Monitor Index Usage:
\`\`\`sql
-- Find unused indexes (PostgreSQL)
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;

-- Identify missing indexes (analyze slow queries)
EXPLAIN ANALYZE SELECT * FROM students WHERE major = 'CS' AND gpa > 3.5;
\`\`\`

### Index Health Checks:
\`\`\`sql
-- Check index size vs table size
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as table_size,
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) as index_size
FROM pg_indexes 
WHERE schemaname = 'public';
\`\`\`

## 🎉 Key Takeaways

1. **Composite indexes** serve multiple query patterns with proper column ordering
2. **Covering indexes** eliminate table lookups by including all needed columns
3. **Partial indexes** focus on frequently queried subsets for efficiency
4. **Functional indexes** optimize queries with functions and calculations
5. **Monitor query patterns** - index what you actually query, not what you think you might
6. **Balance reads vs writes** - more indexes = faster SELECT, slower INSERT/UPDATE/DELETE
7. **Regular maintenance** - drop unused indexes, monitor performance impact

Remember: Indexing is both art and science. Analyze your actual query patterns, test performance improvements, and iterate. You're not just storing data - you're building a high-performance information retrieval system!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🎯 Create a composite index on the 'enrollments' table to optimize queries that frequently search by student_id and semester, and often need to access the course_id and grade columns.",
        expectedQuery:
          "CREATE INDEX idx_enrollments_student_semester ON enrollments(student_id, semester) INCLUDE (course_id, grade)",
        hint: "Use student_id first (most selective), then semester, and INCLUDE the commonly accessed columns to create a covering index",
        solution:
          "CREATE INDEX idx_enrollments_student_semester ON enrollments(student_id, semester) INCLUDE (course_id, grade);",
      },
      {
        id: "ex2",
        question:
          "📚 Create a partial index on the 'courses' table for active courses (status = 'Active') that optimizes searches by department and includes course details.",
        expectedQuery:
          "CREATE INDEX idx_active_courses_dept ON courses(department) WHERE status = 'Active' INCLUDE (course_id, course_name, credits)",
        hint: "Use WHERE clause to create partial index only for active courses, include commonly selected columns",
        solution:
          "CREATE INDEX idx_active_courses_dept ON courses(department) WHERE status = 'Active' INCLUDE (course_id, course_name, credits);",
      },
      {
        id: "ex3",
        question:
          "🔍 Create a functional index on the 'students' table to optimize case-insensitive searches on last names combined with major filtering.",
        expectedQuery:
          "CREATE INDEX idx_students_lastname_lower_major ON students(LOWER(last_name), major)",
        hint: "Use LOWER() function for case-insensitive matching and combine with major for composite functionality",
        solution:
          "CREATE INDEX idx_students_lastname_lower_major ON students(LOWER(last_name), major);",
      },
    ],
  },
  {
    id: "stored-procedures",
    title: "Stored Procedures - Reusable Database Logic",
    description:
      "Master stored procedures to encapsulate complex business logic, improve performance, and create maintainable database operations",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 50,
    content: `
# Stored Procedures - Reusable Database Logic

## 📖 Story Time: The University's Automation Challenge

You're the lead developer for CSU's student management system. Every semester, you perform the same complex tasks:
- Calculate final grades with weighted averages
- Generate transcripts with GPA calculations
- Process bulk enrollment changes
- Update student standing based on academic performance

Instead of writing these complex queries over and over (and risking mistakes), you decide to create reusable, tested procedures that can be called with simple commands. This is the power of stored procedures - pre-written, optimized database programs!

## 🎯 What are Stored Procedures?

A stored procedure is like a function or method in programming, but it lives inside your database. Think of it as:
- A recipe that's stored in the kitchen (database)
- A set of instructions that can be called by name
- A way to encapsulate complex logic into simple commands

**Basic Structure:**
\`\`\`sql
CREATE PROCEDURE procedure_name(parameters)
BEGIN
    -- Your SQL logic here
    -- Can include variables, loops, conditions
END;
\`\`\`

## 🚀 Simple Stored Procedure Examples

### Example 1: Get Student Info
\`\`\`sql
CREATE PROCEDURE GetStudentInfo(IN student_id INT)
BEGIN
    SELECT 
        s.name,
        s.major,
        s.gpa,
        COUNT(e.course_id) as total_courses,
        s.graduation_date
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    WHERE s.student_id = student_id
    GROUP BY s.student_id, s.name, s.major, s.gpa, s.graduation_date;
END;

-- Call the procedure
CALL GetStudentInfo(12345);
\`\`\`

### Example 2: Update GPA with Business Logic
\`\`\`sql
CREATE PROCEDURE UpdateStudentGPA(IN student_id INT)
BEGIN
    DECLARE new_gpa DECIMAL(3,2);
    
    -- Calculate GPA based on grades
    SELECT AVG(
        CASE grade
            WHEN 'A+' THEN 4.0
            WHEN 'A' THEN 4.0  
            WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3
            WHEN 'B' THEN 3.0
            WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3
            WHEN 'C' THEN 2.0
            WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3
            WHEN 'D' THEN 1.0
            ELSE 0.0
        END
    ) INTO new_gpa
    FROM enrollments
    WHERE student_id = student_id AND grade IS NOT NULL;
    
    -- Update student record
    UPDATE students 
    SET gpa = new_gpa, 
        last_updated = NOW()
    WHERE student_id = student_id;
    
    -- Return confirmation
    SELECT CONCAT('GPA updated to ', new_gpa) as result;
END;
\`\`\`

## 🎪 Advanced Stored Procedure Features

### Parameters: IN, OUT, INOUT
\`\`\`sql
CREATE PROCEDURE ProcessEnrollment(
    IN p_student_id INT,
    IN p_course_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE course_capacity INT;
    DECLARE current_enrollment INT;
    DECLARE student_credits INT;
    
    -- Check if course has space
    SELECT max_enrollment, current_enrollment 
    INTO course_capacity, current_enrollment
    FROM courses 
    WHERE course_id = p_course_id;
    
    -- Check student's current credit load
    SELECT SUM(credits) INTO student_credits
    FROM enrollments e
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.student_id = p_student_id 
    AND e.semester = 'Current';
    
    -- Business logic
    IF current_enrollment >= course_capacity THEN
        SET p_success = FALSE;
        SET p_message = 'Course is full';
    ELSEIF student_credits + (SELECT credits FROM courses WHERE course_id = p_course_id) > 18 THEN
        SET p_success = FALSE;
        SET p_message = 'Would exceed maximum credit hours (18)';
    ELSE
        -- Process enrollment
        INSERT INTO enrollments (student_id, course_id, semester, enrollment_date)
        VALUES (p_student_id, p_course_id, 'Current', NOW());
        
        -- Update course enrollment count
        UPDATE courses 
        SET current_enrollment = current_enrollment + 1
        WHERE course_id = p_course_id;
        
        SET p_success = TRUE;
        SET p_message = 'Successfully enrolled';
    END IF;
END;

-- Use the procedure
CALL ProcessEnrollment(12345, 'CS101', @success, @message);
SELECT @success, @message;
\`\`\`

### Control Flow: Loops and Conditions
\`\`\`sql
CREATE PROCEDURE GenerateTranscript(IN student_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE course_name VARCHAR(100);
    DECLARE grade CHAR(2);
    DECLARE credits INT;
    DECLARE total_credits INT DEFAULT 0;
    DECLARE total_points DECIMAL(5,2) DEFAULT 0.0;
    
    -- Cursor for student's courses
    DECLARE transcript_cursor CURSOR FOR
        SELECT c.course_name, e.grade, c.credits
        FROM enrollments e
        JOIN courses c ON e.course_id = c.course_id
        WHERE e.student_id = student_id AND e.grade IS NOT NULL
        ORDER BY e.semester, c.course_name;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Create temporary transcript table
    CREATE TEMPORARY TABLE temp_transcript (
        course_name VARCHAR(100),
        grade CHAR(2),
        credits INT,
        points DECIMAL(4,2)
    );
    
    OPEN transcript_cursor;
    
    read_loop: LOOP
        FETCH transcript_cursor INTO course_name, grade, credits;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Calculate grade points
        SET @grade_points = CASE grade
            WHEN 'A+' THEN 4.0 * credits
            WHEN 'A' THEN 4.0 * credits
            WHEN 'A-' THEN 3.7 * credits
            WHEN 'B+' THEN 3.3 * credits
            WHEN 'B' THEN 3.0 * credits
            WHEN 'B-' THEN 2.7 * credits
            WHEN 'C+' THEN 2.3 * credits
            WHEN 'C' THEN 2.0 * credits
            WHEN 'C-' THEN 1.7 * credits
            WHEN 'D+' THEN 1.3 * credits
            WHEN 'D' THEN 1.0 * credits
            ELSE 0.0
        END;
        
        -- Insert into transcript
        INSERT INTO temp_transcript VALUES (course_name, grade, credits, @grade_points);
        
        SET total_credits = total_credits + credits;
        SET total_points = total_points + @grade_points;
    END LOOP;
    
    CLOSE transcript_cursor;
    
    -- Display transcript with GPA
    SELECT * FROM temp_transcript;
    SELECT 
        total_credits as 'Total Credits',
        ROUND(total_points / total_credits, 2) as 'Cumulative GPA';
    
    DROP TEMPORARY TABLE temp_transcript;
END;
\`\`\`

## 🔧 Error Handling and Transactions

### Robust Error Handling
\`\`\`sql
CREATE PROCEDURE SafeGradeUpdate(
    IN p_student_id INT,
    IN p_course_id INT, 
    IN p_new_grade CHAR(2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1
            @error_code = MYSQL_ERRNO,
            @error_message = MESSAGE_TEXT;
        SELECT CONCAT('Error ', @error_code, ': ', @error_message) as error_details;
    END;
    
    -- Validate inputs
    IF p_new_grade NOT IN ('A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid grade format';
    END IF;
    
    START TRANSACTION;
    
    -- Check if enrollment exists
    IF NOT EXISTS (SELECT 1 FROM enrollments WHERE student_id = p_student_id AND course_id = p_course_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student not enrolled in this course';
    END IF;
    
    -- Update grade
    UPDATE enrollments 
    SET grade = p_new_grade, 
        grade_updated = NOW(),
        updated_by = USER()
    WHERE student_id = p_student_id AND course_id = p_course_id;
    
    -- Update student GPA
    CALL UpdateStudentGPA(p_student_id);
    
    COMMIT;
    
    SELECT 'Grade updated successfully' as result;
END;
\`\`\`

## 🚨 Common Mistakes & Best Practices

### ❌ Mistake 1: No Error Handling
\`\`\`sql
-- BAD: No error handling
CREATE PROCEDURE BadProcedure(IN student_id INT)
BEGIN
    UPDATE students SET gpa = gpa + 1 WHERE student_id = student_id;  -- Could fail!
    INSERT INTO audit_log VALUES (student_id, NOW());  -- Could fail!
END;

-- GOOD: Proper error handling
CREATE PROCEDURE GoodProcedure(IN student_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Operation failed - all changes rolled back' as result;
    END;
    
    START TRANSACTION;
    UPDATE students SET gpa = gpa + 1 WHERE student_id = student_id;
    INSERT INTO audit_log VALUES (student_id, NOW());
    COMMIT;
    
    SELECT 'Operation completed successfully' as result;
END;
\`\`\`

### ❌ Mistake 2: SQL Injection Vulnerability
\`\`\`sql
-- DANGEROUS: Dynamic SQL without protection
CREATE PROCEDURE UnsafeProcedure(IN table_name VARCHAR(50))
BEGIN
    SET @sql = CONCAT('SELECT * FROM ', table_name);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;

-- SAFER: Validate inputs
CREATE PROCEDURE SaferProcedure(IN table_name VARCHAR(50))
BEGIN
    IF table_name NOT IN ('students', 'courses', 'enrollments') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid table name';
    END IF;
    
    SET @sql = CONCAT('SELECT * FROM ', table_name);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
\`\`\`

### ❌ Mistake 3: Poor Performance
\`\`\`sql
-- SLOW: Cursor when set-based operation would work
CREATE PROCEDURE SlowUpdate()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE sid INT;
    DECLARE cur CURSOR FOR SELECT student_id FROM students;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    LOOP
        FETCH cur INTO sid;
        IF done THEN LEAVE; END IF;
        CALL UpdateStudentGPA(sid);  -- One at a time!
    END LOOP;
    CLOSE cur;
END;

-- FAST: Set-based operation
CREATE PROCEDURE FastUpdate()
BEGIN
    UPDATE students s
    SET gpa = (
        SELECT AVG(CASE e.grade 
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END)
        FROM enrollments e
        WHERE e.student_id = s.student_id AND e.grade IS NOT NULL
    );
END;
\`\`\`

## 🎨 Real-World Stored Procedure Applications

### 1. Academic Standing Evaluation
\`\`\`sql
CREATE PROCEDURE UpdateAcademicStanding()
BEGIN
    -- Update all students' academic standing based on GPA and credits
    UPDATE students 
    SET academic_standing = CASE
        WHEN gpa >= 3.5 AND total_credits >= 60 THEN 'Dean''s List'
        WHEN gpa >= 3.0 THEN 'Good Standing'
        WHEN gpa >= 2.0 THEN 'Academic Warning'
        ELSE 'Academic Probation'
    END,
    last_evaluated = NOW();
    
    -- Generate report
    SELECT 
        academic_standing,
        COUNT(*) as student_count,
        AVG(gpa) as average_gpa
    FROM students 
    GROUP BY academic_standing;
END;
\`\`\`

### 2. Semester Grade Processing
\`\`\`sql
CREATE PROCEDURE ProcessSemesterGrades(IN p_semester VARCHAR(20))
BEGIN
    DECLARE total_processed INT DEFAULT 0;
    
    START TRANSACTION;
    
    -- Finalize all grades for the semester
    UPDATE enrollments 
    SET grade_finalized = TRUE,
        finalized_date = NOW()
    WHERE semester = p_semester 
    AND grade IS NOT NULL;
    
    SET total_processed = ROW_COUNT();
    
    -- Update all student GPAs
    CALL FastUpdate();
    
    -- Update academic standings
    CALL UpdateAcademicStanding();
    
    COMMIT;
    
    SELECT CONCAT(total_processed, ' grades processed for ', p_semester) as summary;
END;
\`\`\`

## 🎉 Key Takeaways

1. **Stored procedures encapsulate business logic** in the database layer
2. **Use parameters** (IN, OUT, INOUT) to make procedures flexible and reusable
3. **Always include error handling** with proper transaction management
4. **Validate inputs** to prevent SQL injection and data integrity issues
5. **Prefer set-based operations** over row-by-row processing for performance
6. **Document your procedures** - include purpose, parameters, and example usage
7. **Test thoroughly** - stored procedures are harder to debug than application code

Stored procedures turn your database from a passive data store into an active business logic engine. You're not just storing data - you're creating a smart, self-managing system that enforces rules and automates complex operations!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🎓 Create a stored procedure called 'CalculateGPA' that takes a student_id as input and returns the calculated GPA based on their enrollment grades. Use proper grade point mapping (A=4.0, B=3.0, etc.).",
        expectedQuery:
          "CREATE PROCEDURE CalculateGPA(IN p_student_id INT, OUT p_gpa DECIMAL(3,2)) BEGIN SELECT AVG(CASE grade WHEN 'A' THEN 4.0 WHEN 'B' THEN 3.0 WHEN 'C' THEN 2.0 WHEN 'D' THEN 1.0 ELSE 0.0 END) INTO p_gpa FROM enrollments WHERE student_id = p_student_id AND grade IS NOT NULL; END",
        hint: "Use CASE statement to map letter grades to points, AVG() to calculate GPA, and OUT parameter to return the result",
        solution:
          "CREATE PROCEDURE CalculateGPA(IN p_student_id INT, OUT p_gpa DECIMAL(3,2)) BEGIN SELECT AVG(CASE grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END) INTO p_gpa FROM enrollments WHERE student_id = p_student_id AND grade IS NOT NULL; END;",
      },
      {
        id: "ex2",
        question:
          "🏫 Create a procedure 'EnrollStudent' that takes student_id and course_id parameters, checks if the course has available capacity, and enrolls the student if possible. Return success/failure status.",
        expectedQuery:
          "CREATE PROCEDURE EnrollStudent(IN p_student_id INT, IN p_course_id INT, OUT p_success BOOLEAN) BEGIN DECLARE capacity INT; DECLARE current_count INT; SELECT max_enrollment, current_enrollment INTO capacity, current_count FROM courses WHERE course_id = p_course_id; IF current_count < capacity THEN INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (p_student_id, p_course_id, NOW()); UPDATE courses SET current_enrollment = current_enrollment + 1 WHERE course_id = p_course_id; SET p_success = TRUE; ELSE SET p_success = FALSE; END IF; END",
        hint: "Check course capacity first, use conditional logic to enroll if space available, update enrollment count, use OUT parameter for success status",
        solution:
          "CREATE PROCEDURE EnrollStudent(IN p_student_id INT, IN p_course_id INT, OUT p_success BOOLEAN, OUT p_message VARCHAR(255)) BEGIN DECLARE capacity INT; DECLARE current_count INT; SELECT max_enrollment, current_enrollment INTO capacity, current_count FROM courses WHERE course_id = p_course_id; IF current_count < capacity THEN INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (p_student_id, p_course_id, NOW()); UPDATE courses SET current_enrollment = current_enrollment + 1 WHERE course_id = p_course_id; SET p_success = TRUE; SET p_message = 'Student enrolled successfully'; ELSE SET p_success = FALSE; SET p_message = 'Course is at full capacity'; END IF; END;",
      },
      {
        id: "ex3",
        question:
          "📊 Create a procedure 'GenerateDeansList' that finds all students with GPA >= 3.5 and at least 12 credits, then inserts them into a 'deans_list' table with the current semester.",
        expectedQuery:
          "CREATE PROCEDURE GenerateDeansList(IN p_semester VARCHAR(20)) BEGIN INSERT INTO deans_list (student_id, semester, gpa, total_credits, date_added) SELECT student_id, p_semester, gpa, total_credits, NOW() FROM students WHERE gpa >= 3.5 AND total_credits >= 12; END",
        hint: "Use INSERT with SELECT to find qualifying students, include semester parameter and current date",
        solution:
          "CREATE PROCEDURE GenerateDeansList(IN p_semester VARCHAR(20)) BEGIN DELETE FROM deans_list WHERE semester = p_semester; INSERT INTO deans_list (student_id, semester, gpa, total_credits, date_added) SELECT student_id, p_semester, gpa, total_credits, NOW() FROM students WHERE gpa >= 3.5 AND total_credits >= 12; SELECT COUNT(*) as students_added FROM deans_list WHERE semester = p_semester; END;",
      },
    ],
  },
  {
    id: "database-views",
    title: "Database Views - Virtual Tables for Data Abstraction",
    description:
      "Master database views to create virtual tables, simplify complex queries, and provide controlled data access layers",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 40,
    content: `
# Database Views - Virtual Tables for Data Abstraction

## 📖 Story Time: The Information Architecture Challenge

You're the database architect for CSU's new unified information system. Different departments need different perspectives on the same data:
- Faculty need to see course enrollment summaries
- Students need simplified transcript views  
- Administrators need comprehensive reporting dashboards
- The registrar needs real-time academic standing reports

Instead of writing complex queries for each group (and risking inconsistencies), you create **views** - virtual windows into your data that present exactly what each user needs to see, automatically updated and consistently formatted.

## 🎯 What are Database Views?

A view is like a saved query that behaves like a table. Think of it as:
- A virtual table that doesn't store data itself
- A window or lens that shows a specific perspective on your real tables
- A reusable query definition that simplifies complex operations
- A security layer that controls what data users can access

**Basic Syntax:**
\`\`\`sql
CREATE VIEW view_name AS
SELECT columns...
FROM tables...
WHERE conditions...;
\`\`\`

## 🌟 Simple View Examples

### Example 1: Student Summary View
\`\`\`sql
-- Create a simplified student information view
CREATE VIEW student_summary AS
SELECT 
    student_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    major,
    ROUND(gpa, 2) as gpa,
    total_credits,
    CASE 
        WHEN gpa >= 3.5 THEN 'Dean''s List'
        WHEN gpa >= 3.0 THEN 'Good Standing'  
        WHEN gpa >= 2.0 THEN 'Academic Warning'
        ELSE 'Academic Probation'
    END as academic_standing
FROM students
WHERE status = 'Active';

-- Use it like a regular table
SELECT * FROM student_summary WHERE major = 'Computer Science';
SELECT COUNT(*) FROM student_summary WHERE academic_standing = 'Dean''s List';
\`\`\`

### Example 2: Course Enrollment View
\`\`\`sql
-- Create a course enrollment summary view
CREATE VIEW course_enrollment_summary AS
SELECT 
    c.course_id,
    c.course_name,
    c.department,
    c.credits,
    COUNT(e.student_id) as enrolled_students,
    c.max_enrollment,
    (c.max_enrollment - COUNT(e.student_id)) as available_spots,
    ROUND((COUNT(e.student_id) / c.max_enrollment) * 100, 1) as enrollment_percentage
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id 
    AND e.semester = 'Fall2024'
GROUP BY c.course_id, c.course_name, c.department, c.credits, c.max_enrollment;

-- Easy queries on complex data
SELECT * FROM course_enrollment_summary WHERE available_spots = 0;
SELECT * FROM course_enrollment_summary WHERE enrollment_percentage < 50;
\`\`\`

## 🚀 Advanced View Patterns

### 1. Multi-Table Join Views
\`\`\`sql
-- Student transcript view
CREATE VIEW student_transcripts AS
SELECT 
    s.student_id,
    s.first_name || ' ' || s.last_name as student_name,
    s.major,
    c.course_code,
    c.course_name,
    c.credits,
    e.grade,
    e.semester,
    CASE e.grade
        WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
        WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7  
        WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
        WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
    END * c.credits as quality_points
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE e.grade IS NOT NULL;

-- Simple transcript queries
SELECT * FROM student_transcripts WHERE student_id = 12345;
SELECT semester, SUM(credits), AVG(quality_points/credits) as semester_gpa
FROM student_transcripts 
WHERE student_id = 12345 
GROUP BY semester;
\`\`\`

### 2. Aggregation Views  
\`\`\`sql
-- Department statistics view
CREATE VIEW department_statistics AS
SELECT 
    d.department_name,
    COUNT(DISTINCT s.student_id) as total_students,
    AVG(s.gpa) as avg_department_gpa,
    COUNT(DISTINCT c.course_id) as courses_offered,
    SUM(CASE WHEN s.gpa >= 3.5 THEN 1 ELSE 0 END) as honors_students,
    COUNT(DISTINCT f.faculty_id) as faculty_count
FROM departments d
LEFT JOIN students s ON d.department_id = s.major_department_id
LEFT JOIN courses c ON d.department_id = c.department_id  
LEFT JOIN faculty f ON d.department_id = f.department_id
GROUP BY d.department_id, d.department_name;

-- Department comparison queries
SELECT * FROM department_statistics ORDER BY avg_department_gpa DESC;
SELECT * FROM department_statistics WHERE total_students > 100;
\`\`\`

### 3. Security/Access Control Views
\`\`\`sql
-- Faculty can only see their own course enrollments
CREATE VIEW faculty_course_view AS
SELECT 
    c.course_id,
    c.course_name,
    c.semester,
    s.student_id,
    s.first_name || ' ' || s.last_name as student_name,
    s.email,
    e.grade
FROM courses c
JOIN enrollments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
WHERE c.faculty_id = USER_ID(); -- Only current user's courses

-- Students can only see their own records
CREATE VIEW my_courses AS
SELECT 
    c.course_name,
    c.credits,
    e.grade,
    e.semester,
    f.first_name || ' ' || f.last_name as instructor
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
JOIN faculty f ON c.faculty_id = f.faculty_id
WHERE e.student_id = USER_ID(); -- Only current user's enrollments
\`\`\`

## 🎪 View Types and Features

### 1. Simple vs Complex Views
\`\`\`sql
-- Simple view (updatable)
CREATE VIEW active_students AS
SELECT student_id, first_name, last_name, email, major
FROM students 
WHERE status = 'Active';

-- You can INSERT, UPDATE, DELETE through this view
UPDATE active_students SET email = 'new@email.com' WHERE student_id = 123;

-- Complex view (read-only)  
CREATE VIEW complex_student_stats AS
SELECT 
    major,
    COUNT(*) as student_count,
    AVG(gpa) as avg_gpa,
    MAX(gpa) as highest_gpa
FROM students 
GROUP BY major;

-- Cannot modify this view (has aggregations)
-- UPDATE complex_student_stats SET avg_gpa = 3.5; -- ERROR!
\`\`\`

### 2. Materialized Views (if supported)
\`\`\`sql
-- Store the results physically for performance
CREATE MATERIALIZED VIEW enrollment_summary AS
SELECT 
    semester,
    department,
    COUNT(*) as total_enrollments,
    COUNT(DISTINCT student_id) as unique_students,
    AVG(CASE grade WHEN 'A' THEN 4.0 WHEN 'B' THEN 3.0 WHEN 'C' THEN 2.0 ELSE 0.0 END) as avg_gpa
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
GROUP BY semester, department;

-- Refresh when data changes
REFRESH MATERIALIZED VIEW enrollment_summary;
\`\`\`

### 3. Views with Parameters (using Functions)
\`\`\`sql
-- Create function that returns a view-like result
CREATE FUNCTION student_courses_for_semester(p_semester VARCHAR(20))
RETURNS TABLE (
    student_name VARCHAR(200),
    course_name VARCHAR(200), 
    credits INT,
    grade CHAR(2)
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.first_name || ' ' || s.last_name,
        c.course_name,
        c.credits,
        e.grade
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.semester = p_semester;
END;
$$ LANGUAGE plpgsql;

-- Use like a parameterized view
SELECT * FROM student_courses_for_semester('Fall2024');
\`\`\`

## 🚨 Common Mistakes & Best Practices

### ❌ Mistake 1: Views on Views (Performance Issues)
\`\`\`sql
-- PROBLEMATIC: Views stacked on views
CREATE VIEW base_student_view AS
SELECT * FROM students WHERE status = 'Active';

CREATE VIEW filtered_students AS  
SELECT * FROM base_student_view WHERE gpa > 3.0;

CREATE VIEW final_student_report AS
SELECT * FROM filtered_students WHERE major = 'Engineering';

-- BETTER: Single comprehensive view
CREATE VIEW engineering_honors_students AS
SELECT * FROM students 
WHERE status = 'Active' 
AND gpa > 3.0 
AND major = 'Engineering';
\`\`\`

### ❌ Mistake 2: No Proper Naming Convention
\`\`\`sql
-- CONFUSING: Looks like a table
CREATE VIEW students AS SELECT ...;  -- BAD!

-- CLEAR: Obvious it's a view
CREATE VIEW vw_student_summary AS SELECT ...;
CREATE VIEW student_enrollment_view AS SELECT ...;
\`\`\`

### ❌ Mistake 3: Overly Complex Views
\`\`\`sql
-- TOO COMPLEX: Hard to maintain and debug
CREATE VIEW mega_complex_view AS
SELECT s.*, c.*, e.*, f.*, d.*,
       (SELECT COUNT(*) FROM table1 WHERE condition1) as calc1,
       (SELECT AVG(field) FROM table2 WHERE condition2) as calc2
FROM students s
LEFT JOIN (SELECT ... FROM ... WHERE ... GROUP BY ...) subq1 ON ...
LEFT JOIN (SELECT ... FROM ... WHERE ... GROUP BY ...) subq2 ON ...
-- 50 more lines...

-- BETTER: Break into logical, focused views
CREATE VIEW student_basic_info AS SELECT ...;
CREATE VIEW student_academic_summary AS SELECT ...;  
CREATE VIEW student_enrollment_details AS SELECT ...;
\`\`\`

### ❌ Mistake 4: Forgetting View Dependencies
\`\`\`sql
-- View depends on table structure
CREATE VIEW course_summary AS
SELECT course_id, course_name, instructor_name, credits 
FROM courses;

-- If you ALTER TABLE courses and drop instructor_name column...
-- The view breaks!

-- BETTER: Document dependencies and plan for changes
\`\`\`

## 🎨 Real-World View Applications

### 1. Reporting Dashboard Views
\`\`\`sql
-- Executive dashboard view
CREATE VIEW executive_dashboard AS
SELECT 
    'Current Enrollment' as metric,
    COUNT(DISTINCT s.student_id) as value,
    'Students' as unit
FROM students s WHERE s.status = 'Active'
UNION ALL
SELECT 
    'Average GPA' as metric,
    ROUND(AVG(s.gpa), 2) as value,
    'Points' as unit  
FROM students s WHERE s.status = 'Active'
UNION ALL
SELECT
    'Course Capacity Utilization' as metric,
    ROUND(AVG((current_enrollment::float / max_enrollment) * 100), 1) as value,
    'Percent' as unit
FROM courses;
\`\`\`

### 2. API Data Layer Views
\`\`\`sql
-- Clean API response format
CREATE VIEW api_student_profiles AS
SELECT 
    student_id,
    json_build_object(
        'name', first_name || ' ' || last_name,
        'email', email,
        'major', major,
        'gpa', ROUND(gpa, 2),
        'credits', total_credits,
        'standing', CASE 
            WHEN gpa >= 3.5 THEN 'Honors'
            WHEN gpa >= 2.0 THEN 'Good Standing'
            ELSE 'Probation'
        END,
        'graduation_year', EXTRACT(YEAR FROM expected_graduation)
    ) as profile_json
FROM students 
WHERE status = 'Active';
\`\`\`

### 3. Data Warehouse Views
\`\`\`sql
-- Historical enrollment trends
CREATE VIEW enrollment_trends AS
SELECT 
    EXTRACT(YEAR FROM enrollment_date) as year,
    EXTRACT(MONTH FROM enrollment_date) as month,
    department,
    COUNT(*) as new_enrollments,
    LAG(COUNT(*)) OVER (PARTITION BY department ORDER BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)) as prev_month_enrollments
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
GROUP BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date), department;
\`\`\`

## 🎉 Key Takeaways

1. **Views simplify complex queries** by encapsulating logic in reusable definitions
2. **Use clear naming conventions** - make it obvious that it's a view
3. **Consider performance** - views execute the underlying query each time
4. **Views provide security** - control what data users can access
5. **Keep views focused** - one clear purpose per view
6. **Document dependencies** - know what tables/columns your views rely on
7. **Test updateability** - not all views support INSERT/UPDATE/DELETE

Views transform your database from a collection of tables into a well-organized information architecture. You're not just storing data - you're creating intelligent, reusable windows into your information that serve exactly what each user needs!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "👥 Create a view called 'active_student_summary' that shows student_id, full_name (concatenated), major, GPA, and academic_standing (based on GPA ranges) for only active students.",
        expectedQuery:
          "CREATE VIEW active_student_summary AS SELECT student_id, CONCAT(first_name, ' ', last_name) AS full_name, major, gpa, CASE WHEN gpa >= 3.5 THEN 'Honors' WHEN gpa >= 3.0 THEN 'Good Standing' WHEN gpa >= 2.0 THEN 'Warning' ELSE 'Probation' END AS academic_standing FROM students WHERE status = 'Active'",
        hint: "Use CONCAT for full name, CASE statement for academic standing based on GPA, filter by status = 'Active'",
        solution:
          "CREATE VIEW active_student_summary AS SELECT student_id, CONCAT(first_name, ' ', last_name) AS full_name, major, ROUND(gpa, 2) as gpa, CASE WHEN gpa >= 3.5 THEN 'Dean''s List' WHEN gpa >= 3.0 THEN 'Good Standing' WHEN gpa >= 2.0 THEN 'Academic Warning' ELSE 'Academic Probation' END AS academic_standing FROM students WHERE status = 'Active';",
      },
      {
        id: "ex2",
        question:
          "📚 Create a view 'course_enrollment_stats' that shows course_name, department, enrolled_count, max_enrollment, and available_spots for the current semester.",
        expectedQuery:
          "CREATE VIEW course_enrollment_stats AS SELECT c.course_name, c.department, COUNT(e.student_id) as enrolled_count, c.max_enrollment, (c.max_enrollment - COUNT(e.student_id)) as available_spots FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.course_id, c.course_name, c.department, c.max_enrollment",
        hint: "LEFT JOIN courses with enrollments, use COUNT for enrolled students, calculate available spots as max - current",
        solution:
          "CREATE VIEW course_enrollment_stats AS SELECT c.course_name, c.department, COUNT(e.student_id) as enrolled_count, c.max_enrollment, (c.max_enrollment - COUNT(e.student_id)) as available_spots FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id AND e.semester = 'Current' GROUP BY c.course_id, c.course_name, c.department, c.max_enrollment;",
      },
      {
        id: "ex3",
        question:
          "🎓 Create a view 'student_transcript_view' that shows student_name, course_name, credits, grade, and quality_points (grade points × credits) for all completed courses.",
        expectedQuery:
          "CREATE VIEW student_transcript_view AS SELECT CONCAT(s.first_name, ' ', s.last_name) as student_name, c.course_name, c.credits, e.grade, (CASE e.grade WHEN 'A' THEN 4.0 WHEN 'B' THEN 3.0 WHEN 'C' THEN 2.0 WHEN 'D' THEN 1.0 ELSE 0.0 END * c.credits) as quality_points FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE e.grade IS NOT NULL",
        hint: "JOIN students, enrollments, and courses tables. Use CASE to convert grades to points, multiply by credits for quality points",
        solution:
          "CREATE VIEW student_transcript_view AS SELECT CONCAT(s.first_name, ' ', s.last_name) as student_name, c.course_name, c.credits, e.grade, (CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END * c.credits) as quality_points FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE e.grade IS NOT NULL;",
      },
    ],
  },
  {
    id: "statistical-functions",
    title: "Statistical Functions - Advanced Data Analytics",
    description:
      "Master advanced statistical functions for data analysis including percentiles, standard deviation, and correlation analysis",
    difficulty: "Intermediate",
    category: "Data Analysis",
    estimatedTime: 45,
    content: `
# Statistical Functions - Advanced Data Analytics

## 📖 Story Time: The Data Science Detective

You're the institutional researcher at CSU, and the dean asks you some challenging questions:
- "What's the correlation between student GPA and course difficulty?"
- "Which students are statistical outliers in their academic performance?"
- "What percentile does a 3.7 GPA represent in each major?"
- "How much variation exists in class sizes across departments?"

Simple averages and counts won't cut it - you need the power of statistical analysis. SQL's statistical functions transform you from a data retriever into a data scientist!

## 🎯 Descriptive Statistics Functions

### Central Tendency Measures
\`\`\`sql
-- Basic measures of center
SELECT 
    major,
    AVG(gpa) as mean_gpa,
    -- Median (50th percentile)
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY gpa) as median_gpa,
    -- Mode approximation (most common GPA range)
    MODE() WITHIN GROUP (ORDER BY ROUND(gpa, 1)) as mode_gpa
FROM students 
GROUP BY major;
\`\`\`

### Measures of Spread/Variation
\`\`\`sql
-- Understanding data distribution
SELECT 
    department,
    COUNT(*) as course_count,
    AVG(max_enrollment) as avg_capacity,
    STDDEV(max_enrollment) as std_dev_capacity,
    VARIANCE(max_enrollment) as variance_capacity,
    MIN(max_enrollment) as min_capacity,
    MAX(max_enrollment) as max_capacity,
    MAX(max_enrollment) - MIN(max_enrollment) as range_capacity
FROM courses
GROUP BY department;
\`\`\`

**Interpreting Results:**
- **Standard Deviation**: Low values = consistent class sizes, High values = mixed class sizes
- **Variance**: Square of standard deviation, useful for mathematical calculations
- **Range**: Simple measure of spread (max - min)

## 🚀 Percentile and Quartile Analysis

### Understanding Student Performance Distribution
\`\`\`sql
-- GPA percentile analysis by major
SELECT 
    major,
    COUNT(*) as student_count,
    
    -- Quartiles (25th, 50th, 75th percentiles)
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as q1_gpa,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY gpa) as median_gpa,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) as q3_gpa,
    
    -- Extreme percentiles
    PERCENTILE_CONT(0.10) WITHIN GROUP (ORDER BY gpa) as p10_gpa,
    PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY gpa) as p90_gpa,
    
    -- Interquartile Range (IQR)
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) - 
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as iqr
FROM students 
WHERE gpa IS NOT NULL
GROUP BY major
ORDER BY median_gpa DESC;
\`\`\`

### Finding Individual Student Rankings
\`\`\`sql
-- Where does each student rank within their major?
SELECT 
    student_id,
    name,
    major,
    gpa,
    -- Percentile rank (what percent of students are below this GPA?)
    PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) as percentile_rank,
    -- Cumulative distribution (what fraction of students have GPA <= this?)
    CUME_DIST() OVER (PARTITION BY major ORDER BY gpa) as cumulative_dist,
    -- Rank within major
    RANK() OVER (PARTITION BY major ORDER BY gpa DESC) as gpa_rank,
    -- Total students in major for context
    COUNT(*) OVER (PARTITION BY major) as major_size
FROM students 
WHERE gpa IS NOT NULL;
\`\`\`

## 🎪 Advanced Statistical Analysis

### 1. Outlier Detection Using IQR Method
\`\`\`sql
-- Find statistical outliers in GPA by major
WITH gpa_stats AS (
    SELECT 
        major,
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as q1,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) as q3,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) - 
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as iqr
    FROM students 
    GROUP BY major
)
SELECT 
    s.student_id,
    s.name,
    s.major,
    s.gpa,
    gs.q1,
    gs.q3,
    CASE 
        WHEN s.gpa < (gs.q1 - 1.5 * gs.iqr) THEN 'Low Outlier'
        WHEN s.gpa > (gs.q3 + 1.5 * gs.iqr) THEN 'High Outlier' 
        ELSE 'Normal Range'
    END as outlier_status
FROM students s
JOIN gpa_stats gs ON s.major = gs.major
WHERE s.gpa < (gs.q1 - 1.5 * gs.iqr) OR s.gpa > (gs.q3 + 1.5 * gs.iqr);
\`\`\`

### 2. Correlation Analysis
\`\`\`sql
-- Analyze relationship between course difficulty and student performance
WITH course_difficulty AS (
    SELECT 
        course_id,
        AVG(CASE grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END) as avg_course_gpa,
        STDDEV(CASE grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END) as grade_variability,
        COUNT(*) as sample_size
    FROM enrollments
    WHERE grade IS NOT NULL
    GROUP BY course_id
    HAVING COUNT(*) >= 10  -- Minimum sample size
)
SELECT 
    c.department,
    c.course_level,
    AVG(cd.avg_course_gpa) as dept_avg_gpa,
    AVG(cd.grade_variability) as avg_variability,
    -- Correlation approximation between course level and difficulty
    CORR(c.course_level, cd.avg_course_gpa) as level_gpa_correlation
FROM courses c
JOIN course_difficulty cd ON c.course_id = cd.course_id
GROUP BY c.department, c.course_level;
\`\`\`

### 3. Distribution Analysis
\`\`\`sql
-- Grade distribution analysis
SELECT 
    semester,
    grade,
    COUNT(*) as frequency,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY semester) as percentage,
    -- Running total
    SUM(COUNT(*)) OVER (PARTITION BY semester ORDER BY grade) as cumulative_freq,
    -- Z-score approximation (assuming normal distribution)
    (COUNT(*) - AVG(COUNT(*)) OVER (PARTITION BY semester)) / 
    STDDEV(COUNT(*)) OVER (PARTITION BY semester) as z_score
FROM enrollments
WHERE grade IS NOT NULL
GROUP BY semester, grade
ORDER BY semester, grade;
\`\`\`

## 🔬 Hypothesis Testing with SQL

### Statistical Significance Testing
\`\`\`sql
-- Compare GPA performance between two groups
WITH group_stats AS (
    SELECT 
        'Online Students' as group_name,
        AVG(gpa) as mean_gpa,
        STDDEV(gpa) as std_gpa,
        COUNT(*) as sample_size
    FROM students 
    WHERE enrollment_type = 'Online'
    
    UNION ALL
    
    SELECT 
        'Campus Students' as group_name,
        AVG(gpa) as mean_gpa,
        STDDEV(gpa) as std_gpa,
        COUNT(*) as sample_size
    FROM students 
    WHERE enrollment_type = 'Campus'
)
SELECT 
    *,
    -- Effect size (Cohen's d approximation)
    ABS(
        (SELECT mean_gpa FROM group_stats WHERE group_name = 'Online Students') -
        (SELECT mean_gpa FROM group_stats WHERE group_name = 'Campus Students')
    ) / (
        (SELECT AVG(std_gpa) FROM group_stats)
    ) as cohens_d
FROM group_stats;
\`\`\`

## 🚨 Common Statistical Mistakes

### ❌ Mistake 1: Ignoring Sample Size
\`\`\`sql
-- BAD: No consideration of sample size
SELECT major, AVG(gpa) as avg_gpa
FROM students GROUP BY major;

-- BETTER: Include confidence indicators
SELECT 
    major, 
    AVG(gpa) as avg_gpa,
    COUNT(*) as sample_size,
    STDDEV(gpa) / SQRT(COUNT(*)) as standard_error,
    CASE 
        WHEN COUNT(*) < 10 THEN 'Small Sample'
        WHEN COUNT(*) < 30 THEN 'Medium Sample' 
        ELSE 'Large Sample'
    END as sample_reliability
FROM students 
GROUP BY major
HAVING COUNT(*) >= 5;  -- Minimum threshold
\`\`\`

### ❌ Mistake 2: Correlation vs Causation
\`\`\`sql
-- MISLEADING: High correlation doesn't mean causation
SELECT 
    'Ice cream sales vs drowning deaths' as analysis,
    CORR(ice_cream_sales, drowning_deaths) as correlation,
    'High correlation, but ice cream doesn''t cause drowning!' as reality;

-- BETTER: Look for confounding variables
SELECT 
    season,
    AVG(ice_cream_sales) as avg_ice_cream,
    AVG(drowning_deaths) as avg_drowning,
    AVG(temperature) as avg_temp,
    'Temperature is the confounding variable' as insight
FROM seasonal_data
GROUP BY season;
\`\`\`

### ❌ Mistake 3: Assuming Normal Distribution
\`\`\`sql
-- CHECK: Is the data normally distributed?
SELECT 
    major,
    AVG(gpa) as mean_gpa,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY gpa) as median_gpa,
    ABS(AVG(gpa) - PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY gpa)) as mean_median_diff,
    CASE 
        WHEN ABS(AVG(gpa) - PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY gpa)) < 0.1 
        THEN 'Approximately Normal'
        ELSE 'Skewed Distribution'
    END as distribution_type
FROM students 
GROUP BY major;
\`\`\`

## 🎨 Real-World Statistical Applications

### 1. Academic Performance Dashboard
\`\`\`sql
-- Comprehensive academic analytics
SELECT 
    'Overall Statistics' as metric_category,
    'Total Students' as metric,
    COUNT(*)::text as value
FROM students WHERE status = 'Active'

UNION ALL

SELECT 
    'GPA Distribution',
    '25th Percentile',
    ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa), 2)::text
FROM students WHERE gpa IS NOT NULL

UNION ALL

SELECT 
    'GPA Distribution', 
    '75th Percentile',
    ROUND(PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa), 2)::text
FROM students WHERE gpa IS NOT NULL

UNION ALL

SELECT 
    'Performance Variation',
    'GPA Standard Deviation', 
    ROUND(STDDEV(gpa), 3)::text
FROM students WHERE gpa IS NOT NULL;
\`\`\`

### 2. Predictive Risk Modeling
\`\`\`sql
-- Identify students at risk based on statistical patterns
WITH risk_factors AS (
    SELECT 
        student_id,
        gpa,
        total_credits,
        -- GPA percentile within major
        PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) as gpa_percentile,
        -- Credit load compared to peers
        (total_credits - AVG(total_credits) OVER (PARTITION BY class_year)) / 
        STDDEV(total_credits) OVER (PARTITION BY class_year) as credit_z_score
    FROM students
)
SELECT 
    student_id,
    gpa,
    CASE 
        WHEN gpa_percentile < 0.10 AND credit_z_score < -1.5 THEN 'High Risk'
        WHEN gpa_percentile < 0.25 OR credit_z_score < -1.0 THEN 'Medium Risk'
        ELSE 'Low Risk'
    END as risk_category,
    gpa_percentile,
    credit_z_score
FROM risk_factors
WHERE gpa_percentile < 0.25 OR credit_z_score < -1.0
ORDER BY gpa_percentile ASC;
\`\`\`

## 🎉 Key Takeaways

1. **Use appropriate statistical measures** - median for skewed data, mean for normal distributions
2. **Consider sample sizes** - small samples lead to unreliable statistics
3. **Look for patterns beyond averages** - percentiles and distributions tell richer stories
4. **Identify outliers systematically** - use statistical methods, not just gut feelings
5. **Correlation ≠ causation** - always look for confounding variables
6. **Validate assumptions** - check if your data meets statistical requirements
7. **Provide context** - raw statistics mean nothing without proper interpretation

Statistical functions transform raw data into actionable insights. You're not just summarizing numbers - you're uncovering patterns, identifying risks, and enabling data-driven decisions!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📊 Calculate the 25th, 50th (median), and 75th percentiles of GPA for each major, along with the interquartile range (IQR). Show only majors with at least 10 students.",
        expectedQuery:
          "SELECT major, PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as q1, PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY gpa) as median, PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) as q3, PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa) as iqr FROM students WHERE gpa IS NOT NULL GROUP BY major HAVING COUNT(*) >= 10",
        hint: "Use PERCENTILE_CONT for quartiles, subtract Q1 from Q3 for IQR, filter groups with HAVING COUNT(*) >= 10",
        solution:
          "SELECT major, COUNT(*) as student_count, ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa), 2) as q1, ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY gpa), 2) as median, ROUND(PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa), 2) as q3, ROUND(PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY gpa) - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY gpa), 2) as iqr FROM students WHERE gpa IS NOT NULL GROUP BY major HAVING COUNT(*) >= 10 ORDER BY median DESC;",
      },
      {
        id: "ex2",
        question:
          "🎯 Find students whose GPA is more than 2 standard deviations away from their major's mean GPA (statistical outliers). Show student info and outlier type.",
        expectedQuery:
          "WITH major_stats AS (SELECT major, AVG(gpa) as mean_gpa, STDDEV(gpa) as std_gpa FROM students GROUP BY major) SELECT s.student_id, s.name, s.major, s.gpa, ms.mean_gpa, CASE WHEN s.gpa > (ms.mean_gpa + 2 * ms.std_gpa) THEN 'High Outlier' WHEN s.gpa < (ms.mean_gpa - 2 * ms.std_gpa) THEN 'Low Outlier' END as outlier_type FROM students s JOIN major_stats ms ON s.major = ms.major WHERE s.gpa > (ms.mean_gpa + 2 * ms.std_gpa) OR s.gpa < (ms.mean_gpa - 2 * ms.std_gpa)",
        hint: "Calculate major statistics first using CTE, then join with students to find those more than 2 standard deviations from mean",
        solution:
          "WITH major_stats AS (SELECT major, AVG(gpa) as mean_gpa, STDDEV(gpa) as std_gpa FROM students WHERE gpa IS NOT NULL GROUP BY major HAVING COUNT(*) >= 10) SELECT s.student_id, s.name, s.major, ROUND(s.gpa, 2) as gpa, ROUND(ms.mean_gpa, 2) as major_mean, CASE WHEN s.gpa > (ms.mean_gpa + 2 * ms.std_gpa) THEN 'High Outlier' WHEN s.gpa < (ms.mean_gpa - 2 * ms.std_gpa) THEN 'Low Outlier' END as outlier_type FROM students s JOIN major_stats ms ON s.major = ms.major WHERE s.gpa > (ms.mean_gpa + 2 * ms.std_gpa) OR s.gpa < (ms.mean_gpa - 2 * ms.std_gpa);",
      },
      {
        id: "ex3",
        question:
          "📈 Calculate each student's percentile rank within their major based on GPA, showing only students in the top 10% (90th percentile or higher).",
        expectedQuery:
          "SELECT student_id, name, major, gpa, PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) as percentile_rank FROM students WHERE gpa IS NOT NULL QUALIFY PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) >= 0.90",
        hint: "Use PERCENT_RANK() window function partitioned by major, filter for percentile >= 0.90 (top 10%)",
        solution:
          "SELECT student_id, name, major, ROUND(gpa, 2) as gpa, ROUND(PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) * 100, 1) as percentile FROM students WHERE gpa IS NOT NULL AND PERCENT_RANK() OVER (PARTITION BY major ORDER BY gpa) >= 0.90 ORDER BY major, gpa DESC;",
      },
    ],
  },
  {
    id: "time-series-analysis",
    title: "Time Series Analysis - Temporal Data Insights",
    description:
      "Master time-based data analysis including trends, seasonality, moving averages, and growth calculations for temporal patterns",
    difficulty: "Advanced",
    category: "Data Analysis",
    estimatedTime: 50,
    content: `
# Time Series Analysis - Temporal Data Insights

## 📖 Story Time: The Enrollment Forecaster

As CSU's Director of Institutional Planning, you're facing critical questions about enrollment trends:
- "Are we seeing declining interest in STEM programs over the past 5 years?"
- "What are the seasonal patterns in course registrations?"
- "How do we predict next semester's enrollment capacity needs?"
- "Which programs show consistent growth vs. those showing warning signs?"

Time series analysis in SQL transforms timestamps from mere record-keeping into powerful insights about trends, cycles, and predictions. You're about to become a time-traveling data detective!

## 🎯 Time Series Fundamentals

### Understanding Temporal Data Components
Every time series has four key components:
1. **Trend** - Long-term direction (up, down, stable)
2. **Seasonality** - Regular, predictable patterns (semester cycles, monthly patterns)
3. **Cyclical** - Irregular long-term fluctuations (economic cycles)
4. **Noise** - Random variations

### Basic Time Series Setup
\`\`\`sql
-- Enrollment over time - the foundation
SELECT 
    DATE_TRUNC('month', enrollment_date) as month,
    COUNT(*) as new_enrollments,
    COUNT(*) * 1.0 / LAG(COUNT(*)) OVER (ORDER BY DATE_TRUNC('month', enrollment_date)) - 1 as growth_rate
FROM enrollments 
WHERE enrollment_date >= '2020-01-01'
GROUP BY DATE_TRUNC('month', enrollment_date)
ORDER BY month;
\`\`\`

## 🚀 Trend Analysis

### Linear Trend Detection
\`\`\`sql
-- Calculate enrollment trend over time
WITH monthly_enrollments AS (
    SELECT 
        DATE_TRUNC('month', enrollment_date) as month,
        COUNT(*) as enrollments,
        ROW_NUMBER() OVER (ORDER BY DATE_TRUNC('month', enrollment_date)) as time_period
    FROM enrollments
    WHERE enrollment_date >= '2020-01-01'
    GROUP BY DATE_TRUNC('month', enrollment_date)
)
SELECT 
    month,
    enrollments,
    time_period,
    -- Linear regression components using SQL
    AVG(enrollments) OVER () as mean_enrollments,
    AVG(time_period) OVER () as mean_time,
    -- Trend slope calculation
    (SUM(time_period * enrollments) OVER () - 
     COUNT(*) OVER () * AVG(time_period) OVER () * AVG(enrollments) OVER ()) /
    (SUM(time_period * time_period) OVER () - 
     COUNT(*) OVER () * AVG(time_period) OVER () * AVG(time_period) OVER ()) as trend_slope,
    
    -- Trend line value
    AVG(enrollments) OVER () + 
    ((SUM(time_period * enrollments) OVER () - 
      COUNT(*) OVER () * AVG(time_period) OVER () * AVG(enrollments) OVER ()) /
     (SUM(time_period * time_period) OVER () - 
      COUNT(*) OVER () * AVG(time_period) OVER () * AVG(time_period) OVER ())) * 
    (time_period - AVG(time_period) OVER ()) as trend_value
FROM monthly_enrollments;
\`\`\`

### Moving Averages for Smoothing
\`\`\`sql
-- Smooth out noise to see true trends
SELECT 
    enrollment_date,
    daily_enrollments,
    -- 7-day moving average
    AVG(daily_enrollments) OVER (
        ORDER BY enrollment_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as ma_7_day,
    
    -- 30-day moving average
    AVG(daily_enrollments) OVER (
        ORDER BY enrollment_date 
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) as ma_30_day,
    
    -- Exponential moving average approximation
    AVG(daily_enrollments) OVER (
        ORDER BY enrollment_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) * 0.3 + 
    LAG(AVG(daily_enrollments) OVER (
        ORDER BY enrollment_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    )) OVER (ORDER BY enrollment_date) * 0.7 as ema_approx
FROM (
    SELECT 
        DATE(enrollment_date) as enrollment_date,
        COUNT(*) as daily_enrollments
    FROM enrollments
    GROUP BY DATE(enrollment_date)
    ORDER BY DATE(enrollment_date)
) daily_data;
\`\`\`

## 🎪 Seasonality Detection

### Identifying Seasonal Patterns
\`\`\`sql
-- Discover enrollment patterns by month and semester
SELECT 
    EXTRACT(MONTH FROM enrollment_date) as month,
    EXTRACT(YEAR FROM enrollment_date) as year,
    COUNT(*) as enrollments,
    
    -- Compare to same month in previous years
    LAG(COUNT(*), 12) OVER (ORDER BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)) as same_month_prev_year,
    
    -- Year-over-year growth
    (COUNT(*) * 1.0 / LAG(COUNT(*), 12) OVER (ORDER BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)) - 1) * 100 as yoy_growth_pct,
    
    -- Seasonal index (this month vs annual average)
    COUNT(*) * 12.0 / SUM(COUNT(*)) OVER (PARTITION BY EXTRACT(YEAR FROM enrollment_date)) as seasonal_index
FROM enrollments
WHERE enrollment_date >= '2020-01-01'
GROUP BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)
ORDER BY year, month;
\`\`\`

### Day-of-Week Patterns
\`\`\`sql
-- Registration patterns by day of week
SELECT 
    TO_CHAR(enrollment_date, 'Day') as day_name,
    EXTRACT(DOW FROM enrollment_date) as day_number,
    COUNT(*) as total_enrollments,
    AVG(COUNT(*)) OVER () as avg_daily_enrollments,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () as pct_of_total,
    
    -- Index (1.0 = average day, >1.0 = above average)
    COUNT(*) / AVG(COUNT(*)) OVER () as day_index
FROM enrollments
WHERE enrollment_date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY EXTRACT(DOW FROM enrollment_date), TO_CHAR(enrollment_date, 'Day')
ORDER BY day_number;
\`\`\`

## 🔬 Advanced Time Series Techniques

### 1. Cohort Analysis
\`\`\`sql
-- Track student retention by enrollment cohort
WITH enrollment_cohorts AS (
    SELECT 
        student_id,
        DATE_TRUNC('month', MIN(enrollment_date)) as cohort_month,
        MIN(enrollment_date) as first_enrollment
    FROM enrollments
    GROUP BY student_id
),
cohort_activity AS (
    SELECT 
        ec.cohort_month,
        DATE_TRUNC('month', e.enrollment_date) as activity_month,
        COUNT(DISTINCT e.student_id) as active_students,
        -- Months since first enrollment
        EXTRACT(EPOCH FROM (DATE_TRUNC('month', e.enrollment_date) - ec.cohort_month)) / (30.44 * 24 * 3600) as months_since_cohort
    FROM enrollment_cohorts ec
    JOIN enrollments e ON ec.student_id = e.student_id
    GROUP BY ec.cohort_month, DATE_TRUNC('month', e.enrollment_date)
),
cohort_sizes AS (
    SELECT 
        cohort_month,
        COUNT(*) as cohort_size
    FROM enrollment_cohorts
    GROUP BY cohort_month
)
SELECT 
    ca.cohort_month,
    ca.months_since_cohort,
    ca.active_students,
    cs.cohort_size,
    ca.active_students * 100.0 / cs.cohort_size as retention_rate
FROM cohort_activity ca
JOIN cohort_sizes cs ON ca.cohort_month = cs.cohort_month
WHERE ca.months_since_cohort <= 24  -- Track for 2 years
ORDER BY ca.cohort_month, ca.months_since_cohort;
\`\`\`

### 2. Growth Rate Analysis
\`\`\`sql
-- Multiple types of growth calculations
WITH quarterly_data AS (
    SELECT 
        DATE_TRUNC('quarter', enrollment_date) as quarter,
        COUNT(*) as enrollments
    FROM enrollments
    WHERE enrollment_date >= '2020-01-01'
    GROUP BY DATE_TRUNC('quarter', enrollment_date)
)
SELECT 
    quarter,
    enrollments,
    
    -- Period-over-period growth
    LAG(enrollments) OVER (ORDER BY quarter) as prev_quarter,
    (enrollments - LAG(enrollments) OVER (ORDER BY quarter)) as absolute_change,
    (enrollments * 1.0 / LAG(enrollments) OVER (ORDER BY quarter) - 1) * 100 as growth_rate_pct,
    
    -- Year-over-year growth
    LAG(enrollments, 4) OVER (ORDER BY quarter) as same_quarter_prev_year,
    (enrollments * 1.0 / LAG(enrollments, 4) OVER (ORDER BY quarter) - 1) * 100 as yoy_growth_pct,
    
    -- Compound Annual Growth Rate (CAGR) from baseline
    POWER(enrollments * 1.0 / FIRST_VALUE(enrollments) OVER (ORDER BY quarter), 
          4.0 / ROW_NUMBER() OVER (ORDER BY quarter)) - 1 as cagr_from_baseline,
    
    -- Rolling average growth rate
    AVG((enrollments * 1.0 / LAG(enrollments) OVER (ORDER BY quarter) - 1) * 100) 
    OVER (ORDER BY quarter ROWS BETWEEN 3 PRECEDING AND CURRENT ROW) as rolling_4q_avg_growth
FROM quarterly_data
ORDER BY quarter;
\`\`\`

### 3. Anomaly Detection
\`\`\`sql
-- Detect unusual enrollment patterns
WITH daily_stats AS (
    SELECT 
        DATE(enrollment_date) as date,
        COUNT(*) as daily_enrollments,
        -- 30-day rolling statistics
        AVG(COUNT(*)) OVER (ORDER BY DATE(enrollment_date) ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) as rolling_mean,
        STDDEV(COUNT(*)) OVER (ORDER BY DATE(enrollment_date) ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) as rolling_stddev
    FROM enrollments
    WHERE enrollment_date >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY DATE(enrollment_date)
)
SELECT 
    date,
    daily_enrollments,
    rolling_mean,
    rolling_stddev,
    
    -- Z-score (how many standard deviations from normal?)
    (daily_enrollments - rolling_mean) / NULLIF(rolling_stddev, 0) as z_score,
    
    -- Anomaly classification
    CASE 
        WHEN ABS((daily_enrollments - rolling_mean) / NULLIF(rolling_stddev, 0)) > 2.5 THEN 'Extreme Anomaly'
        WHEN ABS((daily_enrollments - rolling_mean) / NULLIF(rolling_stddev, 0)) > 2.0 THEN 'Moderate Anomaly'
        WHEN ABS((daily_enrollments - rolling_mean) / NULLIF(rolling_stddev, 0)) > 1.5 THEN 'Mild Anomaly'
        ELSE 'Normal'
    END as anomaly_level
FROM daily_stats
WHERE ABS((daily_enrollments - rolling_mean) / NULLIF(rolling_stddev, 0)) > 1.5
ORDER BY date DESC;
\`\`\`

## 📊 Forecasting Techniques

### Simple Linear Projection
\`\`\`sql
-- Project enrollment trend into the future
WITH historical_trend AS (
    SELECT 
        DATE_TRUNC('month', enrollment_date) as month,
        COUNT(*) as enrollments,
        ROW_NUMBER() OVER (ORDER BY DATE_TRUNC('month', enrollment_date)) as time_period
    FROM enrollments
    WHERE enrollment_date >= '2020-01-01'
    GROUP BY DATE_TRUNC('month', enrollment_date)
),
trend_calculation AS (
    SELECT 
        -- Calculate linear trend parameters
        AVG(enrollments) as intercept,
        (SUM(time_period * enrollments) - COUNT(*) * AVG(time_period) * AVG(enrollments)) /
        (SUM(time_period * time_period) - COUNT(*) * AVG(time_period) * AVG(time_period)) as slope,
        MAX(time_period) as last_period
    FROM historical_trend
),
future_periods AS (
    SELECT 
        generate_series(1, 12) as future_period  -- Next 12 months
)
SELECT 
    (SELECT DATE_TRUNC('month', MAX(enrollment_date)) FROM enrollments) + 
    (fp.future_period || ' months')::INTERVAL as forecast_month,
    fp.future_period,
    ROUND(tc.intercept + tc.slope * (tc.last_period + fp.future_period)) as projected_enrollments,
    'Projection' as data_type
FROM future_periods fp
CROSS JOIN trend_calculation tc

UNION ALL

-- Include historical data for comparison
SELECT 
    month as forecast_month,
    time_period as future_period,
    enrollments as projected_enrollments,
    'Historical' as data_type
FROM historical_trend
ORDER BY forecast_month;
\`\`\`

## 🚨 Time Series Analysis Pitfalls

### ❌ Mistake 1: Ignoring Seasonality in Predictions
\`\`\`sql
-- BAD: Simple trend without seasonal adjustment
SELECT 
    month,
    AVG(enrollments) + (ROW_NUMBER() OVER (ORDER BY month) * 10) as naive_forecast
FROM monthly_enrollments;

-- BETTER: Include seasonal patterns
WITH seasonal_factors AS (
    SELECT 
        EXTRACT(MONTH FROM month) as month_num,
        AVG(enrollments / yearly_avg) as seasonal_factor
    FROM (
        SELECT 
            month,
            enrollments,
            AVG(enrollments) OVER (PARTITION BY EXTRACT(YEAR FROM month)) as yearly_avg
        FROM monthly_enrollments
    ) seasonal_data
    GROUP BY EXTRACT(MONTH FROM month)
)
SELECT 
    future_month,
    base_forecast * seasonal_factor as seasonally_adjusted_forecast
FROM future_forecasts f
JOIN seasonal_factors s ON EXTRACT(MONTH FROM f.future_month) = s.month_num;
\`\`\`

### ❌ Mistake 2: Not Accounting for External Events
\`\`\`sql
-- Consider external factors affecting enrollments
WITH enrollment_events AS (
    SELECT 
        '2020-03-01'::DATE as event_date,
        'COVID-19 Pandemic Start' as event_name,
        -0.15 as impact_factor
    UNION ALL
    SELECT 
        '2021-09-01'::DATE,
        'Return to Campus',
        0.10
)
-- Adjust forecasts for known future events
SELECT 
    forecast_month,
    base_forecast,
    COALESCE(ee.impact_factor, 0) as event_impact,
    base_forecast * (1 + COALESCE(ee.impact_factor, 0)) as adjusted_forecast
FROM forecasts f
LEFT JOIN enrollment_events ee ON f.forecast_month = ee.event_date;
\`\`\`

## 🎨 Real-World Applications

### 1. Capacity Planning Dashboard
\`\`\`sql
-- Predict course capacity needs
WITH enrollment_forecast AS (
    -- Include your forecasting logic here
    SELECT 
        department,
        forecast_month,
        predicted_enrollments
    FROM department_forecasts
),
capacity_analysis AS (
    SELECT 
        ef.department,
        ef.forecast_month,
        ef.predicted_enrollments,
        c.current_total_capacity,
        ef.predicted_enrollments - c.current_total_capacity as capacity_gap,
        CASE 
            WHEN ef.predicted_enrollments > c.current_total_capacity * 1.1 THEN 'Add Sections'
            WHEN ef.predicted_enrollments < c.current_total_capacity * 0.8 THEN 'Reduce Sections'
            ELSE 'Maintain Current'
        END as recommendation
    FROM enrollment_forecast ef
    JOIN (
        SELECT department, SUM(max_enrollment) as current_total_capacity
        FROM courses 
        GROUP BY department
    ) c ON ef.department = c.department
)
SELECT * FROM capacity_analysis
WHERE capacity_gap != 0
ORDER BY ABS(capacity_gap) DESC;
\`\`\`

### 2. Revenue Trend Analysis
\`\`\`sql
-- Track tuition revenue trends
SELECT 
    DATE_TRUNC('semester', enrollment_date) as semester,
    SUM(tuition_amount) as total_revenue,
    LAG(SUM(tuition_amount)) OVER (ORDER BY DATE_TRUNC('semester', enrollment_date)) as prev_semester_revenue,
    (SUM(tuition_amount) - LAG(SUM(tuition_amount)) OVER (ORDER BY DATE_TRUNC('semester', enrollment_date))) / 
    LAG(SUM(tuition_amount)) OVER (ORDER BY DATE_TRUNC('semester', enrollment_date)) * 100 as revenue_growth_pct,
    
    -- 4-semester moving average
    AVG(SUM(tuition_amount)) OVER (
        ORDER BY DATE_TRUNC('semester', enrollment_date) 
        ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
    ) as ma_4_semester
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
WHERE enrollment_date >= '2020-01-01'
GROUP BY DATE_TRUNC('semester', enrollment_date)
ORDER BY semester;
\`\`\`

## 🎉 Key Takeaways

1. **Decompose time series** into trend, seasonal, and noise components
2. **Use moving averages** to smooth out noise and reveal underlying patterns
3. **Account for seasonality** in all forecasts and comparisons
4. **Detect anomalies systematically** using statistical methods
5. **Consider external factors** that might affect your data patterns  
6. **Validate forecasts** against holdout data before trusting them
7. **Update models regularly** as new data becomes available

Time series analysis transforms historical data into future insights. You're not just looking at what happened - you're predicting what will happen and planning accordingly!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📈 Calculate the 3-month moving average of monthly enrollments and identify months where actual enrollments were more than 20% different from the moving average.",
        expectedQuery:
          "WITH monthly_enrollments AS (SELECT DATE_TRUNC('month', enrollment_date) as month, COUNT(*) as enrollments FROM enrollments GROUP BY DATE_TRUNC('month', enrollment_date)), moving_avg AS (SELECT month, enrollments, AVG(enrollments) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as ma_3_month FROM monthly_enrollments) SELECT month, enrollments, ma_3_month, (enrollments - ma_3_month) / ma_3_month * 100 as deviation_pct FROM moving_avg WHERE ABS((enrollments - ma_3_month) / ma_3_month) > 0.20",
        hint: "Use DATE_TRUNC to group by month, calculate 3-month moving average with window function, then filter for >20% deviation",
        solution:
          "WITH monthly_enrollments AS (SELECT DATE_TRUNC('month', enrollment_date) as month, COUNT(*) as enrollments FROM enrollments GROUP BY DATE_TRUNC('month', enrollment_date) ORDER BY month), moving_avg AS (SELECT month, enrollments, AVG(enrollments) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as ma_3_month FROM monthly_enrollments) SELECT month, enrollments, ROUND(ma_3_month, 1) as ma_3_month, ROUND((enrollments - ma_3_month) / ma_3_month * 100, 1) as deviation_pct FROM moving_avg WHERE ABS((enrollments - ma_3_month) / ma_3_month) > 0.20 ORDER BY month;",
      },
      {
        id: "ex2",
        question:
          "📅 Calculate year-over-year enrollment growth by semester for each department, showing the percentage change from the same semester in the previous year.",
        expectedQuery:
          "WITH semester_enrollments AS (SELECT c.department, DATE_TRUNC('semester', e.enrollment_date) as semester, COUNT(*) as enrollments FROM enrollments e JOIN courses c ON e.course_id = c.course_id GROUP BY c.department, DATE_TRUNC('semester', e.enrollment_date)) SELECT department, semester, enrollments, LAG(enrollments, 2) OVER (PARTITION BY department ORDER BY semester) as same_semester_prev_year, (enrollments - LAG(enrollments, 2) OVER (PARTITION BY department ORDER BY semester)) / LAG(enrollments, 2) OVER (PARTITION BY department ORDER BY semester) * 100 as yoy_growth_pct FROM semester_enrollments",
        hint: "Group by department and semester, use LAG with partition by department and offset 2 for same semester previous year",
        solution:
          "WITH semester_enrollments AS (SELECT c.department, EXTRACT(YEAR FROM e.enrollment_date) as year, CASE WHEN EXTRACT(MONTH FROM e.enrollment_date) BETWEEN 1 AND 6 THEN 'Spring' ELSE 'Fall' END as semester, COUNT(*) as enrollments FROM enrollments e JOIN courses c ON e.course_id = c.course_id GROUP BY c.department, EXTRACT(YEAR FROM e.enrollment_date), CASE WHEN EXTRACT(MONTH FROM e.enrollment_date) BETWEEN 1 AND 6 THEN 'Spring' ELSE 'Fall' END) SELECT department, year, semester, enrollments, LAG(enrollments) OVER (PARTITION BY department, semester ORDER BY year) as prev_year_enrollments, ROUND((enrollments - LAG(enrollments) OVER (PARTITION BY department, semester ORDER BY year)) * 100.0 / LAG(enrollments) OVER (PARTITION BY department, semester ORDER BY year), 1) as yoy_growth_pct FROM semester_enrollments ORDER BY department, year, semester;",
      },
      {
        id: "ex3",
        question:
          "🎯 Find seasonal patterns by calculating each month's enrollment as a percentage of the annual total for each year, then average these percentages across years to identify peak enrollment months.",
        expectedQuery:
          "WITH monthly_totals AS (SELECT EXTRACT(YEAR FROM enrollment_date) as year, EXTRACT(MONTH FROM enrollment_date) as month, COUNT(*) as monthly_enrollments FROM enrollments GROUP BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)), yearly_totals AS (SELECT year, SUM(monthly_enrollments) as yearly_total FROM monthly_totals GROUP BY year) SELECT mt.month, AVG(mt.monthly_enrollments * 100.0 / yt.yearly_total) as avg_monthly_pct FROM monthly_totals mt JOIN yearly_totals yt ON mt.year = yt.year GROUP BY mt.month ORDER BY avg_monthly_pct DESC",
        hint: "Calculate monthly enrollments as percentage of yearly total for each year, then average these percentages across all years",
        solution:
          "WITH monthly_totals AS (SELECT EXTRACT(YEAR FROM enrollment_date) as year, EXTRACT(MONTH FROM enrollment_date) as month, COUNT(*) as monthly_enrollments FROM enrollments GROUP BY EXTRACT(YEAR FROM enrollment_date), EXTRACT(MONTH FROM enrollment_date)), yearly_totals AS (SELECT year, SUM(monthly_enrollments) as yearly_total FROM monthly_totals GROUP BY year) SELECT mt.month, TO_CHAR(TO_DATE(mt.month::text, 'MM'), 'Month') as month_name, ROUND(AVG(mt.monthly_enrollments * 100.0 / yt.yearly_total), 2) as avg_monthly_pct, COUNT(*) as years_of_data FROM monthly_totals mt JOIN yearly_totals yt ON mt.year = yt.year GROUP BY mt.month ORDER BY avg_monthly_pct DESC;",
      },
    ],
  },
  {
    id: "data-mining-sql",
    title: "Data Mining with SQL - Pattern Discovery",
    description:
      "Discover hidden patterns, associations, and insights in your data using advanced SQL techniques for market basket analysis, clustering, and pattern recognition",
    difficulty: "Advanced",
    category: "Data Analysis",
    estimatedTime: 55,
    content: `
# Data Mining with SQL - Pattern Discovery

## 📖 Story Time: The Academic Pattern Detective

As CSU's Head of Student Success, you're on a mission to uncover hidden patterns that could revolutionize student outcomes:
- "Which course combinations lead to the highest graduation rates?"
- "Are there hidden student clusters with different success patterns?"
- "What early warning signs predict student struggles?"
- "Which electives correlate with career success in different majors?"

Traditional reports show you what happened, but data mining reveals WHY it happened and predicts what WILL happen. You're about to transform from a data reporter into a pattern detective!

## 🎯 Association Rule Mining (Market Basket Analysis)

### Finding Course Co-enrollment Patterns
\`\`\`sql
-- Discover which courses students often take together
WITH course_pairs AS (
    SELECT 
        e1.student_id,
        e1.course_id as course_a,
        e2.course_id as course_b,
        e1.semester
    FROM enrollments e1
    JOIN enrollments e2 ON e1.student_id = e2.student_id 
        AND e1.semester = e2.semester
        AND e1.course_id < e2.course_id  -- Avoid duplicates and self-pairs
),
association_metrics AS (
    SELECT 
        c1.course_name as course_a_name,
        c2.course_name as course_b_name,
        COUNT(*) as together_count,
        
        -- Support: How often do A and B appear together?
        COUNT(*) * 100.0 / (SELECT COUNT(DISTINCT student_id) FROM enrollments) as support_pct,
        
        -- Individual course enrollments
        (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = cp.course_a) as course_a_count,
        (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = cp.course_b) as course_b_count
    FROM course_pairs cp
    JOIN courses c1 ON cp.course_a = c1.course_id
    JOIN courses c2 ON cp.course_b = c2.course_id
    GROUP BY cp.course_a, cp.course_b, c1.course_name, c2.course_name
    HAVING COUNT(*) >= 10  -- Minimum support threshold
)
SELECT 
    course_a_name,
    course_b_name,
    together_count,
    support_pct,
    
    -- Confidence: If student takes A, what's probability they take B?
    together_count * 100.0 / course_a_count as confidence_a_to_b,
    together_count * 100.0 / course_b_count as confidence_b_to_a,
    
    -- Lift: How much more likely is B given A vs. B alone?
    (together_count * 1.0 * (SELECT COUNT(DISTINCT student_id) FROM enrollments)) / 
    (course_a_count * course_b_count) as lift,
    
    -- Interpretation
    CASE 
        WHEN (together_count * 1.0 * (SELECT COUNT(DISTINCT student_id) FROM enrollments)) / 
             (course_a_count * course_b_count) > 1.5 THEN 'Strong Association'
        WHEN (together_count * 1.0 * (SELECT COUNT(DISTINCT student_id) FROM enrollments)) / 
             (course_a_count * course_b_count) > 1.2 THEN 'Moderate Association'  
        ELSE 'Weak Association'
    END as association_strength
FROM association_metrics
WHERE support_pct >= 1  -- At least 1% support
ORDER BY lift DESC, support_pct DESC;
\`\`\`

### Success Pattern Mining
\`\`\`sql
-- Find course sequences that predict graduation success
WITH graduation_outcomes AS (
    SELECT 
        s.student_id,
        s.major,
        CASE WHEN s.graduation_date IS NOT NULL THEN 1 ELSE 0 END as graduated,
        ARRAY_AGG(DISTINCT e.course_id ORDER BY e.enrollment_date) as course_sequence
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    WHERE s.expected_graduation <= CURRENT_DATE  -- Only students who should have graduated
    GROUP BY s.student_id, s.major, s.graduation_date
),
course_impact AS (
    SELECT 
        c.course_name,
        c.department,
        COUNT(CASE WHEN go.graduated = 1 THEN 1 END) as graduates_took_course,
        COUNT(CASE WHEN go.graduated = 0 THEN 1 END) as non_graduates_took_course,
        COUNT(*) as total_took_course,
        
        -- Graduation rate for students who took this course
        COUNT(CASE WHEN go.graduated = 1 THEN 1 END) * 100.0 / COUNT(*) as course_grad_rate,
        
        -- Overall graduation rate
        (SELECT AVG(graduated) * 100 FROM graduation_outcomes) as overall_grad_rate
    FROM graduation_outcomes go
    JOIN UNNEST(go.course_sequence) cs ON true
    JOIN courses c ON cs = c.course_id
    GROUP BY c.course_id, c.course_name, c.department
    HAVING COUNT(*) >= 20  -- Minimum sample size
)
SELECT 
    course_name,
    department,
    total_took_course,
    course_grad_rate,
    overall_grad_rate,
    course_grad_rate - overall_grad_rate as grad_rate_lift,
    
    -- Statistical significance approximation
    CASE 
        WHEN ABS(course_grad_rate - overall_grad_rate) > 10 AND total_took_course >= 50 THEN 'Significant Impact'
        WHEN ABS(course_grad_rate - overall_grad_rate) > 5 THEN 'Moderate Impact'
        ELSE 'No Clear Impact'
    END as impact_level
FROM course_impact
WHERE ABS(course_grad_rate - overall_grad_rate) > 5
ORDER BY grad_rate_lift DESC;
\`\`\`

## 🚀 Clustering Analysis

### Student Performance Clustering
\`\`\`sql
-- Identify distinct student performance patterns
WITH student_metrics AS (
    SELECT 
        s.student_id,
        s.major,
        s.gpa,
        COUNT(e.course_id) as total_courses,
        AVG(c.credits) as avg_credits_per_course,
        COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-') THEN 1 END) * 100.0 / COUNT(e.grade) as a_grade_pct,
        COUNT(CASE WHEN e.grade IN ('D+', 'D', 'F') THEN 1 END) * 100.0 / COUNT(e.grade) as poor_grade_pct,
        STDDEV(CASE e.grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END) as grade_consistency
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.grade IS NOT NULL
    GROUP BY s.student_id, s.major, s.gpa
    HAVING COUNT(e.course_id) >= 5
),
performance_clusters AS (
    SELECT 
        student_id,
        major,
        gpa,
        total_courses,
        a_grade_pct,
        poor_grade_pct,
        grade_consistency,
        
        -- Simple clustering based on performance patterns
        CASE 
            WHEN gpa >= 3.7 AND a_grade_pct >= 70 AND poor_grade_pct <= 5 THEN 'High Achiever'
            WHEN gpa >= 3.2 AND grade_consistency <= 0.8 THEN 'Steady Performer'
            WHEN poor_grade_pct >= 20 OR grade_consistency >= 1.2 THEN 'Struggling Student'
            WHEN gpa >= 3.0 AND a_grade_pct >= 30 THEN 'Inconsistent Performer'
            ELSE 'Average Student'
        END as performance_cluster
    FROM student_metrics
)
SELECT 
    performance_cluster,
    COUNT(*) as student_count,
    ROUND(AVG(gpa), 2) as avg_gpa,
    ROUND(AVG(a_grade_pct), 1) as avg_a_grade_pct,
    ROUND(AVG(poor_grade_pct), 1) as avg_poor_grade_pct,
    ROUND(AVG(grade_consistency), 2) as avg_consistency,
    
    -- Cluster characteristics
    STRING_AGG(DISTINCT major, ', ') as common_majors
FROM performance_clusters
GROUP BY performance_cluster
ORDER BY avg_gpa DESC;
\`\`\`

### Course Difficulty Clustering  
\`\`\`sql
-- Group courses by difficulty patterns
WITH course_stats AS (
    SELECT 
        c.course_id,
        c.course_name,
        c.department,
        c.course_level,
        COUNT(e.grade) as total_grades,
        AVG(CASE e.grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END) as avg_grade_points,
        STDDEV(CASE e.grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END) as grade_spread,
        COUNT(CASE WHEN e.grade IN ('D+', 'D', 'F') THEN 1 END) * 100.0 / COUNT(e.grade) as failure_rate
    FROM courses c
    JOIN enrollments e ON c.course_id = e.course_id
    WHERE e.grade IS NOT NULL
    GROUP BY c.course_id, c.course_name, c.department, c.course_level
    HAVING COUNT(e.grade) >= 15
)
SELECT 
    course_name,
    department,
    course_level,
    total_grades,
    ROUND(avg_grade_points, 2) as avg_grade_points,
    ROUND(grade_spread, 2) as grade_spread,
    ROUND(failure_rate, 1) as failure_rate,
    
    -- Difficulty clustering
    CASE 
        WHEN avg_grade_points >= 3.5 AND failure_rate <= 5 THEN 'Easy'
        WHEN avg_grade_points >= 3.0 AND failure_rate <= 15 THEN 'Moderate'
        WHEN failure_rate >= 25 OR avg_grade_points <= 2.5 THEN 'Very Difficult'
        WHEN failure_rate >= 15 OR avg_grade_points <= 2.8 THEN 'Difficult'
        ELSE 'Standard'
    END as difficulty_cluster,
    
    -- Variability assessment  
    CASE 
        WHEN grade_spread <= 0.8 THEN 'Consistent Grading'
        WHEN grade_spread >= 1.3 THEN 'High Variability'
        ELSE 'Moderate Variability'
    END as grading_pattern
FROM course_stats
ORDER BY failure_rate DESC, avg_grade_points ASC;
\`\`\`

## 🔬 Predictive Pattern Mining

### Early Warning System
\`\`\`sql
-- Predict students at risk of dropping out
WITH early_indicators AS (
    SELECT 
        s.student_id,
        s.major,
        s.enrollment_date,
        
        -- First semester performance
        AVG(CASE 
            WHEN e.semester = s.first_semester AND e.grade IS NOT NULL THEN
                CASE e.grade
                    WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
                    WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
                    WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
                    WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
                END
        END) as first_semester_gpa,
        
        -- Course load patterns
        COUNT(CASE WHEN e.semester = s.first_semester THEN 1 END) as first_semester_courses,
        
        -- Attendance indicators (proxy)
        COUNT(CASE WHEN e.grade = 'W' AND e.semester = s.first_semester THEN 1 END) as first_semester_withdrawals,
        
        -- Major change indicator
        CASE WHEN s.major != s.original_major THEN 1 ELSE 0 END as changed_major,
        
        -- Current status
        CASE WHEN s.status = 'Withdrawn' OR s.status = 'Dropped' THEN 1 ELSE 0 END as dropped_out
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    WHERE s.enrollment_date <= CURRENT_DATE - INTERVAL '1 year'  -- Only students with enough history
    GROUP BY s.student_id, s.major, s.enrollment_date, s.first_semester, s.original_major, s.status
),
risk_patterns AS (
    SELECT 
        *,
        -- Risk scoring
        CASE 
            WHEN first_semester_gpa <= 2.0 THEN 3
            WHEN first_semester_gpa <= 2.5 THEN 2
            WHEN first_semester_gpa <= 3.0 THEN 1
            ELSE 0
        END +
        CASE 
            WHEN first_semester_courses <= 2 THEN 2
            WHEN first_semester_courses >= 6 THEN 1
            ELSE 0
        END +
        CASE WHEN first_semester_withdrawals >= 1 THEN 2 ELSE 0 END +
        CASE WHEN changed_major = 1 THEN 1 ELSE 0 END as risk_score
    FROM early_indicators
)
SELECT 
    CASE 
        WHEN risk_score >= 6 THEN 'Very High Risk'
        WHEN risk_score >= 4 THEN 'High Risk'
        WHEN risk_score >= 2 THEN 'Medium Risk'
        ELSE 'Low Risk'
    END as risk_category,
    COUNT(*) as student_count,
    COUNT(CASE WHEN dropped_out = 1 THEN 1 END) as actual_dropouts,
    COUNT(CASE WHEN dropped_out = 1 THEN 1 END) * 100.0 / COUNT(*) as dropout_rate,
    
    -- Model accuracy metrics
    ROUND(AVG(first_semester_gpa), 2) as avg_first_gpa,
    ROUND(AVG(first_semester_courses), 1) as avg_course_load,
    ROUND(AVG(first_semester_withdrawals), 1) as avg_withdrawals
FROM risk_patterns
GROUP BY 
    CASE 
        WHEN risk_score >= 6 THEN 'Very High Risk'
        WHEN risk_score >= 4 THEN 'High Risk'
        WHEN risk_score >= 2 THEN 'Medium Risk'
        ELSE 'Low Risk'
    END
ORDER BY dropout_rate DESC;
\`\`\`

## 🎪 Advanced Pattern Recognition

### Sequence Mining - Academic Pathways
\`\`\`sql
-- Find successful course progression patterns
WITH course_sequences AS (
    SELECT 
        s.student_id,
        s.major,
        CASE WHEN s.graduation_date IS NOT NULL THEN 1 ELSE 0 END as graduated,
        STRING_AGG(
            c.course_code || '(' || e.grade || ')', 
            ' -> ' 
            ORDER BY e.enrollment_date
        ) as course_path,
        ARRAY_AGG(c.course_code ORDER BY e.enrollment_date) as course_array
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.grade IS NOT NULL AND e.grade != 'W'
    GROUP BY s.student_id, s.major, s.graduation_date
    HAVING COUNT(c.course_id) >= 8
),
successful_patterns AS (
    SELECT 
        major,
        course_array[1:3] as first_three_courses,  -- First 3 courses taken
        COUNT(*) as pattern_frequency,
        COUNT(CASE WHEN graduated = 1 THEN 1 END) as successful_outcomes,
        COUNT(CASE WHEN graduated = 1 THEN 1 END) * 100.0 / COUNT(*) as success_rate
    FROM course_sequences
    WHERE graduated = 1  -- Only look at successful patterns
    GROUP BY major, course_array[1:3]
    HAVING COUNT(*) >= 5
)
SELECT 
    major,
    first_three_courses,
    pattern_frequency,
    success_rate,
    CASE 
        WHEN success_rate >= 90 THEN 'Optimal Pathway'
        WHEN success_rate >= 80 THEN 'Strong Pathway'
        WHEN success_rate >= 70 THEN 'Good Pathway'
        ELSE 'Risky Pathway'
    END as pathway_quality
FROM successful_patterns
WHERE success_rate >= 70
ORDER BY major, success_rate DESC;
\`\`\`

## 🚨 Data Mining Pitfalls

### ❌ Mistake 1: Spurious Correlations
\`\`\`sql
-- BAD: Correlation without considering confounding variables
SELECT 
    'Ice cream sales vs pool drownings' as correlation_type,
    CORR(ice_cream_sales, drownings) as correlation,
    'Meaningless without considering temperature!' as reality;

-- GOOD: Control for confounding variables
WITH controlled_analysis AS (
    SELECT 
        month,
        temperature_range,
        study_hours,
        gpa,
        social_media_usage
    FROM student_data
)
SELECT 
    temperature_range,
    CORR(study_hours, gpa) as study_gpa_correlation,
    CORR(social_media_usage, gpa) as social_gpa_correlation
FROM controlled_analysis
GROUP BY temperature_range;
\`\`\`

### ❌ Mistake 2: Overfitting to Small Samples
\`\`\`sql
-- Always validate sample sizes and patterns
SELECT 
    pattern_name,
    sample_size,
    accuracy_rate,
    CASE 
        WHEN sample_size < 30 THEN 'Insufficient Data'
        WHEN sample_size < 100 THEN 'Preliminary Pattern'
        ELSE 'Reliable Pattern'
    END as confidence_level
FROM pattern_analysis
WHERE accuracy_rate > 0.8;
\`\`\`

## 🎨 Business Intelligence Applications

### 1. Course Recommendation Engine
\`\`\`sql
-- Recommend courses based on successful student patterns
WITH student_similarity AS (
    SELECT 
        s1.student_id as target_student,
        s2.student_id as similar_student,
        COUNT(*) as shared_courses,
        -- Similarity score based on shared courses and grades
        SUM(CASE WHEN e1.grade = e2.grade THEN 2 ELSE 1 END) as similarity_score
    FROM students s1
    JOIN enrollments e1 ON s1.student_id = e1.student_id
    JOIN enrollments e2 ON e1.course_id = e2.course_id AND e1.grade IS NOT NULL
    JOIN students s2 ON e2.student_id = s2.student_id
    WHERE s1.student_id != s2.student_id 
    AND s1.major = s2.major
    AND s2.gpa >= s1.gpa - 0.5  -- Similar or better performance
    GROUP BY s1.student_id, s2.student_id
    HAVING COUNT(*) >= 3  -- At least 3 shared courses
),
recommendations AS (
    SELECT 
        ss.target_student,
        c.course_name,
        COUNT(*) as recommended_by_count,
        AVG(e.grade_points) as avg_grade_in_course,
        ROW_NUMBER() OVER (PARTITION BY ss.target_student ORDER BY COUNT(*) DESC) as recommendation_rank
    FROM student_similarity ss
    JOIN enrollments e ON ss.similar_student = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.course_id NOT IN (
        -- Exclude courses already taken by target student
        SELECT course_id FROM enrollments WHERE student_id = ss.target_student
    )
    GROUP BY ss.target_student, c.course_id, c.course_name
)
SELECT 
    target_student,
    course_name,
    recommended_by_count,
    ROUND(avg_grade_in_course, 2) as expected_performance,
    recommendation_rank
FROM recommendations
WHERE recommendation_rank <= 5  -- Top 5 recommendations per student
ORDER BY target_student, recommendation_rank;
\`\`\`

## 🎉 Key Takeaways

1. **Association rules reveal relationships** - find what goes together naturally
2. **Clustering identifies patterns** - group similar entities for targeted strategies
3. **Sequential analysis shows pathways** - understand successful progressions
4. **Predictive modeling prevents problems** - identify risks before they materialize
5. **Validate with sufficient sample sizes** - avoid overfitting to noise
6. **Control for confounding variables** - correlation doesn't equal causation
7. **Regularly update models** - patterns change over time

Data mining transforms your database from a record keeper into a pattern detective and future predictor. You're not just analyzing what happened - you're discovering why it happened and what will happen next!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🔍 Find course pairs with strong association (lift > 1.5) by analyzing which courses students frequently take together in the same semester. Show support, confidence, and lift metrics.",
        expectedQuery:
          "WITH course_pairs AS (SELECT e1.course_id as course_a, e2.course_id as course_b, COUNT(*) as together_count FROM enrollments e1 JOIN enrollments e2 ON e1.student_id = e2.student_id AND e1.semester = e2.semester AND e1.course_id < e2.course_id GROUP BY e1.course_id, e2.course_id), metrics AS (SELECT course_a, course_b, together_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = course_a) as a_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = course_b) as b_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments) as total_students FROM course_pairs) SELECT c1.course_name as course_a_name, c2.course_name as course_b_name, together_count, together_count * 100.0 / total_students as support_pct, together_count * 100.0 / a_count as confidence, (together_count * total_students * 1.0) / (a_count * b_count) as lift FROM metrics m JOIN courses c1 ON m.course_a = c1.course_id JOIN courses c2 ON m.course_b = c2.course_id WHERE (together_count * total_students * 1.0) / (a_count * b_count) > 1.5",
        hint: "Find course pairs taken in same semester, calculate support (frequency), confidence (conditional probability), and lift (association strength)",
        solution:
          "WITH course_pairs AS (SELECT e1.course_id as course_a, e2.course_id as course_b, COUNT(DISTINCT e1.student_id) as together_count FROM enrollments e1 JOIN enrollments e2 ON e1.student_id = e2.student_id AND e1.semester = e2.semester AND e1.course_id < e2.course_id GROUP BY e1.course_id, e2.course_id HAVING COUNT(DISTINCT e1.student_id) >= 5), course_stats AS (SELECT course_a, course_b, together_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = course_a) as course_a_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments WHERE course_id = course_b) as course_b_count, (SELECT COUNT(DISTINCT student_id) FROM enrollments) as total_students FROM course_pairs) SELECT c1.course_name as course_a, c2.course_name as course_b, together_count, ROUND(together_count * 100.0 / total_students, 2) as support_pct, ROUND(together_count * 100.0 / course_a_count, 1) as confidence_pct, ROUND((together_count * total_students * 1.0) / (course_a_count * course_b_count), 2) as lift FROM course_stats cs JOIN courses c1 ON cs.course_a = c1.course_id JOIN courses c2 ON cs.course_b = c2.course_id WHERE (together_count * total_students * 1.0) / (course_a_count * course_b_count) > 1.5 ORDER BY lift DESC;",
      },
      {
        id: "ex2",
        question:
          "📊 Create student performance clusters based on GPA, grade consistency (standard deviation), and percentage of A grades. Identify distinct performance patterns.",
        expectedQuery:
          "WITH student_metrics AS (SELECT s.student_id, s.major, s.gpa, COUNT(e.course_id) as total_courses, STDDEV(CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END) as grade_consistency, COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-') THEN 1 END) * 100.0 / COUNT(e.grade) as a_grade_pct FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.grade IS NOT NULL GROUP BY s.student_id, s.major, s.gpa HAVING COUNT(e.course_id) >= 5) SELECT CASE WHEN gpa >= 3.7 AND a_grade_pct >= 70 THEN 'High Achiever' WHEN gpa >= 3.2 AND grade_consistency <= 0.8 THEN 'Consistent Performer' WHEN grade_consistency >= 1.2 OR a_grade_pct <= 15 THEN 'Struggling Student' WHEN gpa >= 3.0 THEN 'Average Student' ELSE 'At Risk' END as performance_cluster, COUNT(*) as student_count, AVG(gpa) as avg_gpa, AVG(grade_consistency) as avg_consistency, AVG(a_grade_pct) as avg_a_pct FROM student_metrics GROUP BY performance_cluster",
        hint: "Calculate grade consistency using STDDEV, A-grade percentage, then use CASE to create clusters based on these metrics",
        solution:
          "WITH student_metrics AS (SELECT s.student_id, s.major, s.gpa, COUNT(e.course_id) as total_courses, COALESCE(STDDEV(CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END), 0) as grade_consistency, COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-') THEN 1 END) * 100.0 / NULLIF(COUNT(e.grade), 0) as a_grade_pct FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.grade IS NOT NULL GROUP BY s.student_id, s.major, s.gpa HAVING COUNT(e.course_id) >= 5), clusters AS (SELECT *, CASE WHEN gpa >= 3.7 AND a_grade_pct >= 70 THEN 'High Achiever' WHEN gpa >= 3.2 AND grade_consistency <= 0.8 THEN 'Consistent Performer' WHEN grade_consistency >= 1.2 THEN 'Inconsistent Student' WHEN a_grade_pct <= 15 THEN 'Struggling Student' WHEN gpa >= 3.0 THEN 'Average Student' ELSE 'At Risk' END as performance_cluster FROM student_metrics) SELECT performance_cluster, COUNT(*) as student_count, ROUND(AVG(gpa), 2) as avg_gpa, ROUND(AVG(grade_consistency), 2) as avg_consistency, ROUND(AVG(a_grade_pct), 1) as avg_a_grade_pct FROM clusters GROUP BY performance_cluster ORDER BY avg_gpa DESC;",
      },
      {
        id: "ex3",
        question:
          "⚠️ Build an early warning system by identifying patterns in first-semester performance that predict student dropout risk. Calculate risk scores based on GPA, course load, and withdrawals.",
        expectedQuery:
          "WITH first_semester_metrics AS (SELECT s.student_id, s.major, AVG(CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END) as first_gpa, COUNT(e.course_id) as course_load, COUNT(CASE WHEN e.grade = 'W' THEN 1 END) as withdrawals, CASE WHEN s.status IN ('Withdrawn', 'Dropped') THEN 1 ELSE 0 END as dropped_out FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.semester = s.first_semester GROUP BY s.student_id, s.major, s.status), risk_scoring AS (SELECT *, CASE WHEN first_gpa <= 2.0 THEN 3 WHEN first_gpa <= 2.5 THEN 2 WHEN first_gpa <= 3.0 THEN 1 ELSE 0 END + CASE WHEN course_load <= 2 THEN 2 WHEN course_load >= 6 THEN 1 ELSE 0 END + CASE WHEN withdrawals >= 1 THEN 2 ELSE 0 END as risk_score FROM first_semester_metrics) SELECT CASE WHEN risk_score >= 5 THEN 'Very High Risk' WHEN risk_score >= 3 THEN 'High Risk' WHEN risk_score >= 1 THEN 'Medium Risk' ELSE 'Low Risk' END as risk_category, COUNT(*) as total_students, COUNT(CASE WHEN dropped_out = 1 THEN 1 END) as actual_dropouts, ROUND(COUNT(CASE WHEN dropped_out = 1 THEN 1 END) * 100.0 / COUNT(*), 1) as dropout_rate FROM risk_scoring GROUP BY risk_category",
        hint: "Analyze first semester metrics (GPA, course load, withdrawals), create risk scoring system, validate against actual dropout outcomes",
        solution:
          "WITH first_semester_data AS (SELECT s.student_id, s.major, COALESCE(AVG(CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END), 0) as first_semester_gpa, COUNT(e.course_id) as course_load, COUNT(CASE WHEN e.grade = 'W' THEN 1 END) as withdrawals, CASE WHEN s.status IN ('Withdrawn', 'Dropped', 'Inactive') THEN 1 ELSE 0 END as dropped_out FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id AND e.semester = (SELECT MIN(semester) FROM enrollments WHERE student_id = s.student_id) WHERE s.enrollment_date <= CURRENT_DATE - INTERVAL '1 year' GROUP BY s.student_id, s.major, s.status), risk_analysis AS (SELECT *, (CASE WHEN first_semester_gpa <= 2.0 THEN 3 WHEN first_semester_gpa <= 2.5 THEN 2 WHEN first_semester_gpa <= 3.0 THEN 1 ELSE 0 END) + (CASE WHEN course_load <= 2 THEN 3 WHEN course_load >= 7 THEN 1 ELSE 0 END) + (CASE WHEN withdrawals >= 2 THEN 3 WHEN withdrawals = 1 THEN 1 ELSE 0 END) as risk_score FROM first_semester_data) SELECT CASE WHEN risk_score >= 6 THEN 'Very High Risk' WHEN risk_score >= 4 THEN 'High Risk' WHEN risk_score >= 2 THEN 'Medium Risk' ELSE 'Low Risk' END as risk_category, COUNT(*) as total_students, SUM(dropped_out) as actual_dropouts, ROUND(SUM(dropped_out) * 100.0 / COUNT(*), 1) as dropout_rate, ROUND(AVG(first_semester_gpa), 2) as avg_first_gpa, ROUND(AVG(course_load), 1) as avg_course_load FROM risk_analysis GROUP BY risk_category ORDER BY dropout_rate DESC;",
      },
    ],
  },
  {
    id: "reporting-dashboards",
    title: "SQL Reporting & Dashboard Design",
    description:
      "Master the art of creating dynamic reports and dashboard-ready queries for executive summaries, KPI tracking, and interactive data visualization",
    difficulty: "Advanced",
    category: "Data Analysis",
    estimatedTime: 50,
    content: `
# SQL Reporting & Dashboard Design

## 📖 Story Time: The Executive Decision Dashboard

The CSU President calls an emergency meeting: "I need a comprehensive dashboard showing our institutional health - student outcomes, financial performance, faculty productivity, and strategic KPIs. The Board of Trustees meets in two weeks!"

As the Chief Data Officer, you must transform raw database chaos into executive-ready insights:
- "What's our real graduation rate trend over 5 years?"
- "Which programs are financially sustainable vs. drain resources?" 
- "How do faculty research outputs correlate with student satisfaction?"
- "What early indicators predict enrollment fluctuations?"

Your mission: Build a SQL-powered reporting system that turns data into decisive action. Time to become a data storyteller!

## 🎯 Executive Summary Queries

### Key Performance Indicators (KPI) Dashboard
\`\`\`sql
-- Executive KPI Summary with year-over-year comparisons
WITH current_metrics AS (
    SELECT 
        EXTRACT(YEAR FROM CURRENT_DATE) as current_year,
        
        -- Enrollment Metrics
        COUNT(DISTINCT CASE WHEN s.status = 'Active' THEN s.student_id END) as active_students,
        COUNT(DISTINCT CASE WHEN s.enrollment_date >= DATE_TRUNC('year', CURRENT_DATE) THEN s.student_id END) as new_enrollments,
        
        -- Academic Performance
        AVG(CASE WHEN e.grade IS NOT NULL THEN 
            CASE e.grade
                WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
                WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
                WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
                WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
            END
        END) as institutional_gpa,
        
        -- Retention & Graduation
        COUNT(CASE WHEN s.graduation_date >= DATE_TRUNC('year', CURRENT_DATE) THEN 1 END) as graduates_ytd,
        
        -- Financial Health (Revenue per Student)
        SUM(t.amount) / NULLIF(COUNT(DISTINCT s.student_id), 0) as revenue_per_student,
        
        -- Faculty Productivity
        COUNT(DISTINCT f.faculty_id) as active_faculty,
        COUNT(DISTINCT c.course_id) / NULLIF(COUNT(DISTINCT f.faculty_id), 0) as courses_per_faculty
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id AND EXTRACT(YEAR FROM e.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    LEFT JOIN tuition_payments t ON s.student_id = t.student_id AND EXTRACT(YEAR FROM t.payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    LEFT JOIN courses c ON e.course_id = c.course_id
    LEFT JOIN faculty f ON c.instructor_id = f.faculty_id
),
previous_metrics AS (
    SELECT 
        EXTRACT(YEAR FROM CURRENT_DATE) - 1 as previous_year,
        
        COUNT(DISTINCT CASE WHEN s.status = 'Active' OR s.graduation_date IS NOT NULL THEN s.student_id END) as prev_active_students,
        COUNT(DISTINCT CASE WHEN EXTRACT(YEAR FROM s.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN s.student_id END) as prev_new_enrollments,
        
        AVG(CASE WHEN e.grade IS NOT NULL AND EXTRACT(YEAR FROM e.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN 
            CASE e.grade
                WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
                WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
                WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
                WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
            END
        END) as prev_institutional_gpa,
        
        COUNT(CASE WHEN EXTRACT(YEAR FROM s.graduation_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN 1 END) as prev_graduates,
        
        SUM(CASE WHEN EXTRACT(YEAR FROM t.payment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN t.amount END) / 
        NULLIF(COUNT(DISTINCT CASE WHEN EXTRACT(YEAR FROM s.enrollment_date) <= EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN s.student_id END), 0) as prev_revenue_per_student
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    LEFT JOIN tuition_payments t ON s.student_id = t.student_id
)
SELECT 
    'Student Enrollment' as metric_category,
    'Active Students' as metric_name,
    cm.active_students as current_value,
    pm.prev_active_students as previous_value,
    ROUND(((cm.active_students - pm.prev_active_students) * 100.0 / NULLIF(pm.prev_active_students, 0)), 1) as yoy_change_pct,
    CASE 
        WHEN cm.active_students > pm.prev_active_students THEN '📈 Growing'
        WHEN cm.active_students < pm.prev_active_students THEN '📉 Declining' 
        ELSE '➡️ Stable'
    END as trend
FROM current_metrics cm, previous_metrics pm

UNION ALL

SELECT 
    'Academic Performance',
    'Institutional GPA',
    ROUND(cm.institutional_gpa, 2),
    ROUND(pm.prev_institutional_gpa, 2),
    ROUND(((cm.institutional_gpa - pm.prev_institutional_gpa) * 100.0 / NULLIF(pm.prev_institutional_gpa, 0)), 1),
    CASE 
        WHEN cm.institutional_gpa > pm.prev_institutional_gpa THEN '📈 Improving'
        WHEN cm.institutional_gpa < pm.prev_institutional_gpa THEN '📉 Declining'
        ELSE '➡️ Stable'
    END
FROM current_metrics cm, previous_metrics pm

UNION ALL

SELECT 
    'Financial Health',
    'Revenue per Student ($)',
    ROUND(cm.revenue_per_student, 0),
    ROUND(pm.prev_revenue_per_student, 0),
    ROUND(((cm.revenue_per_student - pm.prev_revenue_per_student) * 100.0 / NULLIF(pm.prev_revenue_per_student, 0)), 1),
    CASE 
        WHEN cm.revenue_per_student > pm.prev_revenue_per_student THEN '📈 Growing'
        WHEN cm.revenue_per_student < pm.prev_revenue_per_student THEN '📉 Declining'
        ELSE '➡️ Stable'
    END
FROM current_metrics cm, previous_metrics pm

ORDER BY metric_category, metric_name;
\`\`\`

### Monthly Trend Analysis for Leadership
\`\`\`sql
-- Monthly performance trends for executive dashboards
WITH monthly_trends AS (
    SELECT 
        DATE_TRUNC('month', e.enrollment_date) as report_month,
        
        -- Enrollment metrics
        COUNT(DISTINCT s.student_id) as new_students,
        COUNT(DISTINCT e.course_id) as courses_offered,
        
        -- Performance metrics
        AVG(CASE WHEN e.grade IS NOT NULL THEN
            CASE e.grade
                WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
                WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
                WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
                WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
            END
        END) as avg_gpa,
        
        -- Retention indicators
        COUNT(CASE WHEN e.grade = 'W' THEN 1 END) * 100.0 / COUNT(e.enrollment_id) as withdrawal_rate,
        
        -- Financial metrics
        SUM(t.amount) as monthly_revenue,
        
        -- Faculty utilization
        COUNT(DISTINCT c.instructor_id) as active_faculty
    FROM enrollments e
    JOIN students s ON e.student_id = s.student_id
    LEFT JOIN tuition_payments t ON s.student_id = t.student_id 
        AND DATE_TRUNC('month', t.payment_date) = DATE_TRUNC('month', e.enrollment_date)
    LEFT JOIN courses c ON e.course_id = c.course_id
    WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '24 months'
    GROUP BY DATE_TRUNC('month', e.enrollment_date)
),
trend_analysis AS (
    SELECT 
        *,
        -- Moving averages for smoothed trends
        AVG(new_students) OVER (ORDER BY report_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as ma_3mo_students,
        AVG(avg_gpa) OVER (ORDER BY report_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as ma_3mo_gpa,
        AVG(monthly_revenue) OVER (ORDER BY report_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as ma_3mo_revenue,
        
        -- Month-over-month changes
        LAG(new_students, 1) OVER (ORDER BY report_month) as prev_month_students,
        LAG(monthly_revenue, 1) OVER (ORDER BY report_month) as prev_month_revenue
    FROM monthly_trends
)
SELECT 
    TO_CHAR(report_month, 'YYYY-MM') as month,
    new_students,
    ROUND(avg_gpa, 2) as gpa,
    ROUND(withdrawal_rate, 1) as withdrawal_pct,
    ROUND(monthly_revenue, 0) as revenue,
    active_faculty,
    
    -- Smoothed trends
    ROUND(ma_3mo_students, 0) as trend_students,
    ROUND(ma_3mo_gpa, 2) as trend_gpa,
    ROUND(ma_3mo_revenue, 0) as trend_revenue,
    
    -- Growth indicators
    CASE 
        WHEN prev_month_students IS NULL THEN null
        ELSE ROUND(((new_students - prev_month_students) * 100.0 / NULLIF(prev_month_students, 0)), 1)
    END as student_growth_pct,
    
    CASE 
        WHEN prev_month_revenue IS NULL THEN null
        ELSE ROUND(((monthly_revenue - prev_month_revenue) * 100.0 / NULLIF(prev_month_revenue, 0)), 1)
    END as revenue_growth_pct
FROM trend_analysis
WHERE report_month >= CURRENT_DATE - INTERVAL '12 months'
ORDER BY report_month DESC;
\`\`\`

## 📊 Department Performance Scorecards

### Comprehensive Department Analysis
\`\`\`sql
-- Department performance scorecard with rankings
WITH department_metrics AS (
    SELECT 
        c.department,
        
        -- Student metrics
        COUNT(DISTINCT e.student_id) as total_students,
        COUNT(DISTINCT c.course_id) as courses_offered,
        AVG(c.credits) as avg_course_credits,
        
        -- Academic performance
        AVG(CASE WHEN e.grade IS NOT NULL THEN
            CASE e.grade
                WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
                WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
                WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
                WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
            END
        END) as avg_gpa,
        
        -- Success rates
        COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C') THEN 1 END) * 100.0 / 
        COUNT(CASE WHEN e.grade IS NOT NULL THEN 1 END) as pass_rate,
        
        COUNT(CASE WHEN e.grade = 'W' THEN 1 END) * 100.0 / COUNT(e.enrollment_id) as withdrawal_rate,
        
        -- Faculty metrics
        COUNT(DISTINCT c.instructor_id) as faculty_count,
        COUNT(e.enrollment_id) / NULLIF(COUNT(DISTINCT c.instructor_id), 0) as enrollments_per_faculty,
        
        -- Financial contribution
        SUM(c.credits * 500) as estimated_credit_revenue, -- Assume $500 per credit hour
        
        -- Research output (proxy through graduate courses)
        COUNT(CASE WHEN c.course_level >= 500 THEN 1 END) as graduate_courses,
        
        -- Student satisfaction (proxy through retention)
        COUNT(CASE WHEN s.status = 'Active' THEN 1 END) * 100.0 / COUNT(DISTINCT e.student_id) as retention_rate
    FROM courses c
    LEFT JOIN enrollments e ON c.course_id = e.course_id
    LEFT JOIN students s ON e.student_id = s.student_id
    WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years'
    GROUP BY c.department
    HAVING COUNT(DISTINCT e.student_id) >= 10  -- Minimum viable departments
),
department_rankings AS (
    SELECT 
        *,
        -- Performance rankings (1 = best)
        ROW_NUMBER() OVER (ORDER BY avg_gpa DESC) as gpa_rank,
        ROW_NUMBER() OVER (ORDER BY pass_rate DESC) as pass_rate_rank,
        ROW_NUMBER() OVER (ORDER BY withdrawal_rate ASC) as retention_rank,
        ROW_NUMBER() OVER (ORDER BY estimated_credit_revenue DESC) as revenue_rank,
        ROW_NUMBER() OVER (ORDER BY enrollments_per_faculty DESC) as efficiency_rank,
        
        -- Composite score (lower is better)
        (ROW_NUMBER() OVER (ORDER BY avg_gpa DESC) +
         ROW_NUMBER() OVER (ORDER BY pass_rate DESC) +
         ROW_NUMBER() OVER (ORDER BY withdrawal_rate ASC) +
         ROW_NUMBER() OVER (ORDER BY estimated_credit_revenue DESC)) / 4.0 as composite_score
    FROM department_metrics
)
SELECT 
    department,
    total_students,
    courses_offered,
    faculty_count,
    ROUND(avg_gpa, 2) as avg_gpa,
    ROUND(pass_rate, 1) as pass_rate_pct,
    ROUND(withdrawal_rate, 1) as withdrawal_pct,
    ROUND(retention_rate, 1) as retention_pct,
    ROUND(enrollments_per_faculty, 0) as students_per_faculty,
    ROUND(estimated_credit_revenue, 0) as revenue_estimate,
    
    -- Performance indicators
    CASE 
        WHEN composite_score <= 2 THEN '🌟 Excellent'
        WHEN composite_score <= 4 THEN '✅ Good'
        WHEN composite_score <= 6 THEN '⚠️ Needs Improvement'
        ELSE '🚨 Critical Attention Needed'
    END as overall_performance,
    
    -- Specific rankings
    gpa_rank,
    pass_rate_rank,
    retention_rank,
    revenue_rank,
    efficiency_rank,
    
    ROUND(composite_score, 1) as composite_score
FROM department_rankings
ORDER BY composite_score ASC;
\`\`\`

## 🎯 Interactive Filtering & Drill-Down Reports

### Student Success Drill-Down Analysis
\`\`\`sql
-- Parameterized report for drilling down into student success factors
-- Parameters: @department, @time_period, @gpa_threshold
WITH filtered_students AS (
    SELECT 
        s.student_id,
        s.student_name,
        s.major,
        s.gpa,
        s.enrollment_date,
        s.expected_graduation,
        s.status,
        
        -- Academic metrics
        COUNT(e.course_id) as courses_taken,
        AVG(c.credits) as avg_course_credits,
        SUM(c.credits) as total_credits,
        
        -- Performance distribution
        COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-') THEN 1 END) as a_grades,
        COUNT(CASE WHEN e.grade IN ('B+', 'B', 'B-') THEN 1 END) as b_grades,
        COUNT(CASE WHEN e.grade IN ('C+', 'C', 'C-') THEN 1 END) as c_grades,
        COUNT(CASE WHEN e.grade IN ('D+', 'D', 'F') THEN 1 END) as poor_grades,
        COUNT(CASE WHEN e.grade = 'W' THEN 1 END) as withdrawals,
        
        -- Time-based metrics
        EXTRACT(EPOCH FROM (COALESCE(s.graduation_date, CURRENT_DATE) - s.enrollment_date)) / (365.25 * 24 * 3600) as years_enrolled,
        
        -- Financial metrics (proxy)
        SUM(c.credits * 500) as total_tuition_revenue,
        
        -- Success indicators
        CASE WHEN s.graduation_date IS NOT NULL THEN 1 ELSE 0 END as graduated,
        CASE WHEN s.status = 'Active' AND s.gpa >= 3.0 THEN 1 ELSE 0 END as on_track
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE 
        (c.department = @department OR @department = 'ALL')  -- Parameter filter
        AND s.enrollment_date >= CURRENT_DATE - INTERVAL @time_period  -- Parameter filter
        AND e.grade IS NOT NULL
    GROUP BY s.student_id, s.student_name, s.major, s.gpa, s.enrollment_date, s.expected_graduation, s.status, s.graduation_date
),
success_analysis AS (
    SELECT 
        *,
        -- Success categorization
        CASE 
            WHEN graduated = 1 AND gpa >= 3.5 THEN 'Honor Graduate'
            WHEN graduated = 1 AND gpa >= 3.0 THEN 'Successful Graduate'
            WHEN graduated = 1 THEN 'Graduate'
            WHEN on_track = 1 AND poor_grades = 0 THEN 'High Performer'
            WHEN on_track = 1 THEN 'On Track'
            WHEN poor_grades >= 3 OR withdrawals >= 2 THEN 'At Risk'
            ELSE 'Needs Support'
        END as success_category,
        
        -- Performance ratios
        a_grades * 100.0 / NULLIF(courses_taken, 0) as a_grade_pct,
        poor_grades * 100.0 / NULLIF(courses_taken, 0) as poor_grade_pct,
        withdrawals * 100.0 / NULLIF(courses_taken, 0) as withdrawal_pct
    FROM filtered_students
)
-- Summary by success category
SELECT 
    success_category,
    COUNT(*) as student_count,
    ROUND(AVG(gpa), 2) as avg_gpa,
    ROUND(AVG(courses_taken), 0) as avg_courses,
    ROUND(AVG(total_credits), 0) as avg_credits,
    ROUND(AVG(a_grade_pct), 1) as avg_a_pct,
    ROUND(AVG(poor_grade_pct), 1) as avg_poor_pct,
    ROUND(AVG(years_enrolled), 1) as avg_years,
    ROUND(AVG(total_tuition_revenue), 0) as avg_revenue,
    
    -- Success metrics
    COUNT(CASE WHEN graduated = 1 THEN 1 END) * 100.0 / COUNT(*) as graduation_rate,
    STRING_AGG(DISTINCT major, ', ' ORDER BY major) as majors_represented
FROM success_analysis
WHERE gpa >= @gpa_threshold OR @gpa_threshold = 0  -- Parameter filter
GROUP BY success_category
ORDER BY avg_gpa DESC;
\`\`\`

## 📈 Real-Time Monitoring Queries

### System Health Dashboard
\`\`\`sql
-- Real-time operational metrics for system monitoring
WITH system_health AS (
    SELECT 
        CURRENT_TIMESTAMP as report_timestamp,
        
        -- Current semester activity
        COUNT(DISTINCT CASE 
            WHEN e.enrollment_date >= DATE_TRUNC('semester', CURRENT_DATE) 
            THEN e.student_id 
        END) as active_semester_students,
        
        COUNT(DISTINCT CASE 
            WHEN c.start_date <= CURRENT_DATE AND c.end_date >= CURRENT_DATE 
            THEN c.course_id 
        END) as courses_in_session,
        
        -- Recent activity (last 7 days)
        COUNT(CASE 
            WHEN e.enrollment_date >= CURRENT_DATE - INTERVAL '7 days' 
            THEN 1 
        END) as new_enrollments_week,
        
        COUNT(CASE 
            WHEN e.last_activity >= CURRENT_DATE - INTERVAL '1 day' 
            THEN 1 
        END) as active_students_today,
        
        -- System load indicators
        COUNT(DISTINCT c.instructor_id) as active_faculty,
        
        -- Financial activity
        COUNT(CASE 
            WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' 
            THEN 1 
        END) as payments_this_week,
        SUM(CASE 
            WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' 
            THEN t.amount 
        END) as revenue_this_week,
        
        -- Data quality checks
        COUNT(CASE WHEN s.gpa IS NULL THEN 1 END) as students_missing_gpa,
        COUNT(CASE WHEN e.grade IS NULL AND e.enrollment_date < CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as missing_grades,
        
        -- Alert conditions
        COUNT(CASE 
            WHEN s.status = 'Active' AND e.last_activity < CURRENT_DATE - INTERVAL '14 days' 
            THEN 1 
        END) as inactive_students_alert
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    LEFT JOIN courses c ON e.course_id = c.course_id
    LEFT JOIN tuition_payments t ON s.student_id = t.student_id
),
historical_comparison AS (
    SELECT 
        AVG(COUNT(CASE WHEN e.enrollment_date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END)) 
        OVER (ORDER BY DATE_TRUNC('week', e.enrollment_date) ROWS BETWEEN 4 PRECEDING AND 1 PRECEDING) as avg_weekly_enrollments_4wk
    FROM enrollments e
    WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '5 weeks'
    GROUP BY DATE_TRUNC('week', e.enrollment_date)
    ORDER BY DATE_TRUNC('week', e.enrollment_date) DESC
    LIMIT 1
)
SELECT 
    TO_CHAR(sh.report_timestamp, 'YYYY-MM-DD HH24:MI:SS') as report_time,
    
    -- Current activity levels
    sh.active_semester_students,
    sh.courses_in_session,
    sh.new_enrollments_week,
    sh.active_students_today,
    sh.active_faculty,
    
    -- Financial health
    sh.payments_this_week,
    ROUND(sh.revenue_this_week, 0) as revenue_this_week,
    
    -- Performance vs. historical
    CASE 
        WHEN sh.new_enrollments_week >= hc.avg_weekly_enrollments_4wk * 1.2 THEN '🟢 Above Normal'
        WHEN sh.new_enrollments_week <= hc.avg_weekly_enrollments_4wk * 0.8 THEN '🔴 Below Normal'
        ELSE '🟡 Normal Range'
    END as enrollment_trend,
    
    -- Data quality alerts
    sh.students_missing_gpa as data_quality_issues,
    sh.missing_grades as grading_backlog,
    
    -- Operational alerts
    CASE 
        WHEN sh.inactive_students_alert > 50 THEN '🚨 High Inactivity'
        WHEN sh.inactive_students_alert > 20 THEN '⚠️ Moderate Concerns'
        ELSE '✅ Normal Activity'
    END as student_engagement_status,
    
    -- System utilization
    ROUND(sh.active_semester_students::NUMERIC / NULLIF(sh.courses_in_session, 0), 1) as students_per_course,
    ROUND(sh.active_semester_students::NUMERIC / NULLIF(sh.active_faculty, 0), 1) as students_per_faculty
FROM system_health sh
CROSS JOIN historical_comparison hc;
\`\`\`

## 🚨 Dashboard Development Anti-Patterns

### ❌ Mistake 1: Unfiltered Large Result Sets
\`\`\`sql
-- BAD: Query returns massive datasets unsuitable for dashboards
SELECT * FROM enrollments 
JOIN students USING (student_id)
JOIN courses USING (course_id);  -- Could return millions of rows!

-- GOOD: Aggregated, filtered, paginated results
SELECT 
    department,
    semester,
    COUNT(*) as enrollments,
    AVG(gpa) as avg_gpa
FROM enrollments e
JOIN students s USING (student_id)
JOIN courses c USING (course_id)
WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years'
GROUP BY department, semester
ORDER BY semester DESC, department
LIMIT 100;
\`\`\`

### ❌ Mistake 2: No Time-Based Indexing Strategy
\`\`\`sql
-- Always consider query performance for real-time dashboards
CREATE INDEX idx_enrollments_date_performance ON enrollments(enrollment_date, student_id, course_id);
CREATE INDEX idx_payments_date_amount ON tuition_payments(payment_date, student_id, amount);

-- Use covering indexes for dashboard queries
CREATE INDEX idx_dashboard_student_metrics ON students(status, major, enrollment_date) 
INCLUDE (gpa, graduation_date);
\`\`\`

### ❌ Mistake 3: Missing Context for Executives
\`\`\`sql
-- BAD: Raw numbers without context
SELECT COUNT(*) as student_count FROM students;

-- GOOD: Contextual metrics with trends and benchmarks
SELECT 
    COUNT(*) as current_students,
    LAG(COUNT(*), 1) OVER (ORDER BY report_year) as previous_year,
    ROUND(((COUNT(*) - LAG(COUNT(*), 1) OVER (ORDER BY report_year)) * 100.0 / 
           LAG(COUNT(*), 1) OVER (ORDER BY report_year)), 1) as yoy_growth_pct,
    CASE 
        WHEN COUNT(*) >= 5000 THEN 'Large Institution'
        WHEN COUNT(*) >= 2000 THEN 'Medium Institution'  
        ELSE 'Small Institution'
    END as institutional_size
FROM students s
GROUP BY EXTRACT(YEAR FROM s.enrollment_date) as report_year
ORDER BY report_year DESC;
\`\`\`

## 🎨 Advanced Dashboard Techniques

### Cohort Analysis for Retention Tracking
\`\`\`sql
-- Student cohort retention analysis
WITH enrollment_cohorts AS (
    SELECT 
        student_id,
        DATE_TRUNC('year', enrollment_date) as cohort_year,
        enrollment_date,
        major
    FROM students
    WHERE enrollment_date >= CURRENT_DATE - INTERVAL '5 years'
),
cohort_periods AS (
    SELECT 
        ec.student_id,
        ec.cohort_year,
        ec.major,
        generate_series(0, 8) as period_number,  -- Track up to 8 semesters
        ec.enrollment_date + (generate_series(0, 8) * INTERVAL '6 months') as period_date
    FROM enrollment_cohorts ec
),
retention_data AS (
    SELECT 
        cp.cohort_year,
        cp.major,
        cp.period_number,
        COUNT(DISTINCT cp.student_id) as cohort_size,
        COUNT(DISTINCT CASE 
            WHEN s.status = 'Active' OR s.graduation_date >= cp.period_date
            THEN cp.student_id 
        END) as retained_students
    FROM cohort_periods cp
    LEFT JOIN students s ON cp.student_id = s.student_id
    GROUP BY cp.cohort_year, cp.major, cp.period_number
)
SELECT 
    EXTRACT(YEAR FROM cohort_year) as cohort,
    major,
    period_number as semester,
    cohort_size,
    retained_students,
    ROUND(retained_students * 100.0 / NULLIF(cohort_size, 0), 1) as retention_rate,
    
    -- Retention quality indicators
    CASE 
        WHEN retained_students * 100.0 / NULLIF(cohort_size, 0) >= 90 THEN '🌟 Excellent'
        WHEN retained_students * 100.0 / NULLIF(cohort_size, 0) >= 80 THEN '✅ Good'
        WHEN retained_students * 100.0 / NULLIF(cohort_size, 0) >= 70 THEN '⚠️ Concerning'
        ELSE '🚨 Critical'
    END as retention_health
FROM retention_data
WHERE period_number <= 8  -- 4-year degree tracking
ORDER BY cohort DESC, major, period_number;
\`\`\`

## 🎉 Key Dashboard Design Principles

1. **Executive Summary First** - Lead with high-level KPIs and trends
2. **Drill-Down Capability** - Enable progressive detail exploration  
3. **Context is King** - Always show comparisons, benchmarks, and trends
4. **Real-Time Relevance** - Balance freshness with query performance
5. **Visual Data Types** - Structure queries for charts, tables, and gauges
6. **Alert Integration** - Include threshold-based status indicators
7. **Parameter Flexibility** - Design for dynamic filtering and date ranges
8. **Performance Optimization** - Aggregate, index, and limit appropriately

Your SQL queries become the data foundation that transforms raw information into executive decision-making power. Every query tells a story - make sure it's the right story for your audience!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "📊 Create an executive KPI dashboard query showing year-over-year comparisons for student enrollment, institutional GPA, graduation count, and revenue per student with trend indicators.",
        expectedQuery:
          "WITH current_year_metrics AS (SELECT COUNT(DISTINCT s.student_id) as active_students, AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END) as institutional_gpa, COUNT(CASE WHEN s.graduation_date >= DATE_TRUNC('year', CURRENT_DATE) THEN 1 END) as graduates_ytd, SUM(t.amount) / COUNT(DISTINCT s.student_id) as revenue_per_student FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN tuition_payments t ON s.student_id = t.student_id WHERE EXTRACT(YEAR FROM s.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE)), previous_year_metrics AS (SELECT COUNT(DISTINCT s.student_id) as prev_active_students, AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END) as prev_institutional_gpa, COUNT(CASE WHEN EXTRACT(YEAR FROM s.graduation_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN 1 END) as prev_graduates, SUM(t.amount) / COUNT(DISTINCT s.student_id) as prev_revenue_per_student FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN tuition_payments t ON s.student_id = t.student_id WHERE EXTRACT(YEAR FROM s.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1) SELECT 'Active Students' as metric, cm.active_students as current_value, pm.prev_active_students as previous_value, ROUND(((cm.active_students - pm.prev_active_students) * 100.0 / pm.prev_active_students), 1) as yoy_change_pct, CASE WHEN cm.active_students > pm.prev_active_students THEN 'Growing' ELSE 'Declining' END as trend FROM current_year_metrics cm, previous_year_metrics pm",
        hint: "Create CTEs for current and previous year metrics, calculate year-over-year changes, include trend indicators based on comparisons",
        solution:
          "WITH current_year_metrics AS (SELECT EXTRACT(YEAR FROM CURRENT_DATE) as year, COUNT(DISTINCT CASE WHEN s.status = 'Active' THEN s.student_id END) as active_students, ROUND(AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END), 2) as institutional_gpa, COUNT(CASE WHEN EXTRACT(YEAR FROM s.graduation_date) = EXTRACT(YEAR FROM CURRENT_DATE) THEN 1 END) as graduates_ytd, ROUND(AVG(t.amount), 0) as revenue_per_student FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id AND EXTRACT(YEAR FROM e.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE) LEFT JOIN tuition_payments t ON s.student_id = t.student_id AND EXTRACT(YEAR FROM t.payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)), previous_year_metrics AS (SELECT EXTRACT(YEAR FROM CURRENT_DATE) - 1 as year, COUNT(DISTINCT CASE WHEN s.status = 'Active' OR s.graduation_date IS NOT NULL THEN s.student_id END) as active_students, ROUND(AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END), 2) as institutional_gpa, COUNT(CASE WHEN EXTRACT(YEAR FROM s.graduation_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 THEN 1 END) as graduates_ytd, ROUND(AVG(t.amount), 0) as revenue_per_student FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id AND EXTRACT(YEAR FROM e.enrollment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 LEFT JOIN tuition_payments t ON s.student_id = t.student_id AND EXTRACT(YEAR FROM t.payment_date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1), kpi_comparison AS (SELECT 'Active Students' as kpi_name, cm.active_students as current_value, pm.active_students as previous_value FROM current_year_metrics cm, previous_year_metrics pm UNION ALL SELECT 'Institutional GPA', cm.institutional_gpa, pm.institutional_gpa FROM current_year_metrics cm, previous_year_metrics pm UNION ALL SELECT 'Graduates YTD', cm.graduates_ytd, pm.graduates_ytd FROM current_year_metrics cm, previous_year_metrics pm UNION ALL SELECT 'Revenue per Student', cm.revenue_per_student, pm.revenue_per_student FROM current_year_metrics cm, previous_year_metrics pm) SELECT kpi_name, current_value, previous_value, ROUND(CASE WHEN previous_value > 0 THEN ((current_value - previous_value) * 100.0 / previous_value) ELSE 0 END, 1) as yoy_change_pct, CASE WHEN current_value > previous_value THEN '📈 Growing' WHEN current_value < previous_value THEN '📉 Declining' ELSE '➡️ Stable' END as trend FROM kpi_comparison ORDER BY kpi_name;",
      },
      {
        id: "ex2",
        question:
          "🏆 Create a department performance scorecard ranking departments by composite scores across GPA, pass rates, retention, and revenue metrics with performance categories.",
        expectedQuery:
          "WITH department_metrics AS (SELECT c.department, COUNT(DISTINCT e.student_id) as total_students, AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END) as avg_gpa, COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C') THEN 1 END) * 100.0 / COUNT(CASE WHEN e.grade IS NOT NULL THEN 1 END) as pass_rate, COUNT(CASE WHEN s.status = 'Active' THEN 1 END) * 100.0 / COUNT(DISTINCT e.student_id) as retention_rate, SUM(c.credits * 500) as estimated_revenue FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id LEFT JOIN students s ON e.student_id = s.student_id GROUP BY c.department HAVING COUNT(DISTINCT e.student_id) >= 10), rankings AS (SELECT *, ROW_NUMBER() OVER (ORDER BY avg_gpa DESC) + ROW_NUMBER() OVER (ORDER BY pass_rate DESC) + ROW_NUMBER() OVER (ORDER BY retention_rate DESC) + ROW_NUMBER() OVER (ORDER BY estimated_revenue DESC) as composite_score FROM department_metrics) SELECT department, total_students, ROUND(avg_gpa, 2) as avg_gpa, ROUND(pass_rate, 1) as pass_rate, ROUND(retention_rate, 1) as retention_rate, estimated_revenue, CASE WHEN composite_score <= 8 THEN 'Excellent' WHEN composite_score <= 16 THEN 'Good' ELSE 'Needs Improvement' END as performance_category FROM rankings ORDER BY composite_score",
        hint: "Calculate key metrics per department, create rankings for each metric, sum rankings for composite score, categorize performance levels",
        solution:
          "WITH department_metrics AS (SELECT c.department, COUNT(DISTINCT e.student_id) as total_students, COUNT(DISTINCT c.course_id) as courses_offered, COUNT(DISTINCT c.instructor_id) as faculty_count, ROUND(AVG(CASE WHEN e.grade IS NOT NULL THEN CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END END), 2) as avg_gpa, ROUND(COUNT(CASE WHEN e.grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C') THEN 1 END) * 100.0 / NULLIF(COUNT(CASE WHEN e.grade IS NOT NULL THEN 1 END), 0), 1) as pass_rate, ROUND(COUNT(CASE WHEN e.grade != 'W' THEN 1 END) * 100.0 / NULLIF(COUNT(e.enrollment_id), 0), 1) as retention_rate, ROUND(SUM(c.credits * 500), 0) as estimated_revenue FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id LEFT JOIN students s ON e.student_id = s.student_id WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years' GROUP BY c.department HAVING COUNT(DISTINCT e.student_id) >= 10), department_rankings AS (SELECT *, ROW_NUMBER() OVER (ORDER BY avg_gpa DESC) as gpa_rank, ROW_NUMBER() OVER (ORDER BY pass_rate DESC) as pass_rate_rank, ROW_NUMBER() OVER (ORDER BY retention_rate DESC) as retention_rank, ROW_NUMBER() OVER (ORDER BY estimated_revenue DESC) as revenue_rank FROM department_metrics), composite_scoring AS (SELECT *, (gpa_rank + pass_rate_rank + retention_rank + revenue_rank) / 4.0 as composite_score FROM department_rankings) SELECT department, total_students, courses_offered, faculty_count, avg_gpa, pass_rate as pass_rate_pct, retention_rate as retention_pct, estimated_revenue, gpa_rank, pass_rate_rank, retention_rank, revenue_rank, ROUND(composite_score, 1) as composite_score, CASE WHEN composite_score <= 2 THEN '🌟 Excellent' WHEN composite_score <= 4 THEN '✅ Good' WHEN composite_score <= 6 THEN '⚠️ Needs Improvement' ELSE '🚨 Critical Attention Needed' END as performance_category FROM composite_scoring ORDER BY composite_score ASC;",
      },
      {
        id: "ex3",
        question:
          "📈 Build a real-time system health dashboard showing current semester activity, recent enrollment trends, financial metrics, and operational alerts with status indicators.",
        expectedQuery:
          "WITH system_metrics AS (SELECT COUNT(DISTINCT CASE WHEN e.enrollment_date >= DATE_TRUNC('semester', CURRENT_DATE) THEN e.student_id END) as active_semester_students, COUNT(DISTINCT CASE WHEN c.start_date <= CURRENT_DATE AND c.end_date >= CURRENT_DATE THEN c.course_id END) as courses_in_session, COUNT(CASE WHEN e.enrollment_date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as new_enrollments_week, COUNT(CASE WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as payments_this_week, SUM(CASE WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' THEN t.amount END) as revenue_this_week, COUNT(CASE WHEN s.gpa IS NULL THEN 1 END) as missing_gpa_count, COUNT(CASE WHEN s.status = 'Active' AND e.last_activity < CURRENT_DATE - INTERVAL '14 days' THEN 1 END) as inactive_students FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN courses c ON e.course_id = c.course_id LEFT JOIN tuition_payments t ON s.student_id = t.student_id) SELECT CURRENT_TIMESTAMP as report_time, active_semester_students, courses_in_session, new_enrollments_week, payments_this_week, ROUND(revenue_this_week, 0) as revenue_this_week, CASE WHEN new_enrollments_week >= 100 THEN 'High Activity' WHEN new_enrollments_week >= 50 THEN 'Normal' ELSE 'Low Activity' END as enrollment_status, CASE WHEN missing_gpa_count > 50 THEN 'Data Quality Alert' ELSE 'Good Data Quality' END as data_status, CASE WHEN inactive_students > 100 THEN 'Engagement Alert' ELSE 'Normal Engagement' END as engagement_status FROM system_metrics",
        hint: "Aggregate current semester and recent activity metrics, calculate financial indicators, create status alerts based on thresholds",
        solution:
          "WITH current_activity AS (SELECT CURRENT_TIMESTAMP as report_timestamp, COUNT(DISTINCT CASE WHEN e.enrollment_date >= DATE_TRUNC('month', CURRENT_DATE) THEN e.student_id END) as monthly_new_students, COUNT(DISTINCT CASE WHEN c.semester = EXTRACT(YEAR FROM CURRENT_DATE) || CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE) BETWEEN 1 AND 5 THEN '-Spring' WHEN EXTRACT(MONTH FROM CURRENT_DATE) BETWEEN 6 AND 8 THEN '-Summer' ELSE '-Fall' END THEN c.course_id END) as courses_current_semester, COUNT(CASE WHEN e.enrollment_date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as enrollments_last_7_days, COUNT(CASE WHEN e.last_activity_date >= CURRENT_DATE - INTERVAL '1 day' THEN 1 END) as active_students_today, COUNT(DISTINCT c.instructor_id) as active_faculty_count, COUNT(CASE WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as payments_last_7_days, COALESCE(SUM(CASE WHEN t.payment_date >= CURRENT_DATE - INTERVAL '7 days' THEN t.amount END), 0) as revenue_last_7_days, COUNT(CASE WHEN s.gpa IS NULL AND s.status = 'Active' THEN 1 END) as students_missing_gpa, COUNT(CASE WHEN e.grade IS NULL AND e.enrollment_date < CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as overdue_grades, COUNT(CASE WHEN s.status = 'Active' AND COALESCE(e.last_activity_date, e.enrollment_date) < CURRENT_DATE - INTERVAL '14 days' THEN 1 END) as inactive_active_students FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN courses c ON e.course_id = c.course_id LEFT JOIN tuition_payments t ON s.student_id = t.student_id), system_health AS (SELECT *, ROUND(monthly_new_students::NUMERIC / NULLIF(courses_current_semester, 0), 1) as students_per_course, ROUND(monthly_new_students::NUMERIC / NULLIF(active_faculty_count, 0), 1) as students_per_faculty FROM current_activity) SELECT TO_CHAR(report_timestamp, 'YYYY-MM-DD HH24:MI:SS') as report_time, monthly_new_students, courses_current_semester, enrollments_last_7_days, active_students_today, active_faculty_count, payments_last_7_days, ROUND(revenue_last_7_days, 0) as weekly_revenue, students_per_course, students_per_faculty, CASE WHEN enrollments_last_7_days >= 50 THEN '🟢 High Activity' WHEN enrollments_last_7_days >= 20 THEN '🟡 Normal Activity' ELSE '🔴 Low Activity' END as enrollment_trend, CASE WHEN students_missing_gpa > 20 OR overdue_grades > 50 THEN '🚨 Data Quality Issues' WHEN students_missing_gpa > 5 OR overdue_grades > 20 THEN '⚠️ Minor Data Issues' ELSE '✅ Good Data Quality' END as data_quality_status, CASE WHEN inactive_active_students > 100 THEN '🚨 High Inactivity Alert' WHEN inactive_active_students > 30 THEN '⚠️ Moderate Engagement Concern' ELSE '✅ Normal Student Engagement' END as engagement_status FROM system_health;",
      },
    ],
  },
  {
    id: "advanced-query-patterns",
    title: "Advanced SQL Query Patterns & Techniques",
    description:
      "Master sophisticated SQL patterns including recursive queries, dynamic pivoting, advanced analytics, and complex optimization strategies for enterprise-level database solutions",
    difficulty: "Advanced",
    category: "Advanced SQL",
    estimatedTime: 65,
    content: `
# Advanced SQL Query Patterns & Techniques

## 📖 Story Time: The Database Architect's Challenge

You're the Senior Database Architect at CSU, and the CTO just dropped a bombshell: "We're migrating to a new enterprise system, and I need you to demonstrate that our current SQL infrastructure can handle ANY complex query pattern the vendors throw at us."

Your mission:
- "Can we handle hierarchical organizational data with unlimited depth?"
- "What about dynamic reporting where columns change based on user selections?"
- "How do we optimize queries that process millions of student records in real-time?"
- "Can we build self-modifying queries for adaptive analytics?"

Time to showcase the most advanced SQL patterns that separate database architects from mere query writers!

## 🔄 Recursive Query Mastery

### Organizational Hierarchy Traversal
\`\`\`sql
-- Navigate complex organizational structures with unlimited depth
WITH RECURSIVE org_hierarchy AS (
    -- Base case: Top-level administrators (no manager)
    SELECT 
        employee_id,
        employee_name,
        title,
        manager_id,
        department,
        salary,
        1 as level,
        employee_name as hierarchy_path,
        employee_id::TEXT as id_path,
        ARRAY[employee_id] as path_array
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: Employees with managers
    SELECT 
        e.employee_id,
        e.employee_name,
        e.title,
        e.manager_id,
        e.department,
        e.salary,
        oh.level + 1,
        oh.hierarchy_path || ' → ' || e.employee_name,
        oh.id_path || '/' || e.employee_id::TEXT,
        oh.path_array || e.employee_id
    FROM employees e
    INNER JOIN org_hierarchy oh ON e.manager_id = oh.employee_id
    WHERE NOT e.employee_id = ANY(oh.path_array)  -- Prevent infinite loops
)
SELECT 
    level,
    REPEAT('  ', level - 1) || employee_name as indented_name,
    title,
    department,
    salary,
    hierarchy_path,
    
    -- Aggregate functions across hierarchy
    COUNT(*) OVER (PARTITION BY level) as peers_at_level,
    SUM(salary) OVER (PARTITION BY path_array[1]) as division_total_salary,
    
    -- Ranking within hierarchy
    RANK() OVER (PARTITION BY level ORDER BY salary DESC) as salary_rank_in_level,
    
    -- Path analysis
    CASE 
        WHEN level = 1 THEN 'Executive'
        WHEN level = 2 THEN 'Director'
        WHEN level = 3 THEN 'Manager'
        WHEN level >= 4 THEN 'Staff'
    END as org_tier,
    
    -- Span of control
    (SELECT COUNT(*) FROM employees WHERE manager_id = org_hierarchy.employee_id) as direct_reports
FROM org_hierarchy
ORDER BY id_path;
\`\`\`

### Course Prerequisites Chain Analysis  
\`\`\`sql
-- Find all prerequisite chains and detect circular dependencies
WITH RECURSIVE prereq_chains AS (
    -- Base case: Courses with no prerequisites
    SELECT 
        course_id,
        course_name,
        course_id as root_course,
        0 as depth,
        course_id::TEXT as chain_path,
        ARRAY[course_id] as visited_courses,
        false as has_cycle
    FROM courses c
    WHERE NOT EXISTS (
        SELECT 1 FROM course_prerequisites cp 
        WHERE cp.course_id = c.course_id
    )
    
    UNION ALL
    
    -- Recursive case: Follow prerequisite chains
    SELECT 
        c.course_id,
        c.course_name,
        pc.root_course,
        pc.depth + 1,
        pc.chain_path || ' ← ' || c.course_name,
        pc.visited_courses || c.course_id,
        CASE 
            WHEN c.course_id = ANY(pc.visited_courses) THEN true
            ELSE pc.has_cycle
        END as has_cycle
    FROM courses c
    INNER JOIN course_prerequisites cp ON c.course_id = cp.prerequisite_id
    INNER JOIN prereq_chains pc ON cp.course_id = pc.course_id
    WHERE pc.depth < 10  -- Prevent infinite recursion
    AND NOT pc.has_cycle  -- Stop at cycles
),
chain_analysis AS (
    SELECT 
        root_course,
        MAX(depth) as max_chain_length,
        COUNT(DISTINCT course_id) as courses_in_chain,
        BOOL_OR(has_cycle) as contains_cycle,
        STRING_AGG(DISTINCT chain_path, '; ' ORDER BY chain_path) as all_paths
    FROM prereq_chains
    GROUP BY root_course
)
SELECT 
    c.course_name as root_course_name,
    ca.max_chain_length,
    ca.courses_in_chain,
    ca.contains_cycle,
    
    -- Chain complexity classification
    CASE 
        WHEN ca.contains_cycle THEN '🔄 Circular Dependency'
        WHEN ca.max_chain_length >= 5 THEN '🔗 Long Chain'
        WHEN ca.max_chain_length >= 3 THEN '📚 Moderate Chain'
        WHEN ca.max_chain_length = 0 THEN '🎯 Independent Course'
        ELSE '📖 Short Chain'
    END as chain_complexity,
    
    -- Academic pathway insights
    CASE 
        WHEN ca.max_chain_length >= 4 THEN 'Advanced Specialization'
        WHEN ca.max_chain_length >= 2 THEN 'Intermediate Sequence'
        ELSE 'Foundational Course'
    END as academic_level,
    
    ca.all_paths
FROM chain_analysis ca
JOIN courses c ON ca.root_course = c.course_id
ORDER BY ca.max_chain_length DESC, ca.courses_in_chain DESC;
\`\`\`

## 🎯 Dynamic Pivot Techniques

### Advanced Cross-Tab Generation
\`\`\`sql
-- Dynamic pivot that adapts to changing data structure
DO $$
DECLARE
    sql_query TEXT;
    pivot_columns TEXT;
BEGIN
    -- Dynamically generate pivot columns
    SELECT STRING_AGG(
        format('SUM(CASE WHEN semester = %L THEN grade_points END) as %I',
               semester, 'sem_' || semester), 
        ', '
        ORDER BY semester
    ) INTO pivot_columns
    FROM (
        SELECT DISTINCT semester 
        FROM enrollments 
        WHERE enrollment_date >= CURRENT_DATE - INTERVAL '2 years'
    ) semesters;
    
    -- Construct dynamic query
    sql_query := format('
        WITH student_performance AS (
            SELECT 
                s.student_id,
                s.student_name,
                s.major,
                e.semester,
                CASE e.grade
                    WHEN ''A+'' THEN 4.0 WHEN ''A'' THEN 4.0 WHEN ''A-'' THEN 3.7
                    WHEN ''B+'' THEN 3.3 WHEN ''B'' THEN 3.0 WHEN ''B-'' THEN 2.7
                    WHEN ''C+'' THEN 2.3 WHEN ''C'' THEN 2.0 WHEN ''C-'' THEN 1.7
                    WHEN ''D+'' THEN 1.3 WHEN ''D'' THEN 1.0 ELSE 0.0
                END as grade_points
            FROM students s
            JOIN enrollments e ON s.student_id = e.student_id
            WHERE e.grade IS NOT NULL
            AND e.enrollment_date >= CURRENT_DATE - INTERVAL ''2 years''
        )
        SELECT 
            student_id,
            student_name,
            major,
            %s,
            -- Calculate overall metrics
            ROUND((%s) / NULLIF((%s), 0), 2) as overall_gpa,
            (%s) as total_semesters_active
        FROM student_performance
        GROUP BY student_id, student_name, major
        HAVING COUNT(DISTINCT semester) >= 2
        ORDER BY overall_gpa DESC NULLS LAST',
        pivot_columns,
        REPLACE(pivot_columns, 'SUM(CASE', 'AVG(CASE'),
        REPLACE(REPLACE(pivot_columns, 'SUM(CASE', 'COUNT(CASE'), 'THEN grade_points', 'THEN 1'),
        REPLACE(REPLACE(pivot_columns, 'SUM(CASE', 'COUNT(CASE'), 'THEN grade_points', 'THEN 1')
    );
    
    -- Execute dynamic query
    EXECUTE sql_query;
END $$;
\`\`\`

### Flexible Aggregation Engine
\`\`\`sql
-- Build configurable reporting engine
CREATE OR REPLACE FUNCTION generate_flexible_report(
    p_group_by_fields TEXT[],
    p_metric_fields TEXT[],
    p_filter_conditions TEXT DEFAULT '1=1',
    p_date_range_days INTEGER DEFAULT 365
) RETURNS TABLE (
    dimension_values TEXT,
    metric_results JSONB
) AS $$
DECLARE
    sql_query TEXT;
    group_clause TEXT;
    select_clause TEXT;
    metric_clause TEXT;
BEGIN
    -- Build GROUP BY clause
    group_clause := ARRAY_TO_STRING(p_group_by_fields, ', ');
    
    -- Build SELECT clause for dimensions
    select_clause := format(
        'CONCAT_WS('' | '', %s) as dimension_values',
        ARRAY_TO_STRING(p_group_by_fields, ', ')
    );
    
    -- Build metrics aggregation
    WITH metric_calculations AS (
        SELECT STRING_AGG(
            format('"%s", %s', 
                   field_name, 
                   CASE 
                       WHEN field_name LIKE '%_count' THEN format('COUNT(%s)', REPLACE(field_name, '_count', ''))
                       WHEN field_name LIKE '%_avg' THEN format('ROUND(AVG(%s), 2)', REPLACE(field_name, '_avg', ''))
                       WHEN field_name LIKE '%_sum' THEN format('SUM(%s)', REPLACE(field_name, '_sum', ''))
                       ELSE format('MAX(%s)', field_name)
                   END
            ), ', '
        ) as aggregations
        FROM UNNEST(p_metric_fields) as field_name
    )
    SELECT format('JSON_BUILD_OBJECT(%s)', aggregations) INTO metric_clause
    FROM metric_calculations;
    
    -- Construct complete query
    sql_query := format('
        SELECT 
            %s,
            %s as metric_results
        FROM students s
        LEFT JOIN enrollments e ON s.student_id = e.student_id
        LEFT JOIN courses c ON e.course_id = c.course_id
        WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL ''%s days''
        AND (%s)
        GROUP BY %s
        ORDER BY %s',
        select_clause,
        metric_clause,
        p_date_range_days,
        p_filter_conditions,
        group_clause,
        group_clause
    );
    
    RETURN QUERY EXECUTE sql_query;
END $$ LANGUAGE plpgsql;

-- Usage examples:
SELECT * FROM generate_flexible_report(
    ARRAY['s.major', 'c.department'],
    ARRAY['student_id_count', 'gpa_avg', 'credits_sum'],
    's.gpa >= 3.0',
    730
);
\`\`\`

## 📊 Advanced Window Function Patterns

### Multi-Level Ranking and Percentiles
\`\`\`sql
-- Sophisticated ranking across multiple dimensions
WITH comprehensive_rankings AS (
    SELECT 
        s.student_id,
        s.student_name,
        s.major,
        s.gpa,
        s.graduation_date,
        
        -- Basic rankings
        ROW_NUMBER() OVER (ORDER BY s.gpa DESC) as overall_rank,
        DENSE_RANK() OVER (PARTITION BY s.major ORDER BY s.gpa DESC) as major_rank,
        PERCENT_RANK() OVER (ORDER BY s.gpa) as gpa_percentile,
        
        -- Quantile analysis  
        NTILE(10) OVER (ORDER BY s.gpa) as gpa_decile,
        NTILE(4) OVER (PARTITION BY s.major ORDER BY s.gpa) as major_quartile,
        
        -- Advanced analytics
        CUME_DIST() OVER (ORDER BY s.gpa) as cumulative_distribution,
        
        -- Neighboring comparisons
        LAG(s.gpa, 1) OVER (PARTITION BY s.major ORDER BY s.gpa) as prev_student_gpa,
        LEAD(s.gpa, 1) OVER (PARTITION BY s.major ORDER BY s.gpa) as next_student_gpa,
        
        -- Range analytics
        FIRST_VALUE(s.gpa) OVER (PARTITION BY s.major ORDER BY s.gpa DESC 
                                  ROWS UNBOUNDED PRECEDING) as major_highest_gpa,
        LAST_VALUE(s.gpa) OVER (PARTITION BY s.major ORDER BY s.gpa ASC 
                                 ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) as major_lowest_gpa,
        
        -- Rolling statistics
        AVG(s.gpa) OVER (PARTITION BY s.major ORDER BY s.student_id 
                         ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) as local_avg_gpa,
        
        -- Performance classifications
        CASE 
            WHEN PERCENT_RANK() OVER (ORDER BY s.gpa) >= 0.95 THEN 'Top 5%'
            WHEN PERCENT_RANK() OVER (ORDER BY s.gpa) >= 0.90 THEN 'Top 10%'
            WHEN PERCENT_RANK() OVER (ORDER BY s.gpa) >= 0.75 THEN 'Top 25%'
            WHEN PERCENT_RANK() OVER (ORDER BY s.gpa) >= 0.50 THEN 'Above Average'
            ELSE 'Below Average'
        END as performance_tier
    FROM students s
    WHERE s.gpa IS NOT NULL
),
enhanced_analysis AS (
    SELECT 
        *,
        -- Gap analysis
        gpa - prev_student_gpa as gpa_gap_below,
        next_student_gpa - gpa as gpa_gap_above,
        
        -- Major competitiveness
        major_highest_gpa - major_lowest_gpa as major_gpa_range,
        (gpa - major_lowest_gpa) / NULLIF(major_highest_gpa - major_lowest_gpa, 0) as major_relative_position,
        
        -- Outlier detection
        ABS(gpa - local_avg_gpa) > 0.5 as is_local_outlier
    FROM comprehensive_rankings
)
SELECT 
    student_name,
    major,
    ROUND(gpa, 2) as gpa,
    overall_rank,
    major_rank,
    ROUND(gpa_percentile * 100, 1) as percentile,
    gpa_decile,
    major_quartile,
    performance_tier,
    
    -- Insights
    CASE 
        WHEN major_quartile = 1 THEN 'Top performer in major'
        WHEN gpa_percentile >= 0.9 THEN 'Exceptional student'
        WHEN is_local_outlier THEN 'Statistical outlier'
        WHEN gpa_gap_below > 0.3 THEN 'Significant improvement needed'
        ELSE 'Typical performance'
    END as performance_insight,
    
    ROUND(major_relative_position * 100, 1) as major_position_pct,
    CASE 
        WHEN major_gpa_range < 1.0 THEN 'Low variability major'
        WHEN major_gpa_range > 2.0 THEN 'High variability major'
        ELSE 'Moderate variability major'
    END as major_competitiveness
FROM enhanced_analysis
ORDER BY overall_rank;
\`\`\`

## 🔍 Query Optimization Patterns

### Performance-Optimized Analytical Queries
\`\`\`sql
-- Optimized query with multiple performance techniques
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
WITH RECURSIVE 
-- Materialized CTE for better performance
enrollment_facts AS MATERIALIZED (
    SELECT 
        e.student_id,
        e.course_id,
        e.semester,
        e.grade,
        c.credits,
        c.department,
        c.course_level,
        -- Pre-calculate grade points to avoid repetition
        CASE e.grade
            WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7
            WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7
            WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7
            WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0
        END as grade_points,
        -- Pre-filter for performance
        CASE WHEN e.grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C') THEN 1 ELSE 0 END as passed
    FROM enrollments e
    INNER JOIN courses c ON e.course_id = c.course_id
    WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years'  -- Partition pruning
    AND e.grade IS NOT NULL
),
-- Aggregated metrics to reduce computation
student_metrics AS (
    SELECT 
        student_id,
        COUNT(*) as total_courses,
        SUM(credits) as total_credits,
        SUM(grade_points * credits) / NULLIF(SUM(credits), 0) as weighted_gpa,
        SUM(passed) as courses_passed,
        COUNT(DISTINCT semester) as semesters_active,
        COUNT(DISTINCT department) as departments_studied,
        
        -- Advanced metrics
        STDDEV(grade_points) as grade_consistency,
        MAX(course_level) as highest_level_attempted,
        
        -- Bit manipulation for fast set operations
        BIT_OR(1 << (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM TO_DATE(semester, 'YYYY-MM')))) as year_mask
    FROM enrollment_facts ef
    GROUP BY student_id
    HAVING COUNT(*) >= 3  -- Filter early
),
-- Use window functions efficiently
performance_analysis AS (
    SELECT 
        s.student_name,
        s.major,
        sm.*,
        
        -- Efficient ranking with limited window
        DENSE_RANK() OVER w_gpa as gpa_rank,
        PERCENT_RANK() OVER w_gpa as gpa_percentile,
        
        -- Use LAG/LEAD efficiently
        LAG(weighted_gpa) OVER w_major as prev_major_gpa,
        
        -- Efficient aggregation in window
        COUNT(*) OVER w_major as major_peer_count,
        AVG(weighted_gpa) OVER w_major as major_avg_gpa
    FROM student_metrics sm
    JOIN students s ON sm.student_id = s.student_id
    WHERE sm.weighted_gpa IS NOT NULL  -- Final filter
    WINDOW 
        w_gpa AS (ORDER BY sm.weighted_gpa DESC),
        w_major AS (PARTITION BY s.major ORDER BY sm.weighted_gpa DESC)
)
-- Final selection with computed columns
SELECT 
    student_name,
    major,
    total_courses,
    total_credits,
    ROUND(weighted_gpa, 2) as gpa,
    courses_passed,
    semesters_active,
    departments_studied,
    gpa_rank,
    ROUND(gpa_percentile * 100, 1) as percentile,
    
    -- Performance indicators
    CASE 
        WHEN gpa_percentile >= 0.95 THEN '🌟 Exceptional'
        WHEN gpa_percentile >= 0.85 THEN '⭐ Excellent'  
        WHEN gpa_percentile >= 0.70 THEN '✅ Good'
        WHEN gpa_percentile >= 0.50 THEN '📈 Average'
        ELSE '⚠️ Below Average'
    END as performance_category,
    
    -- Academic diversity
    CASE 
        WHEN departments_studied >= 5 THEN 'Highly Diverse'
        WHEN departments_studied >= 3 THEN 'Moderately Diverse'
        ELSE 'Focused Study'
    END as academic_breadth,
    
    -- Consistency analysis
    CASE 
        WHEN grade_consistency <= 0.5 THEN 'Highly Consistent'
        WHEN grade_consistency <= 1.0 THEN 'Moderately Consistent'
        ELSE 'Inconsistent Performance'  
    END as grade_consistency_level
FROM performance_analysis
ORDER BY gpa_rank
LIMIT 100;  -- Limit results for performance

-- Create supporting indexes for optimal performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_optimized 
ON enrollments(enrollment_date, grade, student_id, course_id) 
WHERE grade IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_performance 
ON courses(course_id, credits, department, course_level);

-- Analyze tables for query planner
ANALYZE enrollments, courses, students;
\`\`\`

## 🚨 Advanced SQL Anti-Patterns

### ❌ Mistake 1: Recursive Query Without Cycle Detection
\`\`\`sql
-- BAD: Infinite recursion risk
WITH RECURSIVE bad_hierarchy AS (
    SELECT employee_id, manager_id, 1 as level
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.manager_id, bh.level + 1
    FROM employees e 
    JOIN bad_hierarchy bh ON e.manager_id = bh.employee_id
)
SELECT * FROM bad_hierarchy;  -- Could run forever!

-- GOOD: Proper cycle detection and depth limits
WITH RECURSIVE safe_hierarchy AS (
    SELECT employee_id, manager_id, 1 as level, ARRAY[employee_id] as path
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.manager_id, sh.level + 1, sh.path || e.employee_id
    FROM employees e 
    JOIN safe_hierarchy sh ON e.manager_id = sh.employee_id
    WHERE sh.level < 20  -- Depth limit
    AND NOT e.employee_id = ANY(sh.path)  -- Cycle detection
)
SELECT * FROM safe_hierarchy;
\`\`\`

### ❌ Mistake 2: Inefficient Dynamic SQL Construction
\`\`\`sql
-- BAD: SQL injection risk and poor performance
CREATE FUNCTION bad_dynamic_query(table_name TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN 'SELECT * FROM ' || table_name;  -- SQL injection risk!
END $$ LANGUAGE plpgsql;

-- GOOD: Parameterized and validated dynamic SQL
CREATE FUNCTION safe_dynamic_query(table_name TEXT) RETURNS TEXT AS $$
DECLARE
    safe_table_name TEXT;
BEGIN
    -- Validate table exists
    SELECT quote_ident(tablename) INTO safe_table_name
    FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = table_name;
    
    IF safe_table_name IS NULL THEN
        RAISE EXCEPTION 'Invalid table name: %', table_name;
    END IF;
    
    RETURN format('SELECT * FROM %I LIMIT 1000', safe_table_name);
END $$ LANGUAGE plpgsql SECURITY DEFINER;
\`\`\`

## 🎉 Key Advanced Patterns Mastery

1. **Recursive CTEs** - Master hierarchical data with cycle detection
2. **Dynamic Pivoting** - Build adaptive reporting systems  
3. **Window Function Optimization** - Efficient analytical queries
4. **Performance Engineering** - Query optimization and indexing strategies
5. **Safe Dynamic SQL** - Parameterized and validated query construction
6. **Advanced Analytics** - Multi-dimensional ranking and percentile analysis
7. **Error Handling** - Robust exception management and validation

You've now mastered the most sophisticated SQL patterns used in enterprise systems. These techniques separate database architects from ordinary developers - you're ready for any complex data challenge!
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🔄 Build a recursive query to find all course prerequisite chains, detect circular dependencies, and classify chain complexity (Short/Moderate/Long/Circular) with full path tracking.",
        expectedQuery:
          "WITH RECURSIVE prereq_chains AS (SELECT course_id, course_name, course_id as root_course, 0 as depth, course_name as chain_path, ARRAY[course_id] as visited_courses FROM courses WHERE NOT EXISTS (SELECT 1 FROM course_prerequisites WHERE course_id = courses.course_id) UNION ALL SELECT c.course_id, c.course_name, pc.root_course, pc.depth + 1, pc.chain_path || ' ← ' || c.course_name, pc.visited_courses || c.course_id FROM courses c JOIN course_prerequisites cp ON c.course_id = cp.prerequisite_id JOIN prereq_chains pc ON cp.course_id = pc.course_id WHERE pc.depth < 8 AND NOT c.course_id = ANY(pc.visited_courses)) SELECT root_course, MAX(depth) as max_depth, COUNT(DISTINCT course_id) as courses_in_chain, BOOL_OR(course_id = ANY(visited_courses[1:array_length(visited_courses,1)-1])) as has_cycle, CASE WHEN BOOL_OR(course_id = ANY(visited_courses[1:array_length(visited_courses,1)-1])) THEN 'Circular' WHEN MAX(depth) >= 5 THEN 'Long' WHEN MAX(depth) >= 3 THEN 'Moderate' ELSE 'Short' END as complexity, STRING_AGG(DISTINCT chain_path, '; ') as all_paths FROM prereq_chains GROUP BY root_course ORDER BY max_depth DESC",
        hint: "Use recursive CTE with base case (no prerequisites), track visited courses array to detect cycles, limit depth to prevent infinite recursion",
        solution:
          "WITH RECURSIVE prereq_chains AS (-- Base case: courses with no prerequisites SELECT c.course_id, c.course_name, c.course_id as root_course, 0 as depth, c.course_name as chain_path, ARRAY[c.course_id] as visited_courses, false as has_cycle FROM courses c WHERE NOT EXISTS (SELECT 1 FROM course_prerequisites cp WHERE cp.course_id = c.course_id) UNION ALL -- Recursive case: follow prerequisite chains SELECT c.course_id, c.course_name, pc.root_course, pc.depth + 1, pc.chain_path || ' ← ' || c.course_name as chain_path, pc.visited_courses || c.course_id, CASE WHEN c.course_id = ANY(pc.visited_courses) THEN true ELSE pc.has_cycle END as has_cycle FROM courses c INNER JOIN course_prerequisites cp ON c.course_id = cp.prerequisite_id INNER JOIN prereq_chains pc ON cp.course_id = pc.course_id WHERE pc.depth < 10 -- prevent infinite recursion AND NOT pc.has_cycle -- stop at cycles), chain_analysis AS (SELECT root_course, MAX(depth) as max_chain_length, COUNT(DISTINCT course_id) as courses_in_chain, BOOL_OR(has_cycle) as contains_cycle, STRING_AGG(DISTINCT chain_path, '; ' ORDER BY chain_path) as all_paths FROM prereq_chains GROUP BY root_course) SELECT c.course_name as root_course_name, ca.max_chain_length, ca.courses_in_chain, ca.contains_cycle, CASE WHEN ca.contains_cycle THEN '🔄 Circular Dependency' WHEN ca.max_chain_length >= 5 THEN '🔗 Long Chain' WHEN ca.max_chain_length >= 3 THEN '📚 Moderate Chain' WHEN ca.max_chain_length = 0 THEN '🎯 Independent Course' ELSE '📖 Short Chain' END as chain_complexity, CASE WHEN ca.max_chain_length >= 4 THEN 'Advanced Specialization' WHEN ca.max_chain_length >= 2 THEN 'Intermediate Sequence' ELSE 'Foundational Course' END as academic_level, ca.all_paths FROM chain_analysis ca JOIN courses c ON ca.root_course = c.course_id ORDER BY ca.max_chain_length DESC, ca.courses_in_chain DESC;",
      },
      {
        id: "ex2",
        question:
          "📊 Create an advanced window function query that ranks students across multiple dimensions (overall, by major, by year) with percentiles, quartiles, and gap analysis between consecutive students.",
        expectedQuery:
          "WITH student_rankings AS (SELECT s.student_id, s.student_name, s.major, s.enrollment_year, s.gpa, ROW_NUMBER() OVER (ORDER BY s.gpa DESC) as overall_rank, DENSE_RANK() OVER (PARTITION BY s.major ORDER BY s.gpa DESC) as major_rank, PERCENT_RANK() OVER (ORDER BY s.gpa) as overall_percentile, NTILE(4) OVER (PARTITION BY s.major ORDER BY s.gpa) as major_quartile, LAG(s.gpa) OVER (ORDER BY s.gpa DESC) as prev_gpa, LEAD(s.gpa) OVER (ORDER BY s.gpa DESC) as next_gpa FROM students s WHERE s.gpa IS NOT NULL) SELECT student_name, major, gpa, overall_rank, major_rank, ROUND(overall_percentile * 100, 1) as percentile, major_quartile, prev_gpa - gpa as gap_above, gpa - next_gpa as gap_below, CASE WHEN overall_percentile >= 0.95 THEN 'Top 5%' WHEN overall_percentile >= 0.75 THEN 'Top 25%' WHEN overall_percentile >= 0.50 THEN 'Above Average' ELSE 'Below Average' END as performance_tier FROM student_rankings ORDER BY overall_rank",
        hint: "Use ROW_NUMBER, DENSE_RANK, PERCENT_RANK, NTILE for different ranking types, LAG/LEAD for gap analysis, partition by different dimensions",
        solution:
          "WITH comprehensive_rankings AS (SELECT s.student_id, s.student_name, s.major, EXTRACT(YEAR FROM s.enrollment_date) as enrollment_year, s.gpa, -- Multiple ranking approaches ROW_NUMBER() OVER (ORDER BY s.gpa DESC) as overall_rank, DENSE_RANK() OVER (PARTITION BY s.major ORDER BY s.gpa DESC) as major_rank, RANK() OVER (PARTITION BY EXTRACT(YEAR FROM s.enrollment_date) ORDER BY s.gpa DESC) as year_rank, -- Percentile and quartile analysis PERCENT_RANK() OVER (ORDER BY s.gpa) as overall_percentile, PERCENT_RANK() OVER (PARTITION BY s.major ORDER BY s.gpa) as major_percentile, NTILE(10) OVER (ORDER BY s.gpa) as overall_decile, NTILE(4) OVER (PARTITION BY s.major ORDER BY s.gpa) as major_quartile, -- Gap analysis with neighboring students LAG(s.gpa, 1) OVER (ORDER BY s.gpa DESC) as prev_student_gpa, LEAD(s.gpa, 1) OVER (ORDER BY s.gpa DESC) as next_student_gpa, LAG(s.gpa, 1) OVER (PARTITION BY s.major ORDER BY s.gpa DESC) as prev_major_gpa, LEAD(s.gpa, 1) OVER (PARTITION BY s.major ORDER BY s.gpa DESC) as next_major_gpa, -- Statistical context AVG(s.gpa) OVER (PARTITION BY s.major) as major_avg_gpa, COUNT(*) OVER (PARTITION BY s.major) as major_peer_count FROM students s WHERE s.gpa IS NOT NULL AND s.status = 'Active'), enhanced_analysis AS (SELECT *, -- Calculate gaps prev_student_gpa - gpa as overall_gap_above, gpa - next_student_gpa as overall_gap_below, prev_major_gpa - gpa as major_gap_above, gpa - next_major_gpa as major_gap_below, -- Relative positioning gpa - major_avg_gpa as gpa_vs_major_avg FROM comprehensive_rankings) SELECT student_name, major, enrollment_year, ROUND(gpa, 2) as gpa, overall_rank, major_rank, year_rank, ROUND(overall_percentile * 100, 1) as overall_percentile_pct, ROUND(major_percentile * 100, 1) as major_percentile_pct, overall_decile, major_quartile, major_peer_count, ROUND(overall_gap_above, 3) as gap_to_next_higher, ROUND(overall_gap_below, 3) as gap_to_next_lower, ROUND(major_gap_above, 3) as major_gap_above, ROUND(gpa_vs_major_avg, 3) as vs_major_average, -- Performance categorization CASE WHEN overall_percentile >= 0.95 THEN '🌟 Top 5%' WHEN overall_percentile >= 0.90 THEN '⭐ Top 10%' WHEN overall_percentile >= 0.75 THEN '✅ Top 25%' WHEN overall_percentile >= 0.50 THEN '📈 Above Average' ELSE '⚠️ Below Average' END as performance_tier, CASE WHEN major_quartile = 1 THEN 'Top performer in major' WHEN gpa_vs_major_avg > 0.5 THEN 'Well above major average' WHEN gpa_vs_major_avg > 0 THEN 'Above major average' WHEN gpa_vs_major_avg > -0.5 THEN 'Below major average' ELSE 'Well below major average' END as major_standing FROM enhanced_analysis ORDER BY overall_rank LIMIT 50;",
      },
      {
        id: "ex3",
        question:
          "⚡ Write an optimized analytical query using materialized CTEs, proper indexing hints, and efficient window functions to analyze student performance trends with execution plan analysis.",
        expectedQuery:
          "EXPLAIN (ANALYZE, BUFFERS) WITH enrollment_facts AS MATERIALIZED (SELECT e.student_id, e.semester, c.credits, c.department, CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END as grade_points FROM enrollments e JOIN courses c ON e.course_id = c.course_id WHERE e.grade IS NOT NULL AND e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years'), student_metrics AS (SELECT student_id, COUNT(*) as course_count, SUM(credits * grade_points) / SUM(credits) as weighted_gpa, AVG(grade_points) OVER (ORDER BY student_id ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) as local_avg FROM enrollment_facts GROUP BY student_id HAVING COUNT(*) >= 5) SELECT s.student_name, sm.course_count, ROUND(sm.weighted_gpa, 2) as gpa, RANK() OVER (ORDER BY sm.weighted_gpa DESC) as gpa_rank FROM student_metrics sm JOIN students s ON sm.student_id = s.student_id ORDER BY gpa_rank LIMIT 100",
        hint: "Use MATERIALIZED CTEs for better performance, include EXPLAIN ANALYZE for execution plan, optimize window functions, filter early in CTEs",
        solution:
          "-- Performance-optimized analytical query with execution analysis EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) WITH -- Materialized CTE for better performance with large datasets enrollment_facts AS MATERIALIZED (SELECT e.student_id, e.course_id, e.semester, e.grade, c.credits, c.department, c.course_level, -- Pre-calculate grade points to avoid repetition CASE e.grade WHEN 'A+' THEN 4.0 WHEN 'A' THEN 4.0 WHEN 'A-' THEN 3.7 WHEN 'B+' THEN 3.3 WHEN 'B' THEN 3.0 WHEN 'B-' THEN 2.7 WHEN 'C+' THEN 2.3 WHEN 'C' THEN 2.0 WHEN 'C-' THEN 1.7 WHEN 'D+' THEN 1.3 WHEN 'D' THEN 1.0 ELSE 0.0 END as grade_points, -- Pre-filter for performance CASE WHEN e.grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C') THEN 1 ELSE 0 END as passed FROM enrollments e INNER JOIN courses c ON e.course_id = c.course_id WHERE e.enrollment_date >= CURRENT_DATE - INTERVAL '2 years' -- Partition pruning AND e.grade IS NOT NULL -- Filter nulls early), -- Aggregated metrics to reduce downstream computation student_performance AS (SELECT student_id, COUNT(*) as total_courses, SUM(credits) as total_credits, -- Weighted GPA calculation SUM(grade_points * credits) / NULLIF(SUM(credits), 0) as weighted_gpa, SUM(passed) as courses_passed, COUNT(DISTINCT semester) as semesters_active, COUNT(DISTINCT department) as departments_studied, -- Performance variability STDDEV(grade_points) as grade_consistency, MIN(grade_points) as lowest_grade, MAX(grade_points) as highest_grade FROM enrollment_facts GROUP BY student_id HAVING COUNT(*) >= 3 -- Filter early for performance), -- Efficient window function usage with limited partitions performance_analytics AS (SELECT s.student_name, s.major, sp.*, -- Efficient ranking with proper window definition DENSE_RANK() OVER w_gpa as gpa_rank, PERCENT_RANK() OVER w_gpa as gpa_percentile, -- Limited window for performance LAG(weighted_gpa, 1) OVER w_major as prev_major_gpa, -- Efficient aggregation COUNT(*) OVER w_major as major_peers, AVG(weighted_gpa) OVER w_major as major_avg_gpa FROM student_performance sp JOIN students s ON sp.student_id = s.student_id WHERE sp.weighted_gpa IS NOT NULL WINDOW w_gpa AS (ORDER BY sp.weighted_gpa DESC), w_major AS (PARTITION BY s.major ORDER BY sp.weighted_gpa DESC)) SELECT student_name, major, total_courses, total_credits, ROUND(weighted_gpa, 2) as gpa, courses_passed, semesters_active, departments_studied, gpa_rank, ROUND(gpa_percentile * 100, 1) as percentile, -- Performance indicators CASE WHEN gpa_percentile >= 0.95 THEN '🌟 Exceptional' WHEN gpa_percentile >= 0.85 THEN '⭐ Excellent' WHEN gpa_percentile >= 0.70 THEN '✅ Good' WHEN gpa_percentile >= 0.50 THEN '📈 Average' ELSE '⚠️ Below Average' END as performance_tier, -- Consistency analysis CASE WHEN grade_consistency <= 0.5 THEN 'Highly Consistent' WHEN grade_consistency <= 1.0 THEN 'Moderately Consistent' ELSE 'Inconsistent Performance' END as consistency_level FROM performance_analytics ORDER BY gpa_rank LIMIT 100; -- Create supporting indexes for optimal performance -- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_performance ON enrollments(enrollment_date, grade, student_id, course_id) WHERE grade IS NOT NULL; -- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_analytics ON courses(course_id, credits, department, course_level);",
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

// Re-export NoSQL lessons for unified access
export {
  nosqlLessons,
  getNoSQLLessonById,
  getNoSQLLessonsByCategory,
  getNoSQLLessonsByDifficulty,
  getAllNoSQLLessons,
} from "./nosql-lessons";

// Import NoSQL lessons
import { getAllNoSQLLessons } from "./nosql-lessons";

// Combined function to get all lessons (SQL + NoSQL)
export function getAllLessons(): Lesson[] {
  return [...lessons, ...getAllNoSQLLessons()];
}
