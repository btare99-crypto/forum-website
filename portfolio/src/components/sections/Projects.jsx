import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, ArrowLeft, Monitor } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import { projects } from '../../data/projects';
import Tilt from '../ui/Tilt';

export default function Projects() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const project = projects[active];

  function goTo(idx) {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  }
  function next() { goTo((active + 1) % projects.length); }
  function prev() { goTo((active - 1 + projects.length) % projects.length); }

  const slide = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        tag="Projects"
        title={<>Work I'm <span className="gradient-text">Proud Of</span></>}
        subtitle="Real-world projects built with precision and creativity."
      />

      {/* ══ MAIN CARD ══ */}
      <div className="relative max-w-6xl mx-auto">

        {/* Top color bar */}
        <motion.div
          key={active + '-bar'}
          className="absolute -top-px left-0 right-0 h-[2px] rounded-t-3xl z-30"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${project.color} 40%, ${project.accent} 60%, transparent 100%)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        <Tilt>
          <div
            className="relative rounded-3xl overflow-hidden bg-[#0b0b0e]/60 backdrop-blur-xl border border-white/5 shadow-2xl"
            style={{ border: `1px solid ${project.color}15` }}
          >
          {/* Main split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[550px]">
            
            {/* LEFT COLUMN: Project Details */}
            <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-20 relative">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col h-full justify-between gap-8"
                >
                  <div>
                    {/* Category pill */}
                    <span
                      className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-6"
                      style={{ 
                        background: `${project.color}15`, 
                        border: `1px solid ${project.color}35`, 
                        color: project.color 
                      }}
                    >
                      <Monitor size={10} />
                      {project.category}
                    </span>

                    {/* Project title & subtitle */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p 
                      className="text-sm sm:text-base font-semibold mb-4"
                      style={{ color: project.color }}
                    >
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom section of Left Col: Stats & CTAs */}
                  <div>
                    {/* Stats */}
                    <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8 border-t border-white/5 pt-6">
                      {project.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-xl sm:text-2xl lg:text-3xl font-black" style={{ color: project.color }}>
                            {s.value}
                          </p>
                          <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mt-0.5">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 flex-1 sm:flex-initial text-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                          boxShadow: `0 6px 20px ${project.color}35`,
                        }}
                      >
                        <ExternalLink size={14} />
                        Live Site
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-300 bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:text-white flex-1 sm:flex-initial text-center"
                      >
                        <GithubIcon size={14} />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Mockup Showcase */}
            <div className="order-1 lg:order-2 lg:col-span-7 relative flex items-center justify-center p-0 overflow-hidden bg-slate-950/20 border-b lg:border-b-0 lg:border-l border-white/5">
              {/* Pulsing Brand Ambient Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}18 0%, transparent 70%)`
                }}
              />
              
              {/* Subtle grid pattern inside mockup area */}
              <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

              {/* Showcase Wrapper: slide animation when changing projects */}
              <div className="w-full h-full flex items-center justify-center p-6 sm:p-10 lg:p-12 z-20">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={active}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    className="w-full max-w-2xl relative"
                  >
                    {/* Mock Browser Frame */}
                    <div 
                      className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border transition-all duration-300 group"
                      style={{ 
                        borderColor: `${project.color}25`,
                        boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px ${project.color}10`
                      }}
                    >
                      {/* Browser Chrome Header */}
                      <div className="h-9 bg-slate-900/95 border-b border-white/5 flex items-center justify-between px-4 select-none">
                        {/* Windows controls (Red, Yellow, Green) */}
                        <div className="flex gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        {/* URL bar representation */}
                        <div className="w-48 sm:w-64 h-5 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                          {project.live.replace('https://', '')}
                        </div>
                        <div className="w-10" /> {/* Spacer */}
                      </div>

                      {/* Mockup image area */}
                      <div className="relative bg-slate-950 overflow-hidden w-full flex items-center justify-center" style={{ aspectRatio: '1024/465' }}>
                        <img
                          src={project.mockup}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
          </div>

          {/* Shimmer sweep */}
          <motion.div
            key={active + '-sh'}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: `linear-gradient(110deg, transparent 30%, ${project.color}08 50%, transparent 70%)`, backgroundSize: '200% 100%' }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
          />
          </div>
        </Tilt>

        {/* ══ NAVIGATION ROW ══ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-6 px-1 w-full">

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto max-w-full no-scrollbar pb-2 sm:pb-0 scroll-smooth w-full sm:w-auto justify-center sm:justify-start">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={p.title}
                className="relative rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  width: 110,
                  height: 62,
                  background: '#0b0b0e',
                  border: i === active ? `2px solid ${p.color}` : '2px solid rgba(255,255,255,0.07)',
                  boxShadow: i === active ? `0 0 20px ${p.color}40` : 'none',
                  transition: 'border 0.3s, box-shadow 0.3s',
                }}
              >
                <img
                  src={p.mockup}
                  alt={p.title}
                  className="w-full h-full object-contain"
                  style={{ filter: i === active ? 'brightness(1)' : 'brightness(0.4)', transition: 'filter 0.3s' }}
                />
                {/* Active dot */}
                {i === active && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                  />
                )}
                {/* Title overlay */}
                <div
                  className="absolute bottom-0 inset-x-0 py-1 text-center"
                  style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.9), transparent)' }}
                >
                  <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: i === active ? p.color : '#475569' }}>
                    {p.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs font-mono mr-2">
              {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              aria-label="Previous"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <ArrowLeft size={16} />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              aria-label="Next"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                boxShadow: `0 4px 18px ${project.color}50`,
              }}
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>

        {/* More Projects CTA */}
        <motion.div
          className="mt-16 text-center border-t border-white/5 pt-10 max-w-xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400 text-sm mb-5 leading-relaxed font-medium">
            Want to see more of my work? Visit my GitHub to explore additional projects, active repositories, and open-source contributions.
          </p>
          <motion.a
            href="https://github.com/btare99"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-indigo-500/30 transition-all duration-300 shadow-lg shadow-black/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon size={16} />
            <span>Visit My GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
