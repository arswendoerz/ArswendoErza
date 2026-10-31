import { createElement, useMemo, useState } from "react";
import Modal from "react-modal";
import { motion, useReducedMotion } from "framer-motion";
import { HiPlus, HiX, HiArrowNarrowRight } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Rail from "./ui/Rail";
import useSpotlight from "../hooks/useSpotlight";
import { fill, useContent } from "../hooks/useLanguage";
import { OPEN_PROJECT_EVENT } from "../events";

Modal.setAppElement("#root");

const Skills = () => {
  const { skills, Projects: projects, ui } = useContent();
  const t = ui.skills;
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

  // projects on this page whose stack lists the selected skill
  const usedIn = useMemo(() => {
    if (!selectedSkill) return [];
    const names = selectedSkill.match ?? [selectedSkill.name];
    return projects.project_content.filter((project) =>
      project.stack?.some((tech) => names.includes(tech))
    );
  }, [selectedSkill, projects.project_content]);

  const openProject = (title) => {
    setSelectedSkill(null);
    window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: title }));
  };

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
          eyebrow={skills.eyebrow}
          title={skills.title}
          subtitle={skills.subtitle}
        />

        {/* Services — each card also filters the stack below */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skills.services.map((service, i) => {
            const isActive = filter === service.filter;
            return (
              <Reveal key={service.title} direction="up" delay={i * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setFilter(isActive ? "All" : service.filter)}
                  onMouseMove={onSpotlight}
                  aria-pressed={isActive}
                  className={`card card-hover spotlight group flex h-full w-full cursor-pointer flex-col p-5 text-left ${
                    isActive ? "!border-accent/60 shadow-glow" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border text-2xl transition-all duration-300 ${
                        isActive
                          ? "border-transparent bg-accent-gradient text-on-accent"
                          : "border-line bg-overlay text-accent-soft group-hover:border-accent/40 group-hover:text-accent-cyan"
                      }`}
                    >
                      {createElement(service.logo)}
                    </span>
                    <h3 className="text-base font-semibold">{service.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed">{service.para}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-md bg-overlay px-2 py-1 font-mono text-[0.72rem] text-content-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Category filter */}
        <Reveal
          direction="up"
          delay={0.1}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-content-dim">
            {t.stackTitle}
            <span className="normal-case tracking-normal"> · {t.serviceHint}</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
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
                  {t.categories[item] ?? item}
                  <span
                    className={`ml-2 font-mono text-[0.72rem] ${
                      isActive ? "text-on-accent/70" : "text-content-dim"
                    }`}
                  >
                    {counts[item] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Rail
          label={t.stackTitle}
          meta={fill(visibleSkills.length === 1 ? t.tool : t.tools, {
            count: visibleSkills.length,
          })}
          hint={t.hint}
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
                  aria-label={fill(t.more, { name: skill.name })}
                  className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line text-sm text-content-dim transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                >
                  <HiPlus />
                </button>
              </div>

              <h3 className="mt-4 text-base font-semibold">{skill.name}</h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed line-clamp-2-safe">
                {skill.para}
              </p>
              <span className="mt-4 inline-block font-mono text-[0.72rem] uppercase tracking-[0.18em] text-content-dim">
                {t.categories[skill.category] ?? skill.category}
              </span>
            </motion.li>
          ))}
        </Rail>
      </div>

      {/* Detail modal */}
      <Modal
        isOpen={Boolean(selectedSkill)}
        onRequestClose={() => setSelectedSkill(null)}
        contentLabel={selectedSkill?.name ?? t.stackTitle}
        closeTimeoutMS={200}
        overlayClassName="fixed inset-0 z-[950] grid place-items-center bg-canvas-deep/80 p-5 backdrop-blur-sm"
        className="relative w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-lift outline-none"
      >
        {selectedSkill && (
          <>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              aria-label={ui.projects.close}
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
                <p className="font-mono text-[0.72rem] uppercase tracking-widest text-accent-soft">
                  {t.categories[selectedSkill.category] ?? selectedSkill.category}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">{selectedSkill.para}</p>

            {(usedIn.length > 0 || selectedSkill.usage?.length > 0) && (
              <div className="mt-5 border-t border-line-soft pt-4">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-content-dim">
                  {t.usedIn}
                </h4>

                {usedIn.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {usedIn.map((project) => (
                      <li key={project.title}>
                        <button
                          type="button"
                          onClick={() => openProject(project.title)}
                          aria-label={fill(t.openProject, { name: project.title })}
                          className="group inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent-soft transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                        >
                          {project.title}
                          <HiArrowNarrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {selectedSkill.usage?.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {selectedSkill.usage.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-content-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </Modal>
    </section>
  );
};

export default Skills;
