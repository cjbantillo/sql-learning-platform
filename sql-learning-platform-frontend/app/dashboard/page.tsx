"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [completedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [router]);

  const modules = [
    {
      id: 1,
      title: "Database Fundamentals",
      desc: "What, Why, When & Alternatives",
      lessons: [1, 2, 3, 4],
      locked: false,
    },
    {
      id: 2,
      title: "Database Design",
      desc: "ER Modeling & Schema Design",
      lessons: [5, 6],
      locked: !completedLessons.includes(4), // Unlock after completing fundamentals
    },
    {
      id: 3,
      title: "SQL Basics",
      desc: "SELECT, INSERT, UPDATE, DELETE",
      lessons: [7, 8],
      locked: !completedLessons.includes(6), // Unlock after design lessons
    },
    {
      id: 4,
      title: "Filtering & Patterns",
      desc: "LIKE, IN, BETWEEN, Wildcards",
      lessons: [9],
      locked: !completedLessons.includes(8),
    },
    {
      id: 5,
      title: "Aggregation",
      desc: "COUNT, SUM, AVG, MIN, MAX",
      lessons: [10],
      locked: !completedLessons.includes(9),
    },
    {
      id: 6,
      title: "Joins & Grouping",
      desc: "JOIN Types, GROUP BY, HAVING",
      lessons: [11, 12],
      locked: !completedLessons.includes(10),
    },
    {
      id: 7,
      title: "Advanced Queries",
      desc: "Subqueries & SQL Functions",
      lessons: [13, 14],
      locked: !completedLessons.includes(12),
    },
    {
      id: 8,
      title: "Database Management",
      desc: "DDL, Constraints, Indexes, Views",
      lessons: [15],
      locked: !completedLessons.includes(14),
    },
    {
      id: 9,
      title: "Professional SQL",
      desc: "CASE, NULL, Security, Best Practices",
      lessons: [16],
      locked: !completedLessons.includes(15),
    },
  ];

  const modulesWithProgress = modules.map((mod) => {
    // Calculate progress based on completed lessons in this module
    const completedCount = mod.lessons.filter((lessonId) =>
      completedLessons.includes(lessonId)
    ).length;
    const progress = Math.round((completedCount / mod.lessons.length) * 100);
    const completed = progress === 100;
    return { ...mod, completed, progress };
  });

  const overall = Math.round(
    modulesWithProgress.reduce((a, m) => a + m.progress, 0) /
      modulesWithProgress.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 to-black text-white">
      {/* Reuse Navbar, add simple header */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Your Learning Dashboard
        </h1>
        <div className="mb-12">
          <p className="text-green-200 mb-2">Overall Readiness</p>
          <Progress value={overall} className="h-6 bg-green-900" />
          <p className="text-right mt-2 text-yellow-400">{overall}%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesWithProgress.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={mod.locked ? "#" : "/practice"}
                className={mod.locked ? "cursor-not-allowed" : ""}
              >
                <Card
                  className={`p-6 ${
                    mod.locked ? "bg-gray-900/50 opacity-60" : "bg-green-900/50"
                  } border-green-700 hover:border-yellow-500 transition-all ${
                    !mod.locked && "hover:scale-105"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{mod.title}</h3>
                    {mod.completed ? (
                      <CheckCircle2 className="text-yellow-400" />
                    ) : (
                      mod.locked && <Lock className="text-gray-500" />
                    )}
                  </div>
                  <p className="text-green-300 mb-4">{mod.desc}</p>
                  <Progress value={mod.progress} className="h-3 mb-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{mod.progress}%</span>
                    {mod.completed && (
                      <Badge className="bg-yellow-500 text-black">
                        Completed
                      </Badge>
                    )}
                    {mod.locked && (
                      <span className="text-xs text-gray-400">
                        Complete previous lessons
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
