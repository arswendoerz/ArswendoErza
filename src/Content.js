// import images
import Hero_person from "./assets/images/Hero/person.webp";

import {
  SiFigma,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiBootstrap,
  SiTailwindcss,
  SiVite,
  SiExpress,
  SiSelenium,
  SiRadixui,
  SiArduino,
  SiPostman, 
  SiGithub, 
  SiCanva, 
  SiGmail
} from "react-icons/si";
import {
  FaCode,
  FaPaintBrush,
  FaBug,
  FaSpotify,
  FaGraduationCap,
  FaBookOpen,
  FaHospital,
} from "react-icons/fa";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoHardwareChip } from "react-icons/io5";

import sosialink1 from "./assets/images/Projects/sosialink/sosialink1.webp";
import sosialink2 from "./assets/images/Projects/sosialink/sosialink2.webp";
import sosialink3 from "./assets/images/Projects/sosialink/sosialink3.webp";
import sosialink4 from "./assets/images/Projects/sosialink/sosialink4.webp";
import sosialink6 from "./assets/images/Projects/sosialink/sosialink6.webp";

import tiketku1 from "./assets/images/Projects/tiketku/Tiketku1.webp";
import tiketku2 from "./assets/images/Projects/tiketku/Tiketku2.webp";
import tiketku3 from "./assets/images/Projects/tiketku/Tiketku3.webp";
import tiketku4 from "./assets/images/Projects/tiketku/Tiketku4.webp";
import tiketku5 from "./assets/images/Projects/tiketku/Tiketku5.webp";
import tiketku6 from "./assets/images/Projects/tiketku/Tiketku6.webp";
import tiketku7 from "./assets/images/Projects/tiketku/Tiketku7.webp";
import tiketku8 from "./assets/images/Projects/tiketku/Tiketku8.webp";
import tiketku9 from "./assets/images/Projects/tiketku/Tiketku9.webp";
import tiketku10 from "./assets/images/Projects/tiketku/Tiketku10.webp";
import tiketku11 from "./assets/images/Projects/tiketku/Tiketku11.webp";
import tiketku12 from "./assets/images/Projects/tiketku/Tiketku12.webp";
import tiketku13 from "./assets/images/Projects/tiketku/Tiketku13.webp";

import frewel1 from "./assets/images/Projects/frewel/f1.webp";
import frewel2 from "./assets/images/Projects/frewel/f2.webp";
import frewel3 from "./assets/images/Projects/frewel/f3.webp";
import frewel4 from "./assets/images/Projects/frewel/f4.webp";
import frewel5 from "./assets/images/Projects/frewel/f5.webp";
import frewel6 from "./assets/images/Projects/frewel/f6.webp";
import frewel7 from "./assets/images/Projects/frewel/f7.webp";
import frewel8 from "./assets/images/Projects/frewel/f8.webp";

import brc from "./assets/images/Projects/brc/brc.webp";
import brc2 from "./assets/images/Projects/brc/brc2.webp";
import brc3 from "./assets/images/Projects/brc/brc3.webp";

import gkmi1 from "./assets/images/Projects/gkmi/gkmi1.webp";
import gkmi2 from "./assets/images/Projects/gkmi/gkmi2.webp";
import gkmi3 from "./assets/images/Projects/gkmi/gkmi3.webp";
import gkmi4 from "./assets/images/Projects/gkmi/gkmi4.webp";
import gkmi5 from "./assets/images/Projects/gkmi/gkmi5.webp";

import beevra1 from "./assets/images/Projects/beevra/beevra1.webp";
import beevra2 from "./assets/images/Projects/beevra/beevra2.webp";
import beevra3 from "./assets/images/Projects/beevra/beevra3.webp";
import beevra5 from "./assets/images/Projects/beevra/beevra5.webp";
import beevra7 from "./assets/images/Projects/beevra/beevra7.webp";

import sealbox1 from "./assets/images/Projects/sealbox/sealbox1.webp";
import sealbox2 from "./assets/images/Projects/sealbox/sealbox2.webp";
import sealbox3 from "./assets/images/Projects/sealbox/sealbox3.webp";
import sealbox4 from "./assets/images/Projects/sealbox/sealbox4.webp";
import sealbox5 from "./assets/images/Projects/sealbox/sealbox5.webp";
import sealbox6 from "./assets/images/Projects/sealbox/sealbox6.webp";
import sealbox7 from "./assets/images/Projects/sealbox/sealbox7.webp";

