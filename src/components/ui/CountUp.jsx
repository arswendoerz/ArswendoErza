import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat up once it scrolls into view. Handles values that carry a
 * suffix ("3 yrs") by animating the leading number and keeping the rest.
 * Anything without a leading number is rendered as-is.
 *
 * Correctness first: the real value is what renders by default, and the
 * countdown to zero only happens once the tween actually produces a frame.
 * If the animation never runs (reduced motion, a background tab where
 * requestAnimationFrame is paused, an observer that never fires) the stat
 * still shows the true number instead of being stuck at 0.
 */
const CountUp = ({ value, duration = 1.4 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const animatable = target !== null && !reduceMotion;

  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animatable || !inView) return;

    const final = `${target}${suffix}`;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
      onComplete: () => setDisplay(final),
    });

    // backstop: setTimeout still fires where rAF is paused
    const guard = setTimeout(() => setDisplay(final), duration * 1000 + 600);

    return () => {
      controls.stop();
      clearTimeout(guard);
    };
  }, [animatable, inView, target, suffix, duration]);

  return <span ref={ref}>{display}</span>;
};

export default CountUp;
