import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  center?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, heading, description, center = false, id }: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const align = center ? 'text-center' : '';

  return (
    <div className={align}>
      <motion.p
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-gold)] mb-5 uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="font-display font-bold text-[clamp(28px,3vw,42px)] tracking-[-0.025em] leading-[1.15] text-[var(--color-ink)]"
      >
        {heading}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-[clamp(17px,1.3vw,20px)] leading-[1.55] tracking-[-0.01em] text-[var(--color-graphite-soft)] max-w-[560px]"
          style={center ? { margin: '1.5rem auto 0' } : undefined}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
