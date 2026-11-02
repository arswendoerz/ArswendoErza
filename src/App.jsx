import { Suspense, lazy, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./Layouts/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import BackToTop from "./components/ui/BackToTop";
import SpaceSky from "./components/space/SpaceSky";
import { ThemeProvider } from "./hooks/useTheme";
import { LanguageProvider } from "./hooks/useLanguage";

// Everything below the first two sections loads as a separate chunk, so the
// first paint does not wait for the gallery, modals, EmailJS or toasts.
const MyJourney = lazy(() => import("./components/MyJourney"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./Layouts/Footer"));

/**
 * A deep link such as /#projects arrives before that section exists, so the
 * browser cannot jump to it. Once the lazy sections mount, do the jump.
 */
const ScrollToHash = () => {
  useEffect(() => {
    const { hash } = window.location;
    // instant, not the page's smooth scrolling: this is a landing, not a tour
    if (hash.length > 1) document.querySelector(hash)?.scrollIntoView({ behavior: "instant" });
  }, []);
  return null;
};

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-canvas">
        <SpaceSky />
        <Navbar />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Skills />
          <Suspense fallback={null}>
            <MyJourney />
            <Projects />
            <Contact />
            <ScrollToHash />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <BackToTop />
        {/* cookie-free page views; reports only once Web Analytics is enabled
            for this project in the Vercel dashboard */}
        <Analytics />
      </div>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
