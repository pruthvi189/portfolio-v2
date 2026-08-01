"use client";

import { motion } from "motion/react";
import { ExternalLink, GithubIcon } from "@/components/icons";
import { moreProjects } from "@/data/projects";

function MoreProjectCard({
  project,
  index,
}: {
  project: (typeof moreProjects)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex h-full flex-col justify-between rounded-sm border border-border/60 bg-surface/30 p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(108, 155, 207, 0.2)" }}
      />

      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-lg font-semibold uppercase leading-none tracking-tight text-foreground sm:text-xl">
            {project.title}
          </h3>
          {project.status && (
            <span className="flex items-center rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted/60">
          {project.subtitle}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border border-border/20 bg-surface/50 px-2 py-0.5 font-mono text-[8px] text-muted/50 transition-colors group-hover:text-muted/70"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="border border-border/20 bg-surface/50 px-2 py-0.5 font-mono text-[8px] text-muted/50">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border/30 pt-3">
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
    </motion.div>
  );
}

export function MoreProjects() {
  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted/30">
              More
            </span>
          </div>
          <h3 className="font-sans text-2xl font-semibold uppercase leading-none tracking-tight text-foreground sm:text-3xl md:text-4xl">
            More Things I&apos;ve Built
          </h3>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted/30 md:text-right">
          {moreProjects.length} more projects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {moreProjects.map((project, i) => (
          <MoreProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
