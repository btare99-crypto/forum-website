import { useState, useEffect } from 'react';

/**
 * Tracks the mouse cursor position for custom cursor effects
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const el = e.target;
      const pointer = window.getComputedStyle(el).cursor === 'pointer';
      setIsPointer(pointer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return { mousePosition, isPointer };
}
