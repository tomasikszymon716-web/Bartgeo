import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/nav';
import { useLockBody } from '../../hooks/useLockBody';
import { Button } from '../ui/Button';
import { company } from '../../data/company';
import { useNavLink } from '../../lib/useNavLink';

export function NavbarMobile() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const navTo = useNavLink();
  useLockBody(open);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[var(--color-bg)]/90 backdrop-blur-[20px] border-b border-[var(--color-line)]">
        <nav className="flex items-center justify-between px-6 py-4" aria-label="Main navigation">
          <a href="#hero" onClick={(e) => { e.preventDefault(); navTo('#hero'); }} className="flex items-center gap-2">
            <img src="/brand/logo-icon.png" alt="BartGeo logo" className="h-8 w-8 object-contain" />
            <span className="text-[18px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              <span className="italic text-[var(--color-gold)]">Bart</span>
              <span className="italic text-[var(--color-graphite)]">Geo</span>
            </span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer -mr-1"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-[22px] h-[1.5px] rounded-full bg-[var(--color-ink)]"
              animate={open ? { rotate: 45, y: 3.75 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block w-[22px] h-[1.5px] rounded-full bg-[var(--color-ink)]"
              animate={open ? { rotate: -45, y: -3.75 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] bg-[var(--color-bg)] flex flex-col pt-24 px-8 pb-10"
          >
            {/* Navigation links */}
            <nav className="flex flex-col gap-1 mb-auto">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => navTo(item.href), 100); }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 py-3"
                >
                  <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--color-gold)] opacity-50 group-active:opacity-100 transition-opacity">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display font-bold text-[32px] tracking-[-0.02em] text-[var(--color-ink)] group-active:text-[var(--color-gold)] transition-colors">
                    {t(item.labelKey)}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button variant="primary" href="#kontakt" onClick={() => setOpen(false)} className="w-full mb-6">
                {t('nav.cta')}
              </Button>
            </motion.div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-end justify-between"
            >
              <div className="flex flex-col gap-1.5 text-[13px] text-[var(--color-muted)]">
                <a href={`tel:${company.phoneRaw}`} className="active:text-[var(--color-gold)] transition-colors">
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="active:text-[var(--color-gold)] transition-colors">
                  {company.email}
                </a>
              </div>

              {/* Language switcher */}
              <div className="flex items-center gap-3">
                {(['pl', 'en', 'de'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => i18n.changeLanguage(code)}
                    className={`text-[12px] font-semibold tracking-[0.06em] cursor-pointer transition-colors ${
                      i18n.language === code
                        ? 'text-[var(--color-gold)]'
                        : 'text-[var(--color-muted)] active:text-[var(--color-gold)]'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
