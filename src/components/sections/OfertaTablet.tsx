import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/services';
import { scrollToSection } from '../../lib/scrollToSection';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

/* Tablet — 2-column layout: tachymeter video on the right (sticky
   so it stays visible while scrolling the accordion), accordion of
   services on the left. Bridges Mobile's stacked accordion and
   Desktop's full scroll-locked orbital experience. No scroll-jacking
   here — tablets are touch-first and aggressive scroll-binding feels
   wrong; sticky photo gives the same anchoring effect for free. */

export function OfertaTablet() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => { v.play().catch(() => {}); };
    play();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) play(); }),
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const handleTap = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section id="oferta" className="py-16 px-8" aria-labelledby="oferta-heading-t">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          heading={t('services.heading')}
          description={t('services.sub')}
          id="oferta-heading-t"
        />

        <div className="grid grid-cols-[1.15fr_0.85fr] gap-10 mt-12 items-start">
          {/* ── Left: accordion ── */}
          <div className="flex flex-col">
            {services.map((service, i) => {
              const isOpen = openIndex === i;
              const Icon = iconMap[service.icon];
              const num = String(i + 1).padStart(2, '0');

              return (
                <div
                  key={service.id}
                  className="relative border-b border-[var(--color-line)] last:border-b-0 first:border-t first:border-t-[var(--color-line)]"
                >
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--color-gold)] pointer-events-none"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'scaleY(1)' : 'scaleY(0.2)',
                      transformOrigin: 'center',
                      transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.33,1,0.68,1)',
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => handleTap(i)}
                    aria-expanded={isOpen}
                    aria-controls={`oferta-panel-t-${i}`}
                    className="w-full py-6 pl-5 pr-3 flex items-center gap-4 text-left cursor-pointer"
                  >
                    <span
                      className="font-mono font-bold text-[18px] tabular-nums leading-none w-[28px] shrink-0"
                      style={{
                        color: isOpen ? 'var(--color-gold)' : 'var(--color-line-strong)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {num}
                    </span>

                    <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-lg bg-[var(--color-gold-tint)]"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'scale(1)' : 'scale(0.85)',
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                      />
                      <span
                        className="relative flex items-center justify-center"
                        style={{
                          color: isOpen ? 'var(--color-gold)' : 'var(--color-line-strong)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        <Icon className="w-[20px] h-[20px]" />
                      </span>
                    </div>

                    <h3
                      className="flex-1 font-semibold text-[17.5px] tracking-[-0.01em]"
                      style={{
                        color: isOpen ? 'var(--color-ink)' : 'var(--color-graphite-soft)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {t(service.titleKey)}
                    </h3>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0"
                      style={{
                        color: isOpen ? 'var(--color-gold)' : 'var(--color-line-strong)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.35s cubic-bezier(0.33,1,0.68,1), color 0.3s ease',
                      }}
                    >
                      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div
                    id={`oferta-panel-t-${i}`}
                    role="region"
                    className="grid"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.42s cubic-bezier(0.33,1,0.68,1)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="pl-[68px] pr-5 pb-6"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
                          transition: isOpen
                            ? 'opacity 0.35s ease 0.1s, transform 0.4s cubic-bezier(0.33,1,0.68,1) 0.1s'
                            : 'opacity 0.15s ease, transform 0.2s ease',
                        }}
                      >
                        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
                          {t(service.descKey)}
                        </p>
                        <a
                          href="#kontakt"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToSection('#kontakt'); }}
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--color-gold)] mt-3.5"
                        >
                          {t('services.cta')}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-px">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: sticky tachymeter video ── */}
          <div className="sticky top-24 self-start">
            <div className="aspect-square w-full max-w-[360px] mx-auto">
              <video
                ref={videoRef}
                src="/tachymeter-opt.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-center text-[var(--color-muted)] mt-4 opacity-70">
              {t('services.tachymeter_caption')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
