import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { realizacjeMobile } from '../../data/realizacje';
import { partners } from '../../data/partners';

export function RealizacjeMobile() {
  const { t } = useTranslation();

  return (
    <section id="realizacje" className="py-16 px-5" aria-labelledby="realizacje-heading-m">
      <SectionHeading
        eyebrow={t('realizacje.eyebrow')}
        heading={t('realizacje.heading')}
        description={t('realizacje.sub')}
        id="realizacje-heading-m"
      />

      <div className="grid grid-cols-2 gap-3 mt-12">
        {realizacjeMobile.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-xl overflow-hidden h-[180px]"
          >
            <img
              src={item.src}
              alt={t(item.captionKey)}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 border-t border-b border-[var(--color-line)] py-6">
        <Marquee duration={25}>
          <div className="flex items-center gap-8">
            {partners.map((partner, i) => (
              <span key={i} className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                {partner}
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 bg-[var(--color-gold-tint)] border border-[var(--color-gold)] rounded-full py-2 px-4">
          <Award className="w-4 h-4 text-[var(--color-gold)]" />
          <span className="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--color-gold-lo)]">
            {t('realizacje.badge')}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
