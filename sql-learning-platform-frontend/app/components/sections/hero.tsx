"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Database,
  Code2,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Interactive stat cards
  const stats = [
    {
      icon: Database,
      label: "SQL Lessons",
      value: "22+",
      color: "text-blue-400",
    },
    {
      icon: Code2,
      label: "Practice Queries",
      value: "100+",
      color: "text-green-400",
    },
    {
      icon: Trophy,
      label: "Achievements",
      value: "15+",
      color: "text-yellow-400",
    },
  ];

  // Floating icons animation
  const floatingIcons = [
    { Icon: Database, delay: 0, x: 10, y: 10 },
    { Icon: Code2, delay: 0.2, x: 80, y: 60 },
    { Icon: Sparkles, delay: 0.4, x: 90, y: 20 },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1B5E20] via-[#1B5E20] to-[#164A16] text-white py-20 md:py-32">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #FFC727 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #FFC727 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #FFC727 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #FFC727 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>
      ))}

      {/* Mouse follower effect */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-[#FFC727]/10 blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            className="flex-1 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 text-[#FFC727]" />
              <span className="text-sm font-medium">
                AI-Powered Learning Platform
              </span>
            </motion.div>

            {/* Heading with gradient text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Master SQL Faster with{" "}
              <span className="bg-linear-to-r from-[#FFC727] to-yellow-300 bg-clip-text text-transparent">
                Interactive Learning
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed">
              Experience hands-on SQL lessons, AI-powered query generation,
              instant code execution, achievements, progress tracking — designed
              for CSU students.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/lessons"
                  className="group flex items-center justify-center gap-2 bg-[#FFC727] text-[#1B5E20] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/practice"
                  className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#1B5E20] transition"
                >
                  Try SQL Editor
                  <Code2 className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-16 flex items-center gap-2 cursor-pointer group"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white/80 text-sm group-hover:text-white transition">
                Scroll to explore
              </span>
              <ChevronDown className="w-5 h-5 text-white/80 group-hover:text-white transition" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Interactive Card */}
          <motion.div
            className="flex-1 z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl hover:shadow-[#FFC727]/20 transition-shadow duration-300"
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-[#FFC727]/20 to-transparent rounded-3xl blur-2xl" />

              {/* SQL Code Preview */}
              <div className="relative bg-[#1a1a1a] rounded-2xl p-6 font-mono text-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, staggerChildren: 0.1 }}
                >
                  <motion.p className="text-purple-400">
                    <span className="text-pink-400">SELECT</span> *
                  </motion.p>
                  <motion.p className="text-purple-400">
                    <span className="text-pink-400">FROM</span> students
                  </motion.p>
                  <motion.p className="text-purple-400">
                    <span className="text-pink-400">WHERE</span> university ={" "}
                    <span className="text-green-400">&apos;CSU&apos;</span>
                  </motion.p>
                  <motion.p className="text-purple-400">
                    <span className="text-pink-400">ORDER BY</span> grade{" "}
                    <span className="text-pink-400">DESC</span>;
                  </motion.p>
                </motion.div>

                {/* Typing cursor */}
                <motion.span
                  className="inline-block w-2 h-5 bg-[#FFC727] ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>

              {/* Interactive button inside card */}
              <motion.button
                className="mt-6 w-full bg-linear-to-r from-[#FFC727] to-yellow-400 text-[#1B5E20] px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                Try This Query
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
