// import images
import Hero_person from "./assets/images/Hero/person.png";

import {
  SiFigma,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiBootstrap,
  SiTailwindcss,
  SiVite,
  SiExpress,
  SiSelenium,
  SiRadixui
} from "react-icons/si";
import { FaCode, FaPaintBrush, FaBug } from "react-icons/fa";

import project1 from "./assets/images/projects/img1.png";
import project2 from "./assets/images/projects/img2.png";
import project3 from "./assets/images/projects/img3.png";
import person_project from "./assets/images/projects/person.png";

// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine, RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const content = {
  nav: [
    {
      link: "#home",
      icon: TbSmartHome,
      text: "Home",
    },
    {
      link: "#skills",
      icon: BiUser,
      text: "Skills",
    },
    {
      link: "#services",
      icon: RiServiceLine,
      text: "Services",
    },
    {
      link: "#projects",
      icon: RiProjectorLine,
      text: "Projects",
    },
    {
      link: "#contact",
      icon: MdOutlinePermContactCalendar,
      text: "Contact",
    },
  ],
  hero: {
    title: "Code with purpose, design with clarity.",
    firstName: "ARSWENDO",
    LastName: "ERZA",
    btnText: "Contact Me",
    image: Hero_person,
    hero_content: [
      {
        count: "1",
        text: "Fullstack Web Developer",
      },
      // {
      //   count: "2",
      //   text: "WEB DEVELOPER"
      // },
      {
        count: "2",
        text: "Informatics Engineering Student",
      },
      {
        count: "3",
        text: "Digital Engineering Laboratory Assistant"
      },
      {
        count: "4",
        text: "Kampus Merdeka 7 graduates at Binar Academy"
      }
    ],
  },
  skills : {
  title: "Skills",
  subtitle: "MY TOP SKILLS",
  skills_content: [
    {
      name: "Figma",
      para: "A design tool for creating interactive and efficient UI/UX prototypes.",
      logo: SiFigma,
      details: [
        "Create interactive prototypes for mobile and web apps.",
        "Real-time collaboration with design teams.",
        "Supports auto layout for responsive design.",
        "Integrates with plugins to speed up workflow.",
        "Used in the handoff process to developers."
      ]
    },
    {
      name: "JavaScript",
      para: "A primary programming language for client-side interactive web development.",
      logo: SiJavascript,
      details: [
        "Used for DOM manipulation and event handling.",
        "Foundation of modern frameworks like React and Vue.",
        "Supports asynchronous programming with Promises and async/await.",
        "Compatible with all major browsers.",
        "Frequently used for client-side form validation."
      ]
    },
    {
      name: "Python",
      para: "A versatile programming language popular in data science, backend, and automation.",
      logo: SiPython,
      details: [
        "Used in backend development with Django or Flask.",
        "Popular for data analysis and machine learning.",
        "Easy-to-read and write syntax.",
        "Supports scripting and task automation.",
        "Widely used in academic and industry settings."
      ]
    },
    {
      name: "React.js",
      para: "A JavaScript library for building component-based user interfaces.",
      logo: SiReact,
      details: [
        "Uses reusable component-based architecture.",
        "Employs Virtual DOM for high performance.",
        "Supports hooks for state and side effects.",
        "Used by major companies like Facebook and Instagram.",
        "Works well with UI libraries like Material UI and Tailwind."
      ]
    },
    {
      name: "Node.js",
      para: "A JavaScript runtime built on Chrome's V8 engine for server-side applications.",
      logo: SiNodedotjs,
      details: [
        "Enables server-side development with JavaScript.",
        "Rich ecosystem via NPM.",
        "Fast and lightweight, event-driven architecture.",
        "Used to build REST APIs and real-time apps.",
        "Integrates with various databases easily."
      ]
    },
    {
      name: "Bootstrap",
      para: "A popular CSS framework for building responsive and fast user interfaces.",
      logo: SiBootstrap,
      details: [
        "Provides pre-built UI components.",
        "Responsive grid system for flexible layouts.",
        "Easy to customize themes.",
        "Quick to integrate in new projects.",
        "Compatible with all major browsers."
      ]
    },
    {
      name: "Shadcn UI",
      para: "Modern UI component library based on Tailwind CSS and Radix UI.",
      logo: SiRadixui,
      details: [
        "Uses utility-first Tailwind CSS system.",
        "Built with modern best practices.",
        "Integrates with React and Radix UI.",
        "Ideal for consistent design systems.",
        "Easily customizable to match branding."
      ]
    },
    {
      name: "Tailwind CSS",
      para: "A utility-first CSS framework for building fast and flexible interfaces.",
      logo: SiTailwindcss,
      details: [
        "No need to write custom CSS directly.",
        "Fast for UI prototyping.",
        "Supports dark mode and responsive design by default.",
        "Compact and readable utility classes.",
        "Can be used with frameworks like React or Vue."
      ]
    },
    {
      name: "Vite",
      para: "A fast and modern build tool for JavaScript/React projects with hot reload support.",
      logo: SiVite,
      details: [
        "Fast startup via esbuild pre-bundling.",
        "Extremely fast Hot Module Replacement (HMR).",
        "Minimal and intuitive configuration.",
        "Supports frameworks like React, Vue, Svelte.",
        "Suitable for projects from small to large scale."
      ]
    },
    {
      name: "Express.js",
      para: "A minimal and flexible backend framework for Node.js.",
      logo: SiExpress,
      details: [
        "Used for building RESTful APIs.",
        "Flexible and modular middleware support.",
        "Simple and efficient routing.",
        "Fits small to enterprise-level applications.",
        "Often used with MongoDB and Mongoose."
      ]
    },
    {
      name: "Selenium IDE",
      para: "A browser-based automation tool for recording and running tests.",
      logo: SiSelenium,
      details: [
        "Supports no-code test recording and playback.",
        "Exportable to various programming languages.",
        "Integration with CI/CD pipelines.",
        "Used for regression testing in web applications.",
        "Works across multiple browsers."
      ]
    }
  ],
  icon: MdArrowForward,
},
  services: {
  title: "Services",
  subtitle: "WHAT I OFFER",
  service_content: [
    {
      title: "Web Development",
      para: "Build responsive and dynamic websites using modern frameworks such as React and Node.js.",
      logo: FaCode,
    },
    {
      title: "UI/UX Design",
      para: "Design user-centric and aesthetically pleasing interfaces using Figma and modern design systems.",
      logo: FaPaintBrush,
    },
    {
      title: "Automation Testing",
      para: "Implement automated testing strategies with tools like Selenium, Jest, or Cypress to ensure product quality.",
      logo: FaBug,
    },
  ],
},
  Projects: {
    title: "Projects",
    subtitle: "MY CREATION",
    image: person_project,
    project_content: [
      {
        title: "Design UI/UX AbsenYUK",
        image: project1,
      },
      {
        title: "Design UI Sistem Informasi Desa",
        image: project2,
      },
      {
        title: "Website GKMI Ekaristi",
        image: project3,
      },
      {
        title: "Website Binar Rental Car",
        image: project3,
      },
      {
        title: "Website TiketKu Final Project",
        image: project3,
      },
      {
        title: "Website FresJewellry",
        image: project2,
      },
      {
        title: "Website FresJewellry",
        image: project2,
      },
    ],
  },

  Contact: {
    title: "Contect Me",
    subtitle: "GET IN TOUCH",
    social_media: [
      {
        text: "arswendoerza@gmail.com",
        icon: GrMail,
        link: "mailto:arswendoerza@gmail.com",
      },
      {
        text: "+6281373609253",
        icon: MdCall,
        link: "https://wa.me/+6281373609253",
      },
      {
        text: "arswendo.erz",
        icon: BsInstagram,
        link: "https://www.instagram.com/arswendo.erz/",
      },
      {
        text:"Arswendo Erza Sadewa",
        icon: FaLinkedin,
        link: "https://www.linkedin.com/in/arswendo-erza-sadewa/",
      },
      {
        text:"arswendoerz",
        icon: FaGithub,
        link: "https://github.com/arswendoerz",
      }
    ],
  },
  Footer: {
    text: "All © Copy Right Reserved 2025",
  },
};