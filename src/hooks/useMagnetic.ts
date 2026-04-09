import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

const MAGNETIC_RADIUS = 12;

export function useMagnetic() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const clampedX = Math.max(-MAGNETIC_RADIUS, Math.min(MAGNETIC_RADIUS, dx * 0.3));
      const clampedY = Math.max(-MAGNETIC_RADIUS, Math.min(MAGNETIC_RADIUS, dy * 0.3));
      x.set(clampedX);
      y.set(clampedY);
    },
    [prefersReduced, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
