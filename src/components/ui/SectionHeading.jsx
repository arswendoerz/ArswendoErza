import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

/** Shared eyebrow + title + subtitle block used by every section. */
const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }) => {
  const centered = align === "center";
  const reduceMotion = useReducedMotion();
  const words = String(title).split(" ");

  return (
    <div
      className={`flex flex-col gap-3 ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <Reveal direction="down" className="eyebrow">
          <span className="h-1 w-1 rounded-full bg-accent-cyan shadow-[0_0_10px_2px_rgb(var(--c-accent-cyan)/0.7)]" />
          {eyebrow}
        </Reveal>
      )}

      {/* Words fade in one after another. Only opacity is animated — a
          transform here would slide the words out from under the heading's
          background-clipped gradient. */}
      <motion.h2
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
        }}
        className="section-title gradient-text"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: "easeOut" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.h2>

      {subtitle && (
        <Reveal direction="up" delay={0.1}>
          <p className={`max-w-2xl text-base ${centered ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
