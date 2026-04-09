import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface CounterProps {
  to: number;
  duration?: number;
  className?: string;
  separator?: string;
}

export function Counter({ to, duration = 2.4, className = '', separator = ' ' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString('pl-PL').replace(/\u00a0/g, separator));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, motionVal, separator]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
