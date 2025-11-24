"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Code2,
  Sparkles,
  FileText,
  Users,
  HelpCircle,
  HeadphonesIcon,
  Home,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
  ];

  // Quick links
  const quickLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Lessons", href: "/lessons" },
    { icon: Code2, label: "Practice SQL", href: "/practice" },
    { icon: Sparkles, label: "AI Query", href: "/ai-query" },
    { icon: Users, label: "About Us", href: "/about" },
  ];

  // Resources
  const resources = [
    { icon: FileText, label: "Documentation", href: "/docs" },
    { icon: Users, label: "Student Guide", href: "/student-guide" },
    { icon: BookOpen, label: "Instructor Guide", href: "/instructor-guide" },
    { icon: HelpCircle, label: "FAQs", href: "/faqs" },
    { icon: HeadphonesIcon, label: "Support", href: "/support" },
  ];

  return (
    <footer className="relative bg-linear-to-br from-[#1B5E20] via-[#164A16] to-[#0F3A0F] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFC727] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC727] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* COLUMN 1: Brand & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CSU Digital Academy
            </h2>
            <p className="mt-4 text-gray-200 leading-relaxed">
              An interactive learning platform designed for Caraga State
              University students to master SQL through hands-on practice and
              AI-powered guidance.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 ${social.color} transition-all hover:scale-110 hover:bg-white/20`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COLUMN 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-[#FFC727]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-gray-200 hover:text-[#FFC727] transition-colors"
                  >
                    <link.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC727]" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <Link
                    href={resource.href}
                    className="group flex items-center gap-3 text-gray-200 hover:text-[#FFC727] transition-colors"
                  >
                    <resource.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FFC727]" />
              Contact Us
            </h3>

            {/* Address */}
            <div className="space-y-4 text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FFC727] mt-1 shrink-0" />
                <p className="leading-relaxed">
                  Caraga State University
                  <br />
                  Ampayon, Butuan City
                  <br />
                  Philippines 8600
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FFC727] shrink-0" />
                <a
                  href="tel:+6385123456"
                  className="hover:text-[#FFC727] transition"
                >
                  (085) 123-4567
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FFC727] shrink-0" />
                <a
                  href="mailto:csu-digital@csu.edu.ph"
                  className="hover:text-[#FFC727] transition break-all"
                >
                  csu-digital@csu.edu.ph
                </a>
              </div>
            </div>

            {/* Report Button */}
            <motion.a
              href="/report"
              className="mt-6 inline-flex items-center gap-2 bg-[#FFC727] text-[#1B5E20] px-5 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-4 h-4" />
              Report an Issue
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} CSU Digital Academy. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-[#FFC727] transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#FFC727] transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-[#FFC727] transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
