import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * Premium cursor effect:
 *  - Spotlight glow that follows the mouse (ambient light effect)
 *  - Small glowing core dot
 *  - Particle trail that fades out
 *  - Morphs on hover over interactive elements
 */

// Single trail particle
function TrailParticle({ x, y, id }) {
  return (
    <motion.div
      key={id}
      style={{
        position: 'fixed',
        left: x - 3,
        top: y - 3,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #818cf8, #06b6d4)',
        pointerEvents: 'none',
        zIndex: 9996,
      }}
      initial={{ opacity: 0.7, scale: 1 }}
      animate={{ opacity: 0, scale: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      aria-hidden="true"
    />
  );
}

export default function CustomCursor() {
  const { mousePosition, isPointer } = useMousePosition();
  const [trail, setTrail] = useState([]);
  const trailIdRef = useRef(0);
  const lastTrailPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Build particle trail
  useEffect(() => {
    if (isMobile) return;
    const { x, y } = mousePosition;
    const dx = x - lastTrailPos.current.x;
    const dy = y - lastTrailPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Only emit particle if moved enough
    if (dist > 12) {
      lastTrailPos.current = { x, y };
      const id = trailIdRef.current++;

      setTrail((prev) => [...prev.slice(-10), { x, y, id }]);

      // Remove particle after animation
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 600);
    }
  }, [mousePosition]);

  if (isMobile) return null;

  return (
    <>
      {/* ── Spotlight ambient glow ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9994,
          borderRadius: '50%',
          background: isPointer
            ? 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: mousePosition.x - (isPointer ? 120 : 100),
          y: mousePosition.y - (isPointer ? 120 : 100),
          width: isPointer ? 240 : 200,
          height: isPointer ? 240 : 200,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />

      {/* ── Core glowing dot ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          background: isPointer
            ? 'radial-gradient(circle, #a78bfa, #6366f1)'
            : 'radial-gradient(circle, #818cf8, #6366f1)',
          boxShadow: isPointer
            ? '0 0 16px 4px rgba(139,92,246,0.7), 0 0 40px 8px rgba(99,102,241,0.3)'
            : '0 0 10px 2px rgba(99,102,241,0.6), 0 0 24px 4px rgba(99,102,241,0.2)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: mousePosition.x - (isPointer ? 7 : 5),
          y: mousePosition.y - (isPointer ? 7 : 5),
          width: isPointer ? 14 : 10,
          height: isPointer ? 14 : 10,
          scale: isPointer ? 1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 2000, damping: 50 }}
      />

      {/* ── Outer halo ring (slower follow) ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9997,
          borderRadius: '50%',
          border: isPointer
            ? '1.5px solid rgba(167,139,250,0.5)'
            : '1.5px solid rgba(99,102,241,0.35)',
          boxShadow: isPointer
            ? 'inset 0 0 12px rgba(167,139,250,0.15), 0 0 12px rgba(99,102,241,0.2)'
            : 'none',
        }}
        animate={{
          x: mousePosition.x - (isPointer ? 24 : 18),
          y: mousePosition.y - (isPointer ? 24 : 18),
          width: isPointer ? 48 : 36,
          height: isPointer ? 48 : 36,
          opacity: isPointer ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 40 }}
      />

      {/* ── "Click" text label on interactive elements ── */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9998,
              x: mousePosition.x + 14,
              y: mousePosition.y - 22,
              fontSize: '9px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(167,139,250,0.9)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            click
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Particle trail ── */}
      <AnimatePresence>
        {trail.map((p) => (
          <TrailParticle key={p.id} x={p.x} y={p.y} id={p.id} />
        ))}
      </AnimatePresence>
    </>
  );
}
