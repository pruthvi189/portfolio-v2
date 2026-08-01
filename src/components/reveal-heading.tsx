"use client";

import { motion } from "motion/react";

export function RevealHeading({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");
  return (
    <Tag className={className} aria-label={children}>
      <span className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: "inline-block", perspective: 600 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

export function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
