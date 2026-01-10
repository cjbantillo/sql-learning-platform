"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Code, Lightbulb } from "lucide-react";

export default function AdvancedTopics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Advanced SQL: CASE, NULL Handling, Security & Best Practices
        </h2>
        <p className="text-gray-700 mb-4">
          Master advanced techniques for conditional logic, NULL values, SQL
          injection prevention, and professional SQL practices.
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              CASE: Conditional Logic
            </h3>
          </div>
          <p className="text-gray-700 mb-3 text-sm">
            CASE expressions add if-then-else logic to SQL queries. Think of it
            as SQL&apos;s version of if statements.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Simple CASE Syntax:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  name,
  grade,
  CASE
    WHEN grade >= 90 THEN 'Excellent'
    WHEN grade >= 80 THEN 'Good'
    WHEN grade >= 75 THEN 'Passing'
    ELSE 'Needs Improvement'
  END AS performance
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                CASE in SELECT (Categorization):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  course_name,
  units,
  CASE
    WHEN units <= 2 THEN 'Light'
    WHEN units = 3 THEN 'Standard'
    ELSE 'Heavy'
  END AS course_load
FROM courses;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                CASE in ORDER BY:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name, year_level
FROM students
ORDER BY 
  CASE year_level
    WHEN 4 THEN 1  -- Seniors first
    WHEN 3 THEN 2
    WHEN 2 THEN 3
    WHEN 1 THEN 4  -- Freshmen last
  END;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                CASE in WHERE (Complex Conditions):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT name, grade, scholarship_status
FROM students
WHERE 
  CASE scholarship_status
    WHEN 'full' THEN grade >= 90
    WHEN 'partial' THEN grade >= 85
    ELSE grade >= 75
  END;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                CASE for Conditional Aggregation:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`SELECT 
  COUNT(*) AS total_students,
  COUNT(CASE WHEN grade >= 75 THEN 1 END) AS passing,
  COUNT(CASE WHEN grade < 75 THEN 1 END) AS failing,
  SUM(CASE WHEN grade >= 90 THEN 1 ELSE 0 END) AS honors
FROM students;`}</code>
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
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-gray-900">NULL Handling</h3>
          </div>
          <p className="text-gray-700 mb-3 text-sm">
            NULL means &quot;unknown&quot; or &quot;missing data&quot; - not
            zero, not empty string. Requires special handling.
          </p>

          <div className="space-y-4 text-sm">
            <div className="bg-yellow-50 p-3 rounded">
              <p className="font-bold text-gray-900 mb-2">NULL Behavior:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>NULL = NULL returns NULL (not TRUE!)</li>
                <li>
                  NULL in calculations makes result NULL (5 + NULL = NULL)
                </li>
                <li>Use IS NULL or IS NOT NULL to check</li>
                <li>Functions like COUNT skip NULL values</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Check for NULL:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Find students without email
SELECT name FROM students WHERE email IS NULL;

-- Find students with email
SELECT name FROM students WHERE email IS NOT NULL;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                COALESCE: Provide Fallback Values:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Use first non-NULL value
SELECT 
  name,
  COALESCE(phone, email, 'No contact') AS contact
FROM students;`}</code>
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Returns phone if exists, else email, else &apos;No contact&apos;
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                NULLIF: Convert Values to NULL:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Treat empty strings as NULL
SELECT 
  name,
  NULLIF(email, '') AS email
FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                IFNULL / NVL (MySQL / Oracle):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- MySQL
SELECT name, IFNULL(grade, 0) AS grade FROM students;

-- Oracle
SELECT name, NVL(grade, 0) AS grade FROM students;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                NULL in Aggregates:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- AVG ignores NULL (calculates from non-NULL values only)
SELECT AVG(grade) FROM students;

-- COUNT(*) includes NULLs, COUNT(column) excludes NULLs
SELECT 
  COUNT(*) AS total,
  COUNT(email) AS with_email
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
            <Shield className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">
              SQL Injection Prevention
            </h3>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
            <p className="font-bold text-red-900 mb-2">
              ⚠️ CRITICAL SECURITY ISSUE
            </p>
            <p className="text-red-800 text-sm">
              SQL injection is when attackers insert malicious SQL code through
              user input. Can lead to data theft, deletion, or unauthorized
              access.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-red-700 mb-2">
                ❌ NEVER DO THIS (Vulnerable):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`// JavaScript example - UNSAFE!
