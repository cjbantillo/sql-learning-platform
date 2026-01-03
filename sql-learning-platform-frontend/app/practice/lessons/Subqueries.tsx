"use client";

import { Layers } from "lucide-react";

export default function Subqueries() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Subqueries: Nested SELECT Statements
        </h2>
        <p className="text-gray-700 mb-4">
          A subquery is a SELECT query inside another query. Use them to solve
          complex problems by breaking them into logical steps.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-lg p-5">
        <Layers className="w-12 h-12 text-blue-600" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Think of Subqueries as...
          </h3>
          <p className="text-gray-700 text-sm">
            A query within a query. The inner query runs first, then the outer
            query uses its results.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Scalar Subqueries (Single Value)
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Returns a single value, used in WHERE, SELECT, or HAVING.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find students with above-average grade:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name, grade
FROM students
WHERE grade > (SELECT AVG(grade) FROM students);`}</code>
              </div>
              <div className="bg-blue-50 p-2 rounded mt-2 text-xs">
                <strong>Step 1:</strong> Inner query calculates average
                <br />
                <strong>Step 2:</strong> Outer query filters by that value
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Include the average in results:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name, 
  grade,
  (SELECT AVG(grade) FROM students) AS class_average
FROM students;`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Multi-Row Subqueries with IN
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Returns multiple values, used with IN, ANY, or ALL.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find students enrolled in specific courses:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name
FROM students
WHERE student_id IN (
  SELECT student_id 
  FROM enrollments 
  WHERE course_id = 101
);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find courses taught by specific instructors:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT course_name
FROM courses
WHERE instructor_id IN (
  SELECT instructor_id 
  FROM instructors 
  WHERE department = 'CCS'
);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Using NOT IN:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Students with no enrollments
SELECT name
FROM students
WHERE student_id NOT IN (
  SELECT DISTINCT student_id FROM enrollments
);`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            EXISTS: Checking for Existence
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Returns TRUE if subquery returns any rows. More efficient than IN
            for large datasets.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find students who are enrolled:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name
FROM students s
WHERE EXISTS (
  SELECT 1 
  FROM enrollments e 
  WHERE e.student_id = s.student_id
);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Find courses with no enrollments (NOT EXISTS):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT course_name
FROM courses c
WHERE NOT EXISTS (
  SELECT 1 
  FROM enrollments e 
  WHERE e.course_id = c.course_id
);`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ANY and ALL Operators
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                ANY: Match at least one value
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Grade higher than any freshman
SELECT name, grade
FROM students
WHERE grade > ANY (
  SELECT grade FROM students WHERE year_level = 1
);`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Higher than the minimum freshman grade
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                ALL: Match all values
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Grade higher than all freshmen
SELECT name, grade
FROM students
WHERE grade > ALL (
  SELECT grade FROM students WHERE year_level = 1
);`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Higher than the maximum freshman grade
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Subqueries in FROM (Derived Tables)
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Query results as a temporary table:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT city, avg_grade
FROM (
  SELECT city, AVG(grade) AS avg_grade
  FROM students
  GROUP BY city
) AS city_averages
WHERE avg_grade > 80;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Must use an alias (city_averages)
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Complex aggregation:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  AVG(student_count) AS avg_students_per_city
FROM (
  SELECT city, COUNT(*) AS student_count
  FROM students
  GROUP BY city
) AS counts;`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Real-World Example: Top Performers
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`-- Find students in the top 10% of their year level
SELECT s1.name, s1.year_level, s1.grade
FROM students s1
WHERE s1.grade >= (
  SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY grade)
  FROM students s2
  WHERE s2.year_level = s1.year_level
)
ORDER BY s1.year_level, s1.grade DESC;`}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="font-semibold text-gray-900 mb-2">
            When to Use Subqueries
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Compare against aggregated values</li>
            <li>Filter based on results from another table</li>
            <li>Break complex logic into steps</li>
            <li>Create derived tables for analysis</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="font-semibold text-gray-900 mb-2">Performance Tips</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>EXISTS is faster than IN for large datasets</li>
            <li>
              Avoid correlated subqueries if possible (JOIN is often faster)
            </li>
            <li>Test both subquery and JOIN approaches</li>
            <li>Consider using WITH (CTE) for readability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
