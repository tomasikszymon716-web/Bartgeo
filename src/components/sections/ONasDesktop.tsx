import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

              {/* Image */}
              <div
                className="ml-4 rounded-2xl overflow-hidden h-[440px] relative"
                style={{ boxShadow: '0 24px 64px -20px rgba(45, 64, 87, 0.22)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541976590-713941681591?w=800"
                  alt="Geodeta w terenie"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  loading="lazy"
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

        {/* ── Awards: editorial inline strip ────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 pt-7 border-t border-[var(--color-line)] flex items-center"
        >
          <div className="shrink-0 mr-8 leading-none">
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-muted)]">
              {t('about.awards_kicker')}
            </p>
            <p className="font-mono text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink-soft)] mt-1.5">
              Orły Geodezji
            </p>
          </div>

          <div className="flex items-center gap-6">
            {awards.map((award, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-[13px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span className="font-medium text-[var(--color-ink-soft)]">
                  {t(award.typeKey)}
                </span>
                <span className="text-[var(--color-muted)]">{award.year}</span>
              </span>
            ))}
          </div>

          <div className="flex-1" />

          <a
            href={ORLY_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-[var(--color-gold-lo)] hover:text-[var(--color-gold)] transition-colors duration-300 shrink-0"
          >
            {t('about.awards_link')}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
