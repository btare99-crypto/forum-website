import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Higher-order wrapper for all page sections.
 * Provides consistent padding, scroll-reveal animation,
 * and optional background variants.
 *
 * @param {string} id - Section anchor ID
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children
 */
export default function SectionWrapper({ id, className = '', children }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-7xl mx-auto px-6"
      >
        {children}
      </motion.div>

      {/* Subtle futuristic section divider */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center opacity-45 pointer-events-none" aria-hidden="true">
        <div className="w-[20%] sm:w-[35%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-indigo-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 shadow-[0_0_8px_rgba(99,102,241,0.8)] mx-3" />
        <div className="w-[20%] sm:w-[35%] h-[1px] bg-gradient-to-l from-transparent via-indigo-500/25 to-indigo-500/40" />
      </div>
    </section>
  );
}

/**
 * Consistent section header with title, gradient accent line, and subtitle
 */
export function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-500" />
          <span className="font-mono text-sm text-indigo-400 tracking-wider uppercase">{tag}</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-indigo-500" />
        </motion.div>
      )}
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
