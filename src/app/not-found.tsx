"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

function useTyper(text: string, speed: number) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplay("");
    setDone(false);
    const t = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  return { display, done };
}

export default function NotFound() {
  const { display, done } = useTyper(
    "Error: 404. Route not found. Check your path and try again.",
    25
  );

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(140, 207, 138, 0.15) 2px, rgba(140, 207, 138, 0.15) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-accent text-xs tracking-[0.3em] mb-3"
        >
          $ SYS::ROUTE_CHECK
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-mono text-[clamp(100px,30vw,200px)] font-black leading-none tracking-tighter text-accent/80 select-none"
          style={{ textShadow: "0 0 40px rgba(108,155,207,0.15), 0 0 80px rgba(108,155,207,0.05)" }}
        >
          404
        </motion.h1>

        <div className="font-mono text-sm text-accent/80 mb-8 h-12 flex items-center justify-center">
          {display}
          {showCursor && (
            <span className="inline-block w-[6px] h-[14px] bg-accent ml-1 animate-pulse" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent/30 bg-accent/5 font-mono text-sm text-accent hover:bg-accent hover:text-background transition-all duration-200"
          >
            <span className="text-xs">$</span>
            cd ~/home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
