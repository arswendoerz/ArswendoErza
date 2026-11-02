import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// inner rings are short orbits and run faster, like real planets
const RADII = { Design: 100, Testing: 140, Tooling: 185, Backend: 232, Frontend: 282 };
const CATS = Object.keys(RADII);
const CX = 320, CY = 235;
const TRAIL_SEG = 6;
const BELT_SIZE = 110;

const rgb = (hex) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = ([r, g, b]) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * The tech stack as a small solar system: each category is an orbit, each
 * tool a brand-coloured planet lit by the "MY STACK" sun. Orbits are drawn in
 * two halves so the near half passes in front of the sun and the far half
 * behind it. Hover a planet to read it, click it for details, drag to spin.
 */
const TechGalaxy = ({ skills, filter, label, categoryLabel, onSelect }) => {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const galaxyRef = useRef(null);
  const tipRef = useRef(null);
  const ringRefs = useRef({});
  const beltRefs = useRef([]);
  const planetRefs = useRef([]);
  const trailRefs = useRef([]);
  const [hovered, setHovered] = useState(null);
  const hoveredRef = useRef(null);
  hoveredRef.current = hovered;

  const planets = useMemo(
    () =>
      skills.map((skill) => {
        const same = skills.filter((s) => s.category === skill.category);
        let col = rgb(skill.color ?? "4F8DF7");
        // white brand marks would make a white ball: those get a slate planet
        if (lum(col) > 0.85) col = [70, 84, 112];
        return {
          skill,
          col: col.join(" "),
          dark: lum(col) > 0.62,
          R: RADII[skill.category] ?? 232,
          a0: (same.indexOf(skill) / same.length) * Math.PI * 2 + CATS.indexOf(skill.category),
        };
      }),
    [skills]
  );

  const belt = useMemo(
    () =>
      Array.from({ length: BELT_SIZE }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 200 + (Math.random() - 0.5) * 22,
        s: 0.6 + Math.random() * 1.4,
      })),
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current, galaxy = galaxyRef.current;
    let squash = 0.34, squashTo = 0.34, rot = -0.18, rotTo = -0.18;
    let drag = null, fling = 0, spin = 0, last = performance.now(), frame = 0;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      squashTo = 0.26 + ((e.clientY - r.top) / r.height) * 0.2;
      rotTo = -0.18 + ((e.clientX - r.left) / r.width - 0.5) * 0.2;
      if (drag) {
        const dx = e.clientX - drag.x;
        drag.x = e.clientX;
        spin -= dx * 0.03;
        fling = -dx * 0.03;
        if (Math.abs(e.clientX - drag.x0) > 4) drag.moved = true;
      }
    };
    // a drag that moved should not also count as a click on a planet
    let swallowClick = false;
    const onDown = (e) => {
      swallowClick = false;
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, x0: e.clientX, moved: false };
      wrap.classList.add("is-dragging");
    };
    const onUp = () => {
      if (!drag) return;
      swallowClick = drag.moved;
      drag = null;
      wrap.classList.remove("is-dragging");
    };
    const onClick = (e) => {
      if (!swallowClick) return;
      swallowClick = false;
      e.stopPropagation();
    };
    wrap.addEventListener("click", onClick, true);
    const onLeave = () => {
      squashTo = 0.34;
      rotTo = -0.18;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointerleave", onLeave);

    const fit = () => {
      const s = Math.min(1, wrap.clientWidth / 660, wrap.clientHeight / 500);
      galaxy.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(wrap);

    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      const hov = hoveredRef.current;
      // everything slows while a planet is hovered, so it can be read; a drag
      // keeps a little momentum
      if (!reduceMotion && !drag) spin += dt * (hov ? 0.15 : 1) + fling;
      fling *= 0.92;
      squash += (squashTo - squash) * 0.06;
      rot += (rotTo - rot) * 0.06;
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const at = (R, a) => {
        const x0 = Math.cos(a) * R, y0 = Math.sin(a) * R * squash;
        return [CX + x0 * cr - y0 * sr, CY + x0 * sr + y0 * cr];
      };
      const arc = (R, a1, a2, steps = 40) => {
        let d = "";
        for (let i = 0; i <= steps; i++) {
          const [x, y] = at(R, a1 + ((a2 - a1) * i) / steps);
          d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return d;
      };

      CATS.forEach((c) => {
        const ring = ringRefs.current[c];
        if (!ring) return;
        // sin(a) < 0 is the far side of the ring, behind the sun
        ring.back?.setAttribute("d", arc(RADII[c], Math.PI, Math.PI * 2));
        ring.front?.setAttribute("d", arc(RADII[c], 0, Math.PI));
      });

      belt.forEach((d, i) => {
        const el = beltRefs.current[i];
        if (!el?.b || !el?.f) return;
        const a = d.a + spin * 0.12;
        const [x, y] = at(d.r, a);
        const near = Math.sin(a) > 0;
        const r = d.s * (near ? 1 : 0.7);
        el.f.setAttribute("cx", x); el.f.setAttribute("cy", y); el.f.setAttribute("r", near ? r : 0);
        el.b.setAttribute("cx", x); el.b.setAttribute("cy", y); el.b.setAttribute("r", near ? 0 : r);
      });

      planets.forEach((p, i) => {
        const node = planetRefs.current[i];
        if (!node) return;
        const a = p.a0 + spin * ((0.32 * 100) / p.R);
        const [x, y] = at(p.R, a);
        const depth = Math.sin(a); // +1 = nearest the viewer
        node.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + (0.42 * (depth + 1)) / 2})`;
        node.style.zIndex = depth > 0 ? 60 + Math.round(depth * 30) : 10 + Math.round((depth + 1) * 30);
        // far planets sit slightly out of focus, like a shallow depth of field
        node.style.filter = depth < -0.15 ? `blur(${(-depth * 0.9).toFixed(2)}px) brightness(${(0.95 + depth * 0.3).toFixed(2)})` : "";
        // the lit side faces the sun
        const dx = CX - x, dy = CY - y, len = Math.hypot(dx, dy) || 1;
        node.style.setProperty("--lx", `${50 + (dx / len) * 30}%`);
        node.style.setProperty("--ly", `${50 + (dy / len) * 30}%`);

        // a fading trail along the orbit just behind the planet
        const span = 0.5 / (p.R / 140);
        (trailRefs.current[i] ?? []).forEach((seg, k) => {
          if (!seg?.b || !seg?.f) return;
          const a2 = a - (span * k) / TRAIL_SEG, a1 = a - (span * (k + 1)) / TRAIL_SEG;
          const d = arc(p.R, a1, a2, 4), near = Math.sin((a1 + a2) / 2) > 0;
          seg.f.setAttribute("d", near ? d : "");
          seg.b.setAttribute("d", near ? "" : d);
        });

        if (hov === p.skill.name && tipRef.current) {
          const wr = wrap.getBoundingClientRect(), nr = node.getBoundingClientRect();
          tipRef.current.style.left = `${clamp(nr.left - wr.left + nr.width / 2 - 110, 0, wr.width - 220)}px`;
          tipRef.current.style.top = `${nr.top - wr.top + nr.height + 8}px`;
        }
      });
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("click", onClick, true);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [planets, belt, reduceMotion]);

  const ringClass = (c, half) =>
    `galaxy-ring ${half} ${filter === c ? "is-on" : ""} ${filter !== "All" && filter !== c ? "is-off" : ""}`;
  const hoveredSkill = planets.find((p) => p.skill.name === hovered)?.skill;

  const orbitLayer = (half) => (
    <svg className={`galaxy-svg ${half}`} aria-hidden="true">
      {CATS.map((c) => (
        <path
          key={c}
          ref={(el) => {
            ringRefs.current[c] = { ...ringRefs.current[c], [half]: el };
          }}
          className={ringClass(c, half)}
        />
      ))}
      {belt.map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            beltRefs.current[i] = { ...beltRefs.current[i], [half === "front" ? "f" : "b"]: el };
          }}
          className={`galaxy-rock ${half}`}
        />
      ))}
      {planets.map((p, i) =>
        Array.from({ length: TRAIL_SEG }, (_, k) => (
          <path
            key={`${p.skill.name}-${k}`}
            ref={(el) => {
              const segs = (trailRefs.current[i] ??= []);
              segs[k] = { ...segs[k], [half === "front" ? "f" : "b"]: el };
            }}
            className="galaxy-trail"
            stroke={`rgb(${p.col})`}
            strokeWidth={3 - k * 0.35}
            opacity={0.55 * (1 - k / TRAIL_SEG)}
          />
        ))
      )}
    </svg>
  );

  return (
    <div ref={wrapRef} className="galaxy-wrap" role="group" aria-label={label}>
      <div ref={galaxyRef} className="galaxy">
        <div className="galaxy-nebula" aria-hidden="true" />
        {orbitLayer("back")}
        <div className="galaxy-core" aria-hidden="true">
          <span className="galaxy-rays" />
          <span className="galaxy-rays two" />
          MY
          <br />
          STACK
        </div>
        {orbitLayer("front")}
        {planets.map((p, i) => {
          const dim = filter !== "All" && p.skill.category !== filter;
          const named = hovered === p.skill.name || filter === p.skill.category;
          return (
            <button
              key={p.skill.name}
              ref={(el) => (planetRefs.current[i] = el)}
              type="button"
              aria-label={p.skill.name}
              onClick={() => onSelect(p.skill)}
              onMouseEnter={() => setHovered(p.skill.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.skill.name)}
              onBlur={() => setHovered(null)}
              className={`galaxy-planet ${dim ? "is-dim" : ""} ${named ? "is-named" : ""}`}
              style={{ "--c": p.col }}
            >
              <span className={`galaxy-orb ${p.dark ? "text-[#111827]" : "text-white"}`}>
                {createElement(p.skill.logo)}
              </span>
              <span className="galaxy-label">{p.skill.name}</span>
            </button>
          );
        })}
      </div>
      <div ref={tipRef} className={`galaxy-tip ${hoveredSkill ? "is-shown" : ""}`} aria-hidden="true">
        {hoveredSkill && (
          <>
            <b>{hoveredSkill.name}</b>
            {hoveredSkill.para}
            <i>{categoryLabel(hoveredSkill.category)}</i>
          </>
        )}
      </div>
    </div>
  );
};

export default TechGalaxy;
