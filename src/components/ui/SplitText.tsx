import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ReactNode } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  renderWord?: (word: string, index: number) => ReactNode;
}

export function SplitText({ children, className = '', delay = 0, renderWord }: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = children.split(' ');

  if (reduced) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {renderWord
          ? words.map((word, i) => (
              <span key={i}>
                {renderWord(word, i)}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))
          : children}
      </motion.span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {renderWord ? renderWord(word, i) : word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
