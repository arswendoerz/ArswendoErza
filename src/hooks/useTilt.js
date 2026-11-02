import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * 3D tilt toward the cursor for a card with the `.tilt` class. A real mouse
 * only: on touch the card stays flat so scrolling never wobbles it.
 * Spread the returned handlers onto the card.
 */
export const useTilt = ({ x = 14, y = 12 } = {}) => {
  const reduceMotion = useReducedMotion();
  return useMemo(() => {
    if (reduceMotion || !finePointer()) return {};
    return {
      onPointerMove: (e) => {
        if (e.pointerType !== "mouse") return;
        const card = e.currentTarget;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.classList.add("tilt-active");
        card.style.transform = `rotateX(${(0.5 - py) * y}deg) rotateY(${(px - 0.5) * x}deg) translateY(-4px) scale(1.02)`;
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      },
      onPointerLeave: (e) => {
        e.currentTarget.classList.remove("tilt-active");
        e.currentTarget.style.transform = "";
      },
    };
  }, [reduceMotion, x, y]);
};

export default useTilt;
