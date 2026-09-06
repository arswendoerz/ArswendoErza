import { createElement, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { content } from "../Content";
import { HiCheck } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";

const MyJourney = () => {
  const { journey } = content;
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
          eyebrow="Journey"
          title={journey.title}
          subtitle={journey.subtitle}
        />

        {/* Cards alternate across the spine and each one is pulled up so it
            interleaves with the previous card instead of sitting level with
            it — that is what removes the blank gaps beside each row.
            The pull is tuned to the current card heights (375-492px) and
            leaves ~65-95px of clearance between cards on the SAME side, so
            an entry can grow by a couple of lines before they would touch.
            Adding a lot more text to one entry? Reduce the pull a step. */}
        <div ref={timelineRef} className="relative mt-14">
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
            {journey.education_content.map((item, i) => {
              const onLeft = i % 2 === 0;

              return (
                <li
                  key={`${item.institution}-${item.degree}`}
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
                        <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-content-dim">
                          Highlights
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
