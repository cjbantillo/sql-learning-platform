"use client";

import MermaidDiagram from "@/app/components/visuals/MermaidDiagram";

const decisionTree = `
graph TD
    A[Need to Store Data?] -->|Yes| B{Data Persists After Restart?}
    A -->|No| Z[Use Variables]
    B -->|Yes| C{Multiple Users Access?}
    B -->|No| D{More than 1000 records?}
    C -->|Yes| E[USE DATABASE]
    C -->|No| D
    D -->|Yes| E
    D -->|No| F{Need Relationships?}
    F -->|Yes| E
    F -->|No| G[Consider Alternatives]
    G --> H[Files/localStorage]
`;

export default function WhenToUseDatabases() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          When to Use Databases?
        </h2>
        <p className="text-gray-700 mb-4">
          Not every application needs a database. Understanding when to use one
          — and when simpler alternatives suffice — is a crucial skill for
          developers.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Decision Flow</h3>
        <p className="text-gray-700 mb-4">
          Use this flowchart to determine if your project needs a database:
        </p>
        <MermaidDiagram code={decisionTree} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">
            ✅ Use a Database When:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Data must persist across restarts</li>
            <li>Multiple users need concurrent access</li>
            <li>Data volume exceeds 1,000+ records</li>
            <li>Complex relationships exist between data</li>
            <li>Data integrity and validation are critical</li>
            <li>You need efficient search/filtering</li>
            <li>Backup and recovery are important</li>
          </ul>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">
            ❌ Skip a Database When:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Building a quick prototype or demo</li>
            <li>Data is tiny (&lt;100 records) and static</li>
            <li>Single-user desktop application</li>
            <li>Temporary/session data only</li>
            <li>No data relationships needed</li>
            <li>Learning project or personal tool</li>
            <li>Read-only data from external APIs</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Real Examples</h4>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-400 mb-1">
              🟢 Database Needed:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>School enrollment system (students, courses, grades)</li>
              <li>E-commerce platform (products, orders, customers)</li>
              <li>Content management system (posts, users, comments)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-red-400 mb-1">
              🔴 Database Overkill:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>Personal to-do list (use localStorage)</li>
              <li>Static portfolio website (use files/CMS)</li>
              <li>Calculator app (no data storage needed)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Pro Tip: Start Simple, Scale Smart
        </h3>
        <p className="text-gray-700">
          Many successful apps start without databases (e.g., using localStorage
          or files), then migrate to a database when complexity or scale demands
          it. Don&apos;t over-engineer from day one — but plan your data
          structure so migration is easier later.
        </p>
      </div>
    </div>
  );
}
