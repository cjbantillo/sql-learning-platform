"use client";

import { motion } from "framer-motion";
import { FileJson, HardDrive, Globe, Cloud, Cpu } from "lucide-react";

export default function NoDatabaseAlternatives() {
  const alternatives = [
    {
      icon: Cpu,
      title: "In-Memory Storage",
      desc: "Arrays, objects, or Map/Set in JavaScript",
      pros: "Blazing fast, simple to use",
      cons: "Lost on restart, limited by RAM",
      useCase: "Temporary caches, session data",
    },
    {
      icon: FileJson,
      title: "File-Based Storage",
      desc: "JSON, CSV, or plain text files",
      pros: "Persistent, portable, no setup",
      cons: "Slow for large data, no concurrent access",
      useCase: "Config files, logs, small datasets",
    },
    {
      icon: Globe,
      title: "Browser Storage",
      desc: "localStorage, SessionStorage, IndexedDB",
      pros: "No backend needed, offline-first",
      cons: "Limited to ~10MB, client-only",
      useCase: "User preferences, offline web apps",
    },
    {
      icon: HardDrive,
      title: "Caching Systems",
      desc: "Redis, Memcached for distributed in-memory",
      pros: "Fast, shared across servers",
      cons: "Volatile, not for primary storage",
      useCase: "Session management, API caching",
    },
    {
      icon: Cloud,
      title: "Backend-as-a-Service",
      desc: "Firebase, Supabase, AWS Amplify",
      pros: "Database-like features without setup",
      cons: "Vendor lock-in, cost scales",
      useCase: "MVP, realtime apps, mobile backends",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How Developers Manage Data Without Databases
        </h2>
        <p className="text-gray-700 mb-4">
          For small applications, prototypes, or specific use cases, developers
          often skip traditional databases to move faster. Here are the most
          common alternatives and when to use them.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Why Skip a Database?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Speed:</strong> Set up in minutes, not hours
          </li>
          <li>
            <strong>Simplicity:</strong> No server, no schema, no migrations
          </li>
          <li>
            <strong>Cost:</strong> Free for small projects
          </li>
          <li>
            <strong>Overkill:</strong> Many apps never exceed 1,000 records
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Common Alternatives
        </h3>
        <div className="space-y-4">
          {alternatives.map((alt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <alt.icon className="w-6 h-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{alt.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{alt.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-green-600">
                        ✓ Pros:
                      </span>
                      <p className="text-gray-700">{alt.pros}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-red-600">
                        ✗ Cons:
                      </span>
                      <p className="text-gray-700">{alt.cons}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">
                        → Use For:
                      </span>
                      <p className="text-gray-700">{alt.useCase}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">
          Code Example: localStorage for To-Do App
        </h4>
        <pre className="text-sm overflow-x-auto bg-gray-800 p-4 rounded">
          <code>{`// Save todos to browser (no database needed!)
const todos = ['Learn SQL', 'Build app', 'Deploy'];
localStorage.setItem('todos', JSON.stringify(todos));

// Retrieve on next visit
const saved = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(saved); // ['Learn SQL', 'Build app', 'Deploy']`}</code>
        </pre>
        <p className="text-green-300 mt-3 text-sm">
          Perfect for personal tools, offline apps, or prototypes under 5MB of
          data.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          When to Migrate to a Database
        </h3>
        <p className="text-gray-700">
          Start with these alternatives, but switch to a database when you hit
          these limits:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Data exceeds 1,000–10,000 records</li>
          <li>Multiple users need shared access</li>
          <li>Complex queries or relationships emerge</li>
          <li>Performance degrades noticeably</li>
        </ul>
      </div>
    </div>
  );
}
