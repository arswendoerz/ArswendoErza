import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBriefcase, FaCalendarAlt, FaWrench } from "react-icons/fa";

const experienceList = [
  {
    company: "Freelance Developer",
    role: "Front End Developer",
    period: "Jan 2024 - Present",
    description:
      "Built responsive landing pages, optimized SEO, and implemented client-side interactivity using React and Tailwind."
  },
  {
    company: "Campus Project",
    role: "Full Stack Developer",
    period: "Jul 2023 - Nov 2023",
    description:
      "Developed a university resource portal using MERN stack. Integrated user authentication and role-based dashboards."
  }
];

const Experience = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section
      id="experience"
      className="bg-bg_light_primary min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="title">Experience</h2>
          <h4 className="subtitle">My professional and project-based experiences</h4>
        </div>

        <div className="relative border-l-[3px] border-blue-500 pl-8">
          {experienceList.map((exp, index) => (
            <div
              key={index}
              className="relative mb-12"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <span className="absolute -left-[22px] top-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-[6px] border-bg_light_primary shadow-md"></span>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition duration-300">
                <h5 className="text-xl font-semibold text-dark_primary flex items-center gap-2">
                  <FaBriefcase className="text-blue-600" /> {exp.company}
                </h5>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <FaCalendarAlt /> {exp.period}
                </p>
                <p className="text-sm text-primary mt-2 flex items-center gap-2 font-medium">
                  <FaWrench className="text-indigo-600" /> {exp.role}
                </p>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
