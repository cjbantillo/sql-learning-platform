"use client";

import { motion } from "framer-motion";

export default function FilteringPatterns() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Filtering & Patterns: LIKE, IN, BETWEEN, Wildcards
        </h2>
        <p className="text-gray-700 mb-4">
          Beyond simple equality checks, SQL provides powerful pattern matching
          and set-based filtering to handle complex search requirements.
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            LIKE: Pattern Matching
          </h3>
          <p className="text-gray-700 mb-3">
            Search for patterns in text using wildcards:
          </p>

          <div className="bg-blue-50 p-3 rounded mb-3">
            <p className="font-semibold text-gray-900 mb-2">Wildcards:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-white px-2 py-0.5 rounded">%</code> = any
                sequence of characters (0 or more)
              </li>
              <li>
                <code className="bg-white px-2 py-0.5 rounded">_</code> =
                exactly one character
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Starts with &apos;J&apos;:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>
                  SELECT * FROM students WHERE name LIKE &apos;J%&apos;;
                </code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Matches: Juan, Jose, Juana
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Ends with &apos;Cruz&apos;:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>
                  SELECT * FROM students WHERE name LIKE &apos;%Cruz&apos;;
                </code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Matches: Juan Dela Cruz, Maria Cruz
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Contains &apos;an&apos;:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>
                  SELECT * FROM students WHERE name LIKE &apos;%an%&apos;;
                </code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Matches: Juan, Juana, Andrea
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Exactly 4 characters:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>
                  SELECT * FROM students WHERE name LIKE &apos;____&apos;;
                </code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Matches: Juan, Jose, Anna
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            IN: Check Against Multiple Values
          </h3>
          <p className="text-gray-700 mb-3">
            Test if a value matches any item in a list:
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Instead of multiple ORs:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Don't do this:
WHERE city = 'Butuan' OR city = 'Manila' OR city = 'Cebu'`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Use IN:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT * FROM students
WHERE city IN ('Butuan', 'Manila', 'Cebu');`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">With NOT IN:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT * FROM students
WHERE city NOT IN ('Butuan', 'Manila');`}</code>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            BETWEEN: Range Queries
          </h3>
          <p className="text-gray-700 mb-3">
            Find values within a range (inclusive):
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Numeric Range:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT * FROM students
WHERE grade BETWEEN 80 AND 90;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Equivalent to: grade &gt;= 80 AND grade &lt;= 90
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Date Range:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT * FROM enrollments
WHERE enrollment_date BETWEEN '2024-01-01' AND '2024-12-31';`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">NOT BETWEEN:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT * FROM students
WHERE grade NOT BETWEEN 60 AND 70;`}</code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Combining Techniques</h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`-- Find all students from specific cities with high grades
-- whose names start with 'J' or 'M'
SELECT name, city, grade
FROM students
WHERE city IN ('Butuan', 'Manila')
  AND grade BETWEEN 85 AND 100
  AND (name LIKE 'J%' OR name LIKE 'M%')
ORDER BY grade DESC;`}</code>
        </pre>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Performance Tip</h3>
        <p className="text-gray-700 text-sm">
          Leading wildcards (<code>%text</code>) can be slow on large tables
          because they prevent index usage. Prefer patterns like{" "}
          <code>text%</code> when possible.
        </p>
      </div>
    </div>
  );
}
