import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const langs = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
] as const;

export function LangSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = langs.find((l) => l.code === i18n.language) ?? langs[0];
  const textColor = variant === 'light' ? 'text-[var(--color-bg)]' : 'text-[var(--color-ink)]';
  const hoverBg = variant === 'light' ? 'hover:bg-white/10' : 'hover:bg-[var(--color-bg-alt)]';
  const dropBg = variant === 'light' ? 'bg-[var(--color-graphite)]' : 'bg-[var(--color-card)]';
  const dropBorder = variant === 'light' ? 'border-white/10' : 'border-[var(--color-line)]';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium ${textColor} cursor-pointer px-2 py-1 rounded-lg ${hoverBg} transition-colors`}
        aria-label="Change language"
      >
        {current.label}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full right-0 mt-2 ${dropBg} border ${dropBorder} rounded-xl shadow-[var(--shadow-card)] overflow-hidden z-50 min-w-[72px]`}
          >
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium ${textColor} ${hoverBg} transition-colors cursor-pointer ${
                  l.code === i18n.language ? 'text-[var(--color-gold)]' : ''
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
