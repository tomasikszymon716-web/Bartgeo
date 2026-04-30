import { motion, useScroll } from 'framer-motion';

/**
 * Scroll progress bar — uses transform: scaleX (GPU compositor)
 * instead of width (paint+layout). Makes the bar advance smoothly
 * even on Windows mouse-wheel scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--color-gold)] z-[101] origin-left"
      style={{ scaleX: scrollYProgress, willChange: 'transform' }}
    />
  );
}
