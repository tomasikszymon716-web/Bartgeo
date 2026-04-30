import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/services';
import { scrollToSection } from '../../lib/scrollToSection';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

/*
 * Accordion — tap to expand description inline under the title.
 * Smooth height animation via CSS grid-template-rows (GPU-composited, no layout thrash).
 * One open at a time. Zero scroll listeners. Zero jank.
 */
export function OfertaMobile() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS occasionally pauses autoplay after scroll — resume it politely
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
    <section id="oferta" className="py-14 px-6" aria-labelledby="oferta-heading-m">
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        heading={t('services.heading')}
        description={t('services.sub')}
        id="oferta-heading-m"
      />

      {/* Static looped video — native playback, zero scroll-scrubbing */}
      <div className="w-full aspect-square max-w-[240px] mx-auto mt-8 mb-4">
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

      {/* Accordion — one open at a time */}
      <div className="flex flex-col mt-2">
        {services.map((service, i) => {
          const isOpen = openIndex === i;
          const Icon = iconMap[service.icon];
          const num = String(i + 1).padStart(2, '0');

          return (
            <div
              key={service.id}
              className="relative border-b border-[var(--color-line)] last:border-b-0 first:border-t first:border-t-[var(--color-line)]"
            >
              {/* Gold left accent — only when open */}
              <div
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--color-gold)] pointer-events-none"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scaleY(1)' : 'scaleY(0.2)',
                  transformOrigin: 'center',
                  transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.33,1,0.68,1)',
                }}
              />

              {/* Tap target — number + icon + title + chevron */}
              <button
                type="button"
                onClick={() => handleTap(i)}
                aria-expanded={isOpen}
                aria-controls={`oferta-panel-${i}`}
                className="w-full py-5 pl-4 pr-2 flex items-center gap-3 text-left"
              >
                <span
                  className="font-mono font-bold text-[15px] tabular-nums leading-none w-[22px] shrink-0"
                  style={{
                    color: isOpen ? 'var(--color-gold)' : 'var(--color-line-strong)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {num}
                </span>

                {/* Icon chip */}
                <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
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
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="flex-1 font-semibold text-[15.5px] tracking-[-0.01em]"
                  style={{
                    color: isOpen ? 'var(--color-ink)' : 'var(--color-graphite-soft)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {t(service.titleKey)}
                </h3>

                {/* Chevron */}
                <svg
                  width="14"
                  height="14"
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

              {/* Expanding description — grid-template-rows trick for smooth height */}
              <div
                id={`oferta-panel-${i}`}
                role="region"
                className="grid"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.42s cubic-bezier(0.33,1,0.68,1)',
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="pl-[54px] pr-4 pb-5"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
                      transition: isOpen
                        ? 'opacity 0.35s ease 0.1s, transform 0.4s cubic-bezier(0.33,1,0.68,1) 0.1s'
                        : 'opacity 0.15s ease, transform 0.2s ease',
                    }}
                  >
                    <p className="text-[14px] leading-[1.7] text-[var(--color-muted)]">
                      {t(service.descKey)}
                    </p>
                    <a
                      href="#kontakt"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToSection('#kontakt'); }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-gold)] mt-3"
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
    </section>
  );
}
