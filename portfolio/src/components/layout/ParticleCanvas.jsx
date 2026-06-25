import { useEffect, useRef } from 'react';

/**
 * SpaceCanvas — immersive space background.
 *
 * Layers (back → front):
 *  1. Deep star field  — 200 tiny distant stars, slow twinkle
 *  2. Mid star field   — 80 medium stars, faster pulse
 *  3. Nebula clouds    — 6 large soft radial blobs (indigo / cyan / violet)
 *  4. Constellation net— lines connecting nearby bright stars
 *  5. Shooting stars   — random streaks across the sky
 *  6. Mouse aura       — stars near cursor glow & grow
 */

/* ─── Helpers ─────────────────────────────────────────────── */
const rand  = (min, max) => min + Math.random() * (max - min);
const randI = (min, max) => Math.floor(rand(min, max));

const NEBULA_COLORS = [
  [99,  102, 241],  // indigo
  [139, 92,  246],  // violet
  [6,   182, 212],  // cyan
  [16,  185, 129],  // emerald
  [167, 139, 250],  // lavender
];

/* ─── Star factory ────────────────────────────────────────── */
function makeStar(canvas, layer) {
  const isDeep = layer === 'deep';
  const rRoll = Math.random();
  let color = [255, 255, 255]; // pure white
  if (rRoll < 0.15) {
    color = [186, 230, 253]; // ice blue
  } else if (rRoll < 0.25) {
    color = [253, 224, 71];  // golden yellow
  } else if (rRoll < 0.32) {
    color = [253, 186, 116]; // warm orange
  } else if (rRoll < 0.40) {
    color = [196, 181, 253]; // soft violet/lavender
  } else if (rRoll < 0.48) {
    color = [167, 243, 252]; // cyan tinted
  }

  const superBright = layer === 'mid' && Math.random() < 0.15;

  return {
    x:          rand(0, canvas.width),
    y:          rand(0, canvas.height),
    r:          isDeep ? rand(0.4, 1.1) : rand(1.0, 2.5),
    baseOpacity: isDeep ? rand(0.25, 0.6) : rand(0.5, 0.95),
    opacity:    0,
    phase:      rand(0, Math.PI * 2),
    speed:      isDeep ? rand(0.006, 0.016) : rand(0.014, 0.036),
    color,
    bright:     layer === 'mid' && Math.random() < 0.25, // constellation candidates
    superBright,
  };
}

/* ─── Shooting star factory ───────────────────────────────── */
function makeShooter(canvas) {
  // Pick a random border to spawn at and shoot inwards
  const edge = Math.floor(Math.random() * 4);
  let x, y, angle;
  const speed = rand(4.5, 9.5);
  
  if (edge === 0) { // left
    x = -50;
    y = rand(0, canvas.height);
    angle = rand(-Math.PI / 4, Math.PI / 4); // mostly rightwards
  } else if (edge === 1) { // right
    x = canvas.width + 50;
    y = rand(0, canvas.height);
    angle = rand(3 * Math.PI / 4, 5 * Math.PI / 4); // mostly leftwards
  } else if (edge === 2) { // top
    x = rand(0, canvas.width);
    y = -50;
    angle = rand(Math.PI / 4, 3 * Math.PI / 4); // mostly downwards
  } else { // bottom
    x = rand(0, canvas.width);
    y = canvas.height + 50;
    angle = rand(-3 * Math.PI / 4, -Math.PI / 4); // mostly upwards
  }

  return {
    x,
    y,
    vx:   Math.cos(angle) * speed,
    vy:   Math.sin(angle) * speed,
    speed,
    len:  rand(160, 340),
    life: 1,           // 1 → 0
    decay: rand(0.005, 0.012),
    width: rand(1, 2.2),
    hue:  Math.random() < 0.33 ? [99,182,241] : Math.random() < 0.66 ? [167,139,250] : [255,255,255],
  };
}

/* ─── Nebula factory ──────────────────────────────────────── */
function makeNebula(canvas) {
  const [r, g, b] = NEBULA_COLORS[randI(0, NEBULA_COLORS.length)];
  return {
    x:     rand(0, canvas.width),
    y:     rand(0, canvas.height),
    rx:    rand(120, 300),
    ry:    rand(80, 200),
    color: [r, g, b],
    opacity: rand(0.004, 0.012),
    phase: rand(0, Math.PI * 2),
    speed: rand(0.003, 0.007),
    drift: { x: (Math.random() - 0.5) * 0.08, y: (Math.random() - 0.5) * 0.04 },
  };
}

