"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export default function PracticeAppBar() {
  return (
    <div className="bg-white border-b-2 border-green-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-full px-4 py-3 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-[#1B5E20] transition flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">SQL Fundamentals</span>
        </div>
      </div>
    </div>
  );
}
