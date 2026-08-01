"use client";

import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="px-6 sm:px-8 py-12 border-t border-border/50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-foreground">{site.name}</span>. Built with Next.js &
          Tailwind CSS.
        </p>
        <p className="text-sm text-muted">
          Always building.
        </p>
      </div>
    </footer>
  );
}
