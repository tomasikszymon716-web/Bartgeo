import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { Lightbox } from '../ui/Lightbox';
import { portfolio } from '../../data/portfolio';

export function RealizacjeMobile() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? portfolio[activeIdx] : null;

  return (
    <section id="realizacje" className="py-14 px-6" aria-labelledby="realizacje-heading-m">
      <SectionHeading
        eyebrow={t('realizacje.eyebrow')}
        heading={t('realizacje.heading')}
        description={t('realizacje.sub')}
        id="realizacje-heading-m"
      />

      {/* ── 2 × 3 service-card grid ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        {portfolio.map((entry, i) => {
          const photoCount = entry.gallery.length;
          const title = t(entry.titleKey);
          return (
            <button
              key={entry.serviceId}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="group relative h-[210px] rounded-2xl overflow-hidden cursor-pointer text-left bg-[var(--color-ink-soft)]"
              aria-label={`${title} — ${t('realizacje.gallery_cta')}`}
            >
              <img
                src={entry.gallery[0]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.4]"
                loading="lazy"
              />

              {/* Gold tint */}
              <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-[0.06] mix-blend-multiply pointer-events-none" />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[var(--color-ink)]/95 via-[var(--color-ink)]/40 to-transparent pointer-events-none" />

              {/* Top corners */}
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5 font-mono text-[8.5px] tracking-[0.18em] uppercase text-white/80">
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                {String(i + 1).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}
              </span>
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md font-mono text-[8.5px] tracking-[0.16em] uppercase text-white/90 flex items-center gap-1">
                <span className="text-[var(--color-gold)] tabular-nums">{photoCount}</span>
                <span className="text-white/40">·</span>
                {t('realizacje.gallery_label')}
              </span>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-end justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-white text-[14px] leading-[1.2] tracking-[-0.01em] mb-1.5">
                    {title}
                  </h3>
                  <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-gold)]">
                    {t('realizacje.gallery_cta')}
                  </p>
                </div>
                <span className="shrink-0 w-7 h-7 rounded-full bg-white/[0.12] backdrop-blur-md flex items-center justify-center text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Partner marquee ────────────────────────────────── */}
      <div className="mt-10 relative border-t border-b border-[var(--color-line)] py-7">
        <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 px-3.5 bg-[var(--color-bg)] flex items-center gap-2 whitespace-nowrap">
          <span className="h-px w-3.5 bg-[var(--color-gold)]/60" />
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-gold)]">
            {t('partners.label')}
          </span>
          <span className="h-px w-3.5 bg-[var(--color-gold)]/60" />
        </div>
        <Marquee duration={25}>
          <div className="flex items-center">
            {(['architectural', 'law', 'legal', 'notary', 'developers', 'individual'] as const).map((key) => (
              <span key={key} className="flex items-center font-mono text-[11px] tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                {t(`partners.${key}`)}
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)] mx-4 shrink-0" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <Lightbox
        open={active !== null}
        onClose={() => setActiveIdx(null)}
        title={active ? t(active.titleKey) : ''}
        images={active ? active.gallery : []}
      />
    </section>
  );
}
