"use client";

import JoinVisualizer from "@/app/components/visuals/JoinVisualizer";

export default function JoinsLesson() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Understanding SQL Joins
        </h2>
        <p className="text-gray-700 mb-4">
          SQL JOINs are used to combine rows from two or more tables based on a
          related column between them. Understanding joins is crucial for
          working with relational databases.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Types of Joins</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>INNER JOIN:</strong> Returns only matching rows from both
            tables
          </li>
          <li>
            <strong>LEFT JOIN:</strong> Returns all rows from left table,
            matching rows from right
          </li>
          <li>
            <strong>RIGHT JOIN:</strong> Returns all rows from right table,
            matching rows from left
          </li>
          <li>
            <strong>FULL OUTER JOIN:</strong> Returns all rows when there&apos;s
            a match in either table
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Interactive Join Demo
        </h3>
        <p className="text-gray-700 mb-4">
          Click the button below to see how an INNER JOIN combines data from two
          tables:
        </p>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <JoinVisualizer />
        </div>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h4 className="text-yellow-400 mb-2">INNER JOIN Syntax</h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`SELECT customers.name, orders.order_id
FROM customers
INNER JOIN orders 
  ON customers.customer_id = orders.customer_id;`}</code>
        </pre>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>The ON clause specifies the relationship between tables</li>
          <li>
            INNER JOIN only returns rows where there&apos;s a match in both
            tables
          </li>
          <li>Non-matching rows (like Charlie with no orders) are excluded</li>
        </ul>
      </div>
    </div>
  );
}
