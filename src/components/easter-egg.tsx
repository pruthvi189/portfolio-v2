"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const shortcuts: Record<string, string> = {
  h: "#home",
  p: "#projects",
  a: "#about",
};

interface Toast {
  id: number;
  message: string;
}

let toastId = 0;

function useMorseSequence(
  word: string,
  onFlash: (active: boolean) => void,
  onDone: () => void
) {
  useEffect(() => {
    if (!word) return;

    const morse: Record<string, string[]> = {
      P: [".", "-", "-", "."],
      S: [".", ".", "."],
    };
    const dot = 100;
    const dash = 300;
    const gap = 100;
    const letterGap = 350;

    const timings: { dur: number; val: boolean }[] = [];

    word.toUpperCase().split("").forEach((ch, ci) => {
      const syms = morse[ch] ?? [];
      syms.forEach((sym, si) => {
        timings.push({ dur: sym === "." ? dot : dash, val: true });
        if (si < syms.length - 1) timings.push({ dur: gap, val: false });
      });
      if (ci < word.length - 1) timings.push({ dur: letterGap, val: false });
    });
    timings.push({ dur: 400, val: false });

    let cancelled = false;
    let i = 0;

    function step() {
      if (cancelled || i >= timings.length) {
        onFlash(false);
        onDone();
        return;
      }
      onFlash(timings[i].val);
      setTimeout(() => {
        i++;
        step();
      }, timings[i].dur);
    }

    step();
    return () => { cancelled = true; };
  }, [word, onFlash, onDone]);
}

function PSGlitch({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"glitch" | "morse">("glitch");
  const [morseActive, setMorseActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("morse"), 500);
    return () => clearTimeout(t);
  }, []);

  useMorseSequence(phase === "morse" ? "PS" : "", setMorseActive, onDone);

  return (
    <AnimatePresence>
      <motion.div
        key="glitch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] pointer-events-none"
      >
        {phase === "glitch" && (
          <>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                opacity: [0, 0.6, 0, 0.3, 0, 0.5, 0],
                x: [0, -4, 6, -3, 2, -1, 0],
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ backdropFilter: "invert(100%)" }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                backgroundSize: "100% 4px",
              }}
            />
          </>
        )}
        {morseActive && (
          <>
            <div className="absolute inset-x-0 top-0 h-[2px] bg-accent/60 shadow-[0_0_8px_rgba(108,155,207,0.4)]" />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent/60 shadow-[0_0_8px_rgba(108,155,207,0.4)]" />
            <div className="absolute inset-y-0 left-0 w-[2px] bg-accent/60 shadow-[0_0_8px_rgba(108,155,207,0.4)]" />
            <div className="absolute inset-y-0 right-0 w-[2px] bg-accent/60 shadow-[0_0_8px_rgba(108,155,207,0.4)]" />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function CoffeePopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, x: 400, y: 300 }}
        animate={{ scale: 1, x: 0, y: 0 }}
        exit={{ scale: 0, x: 400, y: 300 }}
        transition={{ type: "spring", damping: 22, stiffness: 260, mass: 0.7 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-surface border border-border/60 rounded-lg shadow-xl p-5 w-72"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center text-muted/50 hover:text-foreground transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-2xl mb-3">☕</div>
        <p className="text-sm text-foreground font-medium mb-0.5">Me too. Let&apos;s talk.</p>
        <p className="text-xs text-muted/50 mb-4">Grab a coffee and reach out.</p>
        <a
          href="mailto:Pruthvi.shah12@gmail.com"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3.5L7 7.5L13 3.5M2 11.5H12C12.5523 11.5 13 11.0523 13 10.5V3.5C13 2.94772 12.5523 2.5 12 2.5H2C1.44772 2.5 1 2.94772 1 3.5V10.5C1 11.0523 1.44772 11.5 2 11.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Send an email
        </a>
      </motion.div>
    </motion.div>
  );
}

export function EasterEgg() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seqRef = useRef<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [hologram, setHologram] = useState(false);
  const [purplePulse, setPurplePulse] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);

  const addToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const psLogo = document.getElementById("ps-logo");
    let clickTimer: ReturnType<typeof setTimeout> | null = null;

    const handleClick = (e: MouseEvent) => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        e.preventDefault();
        setHologram(true);
      } else {
        e.preventDefault();
        clickTimer = setTimeout(() => {
          clickTimer = null;
          window.location.hash = "#home";
        }, 280);
      }
    };

    if (psLogo) {
      psLogo.addEventListener("click", handleClick);
    }

    const handleKey = (e: KeyboardEvent) => {
      const raw = e.key;
      const lower = raw.toLowerCase();

      if (raw === "?" || raw === "/") {
        const keys = Object.entries(shortcuts)
          .map(([k, v]) => `${k.toUpperCase()} → ${v.replace("#", "")}`)
          .join(", ");
        addToast(`Shortcuts: ${keys}`);
        return;
      }

      const target = shortcuts[lower];
      if (target) {
        e.preventDefault();
        const behavior = prefersReducedMotion() ? "auto" : "smooth";
        document.querySelector(target)?.scrollIntoView({ behavior });
        addToast(`Jumped to ${target.replace("#", "")}`);
      }

      const seqKey = raw.startsWith("Arrow") ? raw : lower;
      const next = [...seqRef.current, seqKey].slice(-10);
      seqRef.current = next;

      if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
        seqRef.current = [];
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 3000);
        return;
      }

      const last2 = next.slice(-2).join("");
      if (last2 === "42") {
        seqRef.current = [];
        addToast("The answer to life, the universe, and everything.");
        setPurplePulse(true);
        setTimeout(() => setPurplePulse(false), 1500);
        return;
      }

      if (next.slice(-6).join("") === "coffee") {
        seqRef.current = [];
        setShowCoffee(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      if (psLogo) psLogo.removeEventListener("click", handleClick);
      if (clickTimer) clearTimeout(clickTimer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [addToast]);

  return (
    <>
      <AnimatePresence>
        {purplePulse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[199] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.12) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <p className="text-2xl font-light text-foreground">
                You found the secret!
              </p>
              <p className="text-muted text-sm mt-2">
                Konami code mastered.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hologram && (
          <PSGlitch onDone={() => setHologram(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCoffee && (
          <CoffeePopup onClose={() => setShowCoffee(false)} />
        )}
      </AnimatePresence>

      <div className="fixed bottom-20 right-8 z-40 flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-surface border border-border/60 px-4 py-2 rounded-lg text-sm text-foreground shadow-lg"
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
