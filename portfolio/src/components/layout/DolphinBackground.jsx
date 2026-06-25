import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * DolphinBackground — real PNG dolphin that swims down the page on scroll.
 * Features:
 *  - Scroll-driven vertical descent + sinusoidal horizontal path
 *  - Smooth body bob animation
 *  - Multi-layer glow halo (indigo + cyan)
 *  - Rising bubble trail
 *  - Sparkle particles
 *  - Wake ripple rings
 *  - Shimmer overlay effect
 */

// ── Bubble ──
function Bubble({ delay, offsetX, size }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        right: offsetX,
        top: '40%',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.6), rgba(6,182,212,0.3))',
        border: '1px solid rgba(99,182,241,0.4)',
        backdropFilter: 'blur(2px)',
      }}
      animate={{
        y: [0, -(50 + Math.random() * 40)],
        x: [0, (Math.random() - 0.5) * 18],
        opacity: [0, 0.8, 0],
        scale: [0.4, 1.3, 0.6],
      }}
      transition={{
        duration: 1.6 + Math.random() * 0.8,
        delay,
        repeat: Infinity,
        repeatDelay: 0.8 + Math.random() * 2.5,
        ease: 'easeOut',
      }}
    />
  );
}

// ── Sparkle ──
function Sparkle({ delay, offsetX, offsetY }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: offsetX,
        top: offsetY,
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: '#a5f3fc',
        boxShadow: '0 0 6px 2px rgba(165,243,252,0.8)',
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: 0.9 + Math.random() * 0.6,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2 + Math.random() * 2,
        ease: 'easeInOut',
      }}
    />
  );
}

// ── Wake ring ──
function WakeRing({ delay, size }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: -size / 2,
        top: '50%',
        marginTop: -size / 2,
        width: size,
        height: size / 2,
        borderRadius: '50%',
        border: '1px solid rgba(99,102,241,0.35)',
      }}
      animate={{
        scaleX: [1, 2.5],
        scaleY: [1, 1.8],
        opacity: [0.5, 0],
        x: [-10, -40],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 0.3,
        ease: 'easeOut',
      }}
    />
  );
}

// ── Main ──
export default function DolphinBackground() {
  const { scrollYProgress } = useScroll();

  // Smooth spring
  const smooth = useSpring(scrollYProgress, { stiffness: 38, damping: 18 });

  // Y: top → bottom as page scrolls
  const y = useTransform(smooth, [0, 1], ['0vh', '82vh']);

  // Sinusoidal X path
  const x = useTransform(
    smooth,
    [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1],
    ['68vw', '56vw', '66vw', '48vw', '62vw', '44vw', '60vw', '46vw', '58vw']
  );

  // Tilt to follow sine path
  const rotate = useTransform(
    smooth,
    [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1],
    [12, -12, 10, -14, 11, -13, 10, -12, 11]
  );

  // Fade in quickly, stay, fade at bottom
  const opacity = useTransform(smooth, [0, 0.04, 0.88, 1], [0, 0.82, 0.82, 0.25]);

  // Scale pulse
  const scale = useTransform(smooth, [0, 0.5, 1], [0.88, 1.08, 0.92]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        x,
        y,
        rotate,
        opacity,
        scale,
        zIndex: 1,
        pointerEvents: 'none',
        width: 260,
        height: 260,
      }}
    >
      {/* ── Outer ambient glow ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -60,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.1) 35%, rgba(6,182,212,0.08) 60%, transparent 80%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Inner tight glow ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(167,139,250,0.22) 0%, rgba(6,182,212,0.12) 50%, transparent 75%)',
          filter: 'blur(14px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ── Dolphin image with bob animation ── */}
      <motion.div
        style={{ position: 'relative', width: 260, height: 260 }}
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/dolphin.png"
          alt="Swimming dolphin"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter:
              'drop-shadow(0 0 20px rgba(99,102,241,0.8)) drop-shadow(0 0 50px rgba(6,182,212,0.5)) drop-shadow(0 0 90px rgba(139,92,246,0.35))',
          }}
        />

        {/* Shimmer overlay sweep */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            borderRadius: 8,
          }}
          animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Bubbles (from right / front of dolphin) ── */}
      <div style={{ position: 'absolute', right: -10, top: 0, width: 40, height: 260 }}>
        <Bubble delay={0}   offsetX={5}  size={6} />
        <Bubble delay={0.5} offsetX={15} size={4} />
        <Bubble delay={1.0} offsetX={2}  size={5} />
        <Bubble delay={1.5} offsetX={20} size={3} />
        <Bubble delay={2.2} offsetX={8}  size={7} />
        <Bubble delay={2.8} offsetX={12} size={4} />
      </div>

      {/* ── Sparkles around body ── */}
      <Sparkle delay={0}   offsetX={60}  offsetY={30}  />
      <Sparkle delay={0.7} offsetX={180} offsetY={70}  />
      <Sparkle delay={1.3} offsetX={40}  offsetY={160} />
      <Sparkle delay={1.9} offsetX={200} offsetY={140} />
      <Sparkle delay={2.5} offsetX={120} offsetY={20}  />
      <Sparkle delay={0.4} offsetX={220} offsetY={100} />

      {/* ── Wake rings behind dolphin ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 0, height: '100%' }}>
        <WakeRing delay={0}   size={50} />
        <WakeRing delay={0.5} size={35} />
        <WakeRing delay={1.0} size={22} />
      </div>
    </motion.div>
  );
}
