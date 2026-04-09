import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-[var(--color-card)] rounded-[20px] border border-[var(--color-line)] shadow-[var(--shadow-card)] ${className}`}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
