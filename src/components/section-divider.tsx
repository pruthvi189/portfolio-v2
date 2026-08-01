"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]);

  return (
    <div ref={ref} className="relative py-8 flex items-center justify-center">
      <motion.div
        style={{ scaleX, opacity }}
        className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-center"
      />
      <motion.div
        style={{ opacity }}
        className="absolute w-1 h-1 rounded-full bg-accent/30"
        aria-hidden="true"
      />
    </div>
  );
}
