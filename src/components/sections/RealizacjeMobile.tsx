import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
      <div className="mt-12">
        <div className="flex flex-col items-center text-center mb-6">
          <span className="inline-flex items-center gap-2 mb-3.5">
            <span className="h-px w-6 bg-[var(--color-gold)]" />
            <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[var(--color-gold)]">
              {t('partners.eyebrow')}
            </span>
            <span className="h-px w-6 bg-[var(--color-gold)]" />
          </span>
          <h3 className="font-display font-bold text-[clamp(20px,5.6vw,24px)] tracking-[-0.02em] leading-[1.2] text-[var(--color-ink)]">
            {t('partners.label')}
          </h3>
        </div>

        <div
          className="relative py-1"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <Marquee duration={26}>
            <div className="flex items-center">
              {(['architectural', 'law', 'legal', 'notary', 'developers', 'individual'] as const).map((key) => (
                <span
                  key={key}
                  className="flex items-center font-mono text-[11.5px] font-medium tracking-[0.08em] text-[var(--color-graphite)] whitespace-nowrap"
                >
                  {t(`partners.${key}`)}
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mx-5 shrink-0"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              ))}
            </div>
          </Marquee>
        </div>
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
