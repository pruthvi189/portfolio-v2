"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { site } from "@/data/site";

function MagneticButton({
  children,
  href,
  className,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.21, 0.47, 0.32, 0.98)" }}
    >
      {children}
    </Link>
  );
}

function StaggerText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          style={{ display: "inline-block", perspective: 800 }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 pt-24 pb-32 overflow-hidden"
    >
      <motion.div
        style={{ y: gridY, scale: gridScale }}
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242, 242, 242, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242, 242, 242, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: textY, scale: textScale, opacity: textOpacity }}
        className="max-w-4xl mx-auto w-full relative"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
              {site.title}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
            <StaggerText text="Hi, I'm" delay={0.5} />
            <span className="block mt-1">
              <StaggerText text={site.firstName} delay={0.9} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.6 }}
                className="text-accent"
              >
                .
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed font-light"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-medium text-sm hover:bg-accent-hover transition-colors duration-200"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full font-medium text-sm text-muted hover:text-foreground hover:border-muted/50 transition-colors duration-200"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{ y: marqueeY }}
          className="mt-16 overflow-hidden"
          aria-hidden="true"
        >
          <div className="flex w-[200%] animate-marquee">
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                className="flex items-center gap-4 shrink-0 whitespace-nowrap pr-4"
              >
                {site.techStack.map((tech) => (
                  <span
                    key={`${setIndex}-${tech}`}
                    className="text-sm text-muted/40 font-mono"
                  >
                    {tech}
                    <span className="text-accent/30 ml-4">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
