import { useState } from 'react';

/**
 * Lightweight, high-performance 3D hover-tilt card effect wrapper
 */
export default function Tilt({ children, className = '' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within element
    const y = e.clientY - rect.top;  // y coordinate within element
    
    // Set custom CSS variables for spotlight effects in children
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max ~8 degrees
    const rotateYValue = ((x - centerX) / centerX) * 8;
    const rotateXValue = ((centerY - y) / centerY) * 8;

    setRotateY(rotateYValue);
    setRotateX(rotateXValue);
  };

  const handleMouseLeave = () => {
    // Reset to center
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
