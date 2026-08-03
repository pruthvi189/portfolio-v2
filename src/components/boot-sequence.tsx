"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let seen = true;
    try {
      seen = sessionStorage.getItem("boot-seen") === "1";
    } catch {}

    if (seen) return;

    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      setShow(true);

      if (reduceMotion) {
        setFirstName(site.firstName);
        setLastName(site.lastName);
        setTypingDone(true);
        setShowCursor(false);
        setTimeout(() => {
          if (cancelled) return;
          setShow(false);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("boot-seen", "1");
          } catch {}
        }, 400);
        return;
      }

      const fullFirst = site.firstName;
      const fullLast = site.lastName;
      let i = 0;
      let j = 0;

      const typeFirst = setInterval(() => {
        if (cancelled) return;
        if (i < fullFirst.length) {
          setFirstName(fullFirst.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeFirst);
          const typeLast = setInterval(() => {
            if (cancelled) return;
            if (j < fullLast.length) {
              setLastName(fullLast.slice(0, j + 1));
              j++;
            } else {
              clearInterval(typeLast);
              setTypingDone(true);
            }
          }, 60);

          setTimeout(() => {
            if (!cancelled) setShowCursor(false);
          }, 500);

          setTimeout(() => {
            if (!cancelled) {
              setShow(false);
              document.body.style.overflow = "";
              try {
                sessionStorage.setItem("boot-seen", "1");
              } catch {}
            }
          }, 1500);
        }
      }, 80);

      setTimeout(() => {
        if (!cancelled) {
          setShow(false);
          document.body.style.overflow = "";
        }
      }, 3000);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="text-center select-none">
            <div className="text-[clamp(2.5rem,8vw,6rem)] font-light tracking-tight leading-none text-foreground">
              {firstName}
              {!typingDone && showCursor && (
                <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 align-middle animate-pulse" />
              )}
            </div>
            {lastName && (
              <div className="text-[clamp(2.5rem,8vw,6rem)] font-light tracking-tight leading-none text-foreground mt-1">
                {lastName}
                {typingDone && showCursor && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 align-middle animate-pulse" />
                )}
              </div>
            )}
            {typingDone && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-6 mx-auto w-20 h-[1px] bg-accent/60 origin-center"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
