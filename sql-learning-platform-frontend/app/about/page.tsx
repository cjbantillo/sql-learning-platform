"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Sparkles, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/sections/navigation";
import Footer from "../components/sections/footer";
import BackToTop from "../components/ui/BackToTop";

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description:
        "Comprehensive curriculum covering SQL fundamentals to advanced topics with real-world examples.",
      color: "text-blue-400",
    },
    {
      icon: Code2,
      title: "Hands-on Practice",
      description:
        "Practice your SQL skills with interactive exercises and get immediate feedback on your queries.",
      color: "text-green-400",
    },
    {
      icon: Sparkles,
      title: "Visual Explanations",
      description:
        "Complex concepts like JOINs and relationships are explained with clear visual diagrams.",
      color: "text-yellow-400",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with a comprehensive dashboard that tracks your progress.",
      color: "text-orange-400",
    },
  ];

  const approaches = [
    {
      step: 1,
      title: "Foundations First",
      description:
        "Start with the basics of databases and SQL before moving to complex queries.",
    },
    {
      step: 2,
      title: "Learn by Doing",
      description:
        "Apply concepts immediately through hands-on exercises and real-world scenarios.",
    },
    {
      step: 3,
      title: "Visualize Concepts",
      description:
        "Understand complex relationships and query operations through interactive diagrams.",
    },
    {
      step: 4,
      title: "Master Advanced Topics",
      description:
        "Progress to advanced SQL techniques and optimization strategies.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
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
        <motion.div
          className="absolute opacity-20 left-[10%] top-[20%]"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <motion.div
          className="absolute opacity-20 right-[10%] top-[30%]"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            delay: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Code2 className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <motion.div
          className="absolute opacity-20 left-[20%] bottom-[20%]"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-[#FFC727]" />
              <span className="text-sm font-medium">About Our Platform</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Master SQL with{" "}
              <span className="bg-linear-to-r from-[#FFC727] to-yellow-300 bg-clip-text text-transparent">
                Purpose-Built Learning
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed">
              Discover how our AI-powered platform combines research-backed
              methodology with interactive education to help you master SQL and
              database concepts faster than ever before.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/practice"
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
                  href="/sign-in"
                  className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#1B5E20] transition"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-[#0f3d0f] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Built on research-backed methodology and modern educational
              practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#FFC727]/50 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <feature.icon
                  className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition`}
                />
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Foundation */}
      <section className="bg-linear-to-b from-[#1B5E20] to-[#0f3d0f] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-[#FFC727]" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Research-Backed Design
              </h2>
            </div>

            <p className="text-gray-100 text-lg leading-relaxed mb-6">
              Our platform is built on rigorous academic research and proven
              educational methodology. Every feature, every lesson, and every
              exercise has been carefully designed based on comprehensive
              academic study of SQL education and database learning.
            </p>

            <p className="text-gray-100 text-lg leading-relaxed mb-8">
              Explore our complete research thesis to understand the foundation
              and methodology behind our platform:
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://docs.google.com/document/d/15YckxGfC6AY5sNJC61H5YC6RIbnYXqTaBu0fgAuDIyg/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFC727] text-[#1B5E20] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
              >
                View Complete Research Thesis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="bg-[#0f3d0f] text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Learning Methodology
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A structured approach designed for effective SQL mastery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {approaches.map((approach, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#FFC727]/50 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-[#FFC727] text-[#1B5E20] font-bold text-xl group-hover:scale-110 transition">
                    {approach.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {approach.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-linear-to-b from-[#1B5E20] to-[#0f3d0f] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-gray-100 text-lg leading-relaxed mb-4">
                The SQL Learning Platform is dedicated to making database and
                SQL education accessible to everyone. We believe that
                understanding how to work with data is a fundamental skill in
                today's digital world.
              </p>
              <p className="text-gray-100 text-lg leading-relaxed">
                Our platform combines interactive lessons, practical exercises,
                and visual explanations to help learners at all levels master
                SQL. Whether you're a complete beginner or an experienced
                developer, our platform adapts to your pace and learning style.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-[#FFC727] to-yellow-300 py-20 md:py-28">
        <div className="relative max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-[#1B5E20] text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students mastering SQL with our interactive
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/practice"
                  className="inline-flex items-center justify-center gap-2 bg-[#1B5E20] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0f3d0f] transition shadow-lg hover:shadow-xl"
                >
                  Start Practicing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1B5E20] text-[#1B5E20] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1B5E20] hover:text-white transition"
                >
                  Sign In to Continue
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  );
}
