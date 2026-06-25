import LoadingScreen from './components/layout/LoadingScreen';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgressBar from './components/layout/ScrollProgressBar';
import ScrollBackground from './components/layout/ScrollBackground';
import ParticleCanvas from './components/layout/ParticleCanvas';
import BackToTop from './components/layout/BackToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

/**
 * Root application component.
 * Assembles all layout elements and page sections in order.
 */
export default function App() {
  return (
    <>
      {/* ── Global UI Elements ── */}
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgressBar />
      <ParticleCanvas />
      <ScrollBackground />
      <BackToTop />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
