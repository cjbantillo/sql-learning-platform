"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export default function Aggregates() {
  const functions = [
    { name: "COUNT()", desc: "Number of rows", example: "COUNT(*)" },
    { name: "SUM()", desc: "Total of values", example: "SUM(grade)" },
    { name: "AVG()", desc: "Average value", example: "AVG(grade)" },
    { name: "MIN()", desc: "Smallest value", example: "MIN(grade)" },
    { name: "MAX()", desc: "Largest value", example: "MAX(grade)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Aggregate Functions: COUNT, SUM, AVG, MIN, MAX
        </h2>
        <p className="text-gray-700 mb-4">
          Aggregate functions perform calculations on sets of values and return
          a single result. Essential for statistics, reporting, and data
          analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {functions.map((func, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-900">{func.name}</h3>
            </div>
            <p className="text-gray-700 text-sm mb-2">{func.desc}</p>
            <code className="text-xs bg-white px-2 py-1 rounded block">
              {func.example}
            </code>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            COUNT: Counting Rows
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Count all rows:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT COUNT(*) FROM students;</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Returns total number of students
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Count non-NULL values:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT COUNT(email) FROM students;</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Only counts rows where email is not NULL
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Count distinct values:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT COUNT(DISTINCT city) FROM students;</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Returns number of unique cities
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            SUM & AVG: Mathematical Operations
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Total of all grades:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT SUM(grade) AS total_points FROM students;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Average grade:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT AVG(grade) AS average_grade FROM students;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                With filtering:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT AVG(grade) AS avg_grade
FROM students
WHERE city = 'Butuan';`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Average grade for Butuan students only
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            MIN & MAX: Finding Extremes
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Highest grade:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT MAX(grade) AS highest_grade FROM students;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Lowest grade:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>SELECT MIN(grade) AS lowest_grade FROM students;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Range (max - min):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  MAX(grade) - MIN(grade) AS grade_range
FROM students;`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Combining Multiple Aggregates
          </h3>

          <div className="bg-gray-900 text-white p-3 rounded text-sm">
            <pre>
              <code>{`SELECT 
  COUNT(*) AS total_students,
  AVG(grade) AS average_grade,
  MIN(grade) AS lowest_grade,
  MAX(grade) AS highest_grade,
  SUM(grade) AS total_points
FROM students
WHERE grade >= 75;`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 p-3 rounded mt-3 text-sm">
            <p className="text-blue-800">
              <strong>Result:</strong> A single row with statistical summary of
              passing students
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Important Notes</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          <li>Aggregate functions ignore NULL values (except COUNT(*))</li>
          <li>Cannot mix aggregates with regular columns without GROUP BY</li>
          <li>Use aliases (AS) for readable column names</li>
          <li>
            AVG returns decimal; use ROUND() if needed:{" "}
            <code className="bg-white px-1 rounded">ROUND(AVG(grade), 2)</code>
          </li>
        </ul>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Real-World Example: Class Statistics
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`-- Generate a comprehensive report for each class
SELECT 
  'Database Systems' AS course,
  COUNT(*) AS enrolled_students,
  ROUND(AVG(grade), 2) AS class_average,
  MIN(grade) AS lowest_score,
  MAX(grade) AS highest_score,
  COUNT(CASE WHEN grade >= 75 THEN 1 END) AS passing_count
FROM students
WHERE course_id = 101;`}</code>
        </pre>
      </div>
    </div>
  );
}
