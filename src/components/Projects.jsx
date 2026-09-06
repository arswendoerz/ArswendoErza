import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "../Content";
import Modal from "react-modal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePhotograph,
  HiArrowNarrowRight,
} from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Rail from "./ui/Rail";
import useSpotlight from "../hooks/useSpotlight";

Modal.setAppElement("#root");

const Projects = () => {
  const { Projects: projects } = content;
  const reduceMotion = useReducedMotion();
  const onSpotlight = useSpotlight();

  const [activeProject, setActiveProject] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  // covers fade in as they decode, so heavy screenshots do not pop into place
  const [loaded, setLoaded] = useState({});
  const touchStartX = useRef(null);

  const total = activeProject?.images?.length ?? 0;

  const closeGallery = useCallback(() => setActiveProject(null), []);

  const step = useCallback(
    (delta) => {
      if (!total) return;
      setImageIndex((prev) => (prev + delta + total) % total);
    },
    [total]
  );

  const openGallery = (project) => {
    setActiveProject(project);
    setImageIndex(0);
  };

  // horizontal swipe to move between screenshots on touch devices
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
  };

  // keyboard controls for the lightbox
  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject, closeGallery, step]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="glow right-1/4 top-10 -z-10 h-96 w-96 bg-accent/10 blur-[130px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Work"
          title={projects.title}
          subtitle={projects.subtitle}
        />

        <Rail
          label="Selected work"
          meta={`${projects.project_content.length} projects`}
          hint="swipe or drag to browse"
        >
          {projects.project_content.map((project, i) => {
            const hasImages = project.images.length > 0;

            return (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : Math.min(i, 5) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseMove={onSpotlight}
              className="card card-hover spotlight group flex w-[19rem] shrink-0 snap-start flex-col sm:w-[21rem]"
            >
              {/* Cover — a placeholder stands in until screenshots are added */}
              {!hasImages ? (
                <div
                  aria-hidden="true"
                  className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-line-soft bg-overlay"
                >
                  <span className="absolute inset-0 grid-bg" />
                  <span className="glow left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 bg-accent/25 blur-[60px]" />
                  <span className="relative flex flex-col items-center gap-2 text-content-dim">
                    <HiOutlinePhotograph className="text-3xl" />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                      Screenshots coming soon
                    </span>
                  </span>
                </div>
              ) : (
              <button
                type="button"
                onClick={() => openGallery(project)}
                aria-label={`Open ${project.title} gallery`}
                className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden"
              >
                <img
                  src={project.images[0]}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() =>
                    setLoaded((prev) => ({ ...prev, [project.title]: true }))
                  }
                  className={`h-full w-full object-cover object-top transition-[transform,opacity] duration-700 ease-expo group-hover:scale-[1.06] ${
                    loaded[project.title] ? "opacity-100" : "opacity-0"
                  }`}
                />
                {!loaded[project.title] && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-pulse bg-overlay"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-canvas-deep/25 to-transparent"
                />

                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-line-strong bg-canvas-deep/70 px-2.5 py-1 font-mono text-[0.62rem] text-content-muted backdrop-blur-md">
                  <HiOutlinePhotograph className="text-xs" />
                  {project.images.length}
                </span>

                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 pb-4 text-xs font-semibold text-content opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  View gallery
                  <FaArrowRight className="text-[0.6rem]" />
                </span>
              </button>
              )}

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="chip !border-accent/25 !bg-accent/10 !text-accent-soft">
                    {project.type}
                  </span>
                  <span className="font-mono text-[0.68rem] text-content-dim">
                    {project.year}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed line-clamp-3-safe">
                  {project.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setDetailProject(project)}
                  aria-label={`Read the full description of ${project.title}`}
                  className="mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 text-[0.75rem] font-semibold text-accent transition-colors duration-300 hover:text-accent-cyan"
                >
                  Read more
                  <HiArrowNarrowRight className="text-sm" />
                </button>

                <div className="flex-1" />

                {project.metrics?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="rounded-md border border-accent/25 bg-accent/10 px-2 py-1 font-mono text-[0.62rem] text-accent-soft"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                )}

                {project.stack?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-line-soft pt-4">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-overlay px-2 py-1 font-mono text-[0.62rem] text-content-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
            );
          })}
        </Rail>
      </div>

      <Modal
        isOpen={Boolean(detailProject)}
        onRequestClose={() => setDetailProject(null)}
        contentLabel={detailProject ? `${detailProject.title} details` : "Project details"}
        closeTimeoutMS={200}
        overlayClassName="fixed inset-0 z-[950] grid place-items-center bg-canvas-deep/80 p-5 backdrop-blur-sm"
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-surface p-6 shadow-lift outline-none"
      >
        {detailProject && (
          <>
            <button
              type="button"
              onClick={() => setDetailProject(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <HiX />
            </button>

            <div className="flex flex-wrap items-center gap-2 pr-12">
              <span className="chip !border-accent/25 !bg-accent/10 !text-accent-soft">
                {detailProject.type}
              </span>
              <span className="font-mono text-[0.68rem] text-content-dim">
                {detailProject.year}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold">{detailProject.title}</h3>

            <p className="mt-3 text-[0.88rem] leading-relaxed">
              {detailProject.desc}
            </p>

            {detailProject.metrics?.length > 0 && (
              <div className="mt-5">
                <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-content-dim">
                  Results
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {detailProject.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="rounded-md border border-accent/25 bg-accent/10 px-2 py-1 font-mono text-[0.62rem] text-accent-soft"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detailProject.stack?.length > 0 && (
              <div className="mt-5">
                <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-content-dim">
                  Built with
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {detailProject.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-overlay px-2 py-1 font-mono text-[0.62rem] text-content-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detailProject.images.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const project = detailProject;
                  setDetailProject(null);
                  openGallery(project);
                }}
                className="btn-primary mt-6 !py-2.5 !text-xs"
              >
                View gallery ({detailProject.images.length})
                <FaArrowRight className="text-[0.6rem]" />
              </button>
            )}
          </>
        )}
      </Modal>

      {/* ── Lightbox ─────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} gallery`}
            onClick={closeGallery}
            className="fixed inset-0 z-[950] flex flex-col bg-canvas-deep/95 backdrop-blur-md"
          >
            {/* Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4"
            >
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">
                  {activeProject.title}
                </h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-content-dim">
                  {activeProject.type} · {imageIndex + 1} / {total}
                </p>
              </div>

              <button
                type="button"
                onClick={closeGallery}
                aria-label="Close gallery"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-line text-lg text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <HiX />
              </button>
            </div>

            {/* Stage */}
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center p-4 sm:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={activeProject.images[imageIndex]}
                  alt={`${activeProject.title} screenshot ${imageIndex + 1}`}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full rounded-xl border border-line object-contain shadow-lift"
                />
              </AnimatePresence>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="absolute left-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/80 text-xl text-content transition-all duration-300 hover:border-accent/50 hover:bg-accent/20 sm:left-5"
                  >
                    <HiChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="absolute right-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/80 text-xl text-content transition-all duration-300 hover:border-accent/50 hover:bg-accent/20 sm:right-5"
                  >
                    <HiChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {total > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 border-t border-line px-4 py-3"
              >
                <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1">
                  {activeProject.images.map((image, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      aria-label={`Show image ${idx + 1}`}
                      aria-current={idx === imageIndex}
                      className={`h-12 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-all duration-300 ${
                        idx === imageIndex
                          ? "border-accent opacity-100"
                          : "border-line opacity-45 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
