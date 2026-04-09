import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { realizacje } from '../../data/realizacje';
import { partners } from '../../data/partners';

export function RealizacjeDesktop() {
  const { t } = useTranslation();

  return (
    <section id="realizacje" className="py-[80px]" aria-labelledby="realizacje-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('realizacje.eyebrow')}
          heading={t('realizacje.heading')}
          description={t('realizacje.sub')}
          id="realizacje-heading"
        />

        {/* Masonry grid */}
        <div className="columns-3 gap-6 mt-16 [&>div]:mb-6 [&>div]:break-inside-avoid">
          {realizacje.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: item.height }}
            >
              {/* TODO: replace with real project photos */}
              <img
                src={item.src}
                alt={t(item.captionKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              >
                <p className="text-sm font-medium text-[var(--color-gold)]">{t(item.captionKey)}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Partner marquee */}
        <div className="mt-20 border-t border-b border-[var(--color-line)] py-8">
          <Marquee duration={30}>
            <div className="flex items-center gap-12">
              {partners.map((partner, i) => (
                <span key={i} className="flex items-center gap-4 font-mono text-sm tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                  {partner}
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                </span>
              ))}
            </div>
          </Marquee>
        </div>

        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-gold-tint)] border border-[var(--color-gold)] rounded-full py-2.5 px-5">
            <Award className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="font-mono text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-gold-lo)]">
              {t('realizacje.badge')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
