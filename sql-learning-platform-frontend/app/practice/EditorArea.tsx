"use client";

import { useState } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function EditorArea() {
  const [query, setQuery] = useState("SELECT * FROM Customers;");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    // Execute query logic here
    console.log("Running query:", query);
  };

  const handleReset = () => {
    setQuery("SELECT * FROM Customers;");
  };

  return (
    <div className="lg:w-1/2 bg-gray-50 border-l border-gray-200 flex flex-col sticky top-14 h-[calc(100vh-3.5rem)]">
      {/* Editor Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-3 font-semibold">SQL Editor</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 bg-gray-900 text-white p-4 overflow-auto">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full bg-transparent font-mono text-sm outline-none resize-none"
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200">
        <motion.button
          onClick={handleRun}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#164A16] transition font-semibold"
        >
          <Play className="w-5 h-5" />
          Run Query
        </motion.button>
      </div>

      {/* Results Area */}
      <div className="p-4 bg-white border-t border-gray-200 max-h-64 overflow-auto">
        <h3 className="font-semibold text-gray-900 mb-3">Query Results:</h3>
        <div className="bg-gray-50 border border-gray-200 rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">CustomerID</th>
                <th className="text-left p-2">CustomerName</th>
                <th className="text-left p-2">ContactName</th>
                <th className="text-left p-2">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">1</td>
                <td className="p-2">Juan Dela Cruz</td>
                <td className="p-2">Juan DC</td>
                <td className="p-2">Philippines</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">2</td>
                <td className="p-2">Maria Santos</td>
                <td className="p-2">Maria S</td>
                <td className="p-2">Philippines</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
