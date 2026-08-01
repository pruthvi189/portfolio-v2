"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { MoreProjects } from "@/components/sections/more-projects";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200, damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200, damping: 25,
  });

  const spotlightX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const spotlightPosX = useTransform(spotlightX, [-0.5, 0.5], [20, 80]);
  const spotlightPosY = useTransform(spotlightY, [-0.5, 0.5], [20, 80]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformPerspective: 1200,
        }}
        className="group relative overflow-hidden rounded-sm border border-border/60 bg-surface/30 transition-[box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-accent/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse 50% 50% at ${spotlightPosX}% ${spotlightPosY}%, rgba(140, 207, 138, 0.06), transparent)`
              : "transparent",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-y-0 left-0 w-[1px] origin-top bg-gradient-to-b from-accent to-accent/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col gap-4 p-6 sm:p-8 lg:flex-1">
            <div className="flex items-center gap-2.5">
              {project.featured && (
                <span className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5" aria-hidden="true">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                  Featured
                </span>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold uppercase leading-none tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-muted">
                {project.description}
              </p>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-border/30 lg:block" />

          <div className="flex flex-col gap-5 border-t border-border/30 p-6 sm:p-8 lg:w-72 lg:border-t-0 xl:w-80">
            <div>
              <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/40">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 6).map((tech) => (
                  <span key={tech} className="border border-border/20 bg-surface/50 px-2 py-0.5 font-mono text-[9px] text-muted/50 transition-colors group-hover:text-muted/70">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 6 && (
                  <span className="border border-border/20 bg-surface/50 px-2 py-0.5 font-mono text-[9px] text-muted/50">
                    +{project.techStack.length - 6}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-sm border border-border/30 bg-surface/50 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted/60 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/5 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-background"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative flex w-full flex-col items-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-14 flex flex-col gap-1 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted/30">Work</span>
            </div>
            <h2 className="font-sans text-4xl font-semibold uppercase leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Selected Work
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted/30 md:text-right">
            {projects.length} projects
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <MoreProjects />
      </div>
    </section>
  );
}
