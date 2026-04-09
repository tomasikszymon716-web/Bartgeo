import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Counter } from '../ui/Counter';

export function ONasDesktop() {
  const { t } = useTranslation();

  return (
    <section id="o-nas" className="py-[80px]" aria-labelledby="onas-heading">
      <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-12 gap-16">
        <div className="col-span-7">
          <SectionHeading
            eyebrow={t('about.eyebrow')}
            heading={t('about.heading')}
            id="onas-heading"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg leading-[1.65] text-[var(--color-graphite-soft)] max-w-[560px]"
          >
            {t('about.p1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-lg leading-[1.65] text-[var(--color-graphite-soft)] max-w-[560px]"
          >
            {t('about.p2')}
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              { value: 2014, label: t('about.stat_projects') },
              { value: 15, label: t('about.stat_years') },
              { value: 5, label: t('about.stat_counties') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <Counter
                  to={stat.value}
                  className="font-display font-extrabold text-[80px] leading-none tracking-[-0.04em] text-[var(--color-gold)]"
                />
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-graphite-soft)] mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 inline-flex items-center gap-2 bg-[var(--color-gold-tint)] rounded-full py-2.5 px-5"
          >
            <span className="text-base">🏆</span>
            <span className="font-mono text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-gold-lo)]">
              {t('about.badge')}
            </span>
          </motion.div>
        </div>

        <div className="col-span-5">
          {/* Space reserved for visual balance — tachymeter is in Oferta section */}
          <div className="sticky top-32 flex items-center justify-center h-[500px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full max-w-[400px] aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-gold-tint)] to-[var(--color-bg-alt)] flex items-center justify-center"
            >
              <span className="font-display font-extrabold text-[120px] text-[var(--color-gold)] opacity-20">15</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
