import { createElement } from "react";
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoHardwareChip } from "react-icons/io5";

const MyJourney = () => {
  const journey = {
    title: "My Journey",
    subtitle: "Educational Background & My Experience",
    
    education_content: [
      {
        "icon": RiHomeOfficeFill,
        "period": "Jun 2025 - Present",
        "institution": "Dinas Sosial Provinsi Lampung",
        "degree": "Front End Web Developer",
        "description": "Developed and maintained a document archiving system and social aid recipient database web application. Collaborated with government stakeholders to ensure compliance with data management policies and optimized UI/UX for administrative workflows.",
        "achievements": [
          "Built a letter archiving system with React.js, reducing document retrieval time by 70%",
          "Designed interactive dashboards to visualize aid recipient data ",
          "Implemented role-based access control (RBAC) for government users",
          "Integrated with backend APIs (Node.js/PostgreSQL) for real-time data synchronization"
        ]
      }, 
      {
        "icon": FaBookOpen,
        "period": "Sep 2024 - Jan 2025",
        "institution": "SIB at PT. Lentera Bangsa Benderang (Binar Academy)",
        "degree": "Full-Stack Web Development with AI Integration & Global Certification",
        "description": "Completed an intensive 4-month bootcamp mastering full-stack web development, including React.js, Node.js, Express, and PostgreSQL, with specialized training in AI-powered web applications. Engaged in 500+ hours of hands-on coding, agile project development, and industry-aligned training to bridge academic knowledge with professional tech demands.",
        "achievements": [
          "Awarded Best Team & Outstanding Performance for Capstone Project",
          "Certified Participant in MSIB Batch 7",
        ]
      },
      {
        "icon": IoHardwareChip,
        "period": "Sep 2023 - Present",
        "institution": "Universitas Lampung",
        "degree": "Digital Engineering Laboratory Assistant",
        "description": "Developed and delivered practical modules for Digital Electronics, Embedded Systems, and Digital Techniques, while guiding students through hands-on experiments and troubleshooting. Key responsibilities included curriculum design, equipment maintenance, and student mentorship.",
        "achievements": [
          "Designed lab modules for Arduino, and digital logic circuits",
          "Trained 50+ students in embedded system programming (C/C++) and EDA tools",
          "Mentored 5 student groups for final projects",
        ]
      },  
      {
        "icon": FaGraduationCap,
        "period": "Aug 2022 - Present",
        "institution": "Universitas Lampung",
        "degree": "Bachelor of Informatics Engineering",
        "description": "Specializing in front-end web development, software testing, and modern JavaScript frameworks. Key coursework includes software engineering principles, UI/UX design, automated testing (Selenium, Jest), and agile development. Currently completing a thesis on AI-driven front-end testing optimization.",
        "achievements": [
          "Built a responsive website using React.js with 95% Python Selenium test coverage and optimized Web Vitals scores (Lighthouse 92)",
          "Engineered GitHub Actions workflow that automated testing for 15+ frontend repositories with 100% reliability",
        ]
      },
    ]
  };

  return (
    <section
      id="MyJourney"
      className="min-h-screen py-16 flex flex-col justify-center bg-bg_light_primary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="title text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {journey.title}
          </h2>
          <h4 className="subtitle text-lg md:text-[30px] text-gray-600 lg:text-[36px]">
            {journey.subtitle}
          </h4>
        </div>


        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden lg:block"
               style={{ height: 'calc(100% - 2rem)' }}>
          </div>
          
          <div className="space-y-8 lg:space-y-0">
            {journey.education_content.map((education, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                  i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden lg:flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                <div className="w-full lg:w-5/12 bg-white  rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mb-4">
                    <div className="flex justify-center lg:justify-start mb-2 lg:mb-0">
                      {createElement(education.icon, {
                        className: "text-4xl text-blue-600",
                      })}
                    </div>
                    
                    <div className="flex justify-center lg:justify-start">
                      <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {education.period}
                      </div>
                    </div>
                  </div>
                  
                  {/* Institution & Degree */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {education.institution}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-600 mb-4">
                    {education.degree}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {education.description}
                  </p>
                  
                  {education.achievements && education.achievements.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-700">Experiences:</h5>
                      <div className="flex flex-wrap gap-2">
                        {education.achievements.map((achievement, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="hidden lg:block lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyJourney;