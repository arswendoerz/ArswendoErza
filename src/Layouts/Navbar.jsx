import { createElement, useEffect, useState } from "react";
import { content } from "../Content";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "../components/ui/ThemeToggle";

const Navbar = () => {
  const { nav, hero } = content;
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // condense the bar once the visitor leaves the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight whichever section is crossing the middle of the viewport
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.link))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setShowMenu(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-500 ease-expo ${
          scrolled
            ? "border-b border-line bg-canvas-deep/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="container-x flex h-[68px] items-center justify-between gap-4"
        >
          {/* Wordmark */}
          <a
            href="#home"
            className="group flex shrink-0 items-center"
            aria-label={`${hero.fullName} — back to top`}
          >
            {/* wordmark is the only brand mark now, so it stays visible at
                every width — otherwise this link would be empty on mobile */}
            <span className="font-display text-base font-semibold tracking-tight">
              Arswendo<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-line bg-overlay/70 p-1 backdrop-blur-md lg:flex">
            {nav.map((item) => {
              const isActive = active === item.link;
              return (
                <li key={item.link}>
                  <a
                    href={item.link}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 xl:px-4 ${
                      isActive
                        ? "text-on-accent"
                        : "text-content-muted hover:text-content"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent-gradient"
                      />
                    )}
                    {createElement(item.icon, { className: "text-base" })}
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="#contact"
              className="btn-primary hidden shrink-0 whitespace-nowrap !py-2.5 !text-xs sm:inline-flex"
            >
              Hire Me
            </a>

            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-expanded={showMenu}
              aria-controls="mobile-menu"
              aria-label={showMenu ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-line bg-overlay text-xl transition-colors duration-300 hover:border-accent/50 hover:text-accent lg:hidden"
            >
              {showMenu ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </nav>

        {/* Reading progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-accent-gradient"
          aria-hidden="true"
        />
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[890] bg-canvas-deep/95 backdrop-blur-2xl lg:hidden"
          >
            <ul className="container-x flex h-full flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.link}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.06 * i,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={item.link}
                    onClick={() => setShowMenu(false)}
                    className={`flex items-center gap-4 rounded-2xl border border-line-soft px-5 py-4 text-lg font-medium transition-colors duration-300 hover:border-accent/40 hover:bg-overlay ${
                      active === item.link ? "text-accent" : "text-content"
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-overlay text-xl">
                      {createElement(item.icon)}
                    </span>
                    {item.text}
                    <span className="ml-auto font-mono text-xs text-content-dim">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.06 * nav.length,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-2"
              >
                <ThemeToggle variant="wide" />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
