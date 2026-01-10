"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function JoinVisualizer() {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8 items-center">
        <div className="bg-green-900/50 p-6 rounded-lg border border-green-600">
          <h4 className="text-yellow-400 mb-4">Customers</h4>
          <p>1 | Alice</p>
          <p>2 | Bob</p>
          <p>3 | Charlie</p>
        </div>

        <div className="text-center text-4xl text-yellow-400">INNER JOIN</div>

        <div className="bg-green-900/50 p-6 rounded-lg border border-green-600">
          <h4 className="text-yellow-400 mb-4">Orders</h4>
          <p>101 | 1</p>
          <p>102 | 2</p>
          <p>103 | 5</p>
        </div>
      </div>

      <Button onClick={() => setAnimate(true)} className="mx-auto block">
        Animate Join
      </Button>

      {animate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-500/20 p-8 rounded-lg border-2 border-yellow-400 text-center"
        >
          <h4 className="text-2xl text-yellow-400 mb-4">Result</h4>
          <p>Alice | 101</p>
          <p>Bob | 102</p>
        </motion.div>
      )}
    </div>
  );
}
