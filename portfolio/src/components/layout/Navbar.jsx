import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

/**
 * Fixed navigation bar with blur backdrop, active section indicator,
 * and responsive mobile hamburger menu
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.9 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#000000]/80 backdrop-blur-xl border-b border-indigo-500/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
                        aria-label="Bjorni Tare - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide">
              <span className="text-white">Bjorni</span>
              <span className="text-indigo-400">.</span>
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Desktop navigation">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'section' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-sm py-2 px-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="nav-contact-btn"
            >
              <span>Let's Talk</span>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden text-slate-300 hover:text-white transition-colors p-2 rounded-lg"
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-[#000000] border-b border-indigo-500/20 py-6 px-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => {
                  const id = link.href.replace('#', '');
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-500/10 text-white border border-indigo-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="btn-primary w-full justify-center"
                  >
                    <span>Let's Talk</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
