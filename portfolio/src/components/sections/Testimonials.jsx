import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import { testimonials } from '../../data/testimonials';

/**
 * Star rating display
 */
function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

/**
 * Testimonials section with auto-sliding carousel
 */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const current = testimonials[active];

  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        tag="Testimonials"
        title={<>What People <span className="gradient-text">Say</span></>}
        subtitle="Feedback from colleagues, mentors, and clients I've had the pleasure of working with."
      />

      <div
        className="max-w-3xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main testimonial card */}
        <div className="relative min-h-[260px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="testimonial-card w-full"
            >
              {/* Quote icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Quote size={18} className="text-indigo-400 fill-indigo-400/30" />
                </div>
                <StarRating count={current.rating} />
              </div>

              {/* Quote text */}
              <blockquote className="text-slate-300 text-base leading-relaxed mb-6 italic">
                "{current.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${current.color}90, ${current.color}40)`, border: `2px solid ${current.color}40` }}
                >
                  {current.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{current.name}</p>
                  <p className="text-slate-500 text-xs">{current.role}</p>
                  <p style={{ color: current.color }} className="text-xs font-medium mt-0.5">
                    {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-2 bg-indigo-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all"
              aria-label="Previous testimonial"
              id="testimonial-prev"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all"
              aria-label="Next testimonial"
              id="testimonial-next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail previews */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              whileHover={{ y: -2 }}
              className={`p-3 rounded-xl text-left transition-all ${
                i === active
                  ? 'border border-indigo-500/40 bg-indigo-500/5'
                  : 'glass border-transparent hover:border-white/10'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2"
                style={{ background: `${t.color}50` }}
              >
                {t.initials}
              </div>
              <p className="text-white text-xs font-semibold truncate">{t.name}</p>
              <p className="text-slate-500 text-[0.65rem] truncate">{t.role}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
