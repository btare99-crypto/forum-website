import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollBackground — animated geometric shapes fixed behind all content.
 * Each shape has its own scroll-driven trajectory:
 *   - Rings drift across the viewport
 *   - Orbs float up/down and change opacity
 *   - Grid tiles rotate slowly
 *   - Dots scatter and regroup
 */
export default function ScrollBackground() {
  const containerRef = useRef(null);

  // Track scroll progress of the entire page (0 → 1)
  const { scrollYProgress } = useScroll();

  // Apply spring smoothing for buttery motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // ── Shape 1: Large outer ring — drifts from top-left to bottom-right ──
  const ring1X = useTransform(smoothProgress, [0, 0.5, 1], ['-10vw', '20vw', '60vw']);
  const ring1Y = useTransform(smoothProgress, [0, 0.5, 1], ['-10vh', '30vh', '70vh']);
  const ring1Rotate = useTransform(smoothProgress, [0, 1], [0, 180]);
  const ring1Scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1, 1.3, 0.8, 1.1]);
  const ring1Opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.04, 0.07, 0.03, 0.06, 0.03]);

  // ── Shape 2: Medium ring — moves right to left ──
  const ring2X = useTransform(smoothProgress, [0, 0.4, 0.8, 1], ['80vw', '50vw', '20vw', '5vw']);
  const ring2Y = useTransform(smoothProgress, [0, 0.5, 1], ['60vh', '20vh', '80vh']);
  const ring2Rotate = useTransform(smoothProgress, [0, 1], [0, -240]);
  const ring2Opacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.03, 0.05, 0.02, 0.04]);

  // ── Shape 3: Small spinning diamond — bounces diagonally ──
  const diamond1X = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['70vw', '30vw', '60vw', '15vw', '45vw']);
  const diamond1Y = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['10vh', '50vh', '20vh', '70vh', '40vh']);
  const diamond1Rotate = useTransform(smoothProgress, [0, 1], [45, 405]);
  const diamond1Opacity = useTransform(smoothProgress, [0, 0.15, 0.35, 0.55, 0.75, 1], [0, 0.06, 0.02, 0.07, 0.01, 0.05]);

  // ── Shape 4: Gradient orb — floats up while scrolling ──
  const orb1X = useTransform(smoothProgress, [0, 0.5, 1], ['15vw', '45vw', '75vw']);
  const orb1Y = useTransform(smoothProgress, [0, 0.5, 1], ['80vh', '30vh', '10vh']);
  const orb1Scale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.8, 1.5, 0.7, 1.2]);
  const orb1Opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.02, 0.04, 0.02, 0.03, 0.02]);

  // ── Shape 5: Second orb — sinks down ──
  const orb2X = useTransform(smoothProgress, [0, 0.5, 1], ['60vw', '25vw', '50vw']);
  const orb2Y = useTransform(smoothProgress, [0, 0.5, 1], ['10vh', '60vh', '85vh']);
  const orb2Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.2, 0.7, 1.4]);
  const orb2Opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.03, 0.015, 0.04, 0.02]);

  // ── Shape 6: Thin dashed ring — rotates and drifts center ──
  const ring3X = useTransform(smoothProgress, [0, 0.5, 1], ['40vw', '10vw', '55vw']);
  const ring3Y = useTransform(smoothProgress, [0, 0.5, 1], ['40vh', '65vh', '25vh']);
  const ring3Rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const ring3Opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.01, 0.04, 0.01, 0.03, 0.02]);

  // ── Shape 7: Cross / plus sign ──
  const crossX = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ['5vw', '55vw', '25vw', '80vw']);
  const crossY = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ['80vh', '15vh', '65vh', '30vh']);
  const crossRotate = useTransform(smoothProgress, [0, 1], [0, 270]);
  const crossOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.7, 1], [0, 0.05, 0.01, 0.04, 0.02]);

  // ── Shape 8: Small scattered dots cluster ──
  const dots1X = useTransform(smoothProgress, [0, 0.5, 1], ['85vw', '40vw', '10vw']);
  const dots1Y = useTransform(smoothProgress, [0, 0.5, 1], ['30vh', '70vh', '20vh']);
  const dots1Opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 1], [0.02, 0.06, 0.01, 0.05]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ── Large outer ring ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: ring1X,
          y: ring1Y,
          rotate: ring1Rotate,
          scale: ring1Scale,
          opacity: ring1Opacity,
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1.5px solid #6366f1',
          boxShadow: '0 0 60px rgba(99,102,241,0.15), inset 0 0 60px rgba(99,102,241,0.05)',
        }}
      />

      {/* ── Inner secondary ring inside shape 1 ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: ring1X,
          y: ring1Y,
          rotate: ring1Rotate,
          scale: ring1Scale,
          opacity: ring1Opacity,
          width: 500,
          height: 500,
          marginLeft: 80,
          marginTop: 80,
          borderRadius: '50%',
          border: '1px dashed rgba(99,102,241,0.4)',
        }}
      />

      {/* ── Medium ring ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: ring2X,
          y: ring2Y,
          rotate: ring2Rotate,
          opacity: ring2Opacity,
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '1.5px solid #06b6d4',
          boxShadow: '0 0 40px rgba(6,182,212,0.12)',
        }}
      />

      {/* ── Spinning diamond ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: diamond1X,
          y: diamond1Y,
          rotate: diamond1Rotate,
          opacity: diamond1Opacity,
          width: 120,
          height: 120,
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 0 30px rgba(139,92,246,0.15)',
        }}
      />

      {/* ── Gradient orb 1 (floats up) ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: orb1X,
          y: orb1Y,
          scale: orb1Scale,
          opacity: orb1Opacity,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #6366f1, #8b5cf6, transparent)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Gradient orb 2 (sinks down) ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: orb2X,
          y: orb2Y,
          scale: orb2Scale,
          opacity: orb2Opacity,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 60%, #06b6d4, #0891b2, transparent)',
          filter: 'blur(55px)',
        }}
      />

      {/* ── Thin dashed ring ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: ring3X,
          y: ring3Y,
          rotate: ring3Rotate,
          opacity: ring3Opacity,
          width: 240,
          height: 240,
          borderRadius: '50%',
          border: '1px dashed rgba(6,182,212,0.5)',
        }}
      />

      {/* ── Cross/plus shape ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: crossX,
          y: crossY,
          rotate: crossRotate,
          opacity: crossOpacity,
        }}
      >
        {/* Horizontal bar */}
        <div style={{
          position: 'absolute',
          width: 60,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #818cf8, transparent)',
          top: 29,
          left: 0,
        }} />
        {/* Vertical bar */}
        <div style={{
          position: 'absolute',
          width: 2,
          height: 60,
          background: 'linear-gradient(180deg, transparent, #818cf8, transparent)',
          left: 29,
          top: 0,
        }} />
      </motion.div>

      {/* ── Dot cluster ── */}
      <motion.div
        style={{
          position: 'absolute',
          x: dots1X,
          y: dots1Y,
          opacity: dots1Opacity,
        }}
      >
        {[
          { dx: 0,  dy: 0,  size: 6, color: '#6366f1' },
          { dx: 20, dy: 10, size: 4, color: '#06b6d4' },
          { dx: -10,dy: 20, size: 5, color: '#8b5cf6' },
          { dx: 30, dy: 25, size: 3, color: '#6366f1' },
          { dx: -5, dy: 35, size: 4, color: '#06b6d4' },
          { dx: 40, dy: 5,  size: 3, color: '#8b5cf6' },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dot.dx,
              top: dot.dy,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              background: dot.color,
              boxShadow: `0 0 8px ${dot.color}`,
            }}
          />
        ))}
      </motion.div>

      {/* ── Corner accent lines (static, subtle) ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        opacity: 0.06,
        background:
          'linear-gradient(135deg, rgba(99,102,241,0.4) 1px, transparent 1px) 0 0 / 30px 30px',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 200,
        height: 200,
        opacity: 0.06,
        background:
          'linear-gradient(135deg, rgba(6,182,212,0.4) 1px, transparent 1px) 0 0 / 30px 30px',
      }} />
    </div>
  );
}
