import { createElement, useMemo, useState } from "react";
import { content } from "../Content";
import Modal from "react-modal";
import { motion, useReducedMotion } from "framer-motion";
import { HiPlus, HiX } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Rail from "./ui/Rail";
import useSpotlight from "../hooks/useSpotlight";

Modal.setAppElement("#root");

const Skills = () => {
  const { skills } = content;
  const reduceMotion = useReducedMotion();
  const onSpotlight = useSpotlight();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [filter, setFilter] = useState("All");

  const counts = useMemo(() => {
    const map = { All: skills.skills_content.length };
    skills.skills_content.forEach((skill) => {
      map[skill.category] = (map[skill.category] || 0) + 1;
    });
    return map;
  }, [skills.skills_content]);

  const visibleSkills = useMemo(
    () =>
      filter === "All"
        ? skills.skills_content
        : skills.skills_content.filter((skill) => skill.category === filter),
    [filter, skills.skills_content]
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="glow left-1/2 top-0 -z-10 h-96 w-[60rem] -translate-x-1/2 bg-accent/10 blur-[130px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Tech Stack"
          title={skills.title}
          subtitle={skills.subtitle}
        />

        {/* Category filter */}
        <Reveal
          direction="up"
          delay={0.1}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {skills.filters.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ease-expo ${
                  isActive
                    ? "border-transparent bg-accent-gradient text-on-accent"
                    : "border-line bg-overlay text-content-muted hover:border-accent/40 hover:text-content"
                }`}
              >
                {item}
                <span
                  className={`ml-2 font-mono text-[0.65rem] ${
                    isActive ? "text-on-accent/70" : "text-content-dim"
                  }`}
                >
                  {counts[item] ?? 0}
                </span>
              </button>
            );
          })}
        </Reveal>

        <Rail
          label="Tech stack"
          meta={`${visibleSkills.length} ${visibleSkills.length === 1 ? "tool" : "tools"}`}
          hint="swipe or drag to browse"
          resetKey={filter}
        >
          {visibleSkills.map((skill, i) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : Math.min(i, 6) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseMove={onSpotlight}
                className="card card-hover spotlight group w-[15.5rem] shrink-0 snap-start p-5 sm:w-[16.5rem]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-overlay text-2xl text-accent-soft transition-all duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:text-accent-cyan">
                    {createElement(skill.logo)}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    aria-label={`More about ${skill.name}`}
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line text-sm text-content-dim transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                  >
                    <HiPlus />
                  </button>
                </div>

                <h3 className="mt-4 text-base font-semibold">{skill.name}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed line-clamp-2-safe">
                  {skill.para}
                </p>
                <span className="mt-4 inline-block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-content-dim">
                  {skill.category}
                </span>
              </motion.li>
            ))}
        </Rail>
      </div>

      {/* Detail modal */}
      <Modal
        isOpen={Boolean(selectedSkill)}
        onRequestClose={() => setSelectedSkill(null)}
        contentLabel={selectedSkill ? `${selectedSkill.name} details` : "Skill details"}
        closeTimeoutMS={200}
        overlayClassName="fixed inset-0 z-[950] grid place-items-center bg-canvas-deep/80 p-5 backdrop-blur-sm"
        className="relative w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-lift outline-none"
      >
        {selectedSkill && (
          <>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <HiX />
            </button>

            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient text-2xl text-on-accent">
                {createElement(selectedSkill.logo)}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{selectedSkill.name}</h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-soft">
                  {selectedSkill.category}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">{selectedSkill.para}</p>

            <ul className="mt-5 space-y-2.5">
              {selectedSkill.details?.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[0.82rem] leading-relaxed">
                  <span className="mt-0.5 font-mono text-[0.7rem] text-accent-cyan">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-content-muted">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Skills;
