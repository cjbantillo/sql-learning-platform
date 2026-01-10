"use client";

import { motion } from "framer-motion";

export default function SQLBasics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          SQL Basics: SELECT Statements
        </h2>
        <p className="text-gray-700 mb-4">
          The SELECT statement is the foundation of SQL. It retrieves data from
          one or more tables. Master these fundamentals before moving to complex
          queries.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Basic Syntax</h3>
        <div className="bg-gray-900 text-white p-4 rounded mt-2">
          <pre className="text-sm">
            <code>{`SELECT column1, column2
FROM table_name;`}</code>
          </pre>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Core Concepts</h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">
              1. SELECT * (Select All Columns)
            </h4>
            <p className="text-gray-700 mb-2">
              Retrieves every column from the table:
            </p>
            <div className="bg-gray-900 text-white p-3 rounded text-sm">
              <code>SELECT * FROM students;</code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              ⚠️ Avoid in production — specify only needed columns for better
              performance.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">
              2. SELECT DISTINCT (Remove Duplicates)
            </h4>
            <p className="text-gray-700 mb-2">Returns only unique values:</p>
            <div className="bg-gray-900 text-white p-3 rounded text-sm">
              <code>SELECT DISTINCT city FROM students;</code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Useful for finding all unique cities where students live.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">
              3. WHERE (Filter Rows)
            </h4>
            <p className="text-gray-700 mb-2">
              Filters results based on conditions:
            </p>
            <div className="bg-gray-900 text-white p-3 rounded text-sm">
              <code>{`SELECT name, grade
FROM students
WHERE grade >= 90;`}</code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Returns only students with grade 90 or above.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">
              4. ORDER BY (Sort Results)
            </h4>
            <p className="text-gray-700 mb-2">
              Sorts results in ascending (ASC) or descending (DESC) order:
            </p>
            <div className="bg-gray-900 text-white p-3 rounded text-sm">
              <code>{`SELECT name, grade
FROM students
ORDER BY grade DESC;`}</code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Displays students from highest to lowest grade.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Common Comparison Operators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded">=</code> Equal to
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">!=</code> or{" "}
            <code className="bg-white px-2 py-1 rounded">&lt;&gt;</code> Not
            equal
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">&gt;</code> Greater
            than
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">&lt;</code> Less than
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">&gt;=</code> Greater or
            equal
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">&lt;=</code> Less or
            equal
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Complete Example</h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`-- Find all students from Butuan with grade above 85, sorted by name
SELECT name, email, grade
FROM students
WHERE city = 'Butuan' AND grade > 85
ORDER BY name ASC;`}</code>
        </pre>
      </div>
    </div>
  );
}
