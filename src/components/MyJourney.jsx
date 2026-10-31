import { createElement, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useContent } from "../hooks/useLanguage";
import { HiCheck } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";

const MyJourney = () => {
  const { journey, ui } = useContent();
  const t = ui.journey;
  const [group, setGroup] = useState("all");

  // keep each entry's position in the full list as a language-proof key
  const entries = useMemo(
    () =>
      journey.education_content
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => group === "all" || item.group === group),
    [journey.education_content, group]
  );

  const counts = useMemo(() => {
    const map = { all: journey.education_content.length };
    journey.education_content.forEach((item) => {
      map[item.group] = (map[item.group] || 0) + 1;
    });
    return map;
  }, [journey.education_content]);
  const onSpotlight = useSpotlight();
  const reduceMotion = useReducedMotion();

  // the spine draws itself as the section scrolls past
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 65%"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="glow left-0 top-1/3 -z-10 h-96 w-96 bg-accent/10 blur-[130px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={journey.title}
          subtitle={journey.subtitle}
        />

        <Reveal direction="up" delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {Object.keys(t.filters).map((key) => {
            const isActive = group === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setGroup(key)}
                aria-pressed={isActive}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ease-expo ${
                  isActive
                    ? "border-transparent bg-accent-gradient text-on-accent"
                    : "border-line bg-overlay text-content-muted hover:border-accent/40 hover:text-content"
                }`}
              >
                {t.filters[key]}
                <span
                  className={`ml-2 font-mono text-[0.72rem] ${
                    isActive ? "text-on-accent/70" : "text-content-dim"
                  }`}
                >
                  {counts[key] ?? 0}
                </span>
              </button>
            );
          })}
        </Reveal>

        <div ref={timelineRef} className="relative mt-12">
          {/* dim track */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-[2px] bg-line lg:left-1/2 lg:-translate-x-1/2"
          />
          {/* bright fill, scaled from the top as you scroll */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : drawn }}
            className="absolute left-4 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-accent to-accent-cyan lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol>
            {entries.map(({ item, index }, i) => {
              const onLeft = i % 2 === 0;

              return (
                <li
                  key={index}
                  className={`relative pl-12 lg:grid lg:grid-cols-2 lg:gap-14 lg:pl-0 ${
                    i > 0 ? "mt-6 lg:-mt-44" : ""
                  }`}
                >
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-8 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-accent bg-canvas shadow-[0_0_0_5px_rgb(var(--c-accent)/0.14)] lg:left-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                  </span>

                  <Reveal
                    direction={onLeft ? "right" : "left"}
                    delay={0.05}
                    onMouseMove={onSpotlight}
                    className={`card card-hover spotlight group p-6 ${
                      onLeft ? "lg:col-start-1" : "lg:col-start-2"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-overlay text-xl text-accent-soft transition-colors duration-300 group-hover:text-accent-cyan">
                        {createElement(item.icon)}
                      </span>
                      <span className="chip !border-accent/25 !bg-accent/10 !text-accent-soft">
                        {item.period}
                      </span>
                      <span className="chip">{item.kind}</span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold leading-snug">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-soft">
                      {item.institution}
                    </p>

                    <p className="mt-3 text-[0.85rem] leading-relaxed">
                      {item.description}
                    </p>

                    {item.achievements?.length > 0 && (
                      <div className="mt-5 border-t border-line-soft pt-4">
                        <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-content-dim">
                          {t.highlights}
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {item.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex gap-2.5 text-[0.8rem] leading-relaxed text-content-muted"
                            >
                              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-[0.6rem] text-accent-cyan">
                                <HiCheck />
                              </span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default MyJourney;
