"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Lesson {
  id: number;
  title: string;
}

interface LessonSidebarProps {
  lessons: Lesson[];
  selectedLessonId: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
}

export default function LessonSidebar({
  lessons,
  selectedLessonId,
  onSelectLesson,
  completedLessons,
}: LessonSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-0 z-50 bg-[#1B5E20] text-white p-2 rounded-r-lg"
      >
        <ChevronRight
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)] z-30"
      >
        <div className="p-4">
          <div className="flex items-center gap-2 text-[#1B5E20] font-bold mb-4">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-lg">SQL Tutorial</h2>
          </div>

          <nav>
            <ul className="space-y-1">
              {lessons.map((lesson) => {
                const isActive = lesson.id === selectedLessonId;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full text-left px-4 py-2 rounded transition flex items-center justify-between ${
                        isActive
                          ? "bg-[#1B5E20] text-white"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <span>{lesson.title}</span>
                      {isCompleted && (
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isActive ? "text-yellow-400" : "text-green-600"
                          }`}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
