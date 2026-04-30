import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag } from '../ui/Flag';

const langs = [
  { code: 'pl', label: 'PL', name: 'Polski',  flag: 'PL' as const },
  { code: 'en', label: 'EN', name: 'English', flag: 'EN' as const },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: 'DE' as const },
] as const;

type Lang = (typeof langs)[number];

export function LangSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current: Lang = langs.find((l) => l.code === i18n.language) ?? langs[0];

  /* ── Variant tokens ─────────────────────────────────────────────────────── */
  const isLight = variant === 'light';
  const triggerText   = isLight ? 'text-[var(--color-bg)]' : 'text-[var(--color-ink)]';
  const triggerHover  = isLight ? 'hover:bg-white/10'      : 'hover:bg-[var(--color-bg-alt)]';
  const dropBg        = isLight ? 'bg-[var(--color-graphite)]' : 'bg-[var(--color-card)]';
  const dropBorder    = isLight ? 'border-white/10' : 'border-[var(--color-line)]';
  const itemText      = isLight ? 'text-white/85' : 'text-[var(--color-ink)]';
  const itemMuted     = isLight ? 'text-white/45' : 'text-[var(--color-muted)]';
  const itemHover     = isLight ? 'hover:bg-white/[0.06]' : 'hover:bg-[var(--color-gold-tint)]';
  const itemActiveBg  = isLight ? 'bg-white/[0.08]' : 'bg-[var(--color-gold-tint)]';

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', escHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escHandler);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] cursor-pointer pl-2 pr-2.5 py-1.5 rounded-lg transition-colors ${triggerText} ${triggerHover}`}
      >
        <Flag code={current.flag} size={{ w: 20, h: 14 }} />
        <span className="leading-none">{current.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isLight ? 'text-white/60' : 'text-[var(--color-muted)]'}`}
        />
      </button>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className={`absolute top-full right-0 mt-2 ${dropBg} border ${dropBorder} rounded-xl overflow-hidden z-50 min-w-[170px] py-1.5`}
            style={{
              boxShadow: isLight
                ? '0 12px 40px -12px rgba(0,0,0,0.5)'
                : '0 12px 40px -12px rgba(45,64,87,0.2)',
              transformOrigin: 'top right',
            }}
          >
            {langs.map((l) => {
              const isActive = l.code === i18n.language;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    i18n.changeLanguage(l.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 cursor-pointer transition-colors ${itemHover} ${
                    isActive ? itemActiveBg : ''
                  }`}
                >
                  <Flag code={l.flag} size={{ w: 22, h: 15 }} />
                  <span className={`text-[13px] font-semibold tracking-[0.02em] ${itemText}`}>
                    {l.label}
                  </span>
                  <span className={`flex-1 text-[12px] ${itemMuted}`}>{l.name}</span>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <path
                        d="M3 8.5l3.5 3.5 6.5-7"
                        stroke="var(--color-gold)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
