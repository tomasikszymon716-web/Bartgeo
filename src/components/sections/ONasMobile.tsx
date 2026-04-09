import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Counter } from '../ui/Counter';

export function ONasMobile() {
  const { t } = useTranslation();

  return (
    <section id="o-nas" className="py-16 px-5" aria-labelledby="onas-heading-m">
      <SectionHeading
        eyebrow={t('about.eyebrow')}
        heading={t('about.heading')}
        id="onas-heading-m"
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-base leading-[1.65] text-[var(--color-graphite-soft)]"
      >
        {t('about.p1')}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-base leading-[1.65] text-[var(--color-graphite-soft)]"
      >
        {t('about.p2')}
      </motion.p>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {[
          { value: 2014, label: t('about.stat_projects') },
          { value: 15, label: t('about.stat_years') },
          { value: 5, label: t('about.stat_counties') },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <Counter
              to={stat.value}
              className="font-display font-extrabold text-5xl leading-none tracking-[-0.04em] text-[var(--color-gold)]"
            />
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-graphite-soft)] mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 bg-[var(--color-gold-tint)] rounded-full py-2 px-4">
          <span className="text-base">🏆</span>
          <span className="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--color-gold-lo)]">
            {t('about.badge')}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
