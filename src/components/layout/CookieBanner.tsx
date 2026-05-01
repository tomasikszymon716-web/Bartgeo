import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck, BarChart3, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  CONSENT_EVENT,
  acceptAll,
  hasDecided,
  rejectAll,
  setConsent,
  type ConsentRecord,
} from '../../lib/consent';

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  { id: 'essential', icon: ShieldCheck, alwaysOn: true },
  { id: 'analytics', icon: BarChart3, alwaysOn: false },
] as const;

/* Light, quiet card. Cream-paper bg + thin gold hairline so it
   reads as a brand-aware confirmation rather than a popup ad. */

export function CookieBanner() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'banner' | 'manage'>('banner');
  const [analyticsToggle, setAnalyticsToggle] = useState(false);

  useEffect(() => {
    if (hasDecided()) return;
    const timer = window.setTimeout(() => setOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const rec = (e as CustomEvent<ConsentRecord | null>).detail;
      if (rec === null) {
        setView('banner');
        setOpen(true);
      }
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const onAcceptAll = () => {
    acceptAll();
    setOpen(false);
  };

  const onRejectAll = () => {
    rejectAll();
    setOpen(false);
  };

  const onSavePreferences = () => {
    setConsent({ analytics: analyticsToggle });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.985 }}
          transition={{ duration: 0.4, ease: EASE }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-auto sm:right-5 sm:w-[340px] z-[9999] rounded-2xl bg-[var(--color-card)] text-[var(--color-ink)] border border-[var(--color-line)] overflow-hidden"
          style={{ boxShadow: '0 14px 40px -14px rgba(45, 64, 87, 0.22)' }}
        >
          {/* Hairline gold accent — sole brand cue */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/70 to-transparent pointer-events-none" />

          <div className="p-4 sm:p-[18px]">
            {view === 'banner' ? (
              <>
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-gold-tint)] flex items-center justify-center">
                    <Cookie className="w-[15px] h-[15px] text-[var(--color-gold)]" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-0.5">
                      {t('cookies.eyebrow')}
                    </p>
                    <h3
                      id="cookie-title"
                      className="font-display font-bold text-[14.5px] tracking-[-0.01em] leading-tight text-[var(--color-ink)]"
                    >
                      {t('cookies.title')}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={onRejectAll}
                    aria-label={t('cookies.close')}
                    className="shrink-0 -mt-0.5 -mr-0.5 w-7 h-7 rounded-full hover:bg-[var(--color-bg-alt)] text-[var(--color-muted)] hover:text-[var(--color-ink)] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p
                  id="cookie-desc"
                  className="text-[12.5px] leading-[1.55] text-[var(--color-graphite-soft)] mb-3.5"
                >
                  {t('cookies.body_short')}{' '}
                  <a
                    href="/polityka-prywatnosci"
                    className="text-[var(--color-gold)] hover:text-[var(--color-gold-hi)] underline-offset-[3px] hover:underline transition-colors whitespace-nowrap"
                  >
                    {t('cookies.read_more')} →
                  </a>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onRejectAll}
                    className="flex-1 h-9 rounded-lg border border-[var(--color-line-strong)] hover:border-[var(--color-graphite)] hover:bg-[var(--color-bg-alt)] text-[12.5px] font-medium text-[var(--color-graphite)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                  >
                    {t('cookies.reject')}
                  </button>
                  <button
                    type="button"
                    onClick={onAcceptAll}
                    className="flex-1 h-9 rounded-lg bg-[var(--color-gold)] hover:bg-[var(--color-gold-hi)] text-[var(--color-ink)] text-[12.5px] font-semibold transition-colors cursor-pointer"
                  >
                    {t('cookies.accept')}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAnalyticsToggle(false);
                    setView('manage');
                  }}
                  className="mt-2.5 w-full font-mono text-[9.5px] tracking-[0.18em] uppercase text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
                >
                  {t('cookies.manage')}
                </button>
              </>
            ) : (
              <>
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-gold-tint)] flex items-center justify-center">
                    <Cookie className="w-[15px] h-[15px] text-[var(--color-gold)]" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-0.5">
                      {t('cookies.manage_eyebrow')}
                    </p>
                    <h3 className="font-display font-bold text-[14.5px] tracking-[-0.01em] leading-tight text-[var(--color-ink)]">
                      {t('cookies.manage_title')}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2 mb-3.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const checked = cat.alwaysOn ? true : analyticsToggle;
                    return (
                      <li
                        key={cat.id}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-line)]"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-[var(--color-gold-tint)] flex items-center justify-center mt-px">
                          <Icon className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="font-semibold text-[12.5px] text-[var(--color-ink)] leading-tight">
                              {t(`cookies.cat.${cat.id}.name`)}
                            </p>
                            {cat.alwaysOn ? (
                              <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-[var(--color-gold)] whitespace-nowrap">
                                {t('cookies.always_on')}
                              </span>
                            ) : (
                              <button
                                type="button"
                                role="switch"
                                aria-checked={checked}
                                onClick={() => setAnalyticsToggle((v) => !v)}
                                className={`relative shrink-0 h-[18px] w-8 rounded-full transition-colors duration-200 cursor-pointer ${
                                  checked
                                    ? 'bg-[var(--color-gold)]'
                                    : 'bg-[var(--color-line-strong)]'
                                }`}
                              >
                                <motion.span
                                  layout
                                  transition={{ duration: 0.18, ease: EASE }}
                                  className={`absolute top-[2px] h-3.5 w-3.5 rounded-full bg-white shadow-sm flex items-center justify-center ${
                                    checked ? 'left-[16px]' : 'left-[2px]'
                                  }`}
                                >
                                  {checked && <Check className="w-2.5 h-2.5 text-[var(--color-gold)]" strokeWidth={3} />}
                                </motion.span>
                              </button>
                            )}
                          </div>
                          <p className="text-[11.5px] leading-[1.45] text-[var(--color-graphite-soft)]">
                            {t(`cookies.cat.${cat.id}.desc`)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setView('banner')}
                    className="flex-1 h-9 rounded-lg border border-[var(--color-line-strong)] hover:border-[var(--color-graphite)] hover:bg-[var(--color-bg-alt)] text-[12.5px] font-medium text-[var(--color-graphite)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                  >
                    {t('cookies.back')}
                  </button>
                  <button
                    type="button"
                    onClick={onSavePreferences}
                    className="flex-1 h-9 rounded-lg bg-[var(--color-gold)] hover:bg-[var(--color-gold-hi)] text-[var(--color-ink)] text-[12.5px] font-semibold transition-colors cursor-pointer"
                  >
                    {t('cookies.save')}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
