import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Download, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

/**
 * Hero section — fullscreen intro with typing animation,
 * animated orbs, gradient avatar, and CTA buttons.
 */
export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* ── Animated Background Orbs ── */}
      <div aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* ── Left: Text Content ── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-400">Available for opportunities</span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.1 }}
            >
              <p className="font-mono text-indigo-400 text-sm tracking-widest uppercase mb-3">
                Hello, I'm
              </p>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                              <span className="text-white">Bjorni</span>
                <br />
                <span className="gradient-text">Tare</span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-0.5 bg-indigo-500 rounded-full" />
              <div className="text-lg sm:text-xl font-semibold text-slate-300 min-h-[1.5em]">
                <TypeAnimation
                  sequence={[
                    'Computer Engineering Student',
                    2000,
                    'Full Stack Developer',
                    2000,
                    'Mobile App Developer',
                    2000,
                    'Open Source Enthusiast',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-indigo-300"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="text-slate-400 text-base leading-relaxed max-w-lg"
            >
              I build elegant, performant web and mobile applications — turning complex
              problems into seamless digital experiences. Passionate about clean code,
              great design, and continuous learning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="flex flex-wrap gap-3 mt-2"
            >
              <motion.button
                id="hero-view-projects"
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={16} />
                <span>View Projects</span>
              </motion.button>

              <motion.a
                id="hero-download-cv"
                href="/cv.pdf"
                download="Bjorni's CV"
                className="btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <motion.button
                id="hero-contact"
                onClick={() => scrollToSection('contact')}
                className="btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.7 }}
              className="flex items-center gap-4 mt-2"
            >
              <span className="text-slate-600 text-xs">Find me on</span>
              {[
                { icon: GithubIcon, href: 'https://github.com/btare99', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://linkedin.com/in/bjornitare', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:btare99@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Avatar ── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.2, ease: 'backOut' }}
          >
            <div className="relative">
              {/* Outer soft nebulous glow */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl opacity-60 animate-pulse-glow" style={{ animationDuration: '6s' }} />

              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-indigo-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                {/* Dot on ring with glowing pulse */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,1),_0_0_24px_rgba(99,102,241,0.6)]" />
              </motion.div>

              {/* Inner rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-cyan-500/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                {/* Dot on ring with glowing pulse */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1),_0_0_20px_rgba(6,182,212,0.6)]" />
              </motion.div>

              {/* Avatar container with smooth floating/bobbing animation */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden glass border-2 border-white/10 shadow-2xl group cursor-pointer"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  borderColor: 'rgba(99,102,241,0.25)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.15)'
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Bjorni Tare"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
                {/* Soft overlay gradient to blend with the dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 shimmer pointer-events-none" />
              </motion.div>

              {/* Floating tech badges */}
              {[
                { 
                  label: 'React', 
                  pos: 'top-0 -right-1 sm:-right-4', 
                  color: 'from-cyan-500 to-blue-500', 
                  delay: 2.6,
                  bob: { y: [0, -6, 0], x: [0, 4, 0], duration: 4.2 }
                },
                { 
                  label: 'Node.js', 
                  pos: 'bottom-4 -left-2 sm:-left-8', 
                  color: 'from-green-500 to-emerald-600', 
                  delay: 2.8,
                  bob: { y: [0, 8, 0], x: [0, -4, 0], duration: 5.0 }
                },
                { 
                  label: 'TypeScript', 
                  pos: '-bottom-4 right-4 sm:right-8', 
                  color: 'from-blue-500 to-indigo-600', 
                  delay: 3.0,
                  bob: { y: [0, -8, 0], x: [0, -4, 0], duration: 4.6 }
                },
              ].map(({ label, pos, color, delay, bob }) => (
                <motion.div
                  key={label}
                  className={`absolute ${pos}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: bob.y,
                    x: bob.x
                  }}
                  transition={{
                    opacity: { delay, duration: 0.4 },
                    scale: { delay, type: 'spring', stiffness: 300 },
                    y: { duration: bob.duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 },
                    x: { duration: bob.duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }
                  }}
                >
                  <div className={`glass px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent border border-white/10 shadow-lg shadow-black/25 hover:border-indigo-500/40 transition-colors`}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          aria-label="Scroll to About section"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
