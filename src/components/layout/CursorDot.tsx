import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

/* SVG host is intentionally larger than the visible dot so transform: scale()
   stays in the SVG vector space — the circle is rasterized fresh on every
   transform, instead of stretching a cached 8px bitmap and pixelating on
   high-DPI / large monitors. */
const SVG = 32;
const HALF = SVG / 2;
const DOT_R = 4;

/* Detect a true fine-pointer device. iPad in landscape lands in the
   "desktop" tier by viewport width (>=1280) but is still a touch device,
   so we additionally gate on the hover/pointer media features — only
   render the cursor dot when the OS reports a hover-capable, fine
   pointer. */
function detectFinePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function CursorDot() {
  const isMobile = useIsMobile();
  const [hasFinePointer, setHasFinePointer] = useState(detectFinePointer);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 500, damping: 28 });
  const springY = useSpring(y, { stiffness: 500, damping: 28 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHasFinePointer(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const disabled = isMobile || !hasFinePointer;

  useEffect(() => {
    if (disabled) return;

    document.documentElement.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      x.set(e.clientX - HALF);
      y.set(e.clientY - HALF);
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

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseout', out, { passive: true });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [disabled, x, y, scale]);

  if (disabled) return null;

  return (
    <motion.svg
      width={SVG}
      height={SVG}
      viewBox={`0 0 ${SVG} ${SVG}`}
      className="fixed top-0 left-0 pointer-events-none z-[10001] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        opacity: 0.8,
        willChange: 'transform',
        transformOrigin: 'center center',
      }}
      aria-hidden
    >
      <circle cx={HALF} cy={HALF} r={DOT_R} fill="var(--color-gold)" />
    </motion.svg>
  );
}