// import simdes1 from "./assets/images/Projects/simdes/simdes1.webp";
// import simdes2 from "./assets/images/Projects/simdes/simdes2.webp";
// import simdes3 from "./assets/images/Projects/simdes/simdes3.webp";

import { GrMail } from "react-icons/gr";
import { BsInstagram } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { GiJourney, GiBeehive } from "react-icons/gi";
import { FaLinkedin, FaGithub } from "react-icons/fa";  

export const content = {
  nav: [
    { link: "#home", icon: TbSmartHome, text: "Home" },
    { link: "#skills", icon: BiUser, text: "Skills" },
    { link: "#journey", icon: GiJourney, text: "Journey" },
    { link: "#projects", icon: RiProjectorLine, text: "Work" },
    { link: "#contact", icon: MdOutlinePermContactCalendar, text: "Contact" },
  ],

  hero: {
    location: "Bandar Lampung, Indonesia",
    firstName: "ARSWENDO",
    LastName: "ERZA",
    surname: "SADEWA",
    fullName: "Arswendo Erza Sadewa",
    tagline: "Code with purpose, design with clarity.",
    // shown as the "currently" chip above the name
    current: {
      role: "Fullstack Developer",
      company: "RS Yukum Medical Centre",
      companyShort: "RS Yukum",
    },
    intro:
      "Fullstack Developer at RS Yukum Medical Centre and Informatics Engineering graduate from Universitas Lampung, building web products end to end from Figma wireframe to tested, production-ready interface.",
    // typed out by the hero type-writer (cycled when there is more than one)
    roles: ["Fullstack Web Developer"],
    btnText: "Contact Me",
    secondaryBtnText: "See My Work",
    image: Hero_person,
    stats: [
      { value: "3.83", label: "GPA, Informatics Eng." },
      { value: "7", label: "Projects shipped" },
      { value: "200+", label: "Students mentored" },
      { value: "#1", label: "Best Team of 12, Binar Academy" },
    ],
  },

  // "What I Do" and the tech stack share one section: each service card is
  // also a shortcut to the matching stack filter.
  skills: {
    eyebrow: "Services & Stack",
    title: "What I Do",
    subtitle: "The work I take on, and the stack behind each part of it",
    filters: ["All", "Frontend", "Backend", "Design", "Testing", "Tooling"],
    services: [
      {
        title: "Web Development",
        para: "Responsive, dynamic web apps with React, Next.js and Node.js.",
        logo: FaCode,
        filter: "Frontend",
        points: ["React & Node.js", "REST API integration", "Responsive layouts"],
      },
      {
        title: "UI/UX Design",
        para: "User-centred interfaces designed in Figma and handed off cleanly.",
        logo: FaPaintBrush,
        filter: "Design",
        points: ["Figma prototyping", "Design systems", "Developer handoff"],
      },
      {
        title: "Automation Testing",
        para: "Automated test suites and CI checks that keep releases stable.",
        logo: FaBug,
        filter: "Testing",
        points: ["Selenium suites", "Regression testing", "GitHub Actions CI"],
      },
      {
        title: "Embedded Prototyping",
        para: "Digital logic and microcontroller prototypes with embedded C/C++.",
        logo: IoHardwareChip,
        filter: "Tooling",
        points: ["Arduino & sensors", "Digital logic design", "Embedded C/C++"],
      },
    ],
    // `match` lists the names a skill goes by in a project's stack (defaults
    // to its own name); matching projects are linked from the detail modal.
    // `usage` covers real use that is not a project card on this page.
    skills_content: [
      {
        name: "React.js",
        category: "Frontend",
        // brand colour of its planet in the stack galaxy
        color: "61DAFB",
        para: "A JavaScript library for building component-based user interfaces.",
        logo: SiReact,
      },
      {
        name: "Next.js",
        category: "Frontend",
        color: "FFFFFF",
        para: "A React framework for production apps, with routing, rendering and image optimization built in.",
        logo: SiNextdotjs,
        usage: ["Built the Suhita Bee Farm platform: 10+ responsive pages with a Lighthouse score of 93+."],
      },
      {
        name: "JavaScript",
        category: "Frontend",
        color: "F7DF1E",
        para: "The language behind every interactive interface on this page.",
        logo: SiJavascript,
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        color: "06B6D4",
        para: "A utility-first CSS framework for building fast and flexible interfaces.",
        logo: SiTailwindcss,
        match: ["Tailwind CSS", "Tailwind"],
        usage: ["Also styles this portfolio, including its light and dark themes."],
      },
      {
        name: "Node.js",
        category: "Backend",
        color: "5FA04E",
        para: "A JavaScript runtime for server-side applications and REST APIs.",
        logo: SiNodedotjs,
        usage: ["Designed 20+ REST API endpoints with JWT authentication, PostgreSQL and Prisma ORM on the Binar Academy programme."],
      },
      {
        name: "Express.js",
        category: "Backend",
        color: "FFFFFF",
        para: "A minimal and flexible backend framework for Node.js.",
        logo: SiExpress,
      },
      {
        name: "Git & GitHub",
        category: "Tooling",
        color: "FFFFFF",
        para: "Version control and hosting for tracking changes and collaborating on code.",
        logo: SiGithub,
        usage: ["Version control for every project on this page."],
      },
      {
        name: "Shadcn UI",
        category: "Frontend",
        color: "FFFFFF",
        para: "Modern UI component library based on Tailwind CSS and Radix UI.",
        logo: SiRadixui,
      },
      {
        name: "Vite",
        category: "Tooling",
        color: "646CFF",
        para: "A fast build tool for JavaScript and React projects with instant hot reload.",
        logo: SiVite,
        usage: ["Also builds this portfolio."],
      },
      {
        name: "Bootstrap",
        category: "Frontend",
        color: "7952B3",
        para: "A popular CSS framework for building responsive and fast user interfaces.",
        logo: SiBootstrap,
      },
      {
        name: "Postman",
        category: "Testing",
        color: "FF6C37",
        para: "A platform for building, testing and documenting APIs.",
        logo: SiPostman,
        usage: ["Testing REST APIs during backend development."],
      },
      {
        name: "EmailJS",
        category: "Backend",
        color: "EA4335",
        para: "Sends email straight from client-side code, without a dedicated backend.",
        logo: SiGmail,
        usage: ["Powers the contact form on this portfolio."],
      },
      {
        name: "Figma",
        category: "Design",
        color: "F24E1E",
        para: "A design tool for interactive UI/UX prototypes.",
        logo: SiFigma,
        usage: ["Wireframes and prototypes before development, from Figma wireframe to production interface."],
      },
      {
        name: "Canva",
        category: "Design",
        color: "00C4CC",
        para: "A quick design tool for graphics, mockups and presentation assets.",
        logo: SiCanva,
        usage: ["Social media assets and presentation slides."],
      },
      {
        name: "Python",
        category: "Backend",
        color: "3776AB",
        para: "A versatile language for backend services, data work and automation.",
        logo: SiPython,
      },
      {
        name: "Selenium IDE",
        category: "Testing",
        color: "43B02A",
        para: "A browser-based tool for recording and running automated tests.",
        logo: SiSelenium,
        usage: ["Recorded regression suites for web applications."],
      },
      {
        name: "Arduino IDE",
        category: "Tooling",
        color: "00878F",
        para: "An open-source environment for programming microcontrollers such as Arduino boards.",
        logo: SiArduino,
        usage: ["Microcontroller and sensor prototypes in embedded C/C++."],
      },
    ],
  },

  journey: {
    title: "My Journey",
    subtitle: "Educational background & experience",
    // newest first, by start date
    education_content: [
      {
        icon: FaHospital,
        kind: "Experience",
        group: "experience",
        period: "Sep 2026 - Present",
        institution: "RS Yukum Medical Centre",
        degree: "Fullstack Developer",
        description:
          "Building and maintaining the web-based internal applications that support the hospital's units, working across both the interface and the backend services behind it.",
      },
      {
        icon: GiBeehive,
        kind: "Experience",
        group: "experience",
        period: "Nov 2025 - Jun 2026",
        institution: "Suhita Bee Farm, Bandar Lampung",
        degree: "Frontend Developer (Research & Community Service Project)",
        description:
          "Final year project delivered as combined research and community service. Built the Suhita Bee Farm web platform with Next.js, applying User Centered Design (UCD) and Rapid Application Development (RAD) so the interface matched what the farm actually needed.",
        achievements: [
          "Built 10+ fully responsive pages in Next.js with 100% compatibility across mobile and desktop",
          "Integrated 31 RESTful API endpoints, including an AI image classification feature that processes bee data in under 1.5 seconds",
          "Reached a Google Lighthouse score of 93+ and a System Usability Scale score of 83.83 (Grade A, Excellent) in user testing",
        ],
      },
      {
        icon: RiHomeOfficeFill,
        kind: "Experience",
        group: "experience",
        period: "Jun 2025 - Aug 2025",
        institution: "Dinas Sosial Provinsi Lampung, Bandar Lampung",
        degree: "Frontend Developer Intern",
        description:
          "Worked on SOSIALink, an internal platform that replaced the manual record keeping used for social aid recipients and official documents.",
        achievements: [
          "Developed 8+ core modules on the SOSIALink platform, covering aid recipient data management and digital archiving",
          "Added multi parameter search and Excel export so admin staff could produce monthly reports in a few clicks instead of compiling them by hand",
          "Applied Scrum in a cross functional team across 4 two week sprints, delivering 100% of the planned features on time",
        ],
      },
      {
        icon: FaBookOpen,
        kind: "Education",
        group: "education",
        period: "Sep 2024 - Jan 2025",
        institution: "PT Lentera Bangsa Benderang (Binar Academy)",
        degree: "Fullstack Web Development with AI Literacy & Global Certification",
        description:
          "MSIB independent study programme covering fullstack web development, with more than 195 hours of intensive training and collaborative project work.",
        achievements: [
          "Designed and built 20+ RESTful API endpoints, including JWT authentication and business logic for booking and transaction validation, backed by PostgreSQL and Prisma ORM",
          "Integrated frontend and backend for 2 fullstack applications: Binar Rental Car, and TiketKu, a flight reservation system built as the final project",
          "Named Best Team out of 12 teams (80+ participants) for the fullstack feature implementation and product presentation",
        ],
      },
      {
        icon: IoHardwareChip,
        kind: "Experience",
        group: "experience",
        period: "Sep 2023 - Jun 2026",
        institution: "Digital Engineering Laboratory, Universitas Lampung",
        degree: "Laboratory Assistant",
        description:
          "Ran practical sessions across five practicum courses, from delivering the material and supervising experiments through to evaluating results and reports.",
        achievements: [
          "Taught and mentored 200+ students across 5 practicum courses",
          "Wrote and updated 5 practicum modules used as the official teaching material",
          "Coordinated 40+ practicum sessions over 3 years with the assistant team, keeping equipment ready so sessions ran without technical delays",
        ],
      },
      {
        icon: FaGraduationCap,
        kind: "Education",
        group: "education",
        period: "Aug 2022 - Jun 2026",
        institution: "Universitas Lampung, Bandar Lampung",
        degree: "Bachelor of Informatics Engineering",
        description:
          "Graduated in June 2026 with a GPA of 3.83 out of 4.00, focusing on fullstack web development. Closed the degree with a research and community service project for Suhita Bee Farm.",
        achievements: [
          "Mentored 200+ students in lab practicums and wrote 5 learning modules adopted as reference material in the Digital Engineering Laboratory",
          "Built a honey bee species classification website that integrates a CNN model through a RESTful API, submitted as research and community service",
        ],
      },
    ],
  },

  Projects: {
    title: "My Work",
    subtitle: "Projects & case studies",
    project_content: [
      {
        title: "Sealbox",
        type: "Security Web App",
        desc: "Zero-knowledge password manager where every bit of encryption happens in the browser, so the server only ever stores ciphertext. The master password is stretched with PBKDF2 (600,000 iterations) and HKDF into keys that wrap an AES-256-GCM vault key. The vault syncs through Supabase with Row Level Security, stays readable offline from an encrypted IndexedDB cache, and ships as an installable PWA plus a Manifest V3 browser extension with autofill, save-login prompts and an on-page password generator. Also covers TOTP 2FA, a recovery key, encrypted backups, 30-day item history, and password health checks against Have I Been Pwned using k-anonymity.",
        metrics: ["AES-256-GCM, zero-knowledge", "PWA + browser extension"],
        stack: ["React.js", "Web Crypto API", "Supabase", "IndexedDB", "Vitest", "Cloudflare Pages"],
        images: [sealbox1, sealbox2, sealbox3, sealbox4, sealbox5, sealbox6, sealbox7],
      },
      {
        title: "Beevra",
        type: "Research & Community Service",
        desc: "Web platform for Suhita Bee Farm, submitted as my final year research and community service project under the title Sistem Klasifikasi Spesies Lebah Madu Indo-Malaya. A CNN model served through a RESTful API identifies bee species in under 1.5 seconds, alongside a bee information database that admins can search, filter by genus and edit, plus hive monitoring and an account area.",
        metrics: [
          "Lighthouse 93+",
          "SUS 83.83 - Grade A",
        ],
        stack: ["Next.js", "REST API", "AI Image Classification", "UCD", "RAD"],
        images: [beevra1, beevra2, beevra3, beevra5, beevra7],
      },
      {
        title: "SosiaLINK",
        type: "Government Web App",
        metrics: ["8+ core modules", "4 sprints, 100% on time"],
        desc: "Internal platform built during my internship at Dinas Sosial Provinsi Lampung, replacing the manual record keeping used for social aid recipients and official documents. Covers 8+ core modules with an authenticated admin area, multi parameter search and Excel export, so monthly reports take a few clicks instead of being compiled by hand.",
        stack: ["React.js", "Shadcn UI", "Tailwind CSS", "Vite", "SCRUM"],
        images: [
          sosialink1,
          sosialink2,
          sosialink3,
          sosialink4,
          sosialink6,
        ],
      },
      {
        title: "FresJewellry",
        type: "E-Commerce",
        desc: "Jewellery storefront with a product catalogue grouped by category, horizontal product carousels, Rupiah price formatting, and an add-to-cart flow, styled around a warm gold and neutral brand palette.",
        stack: ["React.js", "Shadcn UI", "Tailwind CSS", "Vite"],
        images: [frewel1, frewel2, frewel3, frewel4, frewel5, frewel6, frewel7, frewel8],
      },
      {
        title: "TiketKu",
        type: "Capstone Project",
        desc: "Flight reservation system built as the final project of the Binar Academy fullstack programme, working across the interface and the REST API behind it. Covers flight search with departure and return schedules, seat class selection, favourite destinations with discount pricing, and a layout that holds up on desktop and mobile.",
        metrics: ["Best Team of 12 teams", "80+ participants"],
        stack: ["React.js", "Shadcn UI", "Vite", "TanStack", "Framer Motion"],
        images: [
          tiketku1,
          tiketku2,
          tiketku3,
          tiketku4,
          tiketku5,
          tiketku6,
          tiketku7,
          tiketku8,
          tiketku9,
          tiketku10,
          tiketku11,
          tiketku12,
          tiketku13,
        ],
      },
      {
        title: "Binar Rental Car",
        type: "Fullstack Web App",
        desc: "Car rental application for the Bandar Lampung area, one of two fullstack builds on the Binar Academy programme where I wired the interface up to my own backend. Covers the service pages, benefit checklist, testimonials and FAQ, with user registration running against the API.",
        stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind", "Node.js"],
        images: [brc, brc2, brc3],
      },
      {
        title: "GKMI Ekaristi",
        type: "Organization Profile",
        desc: "Profile website for GKMI Ekaristi Pringsewu, presenting the congregation's vision and mission, activities, and service information in an elegant dark, serif-led layout.",
        stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind"],
        images: [gkmi1, gkmi2, gkmi3, gkmi4, gkmi5],
      },
      // {
      //   title: "Sistem Informasi Desa",
      //   type: "Mobile UI Design",
      //   year: "2024",
      //   desc: "Mobile UI concept for a village information system, giving residents quick access to village information, a feedback forum, the village organizational structure, population documents, and an emergency assistance shortcut.",
      //   stack: ["Figma"],
      //   images: [simdes1, simdes2, simdes3],
      // },
    ],
  },

  Contact: {
    title: "Let's Work Together",
    subtitle: "Get in touch",
    formTitle: "Send a message",
    intro:
      "Have a project, a role, or just an idea worth discussing? Send a message and I'll get back to you as soon as I can.",
    social_media: [
      {
        text: "arswendoerza@gmail.com",
        label: "Email",
        icon: GrMail,
        link: "mailto:arswendoerza@gmail.com",
      },
      {
        text: "Arswendo Erza Sadewa",
        label: "LinkedIn",
        icon: FaLinkedin,
        link: "https://www.linkedin.com/in/arswendo-erza-sadewa/",
      },
      {
        text: "arswendoerz",
        label: "GitHub",
        icon: FaGithub,
        link: "https://github.com/arswendoerz",
      },
      {
        text: "arswendo.erz",
        label: "Instagram",
        icon: BsInstagram,
        link: "https://www.instagram.com/arswendo.erz/",
      },
      {
        text: "jukjerusnosugar",
        label: "Spotify",
        icon: FaSpotify,
        link: "https://open.spotify.com/user/hslv7q6rbsg8d017fszfrojhl",
      },
    ],
  },

  Footer: {
    name: "Arswendo Erza Sadewa",
    role: "Fullstack Web Developer",
    // year the portfolio went live; the footer shows "2025–<current year>"
    since: 2025,
    text: "All rights reserved",
  },

  // interface copy; `{name}` placeholders are filled in by the components
  ui: {
    language: { switchTo: "Baca dalam Bahasa Indonesia", code: "ID" },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
      light: "Light mode",
      dark: "Dark mode",
    },
    nav: {
      skip: "Skip to content",
      main: "Main navigation",
      home: "{name} — back to top",
      hire: "Hire Me",
      open: "Open menu",
      close: "Close menu",
    },
    hero: {
      greeting: "Hi, my name is",
      portrait: "Portrait of {name}",
      scroll: "Scroll",
      scrollLabel: "Scroll to services and stack",
      sideNote: "Portfolio 2026",
    },
    skills: {
      stackTitle: "Tech stack",
      serviceHint: "Tap a service to filter the stack",
      tools: "{count} tools",
      tool: "{count} tool",
      galaxy: "Tech stack galaxy, one planet per tool",
      galaxyHint: "Hover a planet to read it, click for details, drag to spin",
      hint: "swipe or drag to browse",
      more: "More about {name}",
      usedIn: "Where I've used it",
      openProject: "Open {name} project details",
      categories: {
        All: "All",
        Frontend: "Frontend",
        Backend: "Backend",
        Design: "Design",
        Testing: "Testing",
        Tooling: "Tooling",
      },
    },
    journey: {
      eyebrow: "Journey",
      highlights: "Highlights",
      now: "Now",
      filters: { all: "All", experience: "Experience", education: "Education" },
    },
    projects: {
      eyebrow: "Selected Work",
      rail: "Selected work",
      count: "{count} projects",
      hint: "swipe or drag to browse",
      comingSoon: "Screenshots coming soon",
      openGallery: "Open {name} gallery",
      viewGallery: "View gallery",
      viewGalleryCount: "View gallery ({count})",
      preview: "{name} preview",
      readMore: "Read more",
      readMoreLabel: "Read the full description of {name}",
      details: "{name} details",
      results: "Results",
      builtWith: "Built with",
      close: "Close",
      gallery: "{name} gallery",
      closeGallery: "Close gallery",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      resetZoom: "Reset zoom",
      previous: "Previous image",
      next: "Next image",
      showImage: "Show image {number}",
      screenshot: "{name} screenshot {number}",
      scrollHint: "scroll to see the full page",
      tallLabel: "Full-page screenshot, scroll to see all of it",
    },
    contact: {
      eyebrow: "Contact",
      name: "Your name",
      namePlaceholder: "Your Name",
      email: "Email address",
      emailPlaceholder: "you@gmail.com",
      message: "Message",
      messagePlaceholder: "Tell me about the project, role or idea…",
      send: "Send message",
      sending: "Sending…",
      replyTime: "Usually replies within a day or two.",
      channelOpen: "Channel open",
      sentTitle: "Transmission sent",
      sentBody: "Thanks for reaching out. I will get back to you soon.",
      sendAnother: "Send another",
      copy: "Copy email address",
      copied: "Email address copied",
      copyFailed: "Could not copy. Use the link instead.",
      sent: "Message sent, thanks for reaching out!",
      sendFailed: "Could not send the message. Please email me directly.",
      errors: {
        nameRequired: "Please enter your name.",
        emailInvalid: "Please enter a valid email address.",
        messageShort: "Please write at least 10 characters.",
      },
    },
    footer: {
      nav: "Footer navigation",
      navigate: "Navigate",
      elsewhere: "Elsewhere",
      backToTop: "Back to top",
    },
  },
};
