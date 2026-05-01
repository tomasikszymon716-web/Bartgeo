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

const EASE = [0.22, 1, 0.36, 1] as const;

export function PrivacyMobile() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionKey>('admin');
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const pillRefs = useRef<Partial<Record<SectionKey, HTMLButtonElement | null>>>({});
  const tocScrollerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-spy — direct scroll listener, picks section nearest to hotspot ── */
  useEffect(() => {
    const update = () => {
      const hotspot = window.innerHeight * 0.32;
      let best: SectionKey = 'admin';
      let bestDist = Infinity;

      sectionKeys.forEach((key) => {
        const el = sectionRefs.current[key];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const topDist = Math.abs(rect.top - hotspot);
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (inView && topDist < bestDist) {
          bestDist = topDist;
          best = key;
        }
      });

      setActiveSection((prev) => (prev === best ? prev : best));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  /* ── Auto-center active pill in horizontal TOC ── */
  useEffect(() => {
    const pill = pillRefs.current[activeSection];
    const scroller = tocScrollerRef.current;
    if (!pill || !scroller) return;

    const pillRect = pill.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const offset = pillRect.left - scrollerRect.left + pillRect.width / 2 - scrollerRect.width / 2;

    scroller.scrollTo({ left: scroller.scrollLeft + offset, behavior: 'smooth' });
  }, [activeSection]);

  const scrollTo = (key: SectionKey) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    // Sticky TOC is ~56px (from top 60px of nav+pills); leave extra breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
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

      <main className="pt-20 pb-20 md:max-w-[760px] md:mx-auto">
        <div className="px-6 md:px-8">
          {/* ── Page header ── */}
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="pt-6 pb-6 border-b border-[var(--color-line)]"
          >
            <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--color-gold)] uppercase mb-3 block">
              BartGeo · Dokument prawny
            </span>

            <h1 className="font-display font-bold text-[clamp(28px,8vw,36px)] leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)] mb-5">
              {t('privacy.title')}
            </h1>

            {/* Meta chips */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[12px] text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                {t('privacy.updated')} <span className="text-[var(--color-graphite-soft)] font-medium">{LAST_UPDATED}</span>
              </span>
              <span className="text-[var(--color-line-strong)]">·</span>
              <span>{t('privacy.sections_count', { count: sectionKeys.length })}</span>
              <span className="text-[var(--color-line-strong)]">·</span>
              <span>{t('privacy.read_time')}</span>
            </div>
          </motion.header>
        </div>

        {/* ── Sticky horizontal TOC ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="sticky top-[68px] z-30 bg-[var(--color-bg)]/92 backdrop-blur-md border-b border-[var(--color-line)]"
        >
          <div
            ref={tocScrollerRef}
            className="flex items-center gap-2 overflow-x-auto px-6 md:px-8 py-3 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {sectionKeys.map((key, i) => {
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  ref={(el) => { pillRefs.current[key] = el; }}
                  onClick={() => scrollTo(key)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium whitespace-nowrap"
                  style={{
                    backgroundColor: isActive ? 'var(--color-gold-tint)' : 'transparent',
                    borderColor: isActive ? 'var(--color-gold)' : 'var(--color-line)',
                    color: isActive ? 'var(--color-ink)' : 'var(--color-muted)',
                    transition: 'background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full font-mono text-[9px] font-semibold tabular-nums"
                    style={{
                      backgroundColor: isActive ? 'var(--color-gold)' : 'var(--color-line)',
                      color: isActive ? '#fff' : 'var(--color-muted)',
                      transition: 'background-color 0.25s ease, color 0.25s ease',
                    }}
                  >
                    {i + 1}
                  </span>
                  {stripNumber(t(`privacy.sections.${key}_title`))}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div className="px-6 md:px-8">
          {sectionKeys.map((key, i) => {
            const isActive = activeSection === key;
            return (
              <motion.section
                key={key}
                ref={(el) => { sectionRefs.current[key] = el; }}
                id={`privacy-${key}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative py-8 border-b border-[var(--color-line)] last:border-0"
              >
                {/* Gold accent bar — active section */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-hi))',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scaleY(1)' : 'scaleY(0.25)',
                    transformOrigin: 'center',
                    transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.33,1,0.68,1)',
                  }}
                />

                <div className="pl-4">
                  {/* Header row — number + title */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-mono font-bold tabular-nums leading-none shrink-0"
                      style={{
                        fontSize: isActive ? '22px' : '18px',
                        color: isActive ? 'var(--color-gold)' : 'var(--color-line-strong)',
                        transition: 'font-size 0.4s ease, color 0.4s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display font-semibold text-[17px] leading-[1.25] tracking-[-0.01em] text-[var(--color-ink)] flex-1">
                      {stripNumber(t(`privacy.sections.${key}_title`))}
                    </h2>
                  </div>

                  <p className="text-[14.5px] leading-[1.8] text-[var(--color-graphite-soft)] whitespace-pre-line">
                    {t(`privacy.sections.${key}_text`)}
                  </p>
                  {key === 'cookies' && (
                    <button
                      type="button"
                      onClick={resetConsent}
                      className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-gold-tint)] active:bg-[var(--color-gold)]/25 text-[var(--color-ink)] font-mono text-[10px] tracking-[0.18em] uppercase transition-colors cursor-pointer"
                    >
                      <Settings2 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      {t('cookies.reopen')}
                    </button>
                  )}
                </div>
              </motion.section>
            );
          })}

          {/* Back to top */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-line-strong)] text-[12px] font-medium text-[var(--color-muted)] active:text-[var(--color-gold)] active:border-[var(--color-gold)] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Wróć na górę
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
