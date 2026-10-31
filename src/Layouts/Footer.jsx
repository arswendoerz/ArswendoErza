import { createElement } from "react";
import { content } from "../Content";
import { HiArrowUp } from "react-icons/hi";

const Footer = () => {
  const { Footer: footer, nav, hero, Contact: contact } = content;
  const year = new Date().getFullYear();
  const years = year > footer.since ? `${footer.since}–${year}` : `${footer.since}`;

  return (
    <footer className="border-t border-line bg-canvas-deep">
      <div className="container-x flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-xs">
            <div className="flex items-center">
              <span className="font-display text-base font-semibold">
                {footer.name}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed">{footer.role}</p>
            <p className="mt-2 text-xs italic leading-relaxed text-content-dim">
              “{hero.tagline}”
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-content-dim">
              Navigate
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-0.5">
              {nav.map((item) => (
                <li key={item.link}>
                  <a
                    href={item.link}
                    className="inline-flex min-h-[1.75rem] items-center text-xs text-content-muted transition-colors duration-300 hover:text-accent"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-content-dim">
              Elsewhere
            </h2>
            <ul className="mt-3 flex gap-2">
              {contact.social_media.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-overlay text-base text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                  >
                    {createElement(item.icon)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line-soft pt-6 sm:flex-row">
          <p className="text-xs text-content-dim">
            © {years} {footer.name}. {footer.text}.
          </p>

          <a
            href="#home"
            className="inline-flex min-h-[1.75rem] items-center gap-2 text-xs text-content-muted transition-colors duration-300 hover:text-accent"
          >
            Back to top
            <HiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
