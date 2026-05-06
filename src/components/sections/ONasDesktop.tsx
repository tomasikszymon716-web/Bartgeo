import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Counter } from '../ui/Counter';

/* ── Data ─────────────────────────────────────────────────── */

const stats = [
  { value: 2014, labelKey: 'about.stat_projects', suffix: '+' },
  { value: 15, labelKey: 'about.stat_years' },
  { value: 5, labelKey: 'about.stat_counties' },
] as const;

const awards = [
  { year: '2026', typeKey: 'about.award_laureate' },
  { year: '2025', typeKey: 'about.award_laureate' },
  { year: '2025', typeKey: 'about.award_silver' },
] as const;

const ORLY_PROFILE =
  'https://www.orlygeodezji.pl/profile-1350-bartgeo-uslugi-geodezyjno-kartograficzne';

/* ── Component ────────────────────────────────────────────── */

export function ONasDesktop() {
  const { t } = useTranslation();

  return (
    <section id="o-nas" className="py-[56px]" aria-labelledby="onas-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('about.eyebrow')}
          heading={t('about.heading')}
          id="onas-heading"
        />

        {/* ── Content: photo + text ─────────────────────── */}
        <div className="grid grid-cols-12 gap-10 mt-12">
          {/* Photo with gold accent bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-5"
          >
            <div className="relative group">
              {/* Gold accent */}
              <div className="absolute left-0 top-10 bottom-10 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-gold)] to-[var(--color-gold-hi)] z-10" />

              {/* Image — aspect-[2/3] matches the owner portrait's
                  native ratio (798×1200), so `object-cover` doesn't
                  crop a single pixel from the subject. max-w cap
                  keeps the image from blowing up on ultra-wide
                  viewports. */}
              <div
                className="ml-4 rounded-2xl overflow-hidden aspect-[2/3] max-w-[420px] relative"
                style={{ boxShadow: '0 24px 64px -20px rgba(45, 64, 87, 0.22)' }}
              >
                <img
                  src="/photos/owner.jpg"
                  alt="mgr inż. Bartłomiej Tomasik — założyciel BartGeo"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                {/* Depth gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/[0.12] to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="col-span-7 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[17px] leading-[1.75] text-[var(--color-graphite-soft)] max-w-[540px]"
            >
              {t('about.p1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-[17px] leading-[1.75] text-[var(--color-graphite-soft)] max-w-[540px]"
            >
              {t('about.p2')}
            </motion.p>
          </div>
        </div>

        {/* ── Stats: clean typographic ──────────────────── */}
        <div className="grid grid-cols-3 gap-x-10 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.1 }}
            >
              <div className="flex items-baseline gap-0.5">
                <Counter
                  to={stat.value}
                  className="font-display font-bold text-[56px] leading-none tracking-[-0.04em] text-[var(--color-ink)]"
                />
                {'suffix' in stat && stat.suffix && (
                  <span className="font-display font-bold text-[56px] leading-none tracking-[-0.04em] text-[var(--color-gold)] inline-block translate-y-[-0.08em]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--color-muted)] mt-4">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Awards: editorial card ──────────────────────
              Cross-platform notes: every fill, border and shadow is
              a SOLID colour from the design palette — no
              `from-X to-Y/40` gradient bg, no `radial-gradient(... ,
              transparent)` blob, no alpha-only borders. Windows
              (different gamma, no colour-managed display, lower
              colour depth on some panels) renders alpha gradients
              with visible banding and washes them out at high
              brightness. Solid fills look identical on macOS and
              Windows down to the pixel. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 relative rounded-[24px] border border-[var(--color-line)] bg-[var(--color-card)] px-10 py-9 overflow-hidden"
          style={{ boxShadow: '0 24px 56px -24px rgba(45, 64, 87, 0.2)' }}
        >
          {/* Solid gold tab at the top — replaces the radial blob.
              No gradient endpoints means no banding, looks identical
              everywhere. */}
          <span
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] rounded-b-full bg-[var(--color-gold)]"
          />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 mb-4 mt-1.5">
              <span className="h-px w-10 bg-[var(--color-gold)]" />
              <span className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-[var(--color-gold)]">
                {t('about.awards_eyebrow')}
              </span>
              <span className="h-px w-10 bg-[var(--color-gold)]" />
            </span>

            <div className="inline-flex items-center gap-3.5">
              <motion.span
                className="w-12 h-12 rounded-full bg-[var(--color-gold-tint)] flex items-center justify-center shrink-0"
                initial={{ rotate: -18, scale: 0.85, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                <Award className="w-6 h-6 text-[var(--color-gold)]" strokeWidth={2.2} />
              </motion.span>
              <h3 className="font-display font-bold text-[clamp(26px,2.6vw,34px)] tracking-[-0.025em] leading-[1.15] text-[var(--color-ink)]">
                Orły Geodezji
              </h3>
            </div>

            <p className="mt-3 text-[14px] tracking-[-0.005em] text-[var(--color-graphite-soft)] max-w-[520px]">
              {t('about.awards_kicker')}
            </p>

            <div className="mt-7 flex items-center justify-center flex-wrap gap-2.5">
              {awards.map((award, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-gold-tint)] text-[13px]"
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  />
                  <span className="font-semibold tracking-[-0.005em] text-[var(--color-ink-soft)]">
                    {t(award.typeKey)}
                  </span>
                  <span className="font-mono text-[12px] tabular-nums text-[var(--color-gold-lo)]">
                    {award.year}
                  </span>
                </motion.span>
              ))}
            </div>

            <a
              href={ORLY_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-gold-lo)] hover:text-[var(--color-gold)] transition-colors duration-300"
            >
              {t('about.awards_link')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
