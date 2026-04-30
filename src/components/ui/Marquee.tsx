import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Marquee({ children, duration = 30, className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max hover:[animation-play-state:paused]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
