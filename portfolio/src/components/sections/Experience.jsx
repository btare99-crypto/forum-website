import { motion } from 'framer-motion';
import { Briefcase, Headphones, Laptop, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import { experiences } from '../../data/experience';
import Tilt from '../ui/Tilt';

const ICON_MAP = { Briefcase, Headphones, Laptop };

const TYPE_LABELS = {
  internship: { label: 'Internship', color: '#6366f1' },
  work: { label: 'Work', color: '#8b5cf6' },
  freelance: { label: 'Freelance', color: '#06b6d4' },
};

/**
 * Experience section with a modern left-aligned timeline and interactive glowing cards
 */
export default function Experience() {

  return (
    <SectionWrapper id="experience" className="bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeader
        tag="Experience"
        title={<>My Professional <span className="gradient-text">Journey</span></>}
        subtitle="The milestones that have defined my software engineering and development path."
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Glow Line */}
        <div className="absolute left-9 sm:left-[45px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-cyan-500/10 pointer-events-none" />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const Icon = ICON_MAP[exp.icon] || Briefcase;
            const typeInfo = TYPE_LABELS[exp.type] || { label: 'Work', color: '#8b5cf6' };
            const isActive = exp.period.includes('Present');

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: '-60px' }}
                className="relative pl-14 sm:pl-20 group"
              >
                {/* ── Timeline Icon Indicator ── */}
                <div className="absolute left-9 sm:left-[45px] top-2 -translate-x-1/2 z-25">
                  <motion.div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center border bg-[#0b0b0e] relative transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: isActive ? `${exp.color}` : `${exp.color}40`,
                      boxShadow: isActive 
                        ? `0 0 20px ${exp.color}40, inset 0 0 10px ${exp.color}20` 
                        : `0 0 15px ${exp.color}15`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={18} style={{ color: exp.color }} />

                    {/* Active pulse dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black"></span>
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* ── Content Card ── */}
                <Tilt className="flex-grow">
                  <motion.div
                    className="card glass p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-500 group-hover:border-white/10 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.5),_0_0_40px_rgba(99,102,241,0.05)]"
                    whileHover={{ y: -5 }}
                  >
                    {/* Radial Spotlight Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${exp.color}12, transparent 80%)`,
                      }}
                    />

                    {/* Corner Accent Glow */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                      style={{ background: exp.color }}
                    />

                    {/* Card Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold"
                            style={{
                              background: `${typeInfo.color}15`,
                              color: typeInfo.color,
                            }}
                          >
                            {typeInfo.label}
                          </span>
                        </div>
                        <h4 className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight group-hover:text-indigo-300 transition-colors duration-300">
                          {exp.role}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-sm text-slate-400 font-medium">
                          <span className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors cursor-default">
                            {exp.company}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin size={13} className="text-slate-600" />
                            Tirana, Albania
                          </span>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-2 border border-white/5 bg-[#0b0b0e]/40 px-4 py-2.5 rounded-2xl backdrop-blur-sm self-start md:self-auto min-w-[140px]">
                        <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono font-bold tracking-wider">
                          <Calendar size={13} className="text-indigo-400" />
                          {exp.period}
                        </div>
                        <div className="text-slate-500 text-[10px] font-mono font-semibold uppercase tracking-widest md:text-right mt-0.5">
                          {exp.duration}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10 font-medium">
                      {exp.description}
                    </p>

                    {/* Achievements Checklist */}
                    <div className="space-y-3.5 mb-8 relative z-10">
                      <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">Key Deliverables &amp; Achievements</p>
                      <div className="grid gap-3">
                        {exp.achievements.map((achievement, ai) => (
                          <div key={ai} className="flex items-start gap-3 group/item">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover/item:bg-emerald-500/20 group-hover/item:border-emerald-500/40 transition-all duration-300">
                              <CheckCircle2 size={12} className="text-emerald-400" />
                            </div>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="relative z-10 pt-4 border-t border-white/5">
                      <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">Core Stack Utilized</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span 
                            key={t} 
                            className="badge text-[10px] sm:text-xs py-1 px-3 border transition-all duration-300 hover:scale-105"
                            style={{
                              borderColor: `${exp.color}25`,
                              color: exp.color,
                              background: `${exp.color}05`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
