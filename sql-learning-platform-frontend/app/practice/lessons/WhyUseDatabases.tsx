"use client";

import { motion } from "framer-motion";
import { Database, Users, Lock, Zap } from "lucide-react";

export default function WhyUseDatabases() {
  const benefits = [
    {
      icon: Database,
      title: "Scalability",
      desc: "Handle millions of records efficiently",
    },
    {
      icon: Lock,
      title: "Data Integrity",
      desc: "Enforce rules to prevent bad data",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Indexed queries return results in milliseconds",
    },
    {
      icon: Users,
      title: "Concurrency",
      desc: "Multiple users can access data simultaneously",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Use Databases?
        </h2>
        <p className="text-gray-700 mb-4">
          Databases ensure data persistence, security, and efficiency. Without
          them, data can be lost, corrupted, or become impossible to manage as
          your application grows.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          The Problem Without Databases
        </h3>
        <p className="text-gray-700 mb-3">
          Imagine storing customer orders in text files: searching requires
          reading every file, updates risk corruption, and concurrent access
          causes conflicts.
        </p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-100 p-3 rounded text-sm"
        >
          <p className="text-red-800 font-semibold">Real scenario:</p>
          <p className="text-red-700">
            A small business tried managing 10,000 orders in spreadsheets.
            Search took 30+ seconds, and they lost data during a crash.
          </p>
        </motion.div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-green-50 p-4 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3">
                <benefit.icon className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{benefit.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h4 className="text-yellow-400 mb-3 text-lg">Real-World Use Cases</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>
              <strong>E-commerce:</strong> Manage products, orders, customers,
              and inventory
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>
              <strong>Social Media:</strong> Store posts, users, likes, and
              relationships
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>
              <strong>Banking:</strong> Track transactions, accounts, and
              security logs
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>
              <strong>Healthcare:</strong> Patient records, appointments, and
              medical history
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Bottom Line</h3>
        <p className="text-gray-700">
          Databases are essential for any application that needs to store data
          permanently, serve multiple users, or scale beyond a few hundred
          records. The investment in learning database concepts pays off
          immediately in real projects.
        </p>
      </div>
    </div>
  );
}
