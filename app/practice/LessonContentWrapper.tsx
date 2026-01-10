"use client";

import React from "react";

interface LessonContentWrapperProps {
  title: string;
  moduleName: string;
  children: React.ReactNode;
}

export default function LessonContentWrapper({
  title,
  moduleName,
  children,
}: LessonContentWrapperProps) {
  return (
    <div className="max-w-5xl">
      {/* Lesson Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {moduleName}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">
          Master this topic to progress through your course
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-red-600">
        {children}
      </div>
    </div>
  );
}
