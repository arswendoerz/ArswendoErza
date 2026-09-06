import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Replaces AOS so the animations also run on mobile,
 * and collapses to a plain fade when the visitor prefers reduced motion.
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  as = "div",
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? OFFSETS.none : OFFSETS[direction] ?? OFFSETS.up;
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0.2 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
