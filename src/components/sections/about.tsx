"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const timeline = [
  {
    period: "Jan 2026 — Apr 2026",
    title: "ML Intern",
    organization: "Thick Code, Rajkot",
    icon: Briefcase,
    details: [
      "Led model development on a 4-person team building a stock forecasting platform benchmarking ARIMA, Prophet, and LSTM models",
      "Applied core ML and data science foundations — NumPy, pandas, and applied statistics — to iterative, hands-on project work",
      "Independently designed and delivered 8+ applied ML projects on biweekly deadlines",
    ],
  },
  {
    period: "May 2025 — Jun 2025",
    title: "Full Stack Web Developer Intern",
    organization: "Gleamoro, Bhavnagar",
    icon: Briefcase,
    details: [
      "Reduced API response latency by an estimated 30% through query optimization and connection pooling",
      "Integrated React/Redux frontend with the authenticated API; diagnosed and fixed a race condition in concurrent requests",
    ],
  },
  {
    period: "May 2026",
    title: "B.Tech, Information Technology",
    organization: "G H Patel College of Engineering and Technology (GCET), Anand",
    icon: GraduationCap,
    details: [
      "CGPA: 8.60/10",
      "Affiliated with CVM University",
    ],
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="group relative flex gap-4 sm:gap-6 rounded-lg p-2 -m-2 transition-colors duration-300 hover:bg-accent/[0.02]">
        <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface border border-border/60 shrink-0 transition-colors duration-300 group-hover:border-accent/20">
          <Icon size={16} className="text-muted sm:w-[18px] sm:h-[18px]" />
        </div>
        <div className="flex-1 pb-2">
          <p className="text-xs text-muted mb-1">{item.period}</p>
          <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
          {item.organization && (
            <p className="text-sm text-muted mb-3">{item.organization}</p>
          )}
          {item.details && (
            <ul className="space-y-2">
              {item.details.map((detail, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="text-accent mt-1.5 shrink-0">&bull;</span>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="absolute left-4 sm:left-5 top-0 bottom-0 w-px overflow-hidden">
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="w-full h-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
      />
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-6 sm:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">
            About Me
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-muted text-lg leading-relaxed max-w-3xl mb-16"
        >
          Hi, I&apos;m Pruthvi. I recently graduated with a B.Tech in Information Technology
          and enjoy building AI applications that solve real-world problems. My work primarily
          revolves around machine learning, with experience in full-stack development whenever
          a project calls for it. I like turning ideas that genuinely interest me into projects,
          using each one as an opportunity to learn, experiment, and build something meaningful.
        </motion.p>

        <div className="relative">
          <AnimatedLine />

          <div className="space-y-10">
            {timeline.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
