import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Marquee({ children, duration = 30, className = '' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  /* Pause the linear infinite animation when the marquee is offscreen.
     A continuous transform animation otherwise keeps the compositor
     awake and burns CPU on tablets even when the user is on a
     completely different section of the page. */
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max hover:[animation-play-state:paused]"
        animate={inView ? { x: ['0%', '-50%'] } : { x: '0%' }}
        transition={
          inView
            ? { duration, repeat: Infinity, ease: 'linear' }
            : { duration: 0 }
        }
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