/* ─── Component ───────────────────────────────────────────── */
export default function SpaceCanvas() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const frame     = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    let isMobile = window.innerWidth < 768;

    /* resize */
    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      if (isMobile) {
        mouse.current = { x: -9999, y: -9999 };
      }
    }
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = e => {
      if (isMobile) {
        mouse.current = { x: -9999, y: -9999 };
        return;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    /* ── scroll tracking ── */
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollVelocity = 0;
    let targetScrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const dy = currentScrollY - lastScrollY;
      const dt = Math.max(currentTime - lastScrollTime, 1);
      targetScrollVelocity = dy / dt;
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ── click tracking (star birth) ── */
    const clickStars = [];

    function makeClickStar(x, y) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(2.5, 7.5);
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(1.2, 3.5),
        color: Math.random() < 0.5 ? [99, 102, 241] : [6, 182, 212], // indigo or cyan
        life: 1.0,
        decay: rand(0.015, 0.035),
      };
    }

    const handleCanvasClick = e => {
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      
      const count = isMobile ? randI(5, 10) : randI(15, 25);
      for (let i = 0; i < count; i++) {
        clickStars.push(makeClickStar(clientX, clientY));
      }
    };
    window.addEventListener('mousedown', handleCanvasClick);

    /* seed objects */
    const deepStars  = Array.from({ length: 260 }, () => makeStar(canvas, 'deep'));
    const midStars   = Array.from({ length: 100  }, () => makeStar(canvas, 'mid'));
    const nebulae    = Array.from({ length: 6   }, () => makeNebula(canvas));
    const shooters   = [];
    let   shootTimer = 0;

    /* ── draw nebula ── */
    function drawNebula(n) {
      n.phase += n.speed;
      const pulse = 1 + 0.06 * Math.sin(n.phase);
      const op    = n.opacity * (0.85 + 0.15 * Math.sin(n.phase * 0.7));

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.scale(n.rx * pulse / 100, n.ry * pulse / 100);

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
      grad.addColorStop(0,    `rgba(${n.color.join(',')},${op})`);
      grad.addColorStop(0.45, `rgba(${n.color.join(',')},${op * 0.4})`);
      grad.addColorStop(1,    `rgba(${n.color.join(',')},0)`);

      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      n.x += n.drift.x;
      n.y += n.drift.y;
      if (n.x < -n.rx) n.x = canvas.width + n.rx;
      if (n.x > canvas.width + n.rx) n.x = -n.rx;
      if (n.y < -n.ry) n.y = canvas.height + n.ry;
      if (n.y > canvas.height + n.ry) n.y = -n.ry;
    }

    /* ── draw star ── */
    function drawStar(s) {
      s.phase += s.speed;
      s.opacity = s.baseOpacity * (0.45 + 0.55 * Math.sin(s.phase));

      /* mouse proximity boost */
      const dx   = s.x - mouse.current.x;
      const dy   = s.y - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let boost = 1, rBoost = 1;
      if (dist < 180) {
        const t = 1 - dist / 180;
        boost  = 1 + t * 2.8;
        rBoost = 1 + t * 1.5;
      }

      const op = Math.min(s.opacity * boost, 1);
      const r  = s.r * rBoost;
      const [cr, cg, cb] = s.color;

      /* glow halo */
      if (r > 0.8 || s.superBright) {
        const glowRadius = s.superBright ? r * 8 : r * 4.5;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${op * 0.45})`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${op * 0.15})`);
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      /* Warp stretching */
      const stretch = scrollVelocity * 16;

      if (Math.abs(stretch) > 1.5) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - stretch);

        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y - stretch);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${op})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = r;
        ctx.lineCap = 'round';
        ctx.stroke();
      } else {
        /* core */
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${op})`;
        ctx.fill();
      }

      /* beautiful cross lens flare on super bright stars */
      if (s.superBright && Math.abs(stretch) <= 1.5) {
        const fLen = r * (3.5 + 2.5 * Math.sin(s.phase * 1.5));
        ctx.save();
        ctx.globalAlpha = op * 0.55;
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},1)`;
        ctx.lineWidth   = 0.65;
        
        // horizontal flare
        ctx.beginPath();
        ctx.moveTo(s.x - fLen, s.y);
        ctx.lineTo(s.x + fLen, s.y);
        ctx.stroke();

        // vertical flare
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - fLen);
        ctx.lineTo(s.x, s.y + fLen);
        ctx.stroke();

        ctx.restore();
      } else if (s.bright && dist < 200 && Math.abs(stretch) <= 1.5) {
        /* secondary mouse hover cross flare for other bright stars */
        const fLen = r * 4 * (1 - dist / 200);
        ctx.save();
        ctx.globalAlpha = op * 0.4;
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},1)`;
        ctx.lineWidth   = 0.5;
        // horizontal
        ctx.beginPath();
        ctx.moveTo(s.x - fLen, s.y);
        ctx.lineTo(s.x + fLen, s.y);
        ctx.stroke();
        // vertical
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - fLen);
        ctx.lineTo(s.x, s.y + fLen);
        ctx.stroke();
        ctx.restore();
      }
    }

    /* ── draw constellation lines (between bright mid stars) ── */
    const CONST_DIST = 110;
    function drawConstellations() {
      const bright = midStars.filter(s => s.bright);
      for (let i = 0; i < bright.length; i++) {
        for (let j = i + 1; j < bright.length; j++) {
          const a = bright[i], b = bright[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONST_DIST) {
            const op = (1 - d / CONST_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(167,139,250,${op})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Connect stars to the mouse cursor
      const { x: mx, y: my } = mouse.current;
      if (mx > 0 && mx < canvas.width) {
        bright.forEach(s => {
          const dx = s.x - mx;
          const dy = s.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const op = (1 - dist / 140) * 0.22;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(6,182,212,${op})`; // soft cyan link
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      }
    }

    /* ── shooting star ── */
    function drawShooter(s) {
      s.x   += s.vx;
      s.y   += s.vy;
      s.life -= s.decay;

      const tailX = s.x - s.vx * (s.len / s.speed || 6);
      const tailY = s.y - s.vy * (s.len / s.speed || 6);

      const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0,   `rgba(${s.hue.join(',')},${s.life * 0.9})`);
      grad.addColorStop(0.3, `rgba(${s.hue.join(',')},${s.life * 0.4})`);
      grad.addColorStop(1,   `rgba(${s.hue.join(',')},0)`);

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = s.width * s.life;
      ctx.lineCap     = 'round';
      ctx.stroke();

      /* tip glow */
      const gGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
      gGrad.addColorStop(0, `rgba(255,255,255,${s.life * 0.8})`);
      gGrad.addColorStop(1, `rgba(${s.hue.join(',')},0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = gGrad;
      ctx.fill();
    }

    /* ── draw click-created star birth spark ── */
    function drawClickStar(s) {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      const [r, g, b] = s.color;
      const op = Math.max(s.life, 0);

      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
      grad.addColorStop(0, `rgba(${r},${g},${b},${op * 0.7})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
      ctx.fill();
    }

    /* ── mouse aura ── */
    function drawMouseAura() {
      const { x, y } = mouse.current;
      if (x < 0 || x > canvas.width) return;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 120);
      grad.addColorStop(0,   'rgba(99,102,241,0.04)');
      grad.addColorStop(0.5, 'rgba(6,182,212,0.015)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(x, y, 120, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    /* ── main loop ── */
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Damp scroll velocity back to zero
      scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.15;
      targetScrollVelocity *= 0.88;

      /* 1. nebulae */
      nebulae.forEach(drawNebula);

      /* 2. constellation lines & mouse lines */
      drawConstellations();

      /* 3. deep stars */
      deepStars.forEach(drawStar);

      /* 4. mid stars */
      midStars.forEach(drawStar);

      /* 5. shooting stars */
      shootTimer++;
      if (shootTimer > rand(200, 500)) {
        shooters.push(makeShooter(canvas));
        shootTimer = 0;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        drawShooter(shooters[i]);
        if (shooters[i].life <= 0) shooters.splice(i, 1);
      }

      /* 6. click star birth sparks */
      for (let i = clickStars.length - 1; i >= 0; i--) {
        drawClickStar(clickStars[i]);
        if (clickStars[i].life <= 0) clickStars.splice(i, 1);
      }

      /* 7. mouse aura */
      drawMouseAura();

      frame.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleCanvasClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
