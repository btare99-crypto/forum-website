import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Fixed gradient scroll progress bar at the top of the viewport
 */
export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