const username = req.body.username;  // User input: "admin' OR '1'='1"
const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
// Results in: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// Returns ALL users!`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-green-700 mb-2">
                ✅ USE PARAMETERIZED QUERIES (Safe):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`// Node.js with MySQL2
const query = 'SELECT * FROM users WHERE username = ?';
db.execute(query, [username]);

// Python with SQLite
cursor.execute('SELECT * FROM users WHERE username = ?', (username,))

// PHP PDO
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
$stmt->execute(['username' => $username]);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Additional Protection:
              </p>
              <div className="bg-blue-50 p-3 rounded">
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <strong>Input Validation:</strong> Check data type, length,
                    format
                  </li>
                  <li>
                    <strong>Least Privilege:</strong> Database users should have
                    minimal permissions
                  </li>
                  <li>
                    <strong>Escape Input:</strong> Use library functions to
                    escape special characters
                  </li>
                  <li>
                    <strong>Use ORMs:</strong> Frameworks like Sequelize,
                    SQLAlchemy prevent injection
                  </li>
                  <li>
                    <strong>Never Trust User Input:</strong> Validate on both
                    client AND server
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Example Attack Scenarios:
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-700 mb-1">
                  <strong>Input:</strong> <code>admin&apos; --</code>
                </p>
                <p className="text-xs text-gray-700 mb-2">
                  <strong>Result:</strong> Comments out password check
                </p>

                <p className="text-xs text-gray-700 mb-1">
                  <strong>Input:</strong>{" "}
                  <code>&apos;; DROP TABLE students; --</code>
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Result:</strong> Deletes entire table!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Best Practices & Pro Tips
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">Query Writing</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Use meaningful aliases</li>
                <li>Format for readability (indentation)</li>
                <li>Comment complex queries</li>
                <li>SELECT specific columns, not *</li>
                <li>Use LIMIT for testing</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">Performance</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Index frequently queried columns</li>
                <li>Avoid leading wildcards (%text)</li>
                <li>Use EXPLAIN to analyze queries</li>
                <li>Minimize subqueries</li>
                <li>Consider denormalization for reads</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">Data Integrity</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Use foreign keys</li>
                <li>Implement constraints</li>
                <li>Validate before INSERT/UPDATE</li>
                <li>Use transactions for related changes</li>
                <li>Regular backups</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">Security</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Always use parameterized queries</li>
                <li>Encrypt sensitive data</li>
                <li>Limit user permissions</li>
                <li>Audit database access</li>
                <li>Keep software updated</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Transactions: ACID Properties
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Transactions ensure data consistency when multiple operations must
            succeed or fail together.
          </p>

          <div className="space-y-3 text-sm">
            <div className="bg-gray-900 text-white p-2 rounded">
              <code>{`-- Start transaction
START TRANSACTION;

-- Multiple operations
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- If all succeed
COMMIT;

-- If any fails
ROLLBACK;`}</code>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-bold text-gray-900 mb-1">Atomicity</p>
                <p className="text-gray-700 text-xs">
                  All operations succeed or all fail
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-gray-900 mb-1">Consistency</p>
                <p className="text-gray-700 text-xs">
                  Database stays in valid state
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-bold text-gray-900 mb-1">Isolation</p>
                <p className="text-gray-700 text-xs">
                  Transactions don&apos;t interfere
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-bold text-gray-900 mb-1">Durability</p>
                <p className="text-gray-700 text-xs">
                  Changes persist after commit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Complete Professional Query Example
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`-- Well-formatted, secure, and efficient query
SELECT 
  -- Clear aliases for readability
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS full_name,
  
  -- Handle NULL values gracefully
  COALESCE(s.email, 'No email provided') AS contact,
  
  -- Conditional logic with CASE
  CASE
    WHEN AVG(e.grade) >= 90 THEN 'Dean''s List'
    WHEN AVG(e.grade) >= 85 THEN 'Honor Roll'
    WHEN AVG(e.grade) >= 75 THEN 'Good Standing'
    ELSE 'Needs Support'
  END AS academic_status,
  
  -- Aggregation with proper handling
  ROUND(AVG(COALESCE(e.grade, 0)), 2) AS gpa,
  COUNT(e.enrollment_id) AS courses_taken
  
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id

-- Filter before aggregation for performance
WHERE s.is_active = TRUE
  AND s.enrollment_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)

-- Group by all non-aggregated columns
GROUP BY s.student_id, s.first_name, s.last_name, s.email

-- Filter groups after aggregation
HAVING COUNT(e.enrollment_id) > 0

-- Sort results logically
ORDER BY gpa DESC, full_name ASC

-- Limit for pagination
LIMIT 50;`}</code>
        </pre>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          🎓 Congratulations!
        </h3>
        <p className="text-gray-700 text-sm">
          You&apos;ve completed the CSU Digital Academy SQL curriculum! You now
          have the knowledge to:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
          <li>Design normalized databases with proper schemas</li>
          <li>
            Write complex queries with joins, subqueries, and aggregations
          </li>
          <li>
            Optimize performance with indexes and efficient query patterns
          </li>
          <li>Secure databases against SQL injection attacks</li>
          <li>Handle real-world scenarios professionally</li>
        </ul>
        <p className="text-gray-700 text-sm mt-3">
          <strong>Next Steps:</strong> Practice with real databases, build
          projects, and explore specific database systems (PostgreSQL, MySQL,
          SQLite) in depth!
        </p>
      </div>
    </div>
  );
}
