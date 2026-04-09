import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'line' | 'exit' | 'done'>('line');

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[var(--color-bg)] flex flex-col items-center justify-center"
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (phase === 'exit') setPhase('done');
          }}
        >
          <motion.img
            src="/brand/logo-icon.png"
            alt="BartGeo"
            className="h-20 w-auto mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="font-display font-extrabold text-[56px] text-[var(--color-ink)] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            BartGeo
          </motion.span>
          <motion.div
            className="h-px bg-[var(--color-gold)] mt-4"
            initial={{ width: 0 }}
            animate={{ width: 240 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            onAnimationComplete={() => setPhase('exit')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
