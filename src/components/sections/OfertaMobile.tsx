import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollVideo } from '../ui/ScrollVideo';
import { services } from '../../data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Crosshair, ClipboardCheck, Scissors, Flag, Scale,
};

export function OfertaMobile() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="oferta" className="py-16 px-5" aria-labelledby="oferta-heading-m">
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        heading={t('services.heading')}
        description={t('services.sub')}
        id="oferta-heading-m"
      />

      <ScrollVideo
        src="/tachymeter-opt.mp4"
        containerRef={sectionRef}
        className="w-full aspect-square max-w-[320px] mx-auto my-10"
      />

      <div className="flex flex-col gap-4">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[var(--color-card)] rounded-[20px] p-6 border border-[var(--color-line)]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold-tint)] flex items-center justify-center mb-4">
                {Icon && <Icon className="w-5 h-5 text-[var(--color-gold-lo)]" />}
              </div>
              <h3 className="font-semibold text-lg tracking-[-0.015em] leading-[1.2] text-[var(--color-ink)] mb-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-sm leading-[1.55] text-[var(--color-muted)] mb-3">{t(service.descKey)}</p>
              <a href="#kontakt" className="text-sm font-medium text-[var(--color-gold)]">
                {t('services.cta')}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
