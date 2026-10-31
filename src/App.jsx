import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import MyJourney from "./components/MyJourney";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackToTop from "./components/ui/BackToTop";
import { ThemeProvider } from "./hooks/useTheme";
import { LanguageProvider } from "./hooks/useLanguage";

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-canvas">
        <Navbar />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Skills />
          <MyJourney />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
