import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { mountHeroScene } from "./mountHeroScene";

/**
 * Full-bleed WebGL canvas behind the hero. Loaded lazily and only on wide
 * screens, so phones and the first paint never pay for three.js.
 */
const HeroScene = ({ heroRef, anchorRef, imageSrc, onReady }) => {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current, hero = heroRef.current, anchor = anchorRef.current;
    if (!canvas || !hero || !anchor) return;
    let scene;
    try {
      scene = mountHeroScene({
        canvas,
        hero,
        anchor,
        imageSrc,
        reduce: Boolean(reduceMotion),
        onReady: () => readyRef.current?.(),
      });
    } catch {
      // no WebGL: the flat portrait simply stays
      return;
    }
    return () => scene.dispose();
  }, [heroRef, anchorRef, imageSrc, reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

export default HeroScene;
