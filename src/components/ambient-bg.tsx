"use client";

import { useRef, useEffect, useCallback } from "react";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(0);

  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const handleMouse = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FPS = 24;
    const interval = 1000 / FPS;

    const draw = (timestamp: number) => {
      const delta = timestamp - lastFrameRef.current;
      if (delta < interval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp - (delta % interval);

      timeRef.current += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x || canvas.width / 2;
      const my = mouseRef.current.y || canvas.height / 2;

      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      gradient.addColorStop(0, "rgba(140, 207, 138, 0.04)");
      gradient.addColorStop(0.5, "rgba(140, 207, 138, 0.01)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(140, 207, 138, 0.03)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const baseX = (canvas.width / 4) * (i + 0.5) + Math.sin(timeRef.current + i) * 40;
        const baseY = canvas.height * (0.3 + Math.sin(timeRef.current * 0.7 + i * 2) * 0.15);
        ctx.moveTo(baseX - 100, baseY);
        for (let x = -100; x < canvas.width + 100; x += 40) {
          const y =
            baseY +
            Math.sin(x * 0.008 + timeRef.current + i + 42) * 20 +
            Math.sin(x * 0.015 + timeRef.current * 0.5 + i) * 10;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
