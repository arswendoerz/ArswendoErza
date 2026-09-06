import { createElement } from "react";
import { content } from "../Content";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";

const Services = () => {
  const { services } = content;
  const onSpotlight = useSpotlight();

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="glow right-0 top-1/4 -z-10 h-80 w-80 bg-accent-cyan/10 blur-[120px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.service_content.map((service, i) => (
            <Reveal
              key={service.title}
              direction="up"
              delay={i * 0.08}
              onMouseMove={onSpotlight}
              className="card card-hover spotlight group flex flex-col p-6"
            >
              {/* number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-extrabold text-content/[0.05] transition-colors duration-500 group-hover:text-content/[0.09]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-overlay text-3xl text-accent-soft transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent-cyan">
                {createElement(service.logo)}
              </span>

              <h3 className="relative mt-5 text-lg font-semibold">
                {service.title}
              </h3>
              <p className="relative mt-2 flex-1 text-[0.85rem] leading-relaxed">
                {service.para}
              </p>

              <ul className="relative mt-5 space-y-2 border-t border-line-soft pt-4">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[0.78rem] text-content-muted"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
