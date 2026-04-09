import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollVideo } from '../ui/ScrollVideo';
import { services } from '../../data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

export function OfertaDesktop() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="oferta" className="relative py-[80px]" aria-labelledby="oferta-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* Heading — left-aligned (consistent with all other sections) */}
        <div className="mb-16">
          <SectionHeading
            eyebrow={t('services.eyebrow')}
            heading={t('services.heading')}
            description={t('services.sub')}
            id="oferta-heading"
          />
        </div>

        {/* Two columns — product (sticky centered) + service list */}
        <div className="grid grid-cols-2 gap-20 items-start">
          {/* Left — sticky product */}
          <div className="sticky top-32">
            <div className="w-full max-w-[480px]">
              <ScrollVideo
                src="/tachymeter-opt.mp4"
                containerRef={sectionRef}
                className="w-full aspect-square"
              />
            </div>
          </div>

          {/* Right — services */}
          <div>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const num = String(i + 1).padStart(2, '0');
              return (
                <motion.a
                  key={service.id}
                  href="#kontakt"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group block py-9 border-b border-[var(--color-line)] first:border-t cursor-pointer"
                >
                  <div className="flex items-start gap-5">
                    {/* Number */}
                    <span className="text-[13px] font-semibold text-[var(--color-gold)] pt-1 select-none tabular-nums">
                      {num}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-[20px] tracking-[-0.015em] leading-[1.3] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-gold-lo)]">
                          {t(service.titleKey)}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-[var(--color-line-strong)] shrink-0 translate-y-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-[var(--color-gold)]" />
                      </div>

                      {/* Description */}
                      <p className="text-[15px] leading-[1.6] text-[var(--color-muted)] max-w-[420px]">
                        {t(service.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}

            {/* CTA below list */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-10"
            >
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-gold-lo)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                {t('services.cta')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
