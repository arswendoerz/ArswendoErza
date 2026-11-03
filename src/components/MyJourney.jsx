import { createElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useContent } from "../hooks/useLanguage";
import { HiCheck } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";

const clamp = (v) => Math.min(1, Math.max(0, v));

const MyJourney = () => {
  const { journey, hero, ui } = useContent();
  const t = ui.journey;
  const [group, setGroup] = useState("all");

  // Content is newest first; the route flies the other way, from the first
  // semester up to the role held today. The index in the full list is kept
  // as a language-proof key.
  const entries = useMemo(
    () =>
      journey.education_content
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => group === "all" || item.group === group)
        .reverse(),
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

  const routeRef = useRef(null);
  const baseRef = useRef(null);
  const glowRef = useRef(null);
  const rocketRef = useRef(null);
  const destRef = useRef(null);
  const stopRefs = useRef([]);
  const geometry = useRef({ length: 1, stops: [] });

  // The rocket sits on the route at the point the reader has scrolled to;
  // each stop lights up once the rocket has passed it.
  const fly = useCallback(() => {
    const route = routeRef.current, glow = glowRef.current;
    if (!route || !glow) return;
    const { length, stops } = geometry.current;
    const rr = route.getBoundingClientRect();
    const p = clamp((window.innerHeight * 0.62 - rr.top) / (rr.height + 40));
    glow.style.strokeDashoffset = length * (1 - p);
    const at = length * p;
    const pt = glow.getPointAtLength(at);
    const ahead = glow.getPointAtLength(Math.min(length, at + 2));
    const back = glow.getPointAtLength(Math.max(0, at - 2));
    const angle = (Math.atan2(ahead.y - back.y, ahead.x - back.x) * 180) / Math.PI + 90;
    const rocket = rocketRef.current;
    rocket.style.transform = `translate(${pt.x}px, ${pt.y}px) rotate(${angle}deg)`;
    rocket.style.opacity = p > 0.001 && p < 0.999 ? 1 : 0;
    stops.forEach(({ y, el }) => el.classList.toggle("is-lit", pt.y >= y - 4));
    destRef.current?.classList.toggle("is-lit", p >= 0.995);
  }, []);

  // Weave a path between the stars: each segment bows out to one side, then
  // the other.
  const build = useCallback(() => {
    const route = routeRef.current;
    if (!route) return;
    const rr = route.getBoundingClientRect();
    const stops = stopRefs.current.filter(Boolean).map((el) => {
      const r = el.querySelector(".route-star").getBoundingClientRect();
      return { x: r.left - rr.left + r.width / 2, y: r.top - rr.top + r.height / 2, el };
    });
    if (!stops.length) return;
    const sway = window.innerWidth >= 1024 ? 90 : 18;
    let d = `M ${stops[0].x} ${stops[0].y - 70} L ${stops[0].x} ${stops[0].y}`;
    for (let i = 1; i < stops.length; i++) {
      const a = stops[i - 1], b = stops[i], dir = i % 2 ? 1 : -1, my = (b.y - a.y) / 3;
      d += ` C ${a.x + sway * dir} ${a.y + my}, ${b.x + sway * dir} ${b.y - my}, ${b.x} ${b.y}`;
    }
    // past the last card the route bends to the destination world, which sits
    // centred below; on a phone the stars run down the left edge instead
    const last = stops[stops.length - 1], endX = rr.width / 2, endY = rr.height + 40;
    d += ` L ${last.x} ${Math.max(last.y, rr.height - 20)}`;
    d += ` C ${last.x} ${endY - 10}, ${endX} ${endY - 40}, ${endX} ${endY}`;
    baseRef.current.setAttribute("d", d);
    glowRef.current.setAttribute("d", d);
    const length = glowRef.current.getTotalLength() || 1;
    glowRef.current.style.strokeDasharray = length;
    geometry.current = { length, stops };
    fly();
  }, [fly]);

  useLayoutEffect(() => {
    stopRefs.current.length = entries.length;
    build();
  }, [entries, build]);

  useEffect(() => {
    // cards change height with the language, fonts and the window width
    const observer = new ResizeObserver(build);
    observer.observe(routeRef.current);
    window.addEventListener("scroll", fly, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", fly);
    };
  }, [build, fly]);

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

        <div ref={routeRef} className="relative mt-16">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="journey-route" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "rgb(var(--c-accent))" }} />
                <stop offset="1" style={{ stopColor: "rgb(var(--c-accent-cyan))" }} />
              </linearGradient>
            </defs>
            <path ref={baseRef} className="route-base" />
            <path ref={glowRef} className="route-glow" stroke="url(#journey-route)" />
          </svg>

          <ol className="relative">
            {entries.map(({ item, index }, i) => {
              const onLeft = i % 2 === 0;

              return (
                <li
                  key={index}
                  ref={(el) => (stopRefs.current[i] = el)}
                  className={`relative pl-12 lg:grid lg:grid-cols-2 lg:gap-14 lg:pl-0 ${
                    i > 0 ? "mt-6 lg:-mt-44" : ""
                  }`}
                >
                  {/* star on the route */}
                  <span
                    aria-hidden="true"
                    className="route-star absolute left-4 top-8 z-10 h-[18px] w-[18px] -translate-x-1/2 rounded-full lg:left-1/2"
                  />

                  <article
                    onMouseMove={onSpotlight}
                    className={`card spotlight route-card group bg-surface/80 p-6 backdrop-blur-sm ${
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
                  </article>
                </li>
              );
            })}
          </ol>

          <svg ref={rocketRef} aria-hidden="true" className="route-rocket" viewBox="0 0 34 34">
            <path className="flame" d="M13 25 Q17 34 21 25 Z" fill="#fbbf24" />
            <path d="M17 2 C23 7 24 15 22 25 H12 C10 15 11 7 17 2 Z" fill="#e8eef8" stroke="#9fb3cf" strokeWidth="1" />
            <circle cx="17" cy="12" r="3" fill="#22d3ee" stroke="#0b2a4a" strokeWidth="1" />
            <path d="M12 18 L7 25 L12 24 Z M22 18 L27 25 L22 24 Z" fill="#4f8df7" />
          </svg>
        </div>

        {/* destination: where the route ends today */}
        <div
          ref={destRef}
          className="mt-10 flex flex-col items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-content-dim transition-colors duration-500 [&.is-lit]:text-accent-cyan"
        >
          <span aria-hidden="true" className="route-world h-20 w-20 rounded-full" />
          {t.now} · {hero.current.companyShort}
        </div>
      </div>
    </section>
  );
};

export default MyJourney;
