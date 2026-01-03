"use client";

import { motion } from "framer-motion";
import { Users, Filter } from "lucide-react";

export default function GroupingConditions() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          GROUP BY & HAVING: Grouped Aggregation
        </h2>
        <p className="text-gray-700 mb-4">
          GROUP BY organizes rows into groups based on column values, allowing
          aggregates per group. HAVING filters groups (like WHERE filters rows).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-5"
        >
          <Users className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">GROUP BY</h3>
          <p className="text-gray-700 text-sm">
            Divides rows into groups based on column values. Aggregates
            calculate per group.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-5"
        >
          <Filter className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">HAVING</h3>
          <p className="text-gray-700 text-sm">
            Filters groups after aggregation. Use WHERE to filter rows, HAVING
            to filter groups.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Basic GROUP BY
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Count students per city:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city;`}</code>
              </div>
              <div className="bg-blue-50 p-2 rounded mt-2 text-xs">
                <strong>Result:</strong> One row per city with its student count
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Average grade per course:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT course_id, AVG(grade) AS avg_grade
FROM enrollments
GROUP BY course_id;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Group by multiple columns:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, year_level, COUNT(*) AS count
FROM students
GROUP BY city, year_level;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Groups by each unique city + year_level combination
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            HAVING: Filtering Groups
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Cities with more than 10 students:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city
HAVING COUNT(*) > 10;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Courses with average grade above 85:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT course_id, AVG(grade) AS avg_grade
FROM enrollments
GROUP BY course_id
HAVING AVG(grade) > 85;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Using aggregate aliases in HAVING:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, AVG(grade) AS avg_grade
FROM students
GROUP BY city
HAVING avg_grade >= 80;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Some databases allow alias in HAVING (MySQL, PostgreSQL)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            WHERE vs HAVING
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-bold text-gray-900 mb-2">WHERE</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Filters rows BEFORE grouping</li>
                <li>• Cannot use aggregates</li>
                <li>• Operates on individual rows</li>
                <li>• Applied first</li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded">
              <h4 className="font-bold text-gray-900 mb-2">HAVING</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Filters groups AFTER grouping</li>
                <li>• Can use aggregate functions</li>
                <li>• Operates on grouped data</li>
                <li>• Applied after GROUP BY</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="font-semibold text-gray-700 mb-1">Combining both:</p>
            <div className="bg-gray-900 text-white p-2 rounded">
              <code>{`SELECT city, AVG(grade) AS avg_grade
FROM students
WHERE year_level = 4        -- Filter rows first
GROUP BY city
HAVING AVG(grade) > 85;      -- Filter groups after`}</code>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ORDER BY with GROUP BY
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Top cities by student count:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city
ORDER BY student_count DESC
LIMIT 5;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Order by aggregate and column:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, AVG(grade) AS avg_grade
FROM students
GROUP BY city
HAVING AVG(grade) >= 75
ORDER BY avg_grade DESC, city ASC;`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Complete Query Structure
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`SELECT 
  city,                           -- Column in GROUP BY
  year_level,                     -- Column in GROUP BY
  COUNT(*) AS student_count,      -- Aggregate
  AVG(grade) AS avg_grade         -- Aggregate
FROM students
WHERE grade IS NOT NULL           -- Filter rows (before grouping)
GROUP BY city, year_level          -- Group by these columns
HAVING COUNT(*) >= 5               -- Filter groups (after grouping)
ORDER BY avg_grade DESC;           -- Sort final results`}</code>
        </pre>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Common Mistake</h3>
        <p className="text-gray-700 text-sm mb-2">
          <strong>Invalid:</strong> Selecting columns not in GROUP BY without
          aggregation
        </p>
        <div className="bg-white p-2 rounded text-xs mb-2">
          <code className="text-red-600">{`-- WRONG: name is not grouped or aggregated
SELECT city, name, COUNT(*)
FROM students
GROUP BY city;`}</code>
        </div>
        <p className="text-gray-700 text-sm">
          <strong>Rule:</strong> SELECT can only include: GROUP BY columns,
          aggregates, or constants.
        </p>
      </div>
    </div>
  );
}
