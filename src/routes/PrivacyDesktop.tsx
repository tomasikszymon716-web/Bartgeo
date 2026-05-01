import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { resetConsent } from '../lib/consent';

const sectionKeys = [
  'admin',
  'purpose',
  'legal',
  'retention',
  'recipients',
  'rights',
  'cookies',
  'transfer',
  'profiling',
  'contact',
] as const;

const LAST_UPDATED = '2026-05-01';

type SectionKey = (typeof sectionKeys)[number];

function stripNumber(title: string) {
  return title.replace(/^\d+\.\s*/, '');
}

export function PrivacyDesktop() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionKey>('admin');
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});

  /* ── Active section tracking ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionKeys.forEach((key) => {
      const el = sectionRefs.current[key];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(key);
          });
        },
        { rootMargin: '-10% 0px -65% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (key: SectionKey) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('privacy.title')} — BartGeo</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-32">
        <div className="max-w-[1100px] mx-auto px-10">

          {/* ── Page header ── */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 pb-10 border-b border-[var(--color-line)]"
          >
            <span className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-gold)] uppercase mb-5 block">
              BartGeo · Dokument prawny
            </span>

            <h1 className="font-display font-bold text-[2.6rem] leading-tight tracking-[-0.03em] text-[var(--color-ink)] mb-8">
              {t('privacy.title')}
            </h1>

            {/* Meta strip */}
            <div className="flex items-center gap-0 pt-6 border-t border-[var(--color-line)] text-[14px] text-[var(--color-muted)]">
              <span>{t('privacy.updated')} <span className="text-[var(--color-graphite-soft)] font-medium">{LAST_UPDATED}</span></span>
              <span className="mx-5 text-[var(--color-line-strong)]">·</span>
              <span>{t('privacy.sections_count', { count: sectionKeys.length })}</span>
              <span className="mx-5 text-[var(--color-line-strong)]">·</span>
              <span>{t('privacy.read_time')}</span>
            </div>
          </motion.header>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-[220px_1fr] gap-16 items-start">

            {/* Sidebar TOC */}
            <motion.aside
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-32"
            >
              <p className="text-[11px] font-semibold tracking-[0.06em] text-[var(--color-muted)] uppercase mb-4 px-3">
                Spis treści
              </p>

              <nav className="space-y-0.5">
                {sectionKeys.map((key, i) => {
                  const isActive = activeSection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => scrollTo(key)}
                      className={`
                        w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-xl
                        transition-all duration-200 group cursor-pointer
                        ${isActive
                          ? 'bg-[var(--color-gold-tint)]'
                          : 'hover:bg-[var(--color-bg-alt)]'
                        }
                      `}
                    >
                      {/* Number badge */}
                      <span className={`
                        shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                        font-mono text-[10px] font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-[var(--color-gold)] text-white'
                          : 'bg-[var(--color-line)] text-[var(--color-muted)] group-hover:bg-[var(--color-line-strong)]'
                        }
                      `}>
                        {i + 1}
                      </span>

                      {/* Title */}
                      <span className={`
                        text-[13px] leading-snug transition-colors duration-200
                        ${isActive
                          ? 'text-[var(--color-ink)] font-medium'
                          : 'text-[var(--color-muted)] group-hover:text-[var(--color-graphite)]'
                        }
                      `}>
                        {stripNumber(t(`privacy.sections.${key}_title`))}
                      </span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="ml-auto shrink-0 w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Back to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-8 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                  <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Wróć na górę
              </button>
            </motion.aside>

            {/* Content */}
            <div>
              {sectionKeys.map((key, i) => {
                const isActive = activeSection === key;
                return (
                  <motion.section
                    key={key}
                    ref={(el) => { sectionRefs.current[key] = el; }}
                    id={`privacy-${key}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="relative py-10 border-b border-[var(--color-line)] last:border-0"
                  >
                    {/* Gold accent bar — mirrors Oferta style */}
                    <div
                      className={`absolute left-0 top-8 bottom-8 w-[3px] rounded-full transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-hi))' }}
                    />

                    <div className="flex items-start gap-6 pl-5">
                      {/* Number — Oferta style */}
                      <span
                        className={`font-mono font-bold tabular-nums leading-none shrink-0 transition-all duration-500 ${
                          isActive
                            ? 'text-[30px] text-[var(--color-gold)] mt-0.5'
                            : 'text-[22px] text-[var(--color-line-strong)] mt-[3px]'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h2 className="font-display font-semibold text-[1.15rem] leading-snug text-[var(--color-ink)] mb-4">
                          {stripNumber(t(`privacy.sections.${key}_title`))}
                        </h2>
                        <p className="text-[15px] leading-[1.85] text-[var(--color-graphite-soft)] whitespace-pre-line">
                          {t(`privacy.sections.${key}_text`)}
                        </p>
                        {key === 'cookies' && (
                          <button
                            type="button"
                            onClick={resetConsent}
                            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold-tint)] hover:bg-[var(--color-gold)]/25 text-[var(--color-ink)] font-mono text-[11px] tracking-[0.18em] uppercase transition-colors cursor-pointer"
                          >
                            <Settings2 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                            {t('cookies.reopen')}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.section>
                );
              })}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
