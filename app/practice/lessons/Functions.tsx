"use client";

import { motion } from "framer-motion";
import { Type, Hash, Calendar } from "lucide-react";

export default function Functions() {
  const stringFunctions = [
    {
      name: "CONCAT()",
      example: "CONCAT(first_name, ' ', last_name)",
      result: "Juan Dela Cruz",
    },
    { name: "UPPER()", example: "UPPER('hello')", result: "HELLO" },
    { name: "LOWER()", example: "LOWER('HELLO')", result: "hello" },
    { name: "LENGTH()", example: "LENGTH('hello')", result: "5" },
    { name: "SUBSTRING()", example: "SUBSTRING('hello', 1, 3)", result: "hel" },
    { name: "TRIM()", example: "TRIM('  hello  ')", result: "hello" },
  ];

  const numericFunctions = [
    { name: "ABS()", example: "ABS(-15)", result: "15" },
    { name: "ROUND()", example: "ROUND(3.7)", result: "4" },
    { name: "CEIL()", example: "CEIL(3.2)", result: "4" },
    { name: "FLOOR()", example: "FLOOR(3.8)", result: "3" },
    { name: "MOD()", example: "MOD(10, 3)", result: "1" },
    { name: "POWER()", example: "POWER(2, 3)", result: "8" },
  ];

  const dateFunctions = [
    { name: "NOW()", example: "NOW()", result: "2024-01-15 14:30:00" },
    { name: "CURDATE()", example: "CURDATE()", result: "2024-01-15" },
    {
      name: "DATE_FORMAT()",
      example: "DATE_FORMAT(NOW(), '%Y-%m-%d')",
      result: "2024-01-15",
    },
    {
      name: "DATEDIFF()",
      example: "DATEDIFF('2024-12-31', '2024-01-01')",
      result: "365",
    },
    {
      name: "DATE_ADD()",
      example: "DATE_ADD(NOW(), INTERVAL 7 DAY)",
      result: "+7 days",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          SQL Functions: String, Numeric, Date
        </h2>
        <p className="text-gray-700 mb-4">
          Built-in functions transform and manipulate data. Essential for
          formatting output, calculations, and working with dates.
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              String Functions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {stringFunctions.map((func, i) => (
              <div key={i} className="bg-blue-50 p-3 rounded text-sm">
                <p className="font-bold text-gray-900 mb-1">{func.name}</p>
                <code className="text-xs bg-white px-2 py-1 rounded block mb-1">
                  {func.example}
                </code>
                <p className="text-gray-600 text-xs">→ {func.result}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Combine first and last name:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Format email addresses:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT LOWER(CONCAT(first_name, '.', last_name, '@carsu.edu.ph')) AS email
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Extract initials:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  CONCAT(
    SUBSTRING(first_name, 1, 1),
    SUBSTRING(last_name, 1, 1)
  ) AS initials
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Clean whitespace:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`UPDATE students
SET name = TRIM(name);  -- Remove leading/trailing spaces`}</code>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Numeric Functions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {numericFunctions.map((func, i) => (
              <div key={i} className="bg-green-50 p-3 rounded text-sm">
                <p className="font-bold text-gray-900 mb-1">{func.name}</p>
                <code className="text-xs bg-white px-2 py-1 rounded block mb-1">
                  {func.example}
                </code>
                <p className="text-gray-600 text-xs">→ {func.result}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Round average to 2 decimals:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT ROUND(AVG(grade), 2) AS average_grade
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Calculate percentage:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  grade,
  ROUND((grade / 100) * 100, 1) AS percentage
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Grade difference from perfect score:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  ABS(100 - grade) AS points_from_perfect
FROM students;`}</code>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Date & Time Functions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {dateFunctions.map((func, i) => (
              <div key={i} className="bg-purple-50 p-3 rounded text-sm">
                <p className="font-bold text-gray-900 mb-1">{func.name}</p>
                <code className="text-xs bg-white px-2 py-1 rounded block mb-1">
                  {func.example}
                </code>
                <p className="text-gray-600 text-xs">→ {func.result}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Insert current date:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (123, 101, NOW());`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find students enrolled in last 30 days:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name, enrollment_date
FROM students
WHERE enrollment_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Calculate age from birthdate:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  birthdate,
  TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Format date display:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  DATE_FORMAT(enrollment_date, '%M %d, %Y') AS formatted_date
FROM students;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Result: January 15, 2024
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Days until deadline:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  course_name,
  DATEDIFF(deadline, CURDATE()) AS days_remaining
FROM assignments
WHERE deadline >= CURDATE();`}</code>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Nesting Functions
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Combine multiple functions for complex transformations:
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Generate username from name:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  LOWER(
    CONCAT(
      SUBSTRING(first_name, 1, 1),
      last_name
    )
  ) AS username
FROM students;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Juan Dela Cruz → jdelacruz
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Calculate weighted average:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  ROUND(
    (midterm * 0.3 + finals * 0.4 + project * 0.3),
    2
  ) AS final_grade
FROM grades;`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Complete Example: Student Report
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`SELECT 
  CONCAT(UPPER(SUBSTRING(first_name, 1, 1)), 
         LOWER(SUBSTRING(first_name, 2))) AS first_name,
  CONCAT(UPPER(SUBSTRING(last_name, 1, 1)), 
         LOWER(SUBSTRING(last_name, 2))) AS last_name,
  ROUND(AVG(grade), 2) AS gpa,
  TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age,
  DATE_FORMAT(enrollment_date, '%M %d, %Y') AS enrolled
FROM students
GROUP BY student_id
ORDER BY gpa DESC;`}</code>
        </pre>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Database Differences
        </h3>
        <p className="text-gray-700 text-sm">
          Function names vary by database system:
          <br />• MySQL: <code className="bg-white px-1 rounded">CONCAT()</code>
          , <code className="bg-white px-1 rounded">LENGTH()</code>
          <br />• PostgreSQL: <code className="bg-white px-1 rounded">
            ||
          </code>{" "}
          for concat,{" "}
          <code className="bg-white px-1 rounded">CHAR_LENGTH()</code>
          <br />• SQL Server: <code className="bg-white px-1 rounded">
            +
          </code>{" "}
          for concat, <code className="bg-white px-1 rounded">LEN()</code>
          <br />
          Always check your database documentation!
        </p>
      </div>
    </div>
  );
}
