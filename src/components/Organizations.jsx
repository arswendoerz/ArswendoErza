import { createElement } from "react";
import { Users, Trophy, Heart, Code, Briefcase, Star } from 'lucide-react';

const Organizations = () => {
  const organizations = {
    title: "Organizations",
    subtitle: "Communities & Professional Involvement",
    
    organization_content: [
      {
        icon: Code,
        period: "2021 - Present",
        name: "Google Developer Student Club",
        position: "Lead Developer",
        description: "Leading a team of 15+ developers in organizing workshops, hackathons, and tech talks. Mentored junior developers and organized community events.",
        achievements: ["Best GDSC Chapter 2023", "500+ Community Members", "20+ Events Organized"],
        type: "technical"
      },
      {
        icon: Users,
        period: "2022 - 2024",
        name: "Student Union",
        position: "Vice President",
        description: "Represented student body in university governance, organized campus-wide events, and advocated for student rights and welfare programs.",
        achievements: ["Student Choice Award", "Campus Innovation Grant", "Leadership Excellence"],
        type: "leadership"
      },
      {
        icon: Heart,
        period: "2020 - Present",
        name: "Volunteer Community Service",
        position: "Active Volunteer",
        description: "Participating in community service activities including teaching programming to underprivileged children and environmental conservation projects.",
        achievements: ["100+ Hours of Service", "Youth Mentor Certificate", "Environmental Champion"],
        type: "volunteer"
      },
      {
        icon: Trophy,
        period: "2019 - 2022",
        name: "Programming Competition Club",
        position: "Team Captain",
        description: "Led competitive programming team in national and international contests. Trained team members in algorithms and problem-solving techniques.",
        achievements: ["National Champion 2022", "ICPC Regional Finalist", "ACM Outstanding Member"],
        type: "competitive"
      },
      {
        icon: Briefcase,
        period: "2023 - Present",
        name: "Tech Startup Incubator",
        position: "Mentor",
        description: "Mentoring early-stage tech startups in product development, technical architecture, and scaling strategies.",
        achievements: ["5+ Startups Mentored", "Innovation Award", "Successful Funding"],
        type: "professional"
      },
      {
        icon: Star,
        period: "2021 - 2023",
        name: "Open Source Community",
        position: "Core Contributor",
        description: "Contributing to various open-source projects, maintaining repositories, and helping new contributors get started in open source.",
        achievements: ["50+ PR Merged", "Maintainer Status", "Community Recognition"],
        type: "opensource"
      }
    ]
  };

  const getTypeColor = (type) => {
    const colors = {
      technical: "bg-blue-100 text-blue-800",
      leadership: "bg-blue-100 text-blue-800",
      volunteer: "bg-blue-100 text-blue-800",
      competitive: "bg-blue-100 text-blue-800",
      professional: "bg-blue-100 text-blue-800",
      opensource: "bg-blue-100 text-blue-800"
    };
    return colors[type] || "bg-blue-100 text-blue-800";
  };

  const getTypeLabel = (type) => {
    const labels = {
      technical: "Technical",
      leadership: "Leadership",
      volunteer: "Volunteer",
      competitive: "Competitive",
      professional: "Professional",
      opensource: "Open Source"
    };
    return labels[type] || "General";
  };

  return (
    <section
      id="Organizations"
      className="min-h-screen py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="title text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {organizations.title}
          </h2>
          <h4 className="subtitle text-lg md:text-xl text-gray-600">
            {organizations.subtitle}
          </h4>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {organizations.organization_content.map((org, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-bg_light_primary rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Header with Icon, Period & Type */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between mb-3">
                  {/* Icon & Period */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {createElement(org.icon, {
                        className: "text-2xl text-blue-600",
                      })}
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                      {org.period}
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(org.type)}`}>
                    {getTypeLabel(org.type)}
                  </div>
                </div>
              </div>
              
              {/* Organization Name & Position */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {org.name}
              </h3>
              <h4 className="text-lg font-semibold text-blue-600 mb-4">
                {org.position}
              </h4>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {org.description}
              </p>
              
              {/* Achievements */}
              {org.achievements && org.achievements.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-gray-700">Key Achievements:</h5>
                  <div className="flex flex-wrap gap-2">
                    {org.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-600 mb-4">
            Interested in collaboration or have questions about any of these organizations?
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Organizations;