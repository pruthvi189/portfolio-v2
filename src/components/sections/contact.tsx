"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/data/site";
import { Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/components/icons";

function ParticleBurst({ x, y }: { x: number; y: number }) {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    distance: 20 + Math.random() * 30,
  }));

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute w-1 h-1 rounded-full bg-accent/60 pointer-events-none"
          style={{ left: x, top: y }}
        />
      ))}
    </AnimatePresence>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon: Icon,
  delay,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ElementType;
  delay: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [particles, setParticles] = useState<{ x: number; y: number } | null>(null);
  const isExternal = href.startsWith("http");

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setParticles({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setParticles(null), 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <a
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onMouseEnter={handleMouseEnter}
        className="group relative flex flex-col items-center text-center border border-border/50 rounded-[20px] p-6 bg-surface/20 hover:scale-[1.05] hover:border-accent/20 hover:shadow-[0_0_40px_-10px_rgba(108,155,207,0.12)] transition-all duration-300 ease-out overflow-hidden"
      >
        {particles && <ParticleBurst x={particles.x} y={particles.y} />}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface text-muted group-hover:bg-accent/10 group-hover:text-accent mb-3 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-1">
          {label}
        </p>
        <p className="font-medium text-sm text-muted group-hover:text-foreground transition-colors duration-200">
          {value}
        </p>
      </a>
    </motion.div>
  );
}

export function Contact() {
  const links = [
    { label: "EMAIL", value: "Send a Message", href: `mailto:${site.email}`, icon: Mail },
    { label: "GITHUB", value: "@pruthvi189", href: site.github, icon: GithubIcon },
    { label: "LINKEDIN", value: "Connect", href: site.linkedin, icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )},
    { label: "RESUME", value: "View Resume", href: site.resumeUrl, icon: FileText },
  ];

  return (
    <section id="contact" className="px-6 sm:px-8 py-24 pb-40 relative">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-muted text-lg max-w-2xl mb-12 text-center mx-auto">
            Open to ML engineering opportunities, collaborations, and conversations
            about building impactful products.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {links.map((link, i) => (
            <ContactCard key={link.label} {...link} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
