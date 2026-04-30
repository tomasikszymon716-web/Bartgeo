import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
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
    <section id="o-nas" className="py-14 px-6" aria-labelledby="onas-heading-m">
      <SectionHeading
        eyebrow={t('about.eyebrow')}
        heading={t('about.heading')}
        id="onas-heading-m"
      />

      {/* Photo with gold accent bar */}
      <div className="mt-8 relative">
        <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-gold)] to-[var(--color-gold-hi)] z-10" />
        <div
          className="ml-3.5 rounded-2xl overflow-hidden h-[280px] relative"
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
                <span className="font-display font-bold text-[32px] leading-none text-[var(--color-gold)]">
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

      {/* Awards */}
      <div className="mt-8 pt-7 border-t border-[var(--color-line)]">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--color-muted)]">
            Orły Geodezji
          </p>
          <a
            href={ORLY_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.06em] text-[var(--color-gold-lo)] active:text-[var(--color-gold)] transition-colors"
          >
            {t('about.awards_link')}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {awards.map((award, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-[13px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] shrink-0" />
              <span className="font-medium text-[var(--color-ink-soft)]">{t(award.typeKey)}</span>
              <span className="text-[var(--color-muted)]">{award.year}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
