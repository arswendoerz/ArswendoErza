import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Services from "./components/Services";
import MyJourney from "./components/MyJourney";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackToTop from "./components/ui/BackToTop";
import { ThemeProvider } from "./hooks/useTheme";

const App = () => (
  <ThemeProvider>
    <div className="relative min-h-screen overflow-x-hidden bg-canvas">
      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Skills />
        <Services />
        <MyJourney />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  </ThemeProvider>
);

export default App;
