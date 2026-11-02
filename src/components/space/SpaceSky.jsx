import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * A cheap 2D star field fixed behind every section after the hero. It fades
 * in as the hero scrolls away, and nearer stars drift faster for depth.
 */
const SpaceSky = () => {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sky = canvasRef.current;
    const ctx = sky.getContext("2d");
    let stars = [], dpr = 1, frame = 0;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      sky.width = window.innerWidth * dpr;
      sky.height = window.innerHeight * dpr;
      stars = Array.from({ length: Math.round((window.innerWidth * window.innerHeight) / 5200) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 3,
        depth: 0.15 + Math.random() * 0.85,
        r: 0.4 + Math.random() * 1.1,
        blue: Math.random() < 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    size();
    window.addEventListener("resize", size);

    const draw = (time) => {
      frame = requestAnimationFrame(draw);
      const heroH = document.getElementById("home")?.offsetHeight ?? window.innerHeight;
      const o = clamp((window.scrollY - heroH * 0.45) / (heroH * 0.4));
      sky.style.opacity = o;
      if (o <= 0) return;
      const w = window.innerWidth, h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const light = document.documentElement.dataset.theme === "light";
      const span = h * 3;
      for (const s of stars) {
        const y = (((s.y - window.scrollY * s.depth * 0.35) % span) + span) % span;
        if (y > h) continue;
        const a = (0.35 + 0.65 * s.depth) * (reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(time / 600 + s.tw));
        ctx.fillStyle = light
          ? `rgba(40,70,130,${a * 0.5})`
          : s.blue ? `rgba(120,200,255,${a})` : `rgba(235,242,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r * (0.6 + s.depth * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", size);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0"
    />
  );
};

export default SpaceSky;
