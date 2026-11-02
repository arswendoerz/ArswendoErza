import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePhotograph,
  HiArrowNarrowRight,
  HiZoomIn,
  HiZoomOut,
} from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Rail from "./ui/Rail";
import useTilt from "../hooks/useTilt";
import useZoomPan from "../hooks/useZoomPan";
import { fill, useContent } from "../hooks/useLanguage";
import { OPEN_PROJECT_EVENT } from "../events";

Modal.setAppElement("#root");

// Full-page screenshots taller than this (height / width) are shown at
// reading width in a scrolling column instead of being shrunk to fit.
const TALL_RATIO = 1.6;

const Projects = () => {
  const { Projects: projects, ui } = useContent();
  const t = ui.projects;
  const reduceMotion = useReducedMotion();
  const tilt = useTilt();

  // titles, not objects, so an open dialog follows a language switch
  const [activeTitle, setActiveTitle] = useState(null);
  const [detailTitle, setDetailTitle] = useState(null);
  const findProject = (title) =>
    title ? projects.project_content.find((project) => project.title === title) ?? null : null;
  const activeProject = findProject(activeTitle);
  const detailProject = findProject(detailTitle);
  const [imageIndex, setImageIndex] = useState(0);
  // covers fade in as they decode, so heavy screenshots do not pop into place
  const [loaded, setLoaded] = useState({});
  // height / width of each gallery image, learned as it loads
  const [aspects, setAspects] = useState({});

  const total = activeProject?.images?.length ?? 0;
  const currentSrc = activeProject?.images?.[imageIndex];
  const isTall = (aspects[currentSrc] ?? 0) > TALL_RATIO;

  const rememberAspect = (src) => (event) => {
    const { naturalWidth: w, naturalHeight: h } = event.currentTarget;
    if (!w) return;
    setAspects((prev) => (prev[src] ? prev : { ...prev, [src]: h / w }));
  };

  const closeGallery = useCallback(() => setActiveTitle(null), []);

  const step = useCallback(
    (delta) => {
      if (!total) return;
      setImageIndex((prev) => (prev + delta + total) % total);
    },
    [total]
  );

  const openGallery = (project) => {
    setActiveTitle(project.title);
    setImageIndex(0);
  };

  useEffect(() => {
    const onOpen = (event) => {
      setDetailTitle(event.detail);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, []);

  const {
    view,
    stageProps,
    zoomIn,
    zoomOut,
    reset: resetZoom,
    isZoomed,
    canZoomIn,
    canZoomOut,
  } = useZoomPan({ onSwipe: step, resetKey: `${activeProject?.title}-${imageIndex}` });

  // keyboard controls for the lightbox
  useEffect(() => {
    if (!activeTitle) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      // tall screenshots scroll instead of zooming
      if (isTall) return;
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeTitle, closeGallery, step, zoomIn, zoomOut, resetZoom, isTall]);

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
          eyebrow={t.eyebrow}
          title={projects.title}
          subtitle={projects.subtitle}
        />

        <Rail
          label={t.rail}
          meta={fill(t.count, { count: projects.project_content.length })}
          hint={t.hint}
        >
          {projects.project_content.map((project, i) => {
            const hasImages = project.images.length > 0;

            return (
            <motion.li
              key={project.title}
              // panels fly in from the depth, one after another
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotateY: -28, z: -140, y: 30 }
              }
              whileInView={{ opacity: 1, rotateY: 0, z: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.9,
                delay: reduceMotion ? 0 : Math.min(i, 5) * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex w-[19rem] shrink-0 snap-start [perspective:1000px] sm:w-[21rem]"
            >
            <div
              {...tilt}
              className="card spotlight tilt holo group flex w-full flex-col bg-surface/90 hover:border-accent/40"
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
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em]">
                      {t.comingSoon}
                    </span>
                  </span>
                </div>
              ) : (
              <button
                type="button"
                onClick={() => openGallery(project)}
                aria-label={fill(t.openGallery, { name: project.title })}
                className="holo-scan relative block aspect-[16/10] w-full cursor-pointer overflow-hidden"
              >
                <img
                  src={project.images[0]}
                  alt={fill(t.preview, { name: project.title })}
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

                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-line-strong bg-canvas-deep/70 px-2.5 py-1 font-mono text-[0.72rem] text-content-muted backdrop-blur-md">
                  <HiOutlinePhotograph className="text-xs" />
                  {project.images.length}
                </span>

                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 pb-4 text-xs font-semibold text-content opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  {t.viewGallery}
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
                  {project.year && (
                    <span className="font-mono text-[0.72rem] text-content-dim">
                      {project.year}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed line-clamp-3-safe">
                  {project.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setDetailTitle(project.title)}
                  aria-label={fill(t.readMoreLabel, { name: project.title })}
                  className="mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 text-[0.75rem] font-semibold text-accent transition-colors duration-300 hover:text-accent-cyan"
                >
                  {t.readMore}
                  <HiArrowNarrowRight className="text-sm" />
                </button>

                <div className="flex-1" />

                {project.metrics?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="rounded-md border border-accent/25 bg-accent/10 px-2 py-1 font-mono text-[0.72rem] text-accent-soft"
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
                        className="rounded-md bg-overlay px-2 py-1 font-mono text-[0.72rem] text-content-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            </motion.li>
            );
          })}
        </Rail>
      </div>

      <Modal
        isOpen={Boolean(detailProject)}
        onRequestClose={() => setDetailTitle(null)}
        contentLabel={fill(t.details, { name: detailProject?.title ?? "" })}
        closeTimeoutMS={200}
        overlayClassName="fixed inset-0 z-[950] grid place-items-center bg-canvas-deep/80 p-5 backdrop-blur-sm"
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-surface p-6 shadow-lift outline-none"
      >
        {detailProject && (
          <>
            <button
              type="button"
              onClick={() => setDetailTitle(null)}
              aria-label={t.close}
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <HiX />
            </button>

            <div className="flex flex-wrap items-center gap-2 pr-12">
              <span className="chip !border-accent/25 !bg-accent/10 !text-accent-soft">
                {detailProject.type}
              </span>
              {detailProject.year && (
                <span className="font-mono text-[0.72rem] text-content-dim">
                  {detailProject.year}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-xl font-semibold">{detailProject.title}</h3>

            <p className="mt-3 text-[0.88rem] leading-relaxed">
              {detailProject.desc}
            </p>

            {detailProject.metrics?.length > 0 && (
              <div className="mt-5">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-content-dim">
                  {t.results}
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {detailProject.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="rounded-md border border-accent/25 bg-accent/10 px-2 py-1 font-mono text-[0.72rem] text-accent-soft"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detailProject.stack?.length > 0 && (
              <div className="mt-5">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-content-dim">
                  {t.builtWith}
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {detailProject.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-overlay px-2 py-1 font-mono text-[0.72rem] text-content-muted"
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
                  setDetailTitle(null);
                  openGallery(project);
                }}
                className="btn-primary mt-6 !py-2.5 !text-xs"
              >
                {fill(t.viewGalleryCount, { count: detailProject.images.length })}
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
            aria-label={fill(t.gallery, { name: activeProject.title })}
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
                <p className="font-mono text-[0.72rem] uppercase tracking-widest text-content-dim">
                  {activeProject.type} · {imageIndex + 1} / {total}
                  {isTall && <span className="text-accent-soft"> · {t.scrollHint}</span>}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={isTall || !canZoomOut}
                  aria-label={t.zoomOut}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-lg text-content-muted transition-colors duration-300 enabled:cursor-pointer enabled:hover:border-accent/50 enabled:hover:text-accent disabled:opacity-30"
                >
                  <HiZoomOut />
                </button>

                <button
                  type="button"
                  onClick={resetZoom}
                  disabled={!isZoomed}
                  aria-label={t.resetZoom}
                  className="grid h-10 min-w-[3.5rem] cursor-pointer place-items-center rounded-xl border border-line px-2 font-mono text-[0.72rem] text-content-muted transition-colors duration-300 enabled:hover:border-accent/50 enabled:hover:text-accent disabled:opacity-30"
                >
                  {Math.round(view.scale * 100)}%
                </button>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={isTall || !canZoomIn}
                  aria-label={t.zoomIn}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-lg text-content-muted transition-colors duration-300 enabled:cursor-pointer enabled:hover:border-accent/50 enabled:hover:text-accent disabled:opacity-30"
                >
                  <HiZoomIn />
                </button>
              </div>

              <button
                type="button"
                onClick={closeGallery}
                aria-label={t.closeGallery}
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-line text-lg text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <HiX />
              </button>
            </div>

            {/* Stage — the arrows sit beside the viewer, not inside it, so they
                stay put while a tall screenshot scrolls underneath */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex min-h-0 flex-1"
            >
              {/* Plain img on purpose: the gallery's main content must never
                  depend on an animation frame to become visible. */}
              {isTall ? (
                <div
                  key={imageIndex}
                  tabIndex={0}
                  aria-label={t.tallLabel}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-14 py-4 outline-none sm:px-20 sm:py-8"
                >
                  <img
                    src={currentSrc}
                    alt={fill(t.screenshot, { name: activeProject.title, number: imageIndex + 1 })}
                    draggable={false}
                    className="mx-auto w-full max-w-5xl select-none rounded-xl border border-line shadow-lift"
                  />
                </div>
              ) : (
                <div
                  {...stageProps}
                  className={`flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden p-4 sm:p-8 ${
                    isZoomed ? "cursor-grab active:cursor-grabbing" : ""
                  }`}
                >
                  <img
                    key={imageIndex}
                    src={currentSrc}
                    alt={fill(t.screenshot, { name: activeProject.title, number: imageIndex + 1 })}
                    draggable={false}
                    onLoad={rememberAspect(currentSrc)}
                    style={{
                      transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
                      transition: view.scale === 1 ? "transform 0.25s ease-out" : "none",
                    }}
                    className="max-h-full max-w-full select-none rounded-xl border border-line object-contain shadow-lift"
                  />
                </div>
              )}

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t.previous}
                    className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-surface/80 text-xl text-content transition-all duration-300 hover:border-accent/50 hover:bg-accent/20 sm:left-5"
                  >
                    <HiChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t.next}
                    className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-surface/80 text-xl text-content transition-all duration-300 hover:border-accent/50 hover:bg-accent/20 sm:right-5"
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
                      aria-label={fill(t.showImage, { number: idx + 1 })}
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
