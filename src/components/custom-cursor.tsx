"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

const HOVERABLE =
  "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const touchDevice = useMediaQuery("(pointer: coarse)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (reduced) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isHoverable = !!target?.closest?.(HOVERABLE);
      setHovering((prev) => (prev === isHoverable ? prev : isHoverable));
    };

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleOver);

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [reduced, mouseX, mouseY]);

  if (reduced || touchDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          width: hovering ? 32 : 8,
          height: hovering ? 32 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
}
