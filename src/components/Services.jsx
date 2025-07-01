import { content } from "../Content";
import { createElement } from "react";

const Services = () => {
  const { services } = content;

  return (
    <section
      id="services"
      className="flex flex-col justify-center h-[100dvh] overflow-hidden"
    >
      <div className="md:container px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
        {/* Title */}
        <div className="text-center" data-aos="fade-down">
          <h2 className="title">{services.title}</h2>
          <h4 className="subtitle">{services.subtitle}</h4>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 group">
          {services.service_content.map((service, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 300}
              className="bg-bg_light_primary border border-slate-200 rounded-xl p-5 sm:p-6 text-center transition-all duration-300 
                         hover:shadow-xl group-hover:blur-sm hover:!blur-none"
            >
              {/* Icon */}
              <div className="flex justify-center mb-3">
                {createElement(service.logo, {
                  className: "text-4xl sm:text-5xl text-blue-600",
                })}
              </div>
              <h6 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                {service.title}
              </h6>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
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
