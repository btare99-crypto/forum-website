import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import { education, certifications } from '../../data/experience';
import Tilt from '../ui/Tilt';

/**
 * Education section — academic timeline + certifications with interactive glowing cards
 */
export default function Education() {

  return (
    <SectionWrapper id="education" className="bg-transparent relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute left-10 top-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-10 bottom-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <SectionHeader
        tag="Education"
        title={<>Academic &amp; <span className="gradient-text">Credentials</span></>}
        subtitle="My formal educational path and the specialized certifications I've earned along the way."
      />

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto mt-16 px-4">
        {/* ── Degree Column ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-6 flex items-center gap-2">
            <GraduationCap size={15} className="text-indigo-400" />
            Degrees &amp; Academic Paths
          </h3>

          {education.map((edu) => {
            const isCurrent = edu.status === 'In Progress';
            return (
              <Tilt key={edu.id} className="w-full">
                <motion.div
                  className="card glass p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-500 group hover:border-white/10 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4),_0_0_30px_rgba(99,102,241,0.03)]"
                  whileHover={{ y: -4 }}
                >
                  {/* Spotlight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${edu.color}12, transparent 80%)`,
                    }}
                  />

                  {/* Top corner glow */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ background: edu.color }}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${edu.color}15`,
                        border: `1px solid ${edu.color}30`,
                        boxShadow: `0 0 15px ${edu.color}10`,
                      }}
                    >
                      <GraduationCap size={20} style={{ color: edu.color }} />
                    </div>
                    <div>
                      {isCurrent && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                          Active Pathway
                        </span>
                      )}
                      <h4 className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight group-hover:text-indigo-300 transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <p className="text-indigo-400 font-semibold text-sm sm:text-base mt-1">{edu.institution}</p>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#0b0b0e]/40 border border-white/5 rounded-2xl font-mono text-xs relative z-10">
                    <div>
                      <span className="block text-slate-500 uppercase tracking-widest text-[9px] mb-1 font-bold">Academic Period</span>
                      <span className="text-slate-300 font-semibold">{edu.period}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-widest text-[9px] mb-1 font-bold">Current Standing</span>
                      <span className="text-slate-300 font-semibold">{edu.gpa}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">{edu.description}</p>

                  {/* Coursework */}
                  <div className="relative z-10 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                      <BookOpen size={13} className="text-indigo-400" />
                      Specialized Modules &amp; Labs
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="badge text-[10px] py-1 px-2.5 border transition-all duration-300 hover:scale-105"
                          style={{
                            borderColor: `${edu.color}20`,
                            color: '#cbd5e1',
                            background: `${edu.color}05`,
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </motion.div>

        {/* ── Certifications Column ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-6 flex items-center gap-2">
            <Award size={15} className="text-cyan-400" />
            Certifications &amp; Badges
          </h3>

          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <Tilt key={cert.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="card glass p-4.5 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/5 relative overflow-hidden transition-all duration-300 group hover:border-white/10 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3),_0_0_20px_rgba(99,102,241,0.02)]"
                >
                  {/* Spotlight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${cert.color}10, transparent 80%)`,
                    }}
                  />

                  <div className="flex items-center gap-4 w-full flex-1 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ 
                        background: `${cert.color}15`, 
                        border: `1px solid ${cert.color}30`,
                        boxShadow: `0 0 15px ${cert.color}10`
                      }}
                    >
                      <Award size={18} style={{ color: cert.color }} />
                    </div>
                    
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-white font-bold text-sm sm:text-base leading-tight group-hover:text-indigo-300 transition-colors duration-300">
                        {cert.title}
                      </p>
                      <p className="text-slate-400 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 relative z-10 self-end sm:self-center">
                    <span className="font-mono text-[10px] font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      {cert.year}
                    </span>
                  </div>
                </motion.div>
              </Tilt>
            ))}

            {/* Continuous Learning note */}
            <Tilt className="w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl border border-indigo-500/10 bg-[#0b0b0e]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                <p className="text-indigo-300 text-sm font-extrabold mb-3 flex items-center gap-2">
                  📖 Continuous Professional Development
                </p>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Beyond degrees and badges, I study technical articles, engage in open-source labs, solve algorithm problems, and explore official code documentation to keep my skills sharp.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Algorithms & DS', 'System Design', 'Linux & Bash', 'Cybersecurity Basics'].map((tag) => (
                    <span key={tag} className="badge text-[9px] py-0.5 px-2 bg-white/5 border border-white/5 rounded-md text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
