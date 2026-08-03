"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (!mobileOpen) {
        setHidden(y > lastScrollY.current && y > 160);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll);

    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.name);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    menuRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-16 sm:h-20">
          <Link
            href="#home"
            className="flex items-center gap-2 text-sm font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors group"
          >
            <span id="ps-logo" className="flex items-center justify-center w-9 h-9 rounded-full border border-accent/40 text-accent text-sm font-bold transition-colors group-hover:bg-accent/10">
              PS
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors duration-200 rounded-full",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-surface border border-border/60 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          <button
            ref={toggleRef}
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setHidden(false);
            }}
            className="sm:hidden p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-border/50 sm:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActive(item.name);
                    setMobileOpen(false);
                    toggleRef.current?.focus();
                  }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm transition-colors",
                    active === item.name
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
