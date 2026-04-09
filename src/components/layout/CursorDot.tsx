import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

export function CursorDot() {
  const isMobile = useIsMobile();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 500, damping: 28 });
  const springY = useSpring(y, { stiffness: 500, damping: 28 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (isMobile) return;

    document.documentElement.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 4);
      y.set(e.clientY - 4);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        scale.set(3);
      }
    };

    const out = () => {
      scale.set(1);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [isMobile, x, y, scale]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-gold)] pointer-events-none z-[10001] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        opacity: 0.8,
      }}
    />
  );
}
