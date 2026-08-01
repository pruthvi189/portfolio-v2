"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full"
        />
        <p className="text-sm text-muted font-mono tracking-wider">LOADING</p>
      </div>
    </div>
  );
}
