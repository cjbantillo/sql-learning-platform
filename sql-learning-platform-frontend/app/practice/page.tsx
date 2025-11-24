import React from "react";
import Navbar from "@/app/components/sections/navigation";
import PracticeAppBar from "@/app/practice/PracticeAppBar";
import LessonSidebar from "@/app/practice/LessonSidebar";
import ContentArea from "@/app/practice/ContentArea";
import EditorArea from "@/app/practice/EditorArea";
import Footer from "@/app/components/sections/footer";

export default function PracticePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 4. Top Navigation */}
      <Navbar />

      {/* 3. AppBar (Breadcrumb/Lesson Navigation) */}
      <PracticeAppBar />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* 1. Left Sidebar - Lesson List */}
        <LessonSidebar />

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* 1. Content/Tutorial Area */}
          <ContentArea />

          {/* 2. SQL Editor Area */}
          <EditorArea />
        </div>
      </div>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
