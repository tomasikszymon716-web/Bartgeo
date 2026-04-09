import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { ScrollVideo } from '../ui/ScrollVideo';
import { services } from '../../data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

/* ── Orbital icon ─────────────────────────────────────────────────────────── */
function OrbitalIcon({
  index, total, activeIndex, icon: Icon, onClick,
}: {
  index: number; total: number; activeIndex: number;
  icon: React.ComponentType<{ className?: string }>; onClick: () => void;
}) {
  const RADIUS = 210;
  const rotOffset = -activeIndex * (360 / total);
  const angle = ((index / total) * 360 - 90 + rotOffset) * (Math.PI / 180);
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  const isActive = activeIndex === index;

  return (
    <motion.button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      animate={{ x: x - 22, y: y - 22, scale: isActive ? 1.2 : 0.8, opacity: isActive ? 1 : 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: isActive ? 1.25 : 1, opacity: 1 }}
    >
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
        isActive
          ? 'bg-[var(--color-gold)] shadow-[0_8px_24px_-6px_rgba(240,165,0,0.5)]'
          : 'bg-[var(--color-bg-alt)] border border-[var(--color-line)] hover:border-[var(--color-gold)]/40'
      }`}>
        <Icon className={`w-[18px] h-[18px] transition-colors duration-500 ${isActive ? 'text-white' : 'text-[var(--color-muted)]'}`} />
      </div>
    </motion.button>
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

  /* Click orbital icon or accordion item → smooth-scroll to that service */
  const scrollToService = useCallback((index: number) => {
    const area = scrollAreaRef.current;
    if (!area) return;
    const areaTop = area.getBoundingClientRect().top + window.scrollY;
    const areaH = area.offsetHeight;
    const target = areaTop + (index / 6) * areaH + 10;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <section id="oferta" aria-labelledby="oferta-heading">
      <div ref={scrollAreaRef} style={{ height: '380vh' }}>
        <div className="sticky top-0 h-screen flex flex-col">
          {/* ── Header ── */}
          <div className="pt-24 pb-4 text-center">
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

          {/* ── Grid: accordion list + orbital tachymeter ── */}
          <div className="flex-1 max-w-[1280px] mx-auto px-10 w-full grid grid-cols-[1fr_480px] gap-12 items-center">

            {/* ── Left: all services — accordion ── */}
            <div className="flex flex-col">
              {services.map((service, i) => {
                const isActive = activeIndex === i;
                const num = String(i + 1).padStart(2, '0');

                return (
                  <button
                    key={service.id}
                    onClick={() => scrollToService(i)}
                    className={`relative text-left cursor-pointer border-b border-[var(--color-line)] last:border-b-0 transition-all duration-500 ${
                      isActive ? 'pl-5' : 'pl-0 hover:pl-2'
                    }`}
                  >
                    {/* Gold left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-[var(--color-gold)]"
                      animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Title row — always visible */}
                    <div className="flex items-center gap-3 py-3.5">
                      <span className={`font-mono text-[11px] tracking-[0.1em] tabular-nums transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-line-strong)]'
                      }`}>
                        {num}
                      </span>
                      <h3 className={`font-semibold text-[15px] tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'
                      }`}>
                        {t(service.titleKey)}
                      </h3>
                    </div>

                    {/* Expandable description — CSS transition */}
                    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'max-h-[140px] opacity-100 pb-4' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-[13px] leading-[1.7] text-[var(--color-graphite-soft)] max-w-[400px] mb-3">
                        {t(service.descKey)}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-gold-lo)] hover:text-[var(--color-gold)] transition-colors">
                        {t('services.cta')}
                        <span className="text-sm">→</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── Right: tachymeter + orbital ring ── */}
            <div className="relative flex items-center justify-center h-[460px]">
              {/* Subtle orbital track */}
              <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-[var(--color-line)] opacity-25" />

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
                    onClick={() => scrollToService(i)}
                  />
                );
              })}

              {/* Tachymeter */}
              <div className="relative w-[240px] aspect-square z-10">
                <ScrollVideo
                  src="/tachymeter-opt.mp4"
                  containerRef={scrollAreaRef}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* ── Progress ── */}
          <div className="pb-8 flex items-center justify-center gap-2">
            {services.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToService(i)}
                className="h-[3px] rounded-full cursor-pointer"
                animate={{
                  width: i === activeIndex ? 28 : 8,
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
