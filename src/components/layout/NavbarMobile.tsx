import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/nav';
import { useLockBody } from '../../hooks/useLockBody';
import { Button } from '../ui/Button';
import { company } from '../../data/company';

export function NavbarMobile() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  useLockBody(open);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[var(--color-bg)]/90 backdrop-blur-[20px] border-b border-[var(--color-line)]">
        <nav className="flex items-center justify-between px-5 py-4" aria-label="Main navigation">
          <a href="#hero" className="flex items-center">
            <img src="/brand/logo-full.png" alt="BartGeo logo" className="h-8 w-auto" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-[22px] h-px bg-[var(--color-ink)]"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-[22px] h-px bg-[var(--color-ink)]"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
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
            className="fixed inset-0 z-[99] bg-[var(--color-bg)] flex flex-col pt-24 px-8 pb-8"
          >
            <nav className="flex flex-col gap-6 mb-auto">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-4xl text-[var(--color-ink)] hover:text-[var(--color-gold)] active:text-[var(--color-gold)] transition-colors"
                >
                  {t(item.labelKey)}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4 mb-6">
              {(['pl', 'en', 'de'] as const).map((code, idx) => (
                <span key={code}>
                  <button
                    onClick={() => i18n.changeLanguage(code)}
                    className={`text-sm font-medium cursor-pointer ${i18n.language === code ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}`}
                  >
                    {code.toUpperCase()}
                  </button>
                  {idx < 2 && <span className="text-[var(--color-muted)] ml-4">·</span>}
                </span>
              ))}
            </div>

            <Button variant="primary" href="#kontakt" onClick={() => setOpen(false)} className="w-full mb-6">
              {t('nav.cta')}
            </Button>

            <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
              <a href={`tel:${company.phoneRaw}`} className="hover:text-[var(--color-gold)] transition-colors">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="hover:text-[var(--color-gold)] transition-colors">
                {company.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
