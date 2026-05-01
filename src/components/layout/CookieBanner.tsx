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

/* Categories shown in the "Manage" view. Essential is always on
   (legitimate-interest basis under PUKE, no consent needed). */
const CATEGORIES = [
  { id: 'essential', icon: ShieldCheck, alwaysOn: true },
  { id: 'analytics', icon: BarChart3, alwaysOn: false },
] as const;

export function CookieBanner() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'banner' | 'manage'>('banner');
  const [analyticsToggle, setAnalyticsToggle] = useState(false);

  useEffect(() => {
    if (hasDecided()) return;
    /* Slight delay so the banner doesn't fight the page-load animation. */
    const timer = window.setTimeout(() => setOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  /* Re-open when "Manage cookies" link in the privacy page resets consent. */
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
          /* Mobile: bottom sheet. Desktop: floating card bottom-right. */
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.985 }}
          transition={{ duration: 0.45, ease: EASE }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 lg:bottom-6 lg:right-6 lg:left-auto lg:w-[400px] z-[9999] rounded-[20px] bg-[var(--color-graphite)]/97 backdrop-blur-xl text-[var(--color-bg)] border border-white/10 overflow-hidden"
          style={{ boxShadow: '0 24px 64px -20px rgba(14, 22, 32, 0.55)' }}
        >
          {/* Hairline gold accent at top — quiet brand cue */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent pointer-events-none" />

          <div className="p-5 lg:p-6">
            {view === 'banner' ? (
              <>
                <div className="flex items-start gap-3 mb-3">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center">
                    <Cookie className="w-[18px] h-[18px] text-[var(--color-gold)]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-1">
                      {t('cookies.eyebrow')}
                    </p>
                    <h3
                      id="cookie-title"
                      className="font-display font-bold text-[16px] lg:text-[17px] tracking-[-0.01em] leading-snug"
                    >
                      {t('cookies.title')}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={onRejectAll}
                    aria-label={t('cookies.close')}
                    className="shrink-0 -mt-1 -mr-1 w-8 h-8 rounded-full hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p
                  id="cookie-desc"
                  className="text-[13px] leading-[1.6] text-white/72 mb-5"
                >
                  {t('cookies.body')}{' '}
                  <a
                    href="/polityka-prywatnosci"
                    className="text-[var(--color-gold)] hover:text-[var(--color-gold-hi)] underline-offset-[3px] hover:underline transition-colors whitespace-nowrap"
                  >
                    {t('cookies.read_more')} →
                  </a>
                </p>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={onRejectAll}
                    className="flex-1 h-10 rounded-lg border border-white/15 hover:border-white/35 hover:bg-white/[0.04] text-[13px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
                  >
                    {t('cookies.reject')}
                  </button>
                  <button
                    type="button"
                    onClick={onAcceptAll}
                    className="flex-1 h-10 rounded-lg bg-[var(--color-gold)] hover:bg-[var(--color-gold-hi)] text-[var(--color-ink)] text-[13px] font-semibold transition-colors cursor-pointer"
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
                  className="mt-3 w-full font-mono text-[10.5px] tracking-[0.18em] uppercase text-white/45 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
                >
                  {t('cookies.manage')}
                </button>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center">
                    <Cookie className="w-[18px] h-[18px] text-[var(--color-gold)]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-1">
                      {t('cookies.manage_eyebrow')}
                    </p>
                    <h3
                      className="font-display font-bold text-[16px] lg:text-[17px] tracking-[-0.01em] leading-snug"
                    >
                      {t('cookies.manage_title')}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const checked = cat.alwaysOn ? true : analyticsToggle;
                    return (
                      <li
                        key={cat.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5"
                      >
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-gold)]/12 flex items-center justify-center mt-0.5">
                          <Icon className="w-4 h-4 text-[var(--color-gold)]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3 mb-0.5">
                            <p className="font-semibold text-[13.5px] text-white">
                              {t(`cookies.cat.${cat.id}.name`)}
                            </p>
                            {cat.alwaysOn ? (
                              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--color-gold)]/85 whitespace-nowrap">
                                {t('cookies.always_on')}
                              </span>
                            ) : (
                              <button
                                type="button"
                                role="switch"
                                aria-checked={checked}
                                onClick={() => setAnalyticsToggle((v) => !v)}
                                className={`relative shrink-0 h-5 w-9 rounded-full transition-colors duration-200 cursor-pointer ${
                                  checked
                                    ? 'bg-[var(--color-gold)]'
                                    : 'bg-white/15'
                                }`}
                              >
                                <motion.span
                                  layout
                                  transition={{ duration: 0.18, ease: EASE }}
                                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm flex items-center justify-center ${
                                    checked ? 'left-[18px]' : 'left-0.5'
                                  }`}
                                >
                                  {checked && <Check className="w-2.5 h-2.5 text-[var(--color-gold)]" strokeWidth={3} />}
                                </motion.span>
                              </button>
                            )}
                          </div>
                          <p className="text-[12px] leading-[1.5] text-white/55">
                            {t(`cookies.cat.${cat.id}.desc`)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setView('banner')}
                    className="flex-1 h-10 rounded-lg border border-white/15 hover:border-white/35 text-[13px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
                  >
                    {t('cookies.back')}
                  </button>
                  <button
                    type="button"
                    onClick={onSavePreferences}
                    className="flex-1 h-10 rounded-lg bg-[var(--color-gold)] hover:bg-[var(--color-gold-hi)] text-[var(--color-ink)] text-[13px] font-semibold transition-colors cursor-pointer"
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
