"use client";

import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function DataManipulation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Data Manipulation: INSERT, UPDATE, DELETE
        </h2>
        <p className="text-gray-700 mb-4">
          Beyond reading data with SELECT, you need to create, modify, and
          remove records. These three commands are the foundation of data
          manipulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: Plus,
            title: "INSERT",
            color: "green",
            desc: "Add new records",
          },
          {
            icon: Edit,
            title: "UPDATE",
            color: "blue",
            desc: "Modify existing data",
          },
          {
            icon: Trash2,
            title: "DELETE",
            color: "red",
            desc: "Remove records",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-${item.color}-50 border-l-4 border-${item.color}-500 p-4 rounded`}
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`w-5 h-5 text-${item.color}-600`} />
              <h3 className="font-bold text-gray-900">{item.title}</h3>
            </div>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            INSERT: Adding New Data
          </h3>
          <p className="text-gray-700 mb-3">Insert new rows into a table:</p>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Single Row:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`INSERT INTO students (name, email, grade)
VALUES ('Juan Dela Cruz', 'juan@csu.edu.ph', 95);`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Multiple Rows:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`INSERT INTO students (name, email, grade)
VALUES 
  ('Maria Santos', 'maria@csu.edu.ph', 88),
  ('Pedro Reyes', 'pedro@csu.edu.ph', 92);`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-3 text-sm">
            <p className="text-yellow-800">
              ⚠️ <strong>Remember:</strong> Column order must match VALUES
              order!
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            UPDATE: Modifying Existing Data
          </h3>
          <p className="text-gray-700 mb-3">Change values in existing rows:</p>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Update Specific Record:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`UPDATE students
SET grade = 90
WHERE student_id = 5;`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Update Multiple Columns:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`UPDATE students
SET grade = 85, email = 'newemail@csu.edu.ph'
WHERE name = 'Juan Dela Cruz';`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-3 rounded mt-3 text-sm">
            <p className="text-red-800">
              🚨 <strong>DANGER:</strong> Always use WHERE! Without it, ALL rows
              are updated!
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            DELETE: Removing Data
          </h3>
          <p className="text-gray-700 mb-3">Remove rows from a table:</p>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Delete Specific Record:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`DELETE FROM students
WHERE student_id = 10;`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Delete with Condition:
              </p>
              <div className="bg-gray-900 text-white p-3 rounded text-sm">
                <pre>
                  <code>{`DELETE FROM students
WHERE grade < 60;`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-3 rounded mt-3 text-sm">
            <p className="text-red-800">
              🚨 <strong>CRITICAL:</strong> Omitting WHERE deletes EVERYTHING!
              Always double-check!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Best Practices</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              Always test UPDATE/DELETE with SELECT first to verify your WHERE
              clause
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              Use transactions for critical operations (can rollback if mistakes
              happen)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>Back up data before bulk DELETE operations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">✗</span>
            <span>Never run UPDATE or DELETE without WHERE in production!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
