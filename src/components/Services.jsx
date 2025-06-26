import { content } from "../Content";
import { createElement } from "react";

const Services = () => {
  const { services } = content;

  return (
    <section id="services">
      <div className="md:container px-5 py-14">
        {/* Title */}
        <h2 className="title text-center" data-aos="fade-down">
          {services.title}
        </h2>
        <h4 className="subtitle text-center" data-aos="fade-down">
          {services.subtitle}
        </h4>

        <br />

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group">
          {services.service_content.map((service, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 300}
              className="bg-bg_light_primary border border-slate-200 rounded-xl p-6 text-center transition-all duration-300 
                         hover:shadow-xl group-hover:blur-sm hover:!blur-none"
            >
              {/* Icon from react-icons */}
              <div className="flex justify-center mb-4">
                {createElement(service.logo, {
                  className: "text-5xl text-blue-600",
                })}
              </div>
              <h6 className="text-lg font-semibold mb-2">{service.title}</h6>
              <p className="text-gray-700 text-sm leading-relaxed">
                {service.para}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
