import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { Lightbox } from '../ui/Lightbox';
import { portfolio } from '../../data/portfolio';

/* Tablet — clean 3×2 grid (3 cols × 2 rows) of service galleries.
   Cards are equal-sized, slightly taller than mobile (h-[230px]),
   sized for touch. Same Lightbox + same gold accent + same hover
   zoom as Desktop, just on a tighter layout. */

export function RealizacjeTablet() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? portfolio[activeIdx] : null;

  return (
    <section id="realizacje" className="py-16 px-8" aria-labelledby="realizacje-heading-t">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading
          eyebrow={t('realizacje.eyebrow')}
          heading={t('realizacje.heading')}
          description={t('realizacje.sub')}
          id="realizacje-heading-t"
        />

        {/* ── 3×2 service-card grid ──────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {portfolio.map((entry, i) => {
            const photoCount = entry.gallery.length;
            const title = t(entry.titleKey);
            return (
              <motion.button
                key={entry.serviceId}
                type="button"
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="group relative h-[230px] rounded-[18px] overflow-hidden cursor-pointer text-left bg-[var(--color-ink-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                aria-label={`${title} — ${t('realizacje.gallery_cta')}`}
              >
                <img
                  src={entry.gallery[0]}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.45] group-hover:grayscale-0 group-hover:scale-[1.04] transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-[0.06] mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/30 to-transparent pointer-events-none" />

                {/* Top corners */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.18em] uppercase">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                    {String(i + 1).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-md text-white/90">
                    <span className="text-[var(--color-gold)] tabular-nums">{photoCount}</span>
                    <span className="text-white/40">·</span>
                    {t('realizacje.gallery_label')}
                  </span>
                </div>

                {/* Bottom — service title + open arrow */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-white text-[16px] leading-[1.2] tracking-[-0.015em] mb-1.5">
                      {title}
                    </h3>
                    <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[var(--color-gold)] flex items-center gap-2">
                      {t('realizacje.gallery_cta')}
                      <span className="h-px w-4 bg-[var(--color-gold)]/60 transition-all duration-300 group-hover:w-7" />
                    </p>
                  </div>
                  <span className="shrink-0 w-9 h-9 rounded-full bg-white/[0.1] backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-ink)] transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Partner marquee ────────────────────────────────── */}
        <div className="mt-14 relative border-t border-b border-[var(--color-line)] py-8">
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 px-4 bg-[var(--color-bg)] flex items-center gap-2.5 whitespace-nowrap">
            <span className="h-px w-5 bg-[var(--color-gold)]/60" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-gold)]">
              {t('partners.label')}
            </span>
            <span className="h-px w-5 bg-[var(--color-gold)]/60" />
          </div>
          <Marquee duration={28}>
            <div className="flex items-center">
              {(['architectural', 'law', 'legal', 'notary', 'developers', 'individual'] as const).map((key) => (
                <span key={key} className="flex items-center font-mono text-[12.5px] tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                  {t(`partners.${key}`)}
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mx-5 shrink-0" />
                </span>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <Lightbox
        open={active !== null}
        onClose={() => setActiveIdx(null)}
        title={active ? t(active.titleKey) : ''}
        images={active ? active.gallery : []}
      />
    </section>
  );
}
