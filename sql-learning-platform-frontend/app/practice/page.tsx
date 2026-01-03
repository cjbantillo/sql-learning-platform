"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/sections/navigation";
import PracticeAppBar from "@/app/practice/PracticeAppBar";
import LessonSidebar from "@/app/practice/LessonSidebar";
import Chatbot from "../components/ui/Chatbot";
import Footer from "@/app/components/sections/footer";
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
import { CheckCircle2 } from "lucide-react";

const lessons = [
  { id: 1, title: "What is a Database?", component: WhatIsDatabase },
  { id: 2, title: "Why Use Databases?", component: WhyUseDatabases },
  { id: 3, title: "When to Use Databases", component: WhenToUseDatabases },
  {
    id: 4,
    title: "Alternatives to Databases",
    component: NoDatabaseAlternatives,
  },
  { id: 5, title: "ER Modeling", component: ERLesson },
  { id: 6, title: "Schema Design", component: SchemaLesson },
  { id: 7, title: "SQL Basics: SELECT", component: SQLBasics },
  { id: 8, title: "Data Manipulation", component: DataManipulation },
  { id: 9, title: "Filtering & Patterns", component: FilteringPatterns },
  { id: 10, title: "Aggregate Functions", component: Aggregates },
  { id: 11, title: "Understanding Joins", component: JoinsLesson },
  { id: 12, title: "GROUP BY & HAVING", component: GroupingConditions },
  { id: 13, title: "Subqueries", component: Subqueries },
  { id: 14, title: "SQL Functions", component: Functions },
  { id: 15, title: "Database Management", component: DatabaseManagement },
  { id: 16, title: "Advanced SQL", component: AdvancedTopics },
];

export default function PracticePage() {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
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

  const isCompleted = completedLessons.includes(selectedLessonId);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PracticeAppBar />

      <div className="flex-1 flex">
        <LessonSidebar
          lessons={lessons}
          selectedLessonId={selectedLessonId}
          onSelectLesson={setSelectedLessonId}
          completedLessons={completedLessons}
        />

        {/* Content Area */}
        <div className="flex-1 bg-white p-6 lg:p-8 overflow-y-auto">
          {LessonComponent && <LessonComponent />}

          {/* Mark Complete Button */}
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <Button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`${
                isCompleted
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-[#1B5E20] hover:bg-[#164A16]"
              } text-white`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </Button>
          </div>

          {/* SQL Editor */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Try It Yourself
            </h3>
            <EditorArea />
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
