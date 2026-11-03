import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// round glowing arrows that sit on the rail's edges and vanish at either end
const arrowClass =
  // on a phone the card fills the rail, so the arrows sit over its cover image
  "absolute top-[7rem] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border sm:top-[42%] sm:h-11 sm:w-11 " +
  "border-accent/50 bg-surface/80 text-xl text-content shadow-[0_0_24px_-6px_rgb(var(--c-accent-cyan)/0.6)] " +
  "backdrop-blur-md transition-all duration-300 ease-expo enabled:cursor-pointer enabled:hover:scale-110 " +
  "enabled:hover:text-accent disabled:pointer-events-none disabled:opacity-0";

/**
 * Horizontal snap rail — keeps a long list one row tall instead of many rows.
 * Swipe, mouse drag, arrow buttons and keyboard all scroll it.
 *
 * Children must be <li> elements with a fixed width, `shrink-0` and `snap-start`.
 * `resetKey` scrolls back to the start whenever it changes (e.g. a filter).
 */
const Rail = ({ label, meta, hint, resetKey, children }) => {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [state, setState] = useState({ canLeft: false, canRight: false, start: 0, shown: 1 });

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      canLeft: el.scrollLeft > 8,
      canRight: el.scrollLeft < max - 8,
      // the progress thumb spans the share of the rail currently in view
      start: el.scrollWidth ? el.scrollLeft / el.scrollWidth : 0,
      shown: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
    });
  }, []);

  // re-measure on mount and whenever the rendered set changes
  useLayoutEffect(() => {
    sync();
  }, [sync, children]);

  useEffect(() => {
    const el = railRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "auto" });
    sync();
  }, [resetKey, sync]);

  const page = (direction) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Mouse drag-to-scroll. Touch already scrolls natively, and the movement
  // threshold keeps a plain click on a card working.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || !railRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: railRef.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active || !railRef.current) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true;
      railRef.current.classList.add("select-none");
    }
    if (drag.current.moved) railRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    railRef.current?.classList.remove("select-none");
  };

  // swallow the click that ends a drag so it does not also activate a card
  const onClickCapture = (e) => {
    if (!drag.current.moved) return;
    drag.current.moved = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const scrollable = state.canLeft || state.canRight;

  return (
    <>
      <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-content-dim">
        {meta}
        {hint && <span className="hidden sm:inline"> · {hint}</span>}
      </p>

      <div className="relative mt-4">
        <ul
          ref={railRef}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          tabIndex={0}
          aria-label={`${label} — scroll horizontally to see every item`}
          className={`no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-1 pb-8 pt-4 [perspective:1200px] ${
            scrollable ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {children}
        </ul>

        {/* edge fades signal there is more in that direction */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-canvas to-transparent transition-opacity duration-300 ${
            state.canLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-canvas to-transparent transition-opacity duration-300 ${
            state.canRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <button
          type="button"
          onClick={() => page(-1)}
          disabled={!state.canLeft}
          aria-label={`Scroll ${label} backwards`}
          className={`${arrowClass} -left-2 sm:-left-5`}
        >
          <HiChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={!state.canRight}
          aria-label={`Scroll ${label} forwards`}
          className={`${arrowClass} -right-2 sm:-right-5`}
        >
          <HiChevronRight />
        </button>
      </div>

      {scrollable && (
        <div
          aria-hidden="true"
          className="relative mx-auto h-[3px] w-[min(26rem,70%)] overflow-hidden rounded-full bg-overlay-strong"
        >
          <div
            className="absolute inset-y-0 rounded-full bg-accent-gradient shadow-[0_0_10px_rgb(var(--c-accent-cyan))] transition-[left,width] duration-200"
            style={{ left: `${state.start * 100}%`, width: `${state.shown * 100}%` }}
          />
        </div>
      )}
    </>
  );
};

export default Rail;
