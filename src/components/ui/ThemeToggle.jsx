import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";
import { useContent } from "../../hooks/useLanguage";

/** Sun/moon switch. `variant="wide"` is used inside the mobile sheet. */
const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { isDark, toggle } = useTheme();
  const reduceMotion = useReducedMotion();
  const t = useContent().ui.theme;
  const Icon = isDark ? HiSun : HiMoon;
  const label = isDark ? t.toLight : t.toDark;

  const spin = reduceMotion
    ? {}
    : {
        initial: { rotate: -90, opacity: 0, scale: 0.6 },
        animate: { rotate: 0, opacity: 1, scale: 1 },
        exit: { rotate: 90, opacity: 0, scale: 0.6 },
      };

  if (variant === "wide") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-line-soft px-5 py-4 text-lg font-medium text-content transition-colors duration-300 hover:border-accent/40 hover:bg-overlay ${className}`}
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-overlay text-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "sun" : "moon"}
              {...spin}
              transition={{ duration: 0.25 }}
              className="grid place-items-center"
            >
              <Icon />
            </motion.span>
          </AnimatePresence>
        </span>
        {isDark ? t.light : t.dark}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative grid h-11 w-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-xl border border-line bg-overlay text-lg text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          {...spin}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
