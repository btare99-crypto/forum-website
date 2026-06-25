import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Monitor, Server, Database, Wrench } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import { skillCategories } from '../../data/skills';

const ICON_MAP = { Code2, Monitor, Server, Database, Wrench };

/**
 * Skills section with animated category tabs and skill bars
 */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeData = skillCategories.find((c) => c.id === activeCategory);

  return (
    <SectionWrapper id="skills">
      <SectionHeader
        tag="Skills"
        title={<>My <span className="gradient-text">Tech Stack</span></>}
        subtitle="A comprehensive overview of the technologies and tools I work with daily."
      />

      {/* ── Category Tabs ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {skillCategories.map((cat) => {
          const Icon = ICON_MAP[cat.icon];
          const isActive = cat.id === activeCategory;
          return (
            <motion.button
              key={cat.id}
              id={`skills-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'glass text-slate-400 hover:text-white border border-white/5'
              }`}
              style={isActive ? {
                background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}20)`,
                border: `1px solid ${cat.color}50`,
                boxShadow: `0 4px 20px ${cat.color}25`,
              } : {}}
            >
              {Icon && <Icon size={15} style={{ color: isActive ? cat.color : undefined }} />}
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* ── Skills Panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {activeData?.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card glass-hover p-5 rounded-2xl group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                    style={{
                      background: `${activeData.color}15`,
                      border: `1px solid ${activeData.color}30`,
                      color: activeData.color,
                    }}
                  >
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-white text-sm">{skill.name}</span>
                </div>
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: activeData.color }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Animated progress bar */}
              <div className="skill-bar">
                <motion.div
                  className="skill-fill"
                  style={{
                    background: `linear-gradient(90deg, ${activeData.color}, ${activeData.color}99)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.07 + 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── All Tech floating tags ── */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-slate-500 text-sm mb-6 font-mono">Also familiar with:</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {['Agile Development', 'Embedded Systems', 'IoT Systems', 'RESTful Design', 'Figma', 'Vercel', 'Linux', 'Vite'].map((tech, i) => (
            <motion.span
              key={tech}
              className="badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
