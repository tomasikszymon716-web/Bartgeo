import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useNavLink } from '../../lib/useNavLink';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
  href?: string;
}

export function Button({ variant = 'primary', children, className = '', href, ...props }: ButtonProps) {
  const magnetic = useMagnetic();
  const navTo = useNavLink();

  const base = 'inline-flex items-center justify-center rounded-full py-3.5 px-7 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer';
  const variants = {
    primary: 'bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-hi)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)] active:scale-[0.98]',
    ghost: 'border border-[var(--color-graphite)] text-[var(--color-graphite)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] hover:border-[var(--color-ink)] active:scale-[0.98]',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const handleClick = href.startsWith('#')
      ? (e: React.MouseEvent) => { e.preventDefault(); navTo(href); }
      : undefined;

    return (
      <motion.a
        ref={magnetic.ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={handleClick}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={magnetic.onMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={magnetic.onMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>}
      className={cls}
      {...props}
    >
      {children}
    </motion.button>
  );
}
