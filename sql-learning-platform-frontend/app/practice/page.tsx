import React from "react";
import Navbar from "@/app/components/sections/navigation";
import PracticeAppBar from "@/app/practice/PracticeAppBar";
import LessonSidebar from "@/app/practice/LessonSidebar";
import ContentArea from "@/app/practice/ContentArea";
import Chatbot from "../components/ui/Chatbot";
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

        {/* Content/Tutorial Area (includes modal trigger) */}
        <ContentArea />
      </div>

      {/* 5. Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
