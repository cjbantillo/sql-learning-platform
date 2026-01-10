"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/sections/navigation";
import PracticeAppBar from "@/app/practice/PracticeAppBar";
import Chatbot from "../components/ui/Chatbot";
import Footer from "@/app/components/sections/footer";
import CourseHeader from "@/app/practice/CourseHeader";
import CiscoSidebar, { Module, Lesson } from "@/app/practice/CiscoSidebar";
import ERLesson from "./lessons/ERLesson";
import SchemaLesson from "./lessons/SchemaLesson";
import JoinsLesson from "./lessons/JoinsLesson";
import WhatIsDatabase from "./lessons/WhatIsDatabase";
import WhyUseDatabases from "./lessons/WhyUseDatabases";
import WhenToUseDatabases from "./lessons/WhenToUseDatabases";
import NoDatabaseAlternatives from "./lessons/NoDatabaseAlternatives";
import SQLBasics from "./lessons/SQLBasics";
import DataManipulation from "./lessons/DataManipulation";
import FilteringPatterns from "./lessons/FilteringPatterns";
import Aggregates from "./lessons/Aggregates";
import GroupingConditions from "./lessons/GroupingConditions";
import Subqueries from "./lessons/Subqueries";
import Functions from "./lessons/Functions";
import DatabaseManagement from "./lessons/DatabaseManagement";
import AdvancedTopics from "./lessons/AdvancedTopics";
import EditorArea from "./EditorArea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw } from "lucide-react";

const flatLessons = [
  {
    id: 1,
    title: "What is a Database?",
    component: WhatIsDatabase,
    moduleId: 1,
  },
  {
    id: 2,
    title: "Why Use Databases?",
    component: WhyUseDatabases,
    moduleId: 1,
  },
  {
    id: 3,
    title: "When to Use Databases",
    component: WhenToUseDatabases,
    moduleId: 1,
  },
  {
    id: 4,
    title: "Alternatives to Databases",
    component: NoDatabaseAlternatives,
    moduleId: 1,
  },
  { id: 5, title: "ER Modeling", component: ERLesson, moduleId: 2 },
  { id: 6, title: "Schema Design", component: SchemaLesson, moduleId: 2 },
  { id: 7, title: "SQL Basics: SELECT", component: SQLBasics, moduleId: 3 },
  {
    id: 8,
    title: "Data Manipulation",
    component: DataManipulation,
    moduleId: 3,
  },
  {
    id: 9,
    title: "Filtering & Patterns",
    component: FilteringPatterns,
    moduleId: 4,
  },
  { id: 10, title: "Aggregate Functions", component: Aggregates, moduleId: 4 },
  { id: 11, title: "Understanding Joins", component: JoinsLesson, moduleId: 5 },
  {
    id: 12,
    title: "GROUP BY & HAVING",
    component: GroupingConditions,
    moduleId: 5,
  },
  { id: 13, title: "Subqueries", component: Subqueries, moduleId: 6 },
  { id: 14, title: "SQL Functions", component: Functions, moduleId: 6 },
  {
    id: 15,
    title: "Database Management",
    component: DatabaseManagement,
    moduleId: 7,
  },
  { id: 16, title: "Advanced SQL", component: AdvancedTopics, moduleId: 7 },
];

const modules: Module[] = [
  {
    id: 1,
    title: "Database Fundamentals",
    lessons: flatLessons
      .filter((l) => l.moduleId === 1)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 2,
    title: "Database Design",
    lessons: flatLessons
      .filter((l) => l.moduleId === 2)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 3,
    title: "Basic SELECT Queries",
    lessons: flatLessons
      .filter((l) => l.moduleId === 3)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 4,
    title: "Advanced Filtering",
    lessons: flatLessons
      .filter((l) => l.moduleId === 4)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 5,
    title: "Working with Multiple Tables",
    lessons: flatLessons
      .filter((l) => l.moduleId === 5)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 6,
    title: "Subqueries and Advanced Queries",
    lessons: flatLessons
      .filter((l) => l.moduleId === 6)
      .map(({ component, ...rest }) => rest),
  },
  {
    id: 7,
    title: "Database Administration",
    lessons: flatLessons
      .filter((l) => l.moduleId === 7)
      .map(({ component, ...rest }) => rest),
  },
];

export default function PracticePage() {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("completedLessons");
    setCompletedLessons(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  const selectedLesson = flatLessons.find((l) => l.id === selectedLessonId);
  const LessonComponent = selectedLesson?.component;

  const handleMarkComplete = () => {
    if (!completedLessons.includes(selectedLessonId)) {
      const updated = [...completedLessons, selectedLessonId];
      setCompletedLessons(updated);
      localStorage.setItem("completedLessons", JSON.stringify(updated));

      // Update individual lesson progress
      localStorage.setItem(`progress_lesson_${selectedLessonId}`, "true");
    }
  };

  const handleMarkIncomplete = () => {
    if (completedLessons.includes(selectedLessonId)) {
      const updated = completedLessons.filter((id) => id !== selectedLessonId);
      setCompletedLessons(updated);
      localStorage.setItem("completedLessons", JSON.stringify(updated));

      // Remove individual lesson progress
      localStorage.removeItem(`progress_lesson_${selectedLessonId}`);
    }
  };

  const isCompleted = completedLessons.includes(selectedLessonId);
  const currentModule =
    modules.find((m) => m.lessons.some((l) => l.id === selectedLessonId))
      ?.title || "Module";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <PracticeAppBar />

      <div className="flex-1 flex flex-col">
        {/* Course Header */}
        <CourseHeader
          courseTitle="SQL Fundamentals & Advanced Concepts"
          totalLessons={flatLessons.length}
          completedLessons={completedLessons.length}
          currentModule={currentModule}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <CiscoSidebar
            modules={modules}
            lessons={flatLessons}
            selectedLessonId={selectedLessonId}
            onSelectLesson={setSelectedLessonId}
            completedLessons={completedLessons}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 bg-white p-6 lg:p-8">
              {LessonComponent ? (
                <>
                  {/* Lesson Title */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedLesson?.title}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Module: {currentModule}
                    </p>
                  </div>

                  {/* Lesson Content */}
                  <LessonComponent />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Loading lesson...</p>
                </div>
              )}

              {/* Mark Complete Button */}
              {LessonComponent && (
                <div className="mt-8 flex justify-between items-center border-t pt-6">
                  <Button
                    onClick={
                      isCompleted ? handleMarkIncomplete : handleMarkComplete
                    }
                    className={`${
                      isCompleted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#1B5E20] hover:bg-[#164A16]"
                    } text-white`}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Mark as Incomplete
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* SQL Editor */}
              {LessonComponent && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Try It Yourself
                  </h3>
                  <EditorArea />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
