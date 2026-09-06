/**
 * Seamless running-text band. The row is rendered twice and translated by
 * exactly -50%, so the loop has no visible seam.
 *
 * Decorative only: the same information is always present as real content
 * elsewhere on the page, so the band is hidden from screen readers. The
 * global prefers-reduced-motion rule stops the animation.
 */
const Marquee = ({ items, render, reverse = false, className = "" }) => (
  <div
    aria-hidden="true"
    className={`mask-fade-x flex select-none overflow-hidden border-y border-line-soft py-5 ${className}`}
  >
    <div
      className={`flex shrink-0 items-center gap-10 pr-10 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-2.5">
          {render(item)}
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
