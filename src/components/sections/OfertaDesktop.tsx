import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { ScrollVideo } from '../ui/ScrollVideo';
import { services } from '../../data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

/* ── Orbital icon — smoothly repositioned each time the active index changes ── */
function OrbitalIcon({
  index,
  total,
  activeIndex,
  icon: Icon,
}: {
  index: number;
  total: number;
  activeIndex: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const RADIUS = 225;
  // Rotate ring so the active icon sits at the TOP (-90°)
  const rotOffset = -activeIndex * (360 / total);
  const angle = ((index / total) * 360 - 90 + rotOffset) * (Math.PI / 180);
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  const isActive = activeIndex === index;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      animate={{ x: x - 24, y: y - 24, scale: isActive ? 1.25 : 0.85, opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isActive
            ? 'bg-[var(--color-gold)] shadow-[0_8px_32px_-8px_rgba(240,165,0,0.55)]'
            : 'bg-[var(--color-bg-alt)] border border-[var(--color-line)]'
        }`}
      >
        <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? 'text-white' : 'text-[var(--color-muted)]'}`} />
      </div>
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────────────────── */
export function OfertaDesktop() {
  const { t } = useTranslation();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollAreaRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(5, Math.max(0, Math.floor(v * 6)));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  return (
    <section id="oferta" aria-labelledby="oferta-heading">
      <div ref={scrollAreaRef} style={{ height: '380vh' }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* ── Header ── */}
          <div className="pt-28 pb-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-gold)] mb-3 uppercase"
            >
              {t('services.eyebrow')}
            </motion.p>
            <motion.h2
              id="oferta-heading"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="font-display font-bold text-[clamp(28px,3vw,44px)] tracking-[-0.025em] text-[var(--color-ink)]"
            >
              {t('services.heading')}
            </motion.h2>
          </div>

          {/* ── Two-column: service detail + orbital tachymeter ── */}
          <div className="flex-1 max-w-[1280px] mx-auto px-10 w-full grid grid-cols-2 gap-16 items-center">
            {/* Left — active service detail */}
            <div className="relative h-[320px] pl-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : activeIndex > i ? -50 : 50,
                    filter: activeIndex === i ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ pointerEvents: activeIndex === i ? 'auto' : 'none' }}
                >
                  {/* Service number */}
                  <span className="font-mono text-[13px] tracking-[0.12em] text-[var(--color-gold)] mb-4">
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-bold text-[clamp(26px,2.4vw,36px)] tracking-[-0.02em] leading-[1.15] text-[var(--color-ink)] mb-4">
                    {t(service.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] leading-[1.7] text-[var(--color-graphite-soft)] max-w-[380px] mb-8">
                    {t(service.descKey)}
                  </p>

                  {/* CTA */}
                  <a
                    href="#kontakt"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-gold-lo)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {t('services.cta')}
                    <span className="text-lg leading-none">→</span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Right — tachymeter + orbital ring */}
            <div className="relative flex items-center justify-center h-[500px]">
              {/* Subtle orbital track */}
              <div className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-[var(--color-line)] opacity-30" />

              {/* Orbital icons */}
              {services.map((service, i) => {
                const Icon = iconMap[service.icon];
                return (
                  <OrbitalIcon
                    key={service.id}
                    index={i}
                    total={6}
                    activeIndex={activeIndex}
                    icon={Icon}
                  />
                );
              })}

              {/* Tachymeter center */}
              <div className="relative w-[260px] aspect-square z-10">
                <ScrollVideo
                  src="/tachymeter-opt.mp4"
                  containerRef={scrollAreaRef}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div className="pb-10 flex items-center justify-center gap-2">
            {services.map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px] rounded-full"
                animate={{
                  width: i === activeIndex ? 32 : 8,
                  backgroundColor: i === activeIndex ? 'var(--color-gold)' : 'var(--color-line-strong)',
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
