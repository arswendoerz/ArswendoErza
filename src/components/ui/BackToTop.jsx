import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";
import { useContent } from "../../hooks/useLanguage";

/** Floating scroll-to-top button, revealed once the visitor is well down the page. */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const label = useContent().ui.footer.backToTop;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed bottom-5 right-5 z-[880] grid h-12 w-12 cursor-pointer place-items-center rounded-full text-lg text-content shadow-lift transition-colors duration-300 hover:border-accent/50 hover:text-accent sm:bottom-8 sm:right-8"
        >
          <HiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
