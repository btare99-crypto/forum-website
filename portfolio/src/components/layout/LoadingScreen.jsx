import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Animated loading screen shown on initial page load
 * Disappears after ~1.8s with a slide-up animation
 */
export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading"
          role="status"
        >
          {/* Animated logo */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                className="w-20 h-20 rounded-full border-2 border-indigo-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-t-indigo-500 border-r-cyan-400 border-b-transparent border-l-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
              </div>
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-mono text-sm text-indigo-400 tracking-[0.3em] uppercase">
                Bjorni Tare
              </p>
              <p className="text-xs text-slate-500 mt-1 tracking-widest">
                Loading portfolio...
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-40 h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
