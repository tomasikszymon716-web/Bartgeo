import { useTranslation } from 'react-i18next';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { navItems } from '../../data/nav';
import { LangSwitcher } from './LangSwitcher';
import { Button } from '../ui/Button';

export function NavbarDesktop() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-b ${
        scrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-[20px] border-[var(--color-line)] shadow-[0_1px_12px_rgba(0,0,0,0.04)]'
          : 'bg-transparent backdrop-blur-0 border-transparent shadow-none'
      }`}
    >
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between px-10 py-5" aria-label="Main navigation">
        <a href="#hero" className="flex items-center gap-2.5">
          <img src="/brand/logo-icon.png" alt="BartGeo" className="h-10 w-10 object-contain" />
          <span className="text-[22px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <span className="italic text-[var(--color-gold)]">Bart</span>
            <span className="text-[var(--color-graphite)]">Geo</span>
          </span>
        </a>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[0.02em] text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors relative group"
            >
              {t(item.labelKey)}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LangSwitcher />
          <Button variant="primary" href="#kontakt" className="py-3 px-6 text-xs">
            {t('nav.cta')}
          </Button>
        </div>
      </nav>
    </header>
  );
}
