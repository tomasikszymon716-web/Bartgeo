import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface HighlightProps {
  children: ReactNode;
  delay?: number;
}

export function Highlight({ children, delay = 2.2 }: HighlightProps) {
  return (
    <span className="relative inline-block">
      <motion.span
        className="absolute inset-0 bg-[var(--color-gold-tint)] -z-10 rounded-sm origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }}
      />
      {children}
    </span>
  );
}
