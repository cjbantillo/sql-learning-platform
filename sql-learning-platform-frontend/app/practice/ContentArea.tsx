"use client";

import { BookMarked, ArrowRight } from "lucide-react";

export default function ContentArea() {
  return (
    <div className="flex-1 bg-white p-6 lg:p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SQL Tutorial</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1B5E20] text-white rounded hover:bg-[#164A16] transition">
            ❮ Home
          </button>
          <button className="px-4 py-2 bg-[#1B5E20] text-white rounded hover:bg-[#164A16] transition">
            Next ❯
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-linear-to-r from-green-50 to-green-100 p-8 rounded-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn SQL</h2>
        <p className="text-gray-700 mb-4">
          SQL is a standard language for storing, manipulating and retrieving
          data in databases.
        </p>
        <p className="text-gray-700 mb-6">
          Our SQL tutorial will teach you how to use SQL in: MySQL, SQL Server,
          MS Access, Oracle, Sybase, Informix, Postgres, and other database
          systems.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#164A16] transition font-semibold">
          Start learning SQL now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Examples Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Examples in Each Chapter
        </h3>
        <p className="text-gray-700 mb-4">
          With our online SQL editor, you can edit the SQL statements, and click
          on a button to view the result.
        </p>

        {/* Example Box */}
        <div className="bg-gray-900 text-white p-6 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-gray-400">Example</span>
          </div>
          <pre className="text-sm">
            <code>
              <span className="text-pink-400">SELECT</span> *{" "}
              <span className="text-pink-400">FROM</span> Customers;
            </code>
          </pre>
        </div>

        <button className="w-full sm:w-auto px-6 py-3 bg-[#1B5E20] text-white rounded hover:bg-[#164A16] transition font-semibold">
          Try it Yourself »
        </button>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <div className="flex items-start gap-3">
          <BookMarked className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              SQL is Fun and Easy to Learn!
            </h4>
            <p className="text-gray-700">
              Start your SQL learning journey today and master database querying
              in no time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
