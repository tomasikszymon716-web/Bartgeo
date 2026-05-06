import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Counter } from '../ui/Counter';

const awards = [
  { year: '2026', typeKey: 'about.award_laureate' },
  { year: '2025', typeKey: 'about.award_laureate' },
  { year: '2025', typeKey: 'about.award_silver' },
] as const;

const ORLY_PROFILE =
  'https://www.orlygeodezji.pl/profile-1350-bartgeo-uslugi-geodezyjno-kartograficzne';

export function ONasMobile() {
  const { t } = useTranslation();

  return (
    <section id="o-nas" className="py-14 md:py-16 px-6 md:px-8" aria-labelledby="onas-heading-m">
      <div className="md:max-w-[760px] md:mx-auto">
      <SectionHeading
        eyebrow={t('about.eyebrow')}
        heading={t('about.heading')}
        id="onas-heading-m"
      />

      {/* Photo with gold accent bar */}
      <div className="mt-8 md:mt-10 relative">
        <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-gold)] to-[var(--color-gold-hi)] z-10" />
        <div
          className="ml-3.5 rounded-2xl overflow-hidden h-[280px] md:h-[360px] relative"
          style={{ boxShadow: '0 20px 50px -16px rgba(45, 64, 87, 0.2)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1541976590-713941681591?w=600"
            alt="Geodeta w terenie"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/[0.12] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Text */}
      <p className="mt-8 text-[15px] leading-[1.75] text-[var(--color-graphite-soft)]">
        {t('about.p1')}
      </p>
      <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-graphite-soft)]">
        {t('about.p2')}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 mt-10">
        {([
          { value: 2014, label: t('about.stat_projects'), suffix: '+' },
          { value: 15, label: t('about.stat_years') },
          { value: 5, label: t('about.stat_counties') },
        ] as const).map((stat, i) => (
          <div key={i} className="text-center">
            <div className="flex items-baseline justify-center gap-px">
              <Counter
                to={stat.value}
                className="font-display font-bold text-[32px] leading-none tracking-[-0.04em] text-[var(--color-ink)]"
              />
              {'suffix' in stat && stat.suffix && (
                <span className="font-display font-bold text-[32px] leading-none text-[var(--color-gold)] inline-block translate-y-[-0.08em]">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-[var(--color-muted)] mt-3 px-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Awards card — solid colours only (see ONasDesktop for the
          cross-platform rationale). */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 relative rounded-[20px] border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-7 overflow-hidden"
        style={{ boxShadow: '0 18px 40px -20px rgba(45, 64, 87, 0.22)' }}
      >
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[3px] rounded-b-full bg-[var(--color-gold)]"
        />

        <div className="relative flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 mb-3.5 mt-1">
            <span className="h-px w-7 bg-[var(--color-gold)]" />
            <span className="font-mono text-[9.5px] tracking-[0.26em] uppercase text-[var(--color-gold)]">
              {t('about.awards_eyebrow')}
            </span>
            <span className="h-px w-7 bg-[var(--color-gold)]" />
          </span>

          <div className="inline-flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[var(--color-gold-tint)] flex items-center justify-center shrink-0">
              <Award className="w-[18px] h-[18px] text-[var(--color-gold)]" strokeWidth={2.2} />
            </span>
            <h3 className="font-display font-bold text-[clamp(20px,5.6vw,26px)] tracking-[-0.022em] leading-[1.15] text-[var(--color-ink)]">
              Orły Geodezji
            </h3>
          </div>

          <p className="mt-2.5 text-[13px] leading-[1.55] tracking-[-0.005em] text-[var(--color-graphite-soft)]">
            {t('about.awards_kicker')}
          </p>

          <div className="mt-5 flex items-center justify-center flex-wrap gap-2">
            {awards.map((award, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-gold-tint)] text-[12px]"
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                />
                <span className="font-semibold text-[var(--color-ink-soft)]">{t(award.typeKey)}</span>
                <span className="font-mono text-[11.5px] tabular-nums text-[var(--color-gold-lo)]">{award.year}</span>
              </span>
            ))}
          </div>

          <a
            href={ORLY_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1 font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-gold-lo)] active:text-[var(--color-gold)] transition-colors"
          >
            {t('about.awards_link')}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
