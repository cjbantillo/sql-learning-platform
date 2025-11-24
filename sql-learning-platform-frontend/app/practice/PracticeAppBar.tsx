"use client";

import { Home } from "lucide-react";
// ChevronLeft, ChevronRight is still commented out for potential future use
import Link from "next/link";

export default function PracticeAppBar() {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-full px-4 py-3 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-[#1B5E20] transition"
          >
            <Home className="w-4 h-4" />
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">SQL Tutorial</span>
        </div>

        {/* Navigation Buttons */}
        {/* <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1B5E20] text-white rounded hover:bg-[#164A16] transition">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1B5E20] text-white rounded hover:bg-[#164A16] transition">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </div>
  );
}
