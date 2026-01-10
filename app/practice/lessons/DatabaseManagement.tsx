"use client";

import { motion } from "framer-motion";
import { Database, Key, Eye, Zap } from "lucide-react";

export default function DatabaseManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Database Management: DDL & Schema Design
        </h2>
        <p className="text-gray-700 mb-4">
          Data Definition Language (DDL) commands create, modify, and delete
          database structures. Learn to design schemas, enforce constraints, and
          optimize with indexes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Database,
            title: "CREATE/DROP",
            desc: "Define structures",
            color: "blue",
          },
          {
            icon: Key,
            title: "Constraints",
            desc: "Enforce rules",
            color: "green",
          },
          {
            icon: Zap,
            title: "Indexes",
            desc: "Speed queries",
            color: "yellow",
          },
          {
            icon: Eye,
            title: "Views",
            desc: "Virtual tables",
            color: "purple",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-${item.color}-50 border border-${item.color}-200 rounded-lg p-4`}
          >
            <item.icon className={`w-8 h-8 text-${item.color}-600 mb-2`} />
            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            CREATE & DROP: Database Objects
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Creating a Database:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`CREATE DATABASE carsu_academy;
USE carsu_academy;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Creating a Table with Data Types:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`CREATE TABLE students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  birthdate DATE,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade DECIMAL(5,2),
  is_active BOOLEAN DEFAULT TRUE
);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Dropping Objects:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`DROP TABLE IF EXISTS old_students;
DROP DATABASE IF EXISTS test_db;`}</code>
              </div>
              <div className="bg-red-50 p-2 rounded mt-2 text-xs text-red-800">
                <strong>⚠️ Warning:</strong> DROP permanently deletes data.
                Always backup first!
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Modifying Tables (ALTER):
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Add column
ALTER TABLE students ADD COLUMN phone VARCHAR(15);

-- Modify column
ALTER TABLE students MODIFY COLUMN grade DECIMAL(5,2) NOT NULL;

-- Drop column
ALTER TABLE students DROP COLUMN phone;

-- Rename table
ALTER TABLE students RENAME TO student_records;`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Constraints: Enforcing Data Integrity
          </h3>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">PRIMARY KEY</h4>
                <p className="text-gray-700 text-xs mb-2">
                  Unique identifier, not null
                </p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  student_id INT PRIMARY KEY
                </code>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">FOREIGN KEY</h4>
                <p className="text-gray-700 text-xs mb-2">
                  Links to another table
                </p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  FOREIGN KEY (course_id)
                  <br />
                  REFERENCES courses(id)
                </code>
              </div>

              <div className="bg-yellow-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">UNIQUE</h4>
                <p className="text-gray-700 text-xs mb-2">
                  No duplicate values
                </p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  email VARCHAR(100) UNIQUE
                </code>
              </div>

              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">NOT NULL</h4>
                <p className="text-gray-700 text-xs mb-2">Value required</p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  first_name VARCHAR(50) NOT NULL
                </code>
              </div>

              <div className="bg-red-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">CHECK</h4>
                <p className="text-gray-700 text-xs mb-2">Custom validation</p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  CHECK (grade BETWEEN 0 AND 100)
                </code>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-bold text-gray-900 mb-1">DEFAULT</h4>
                <p className="text-gray-700 text-xs mb-2">Automatic value</p>
                <code className="text-xs bg-white px-2 py-1 rounded block">
                  created_at TIMESTAMP DEFAULT NOW()
                </code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Complete Example with Constraints:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrollment_date DATE DEFAULT CURDATE(),
  grade DECIMAL(5,2) CHECK (grade >= 0 AND grade <= 100),
  status ENUM('active', 'dropped', 'completed') DEFAULT 'active',
  
  FOREIGN KEY (student_id) REFERENCES students(student_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE RESTRICT,
  
  UNIQUE(student_id, course_id)  -- Prevent duplicate enrollments
);`}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Indexes: Performance Optimization
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Indexes speed up queries but slow down writes. Use on columns
            frequently searched, joined, or sorted.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Create Index:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Single column
CREATE INDEX idx_last_name ON students(last_name);

-- Multiple columns (composite)
CREATE INDEX idx_name ON students(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_email ON students(email);`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Drop Index:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>DROP INDEX idx_last_name ON students;</code>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded">
              <p className="font-semibold text-gray-900 mb-1">
                When to Use Indexes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>WHERE clause columns frequently searched</li>
                <li>JOIN columns linking tables</li>
                <li>ORDER BY columns for sorting</li>
                <li>Foreign key columns</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-3 rounded">
              <p className="font-semibold text-gray-900 mb-1">
                When NOT to Use:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Small tables (full scan is faster)</li>
                <li>Columns with few distinct values</li>
                <li>Tables with frequent INSERT/UPDATE/DELETE</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Views: Virtual Tables
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Views are saved queries that act like tables. Great for simplifying
            complex queries, security, and abstraction.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Create View:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`CREATE VIEW active_students AS
SELECT 
  student_id,
  CONCAT(first_name, ' ', last_name) AS full_name,
  email,
  grade
FROM students
WHERE is_active = TRUE;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Use View:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`-- Query view like a table
SELECT * FROM active_students WHERE grade >= 85;`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Complex View with Joins:
              </p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>{`CREATE VIEW student_courses AS
SELECT 
  s.student_id,
  s.first_name,
  s.last_name,
  c.course_name,
  e.grade,
  e.enrollment_date
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE e.status = 'active';`}</code>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Drop View:</p>
              <div className="bg-gray-900 text-white p-2 rounded">
                <code>DROP VIEW IF EXISTS active_students;</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Best Practices</h4>
        <ul className="space-y-2 text-sm">
          <li>• Always use PRIMARY KEY for each table</li>
          <li>
            • Add FOREIGN KEY constraints to maintain referential integrity
          </li>
          <li>
            • Use appropriate data types (INT for IDs, VARCHAR for text, DECIMAL
            for money)
          </li>
          <li>
            • Name constraints explicitly:{" "}
            <code>CONSTRAINT fk_student FOREIGN KEY...</code>
          </li>
          <li>• Create indexes on columns used in WHERE, JOIN, and ORDER BY</li>
          <li>• Use views to hide complexity and improve security</li>
          <li>
            • Document your schema with comments:{" "}
            <code>COMMENT &apos;Student enrollment records&apos;</code>
          </li>
        </ul>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          ⚠️ Critical Reminder
        </h3>
        <p className="text-gray-700 text-sm">
          DDL commands are powerful and can destroy data. Always:
          <br />
          • Backup databases before structural changes
          <br />
          • Test ALTER/DROP commands on development databases first
          <br />
          • Use transactions where supported
          <br />• Document all schema changes
        </p>
      </div>
    </div>
  );
}
