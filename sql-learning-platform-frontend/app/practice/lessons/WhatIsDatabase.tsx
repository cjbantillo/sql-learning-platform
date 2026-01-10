"use client";

import MermaidDiagram from "@/app/components/visuals/MermaidDiagram";

const dbDiagram = `
graph TD
    A[Flat File: JSON/CSV] -->|Unstructured| B[Hard to Query]
    C[Relational Database] -->|Tables + Relations| D[Efficient Queries]
    E[Data Growth] -->|Without DB| F[Slow, Error-Prone]
    E -->|With DB| G[Fast, Reliable]
`;

export default function WhatIsDatabase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What is a Database?
        </h2>
        <p className="text-gray-700 mb-4">
          A database is an organized collection of data stored electronically in
          a computer system. It allows efficient retrieval, management, and
          updates of information.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Core Purpose</h3>
        <p className="text-gray-700">
          To handle large volumes of persistent data without losing it when your
          application restarts. Databases provide structure, security, and
          efficiency that file systems alone cannot match.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Types of Databases
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Relational (SQL):</strong> Structured tables with
            relationships (MySQL, PostgreSQL, MariaDB)
          </li>
          <li>
            <strong>Non-Relational (NoSQL):</strong> Flexible document/key-value
            stores (MongoDB, Firebase)
          </li>
          <li>
            <strong>In-Memory:</strong> Ultra-fast but volatile (Redis,
            Memcached)
          </li>
          <li>
            <strong>Graph:</strong> Network of relationships (Neo4j)
          </li>
        </ul>
        <MermaidDiagram code={dbDiagram} />
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Real-World Example</h3>
        <p className="text-gray-700">
          Consider an e-commerce site: product details, customer orders,
          inventory levels — all stored in a database. Without it, every page
          refresh would require rebuilding data from scratch!
        </p>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h4 className="text-yellow-400 mb-2">Quick Comparison</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-green-400">With Database:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Persistent storage</li>
              <li>Fast queries</li>
              <li>Data integrity</li>
              <li>Concurrent access</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-red-400">Without Database:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Data lost on restart</li>
              <li>Slow searches</li>
              <li>No validation</li>
              <li>File conflicts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
