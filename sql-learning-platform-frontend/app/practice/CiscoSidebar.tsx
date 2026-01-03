"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  moduleId: number;
}

interface CiscoSidebarProps {
  modules: Module[];
  lessons: Lesson[];
  selectedLessonId: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
}

export default function CiscoSidebar({
  modules,
  lessons,
  selectedLessonId,
  onSelectLesson,
  completedLessons,
}: CiscoSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<number[]>(
    modules.map((m) => m.id)
  );

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getModuleProgress = (moduleId: number) => {
    const moduleLessons = lessons.filter((l) => l.moduleId === moduleId);
    const completed = moduleLessons.filter((l) =>
      completedLessons.includes(l.id)
    ).length;
    return {
      completed,
      total: moduleLessons.length,
      percentage: Math.round((completed / moduleLessons.length) * 100),
    };
  };

  const totalProgress = {
    completed: completedLessons.length,
    total: lessons.length,
    percentage: Math.round((completedLessons.length / lessons.length) * 100),
  };

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-0 z-50 bg-[#1B5E20] text-white p-2 rounded-r-lg hover:bg-[#164A16] transition"
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
        animate={{ x: isOpen ? 0 : -350 }}
        className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 overflow-y-auto sticky top-0 h-screen z-30 flex flex-col"
      >
        {/* Course Progress Section */}
        <div className="bg-green-100 border-b border-green-300 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-700" />
            <p className="text-xs font-semibold text-green-900 uppercase">
              Course Progress
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">
              {totalProgress.completed}/{totalProgress.total}
            </span>
            <span className="text-xs text-green-700 font-semibold">
              {totalProgress.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#1B5E20] to-green-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress.percentage}%` }}
            />
          </div>
        </div>

        {/* Modules List */}
        <nav className="flex-1 p-0 overflow-y-auto">
          <ul className="space-y-0">
            {modules.map((module, index) => {
              const isModuleExpanded = expandedModules.includes(module.id);
              const moduleLessons = lessons.filter(
                (l) => l.moduleId === module.id
              );
              const progress = getModuleProgress(module.id);

              return (
                <li key={module.id} className="border-b border-gray-200">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <ChevronDown
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            isModuleExpanded ? "" : "-rotate-90"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">
                            Module {index + 1}: {module.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {progress.completed}/{progress.total} lessons
                          </p>
                        </div>
                      </div>
                      {/* Module Progress Bar */}
                      <div className="ml-8 mt-2 h-1 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Lessons */}
                  <AnimatePresence>
                    {isModuleExpanded && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50"
                      >
                        {moduleLessons.map((lesson) => {
                          const isActive = lesson.id === selectedLessonId;
                          const isCompleted = completedLessons.includes(
                            lesson.id
                          );

                          return (
                            <li
                              key={lesson.id}
                              className="border-b border-gray-200"
                            >
                              <button
                                onClick={() => onSelectLesson(lesson.id)}
                                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition ${
                                  isActive
                                    ? "bg-[#1B5E20] text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isActive
                                        ? "text-yellow-300"
                                        : "text-green-700"
                                    }`}
                                  />
                                ) : (
                                  <Circle
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isActive
                                        ? "text-green-100"
                                        : "text-gray-400"
                                    }`}
                                  />
                                )}
                                <span className="text-sm font-medium truncate">
                                  {lesson.title}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
    </>
  );
}
