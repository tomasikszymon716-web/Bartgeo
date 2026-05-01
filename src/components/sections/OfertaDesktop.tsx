import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { ScrollFrames } from '../ui/ScrollFrames';
import { SectionHeading } from '../ui/SectionHeading';
import { scrollToSection } from '../../lib/scrollToSection';
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
  const RADIUS = 260;
  const rotOffset = -activeIndex * (360 / total);
  const angle = ((index / total) * 360 - 90 + rotOffset) * (Math.PI / 180);
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  const isActive = activeIndex === index;

  return (
    <motion.button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      animate={{
        x: x - 24, y: y - 24,
        scale: isActive ? 1.25 : 0.9,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: isActive ? 1.3 : 1.1, opacity: 1 }}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
        isActive
          ? 'bg-[var(--color-gold)] shadow-[0_8px_30px_-6px_rgba(240,165,0,0.55)]'
          : 'bg-[var(--color-card)] border border-[var(--color-line-strong)] hover:border-[var(--color-gold)]/50 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]'
      }`}>
        <Icon className={`transition-colors duration-500 ${
          isActive ? 'w-5 h-5 text-white' : 'w-[18px] h-[18px] text-[var(--color-graphite)]'
        }`} />
      </div>
    </motion.button>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export function OfertaDesktop() {
  const { t } = useTranslation();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /* Ref mirror avoids stale-closure reads inside the scroll callback */
  const activeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: scrollAreaRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(5, Math.max(0, Math.floor(v * 6)));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActiveIndex(idx);
    }
  });

  const scrollToService = useCallback((index: number) => {
    const area = scrollAreaRef.current;
    if (!area) return;
    const areaTop = area.getBoundingClientRect().top + window.scrollY;
    const areaH = area.offsetHeight;
    const viewportH = window.innerHeight;
    /* useScroll progress is measured over the SCROLLABLE distance,
       which is areaH - viewportH (not areaH). Mapping by areaH
       overshoots by viewportH ≈ one slice on tall monitors, which
       is exactly the "lands on next item" bug. The +0.1 places the
       target 10% into slice `index` so Math.floor(progress * 6)
       lands cleanly on `index`. */
    const usable = Math.max(0, areaH - viewportH);
    const fraction = (index + 0.1) / 6;
    const target = areaTop + fraction * usable;
    window.scrollTo({ top: Math.min(target, areaTop + usable), behavior: 'smooth' });
  }, []);

  return (
    <section id="oferta" aria-labelledby="oferta-heading">
      <div ref={scrollAreaRef} style={{ height: '380vh' }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* ── Header — left-aligned, consistent with other sections ── */}
          <div className="max-w-[1280px] mx-auto px-10 w-full pt-14 pb-2">
            <SectionHeading
              eyebrow={t('services.eyebrow')}
              heading={t('services.heading')}
              id="oferta-heading"
            />
          </div>

          {/* ── Content grid ── */}
          <div className="flex-1 max-w-[1280px] mx-auto px-10 w-full grid grid-cols-[1fr_520px] gap-14 items-start pt-12">

            {/* ── Left: Service list ── */}
            <div className="flex flex-col">
              {services.map((service, i) => {
                const isActive = activeIndex === i;
                const prevActive = activeIndex === i - 1;
                const Icon = iconMap[service.icon];
                const num = String(i + 1).padStart(2, '0');

                return (
                  <button
                    key={service.id}
                    onClick={() => scrollToService(i)}
                    className="relative text-left cursor-pointer group"
                  >
                    {/* Separator line — hidden when adjacent to active */}
                    {i > 0 && (
                      <div
                        className={`absolute top-0 right-0 h-px transition-all duration-500 ${
                          isActive || prevActive
                            ? 'opacity-0 left-0'
                            : 'opacity-100 left-16'
                        }`}
                        style={{ background: 'var(--color-line)' }}
                      />
                    )}

                    {/* Card highlight — always in DOM, toggled via CSS opacity
                        (no mount/unmount = no layoutId ghost on fast scroll) */}
                    <div
                      className={`absolute -inset-x-1 -inset-y-0.5 rounded-2xl bg-[var(--color-card)] transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                      style={{
                        border: '1px solid var(--color-line)',
                        boxShadow: '0 1px 0 0 rgba(45,64,87,0.04), 0 16px 40px -16px rgba(45,64,87,0.1)',
                      }}
                    />

                    {/* Gold accent bar — always in DOM */}
                    <div
                      className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-hi))' }}
                    />

                    {/* Content */}
                    <div className={`relative z-10 flex items-start gap-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'py-5 px-7' : 'py-[14px] px-4 hover:px-5'
                    }`}>
                      {/* Number column */}
                      <span
                        className={`font-mono font-bold tabular-nums leading-none min-w-[44px] transition-all duration-500 ${
                          isActive
                            ? 'text-[30px] text-[var(--color-gold)] mt-0.5'
                            : 'text-[22px] text-[var(--color-line-strong)] mt-[3px] group-hover:text-[var(--color-muted)]'
                        }`}
                      >
                        {num}
                      </span>

                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-center gap-3">
                          {/* Icon — CSS width transition (no framer-motion) */}
                          <div
                            className={`overflow-hidden shrink-0 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive ? 'w-9 opacity-100 mr-0.5' : 'w-0 opacity-0 mr-0'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-[var(--color-gold-tint)] flex items-center justify-center">
                              <Icon className="w-[18px] h-[18px] text-[var(--color-gold)]" />
                            </div>
                          </div>

                          <h3 className={`font-semibold tracking-[-0.01em] transition-all duration-500 ${
                            isActive
                              ? 'text-[18px] text-[var(--color-ink)]'
                              : 'text-[16px] text-[var(--color-graphite-soft)] group-hover:text-[var(--color-ink)]'
                          }`}>
                            {t(service.titleKey)}
                          </h3>
                        </div>

                        {/* Expandable description */}
                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? 'max-h-[130px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-[15px] leading-[1.7] text-[var(--color-graphite-soft)] max-w-[420px]">
                            {t(service.descKey)}
                          </p>
                          <a
                            href="#kontakt"
                            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-hi)] transition-colors mt-3"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToSection('#kontakt'); }}
                          >
                            {t('services.cta')}
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-px">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── Right: Tachymeter + orbital ring ── */}
            <div className="relative flex items-center justify-center h-[520px]">
              {/* Decorative rings */}
              <div className="absolute w-[520px] h-[520px] rounded-full border border-dashed border-[var(--color-line)] opacity-[0.15]" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-[var(--color-line)] opacity-[0.08]" />

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

              {/* Central tachymeter */}
              <div className="relative w-[300px] aspect-square z-10">
                <ScrollFrames
                  basePath="/tachymeter"
                  pattern="frame_%03d.webp"
                  frameCount={60}
                  frameSize={600}
                  containerRef={scrollAreaRef}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* ── Progress ── */}
          <div className="pb-6 flex items-center justify-center gap-5">
            <span className="font-mono text-[11px] tracking-[0.12em] tabular-nums text-[var(--color-muted)]">
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="mx-1.5 text-[var(--color-line-strong)]">/</span>
              06
            </span>
            <div className="flex items-center gap-1.5">
              {services.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToService(i)}
                  className="h-[3px] rounded-full cursor-pointer"
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
      </div>
    </section>
  );
}
