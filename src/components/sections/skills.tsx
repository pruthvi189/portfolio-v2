"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillTree: SkillCategory[] = [
  {
    category: "Machine Learning & AI",
    skills: ["TensorFlow", "Scikit-learn", "LangChain", "RAG", "Agentic AI", "OpenCV", "Pandas", "NumPy"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Flask", "Node.js", "REST APIs"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "SQLite", "Firebase"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Python", "Git", "GitHub", "Docker", "Postman", "Vercel", "Render"],
  },
];

function TreeNode({ cat, index: catIndex }: { cat: SkillCategory; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const glowBg = useMotionTemplate`radial-gradient(ellipse 60% 80% at ${glowX}% ${glowY}%, rgba(108,155,207,0.06), transparent)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: catIndex * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="group relative border border-border/40 bg-surface/10 transition-colors duration-300 hover:border-accent/25">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          style={{ background: glowBg }}
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <button
          onClick={() => setOpen(!open)}
          className="relative flex w-full items-center gap-3 p-4 text-left"
        >
          <div
            className={`h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
              open ? "border-accent bg-accent" : "border-border bg-transparent"
            }`}
          />
          <div className="flex-1">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-accent">
              [{String(catIndex + 1).padStart(2, "0")}]
            </span>
            <h4 className="font-sans text-sm font-semibold text-foreground mt-0.5">{cat.category}</h4>
          </div>
          <motion.svg
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 text-muted/50"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/20 px-4 pb-4 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="border border-border/20 bg-surface/30 px-2.5 py-1 font-mono text-[10px] text-muted/50 transition-colors hover:border-accent/30 hover:text-accent/70"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative flex w-full flex-col items-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="relative z-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-14"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted/30">Skills</span>
          </div>
          <h2 className="font-sans text-4xl font-semibold uppercase leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Tech Stack
          </h2>
          <p className="font-mono text-xs text-muted/30 mt-3">
            Click to explore — each branch unfolds
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {skillTree.map((cat, i) => (
            <TreeNode key={cat.category} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
