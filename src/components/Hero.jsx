import { useEffect, useRef, useState } from "react";
import { content } from "../Content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HiOutlineLocationMarker, HiArrowDown } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import CountUp from "./ui/CountUp";

/** Types a list of words out one by one, then deletes and moves to the next. */
const useTypewriter = (words, { typeSpeed = 65, deleteSpeed = 30, pause = 1700 } = {}) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setText(words[0]);
      return;
    }

    const word = words[index % words.length];
    let timer;

    if (!deleting) {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setDeleting(true), pause);
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed);
    } else {
      setDeleting(false);
      setIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduceMotion, typeSpeed, deleteSpeed, pause]);

  return text;
};

const Hero = () => {
  const { hero } = content;
  const typed = useTypewriter(hero.roles);
  const reduceMotion = useReducedMotion();

  // gentle parallax: the portrait drifts a little slower than the page
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 lg:pt-[68px]"
    >
      {/* ambient light + technical grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        {/* static blurs — animating a layer this large is expensive on low-end devices */}
        <div className="glow -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 bg-accent/20 blur-[130px]" />
        <div className="glow bottom-0 right-[-10%] h-[30rem] w-[30rem] bg-accent-cyan/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      {/* signature vertical rule */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[0.65rem] uppercase tracking-[0.45em] text-content-dim/60 xl:block"
      >
        Portfolio 2026 · {hero.firstName} {hero.LastName}
      </span>

      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:py-0">
        <motion.div
          style={reduceMotion ? undefined : { y: copyY }}
          className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div
            {...fadeUp(0)}
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <span className="chip !normal-case !tracking-normal">
              <HiOutlineLocationMarker className="text-accent-cyan" />
              {hero.location}
            </span>
            <span className="chip !normal-case !tracking-normal">
              <RiGraduationCapFill className="text-accent-cyan" />
              Informatics Engineering, Class of 2026
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.08)}
            className="mt-6 font-mono text-sm text-accent-soft"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            {...fadeUp(0.14)}
            className="mt-2 font-display text-[clamp(2.3rem,6vw,3.9rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            <span className="gradient-text">{hero.firstName} </span>
            <span className="accent-text">{hero.LastName}</span>
            <span className="gradient-text"> SADEWA</span>
          </motion.h1>

          {/* role typewriter */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-4 flex min-h-[2.25rem] items-center gap-2 font-mono text-base sm:text-lg"
            aria-live="polite"
          >
            <span className="text-accent-cyan">&gt;</span>
            <span className="font-medium text-content">{typed}</span>
            <span className="inline-block h-5 w-[2px] bg-accent animate-caret" />
          </motion.div>

          <motion.p {...fadeUp(0.26)} className="mt-5 max-w-xl text-[0.98rem] leading-relaxed">
            {hero.intro}
          </motion.p>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#contact" className="btn-primary group">
              {hero.btnText}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-ghost">
              {hero.secondaryBtnText}
            </a>
          </motion.div>

          {/* stats */}
          <motion.dl
            {...fadeUp(0.4)}
            className="mt-10 grid w-full max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-overlay sm:grid-cols-4"
          >
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-canvas/70 px-4 py-4 text-center lg:text-left"
              >
                <dt className="font-display text-xl font-bold text-content sm:text-2xl">
                  <CountUp value={stat.value} />
                </dt>
                <dd className="mt-1 text-[0.7rem] leading-snug text-content-dim">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: portraitY }}
          className="order-2 mx-auto w-fit"
        >
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[410/766] w-[58vw] max-w-[15rem] sm:max-w-[17rem] lg:h-[min(78vh,44rem)] lg:w-auto lg:max-w-none"
        >
          {/* ambient glow hugging the body */}
          <div
            aria-hidden="true"
            className="glow bottom-[8%] left-1/2 -z-10 h-[78%] w-[135%] -translate-x-1/2 !rounded-[50%] bg-accent-gradient blur-[70px] [--glow-opacity:0.28]"
          />
          {/* dashed orbit behind the upper body */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[34%] -z-10 aspect-square w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line-strong animate-spin-slow"
          />
          {/* soft platform so the figure does not float */}
          <div
            aria-hidden="true"
            className="glow -bottom-3 left-1/2 -z-10 h-16 w-[125%] -translate-x-1/2 !rounded-[50%] bg-accent-cyan/25 blur-3xl"
          />

          <img
            src={hero.image}
            alt={`Portrait of ${hero.fullName}`}
            width="785"
            height="1080"
            loading="eager"
            className="pointer-events-none absolute left-[-44.15%] top-[-40.99%] w-[191.46%] max-w-none select-none drop-shadow-[0_35px_60px_rgb(var(--c-shadow)/var(--shadow-alpha))]"
          />
        </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href="#skills"
        aria-label="Scroll to tech stack"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-content-dim transition-colors duration-300 hover:text-accent [@media(min-width:1024px)_and_(min-height:840px)]:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <HiArrowDown className="animate-float text-base" />
      </a>
    </section>
  );
};

export default Hero;
