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
  SiRadixui,
  SiArduino
} from "react-icons/si";
import { 
  FaCode, 
  FaPaintBrush, 
  FaBug 
} from "react-icons/fa";
 

import tiketku1 from "./assets/images/Projects/tiketku/tiketku1.png";
import tiketku2 from "./assets/images/Projects/tiketku/tiketku2.png";
import tiketku3 from "./assets/images/Projects/tiketku/tiketku3.png";
import tiketku4 from "./assets/images/Projects/tiketku/tiketku4.png";
import tiketku5 from "./assets/images/Projects/tiketku/tiketku5.png";
import tiketku6 from "./assets/images/Projects/tiketku/tiketku6.png";
import tiketku7 from "./assets/images/Projects/tiketku/tiketku7.png";
import tiketku8 from "./assets/images/Projects/tiketku/tiketku8.png";
import tiketku9 from "./assets/images/Projects/tiketku/tiketku9.png";
import tiketku10 from "./assets/images/Projects/tiketku/tiketku10.png";
import tiketku11 from "./assets/images/Projects/tiketku/tiketku11.png";
import tiketku12 from "./assets/images/Projects/tiketku/tiketku12.png";
import tiketku13 from "./assets/images/Projects/tiketku/tiketku13.png";

import frewel from "./assets/images/Projects/frewel/f.png";
import frewel1 from "./assets/images/Projects/frewel/f1.png";
import frewel2 from "./assets/images/Projects/frewel/f2.png";
import frewel3 from "./assets/images/Projects/frewel/f3.png";
import frewel4 from "./assets/images/Projects/frewel/f4.png";
import frewel5 from "./assets/images/Projects/frewel/f5.png";
import frewel6 from "./assets/images/Projects/frewel/f6.png";

import brc from "./assets/images/Projects/brc/brc.png";
import brc1 from "./assets/images/Projects/brc/brc1.png";
import brc2 from "./assets/images/Projects/brc/brc2.png";
import brc3 from "./assets/images/Projects/brc/brc3.png";
import brc4 from "./assets/images/Projects/brc/brc4.png";

import gkmi from "./assets/images/Projects/gkmi/gkmi.png";
import gkmi1 from "./assets/images/Projects/gkmi/gkmi1.png";
import gkmi2 from "./assets/images/Projects/gkmi/gkmi2.png";
import gkmi3 from "./assets/images/Projects/gkmi/gkmi3.png";
import gkmi4 from "./assets/images/Projects/gkmi/gkmi4.png";
import gkmi5 from "./assets/images/Projects/gkmi/gkmi5.png";
import gkmi6 from "./assets/images/Projects/gkmi/gkmi6.png";

import simdes1 from "./assets/images/Projects/simdes/simdes1.png";
import simdes2 from "./assets/images/Projects/simdes/simdes2.png";
import simdes3 from "./assets/images/Projects/simdes/simdes3.png";

import person_project from "./assets/images/Projects/person.png";

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
  title: "Tech Stacks",
  subtitle: "EVERYTHING I USE TO DESIGN, DEVELOP & DEPLOY",
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
    },
    {
      name: "Arduino IDE",
      para: "An open-source development environment for programming microcontrollers like Arduino boards.",
      logo: SiArduino, 
      details: [
    "Write, compile, and upload code to Arduino boards.",
    "Supports a variety of microcontrollers (Uno, Nano, Mega, etc).",
    "Includes serial monitor for real-time debugging.",
    "Extensible via libraries and custom board definitions.",
    "Ideal for IoT and embedded systems prototyping."
      ]
    }
  ],
  icon: MdArrowForward,
},
  services: {
  title: "What I Do",
  subtitle: "Turning Ideas into Interactive Digital Experiences",
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
    title: "Creation",
    subtitle: "MY PROJECTS",
    image: person_project,
    project_content: [
      {
        title: "Website FresJewellry",
        images: [frewel, frewel1, frewel2, frewel3, frewel4, frewel5, frewel6],
      },
      {
        title: "Website TiketKu Final Project",
        images: [tiketku1, tiketku2, tiketku3, tiketku4, tiketku5, tiketku6, tiketku7, tiketku8, tiketku9, tiketku10, tiketku11, tiketku12, tiketku13],
      },
      {
        title: "Website GKMI Ekaristi",
        images: [gkmi, gkmi1, gkmi2, gkmi3, gkmi4, gkmi5, gkmi6],
      },
      {
        title: "Website Binar Rental Car",
        images: [brc, brc1, brc3, brc4, brc2],
      },
      {
        title: "UI Sistem Informasi Desa",
        images: [simdes1, simdes2, simdes3]
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