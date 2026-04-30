import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { realizacje } from '../../data/realizacje';

/* Bento grid — asymmetric column widths create editorial rhythm
   Row 1:  5 + 3 + 4 = 12
   Row 2:  4 + 4 + 4 = 12
   Row 3:  3 + 5 + 4 = 12  */
const grid = [
  'col-span-5 h-[240px]', 'col-span-3 h-[240px]', 'col-span-4 h-[240px]',
  'col-span-4 h-[220px]', 'col-span-4 h-[220px]', 'col-span-4 h-[220px]',
  'col-span-3 h-[220px]', 'col-span-5 h-[220px]', 'col-span-4 h-[220px]',
];

export function RealizacjeDesktop() {
  const { t } = useTranslation();

  return (
    <section id="realizacje" className="py-[56px]" aria-labelledby="realizacje-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('realizacje.eyebrow')}
          heading={t('realizacje.heading')}
          description={t('realizacje.sub')}
          id="realizacje-heading"
        />

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-12 gap-3 mt-14">
          {realizacje.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`${grid[i]} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              {/* Image with zoom */}
              <img
                src={item.src}
                alt={t(item.captionKey)}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                loading="lazy"
              />

              {/* Permanent subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

              {/* Category tag — always visible */}
              <span className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md text-white/90 border border-white/10">
                {t(item.tagKey)}
              </span>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <p className="text-[15px] font-medium text-white leading-snug">
                    {t(item.captionKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Partner marquee ── */}
        <div className="mt-16 relative border-t border-b border-[var(--color-line)] py-9">
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 px-5 bg-[var(--color-bg)] flex items-center gap-3 whitespace-nowrap">
            <span className="h-px w-6 bg-[var(--color-gold)]/60" />
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--color-gold)]">
              {t('partners.label')}
            </span>
            <span className="h-px w-6 bg-[var(--color-gold)]/60" />
          </div>
          <Marquee duration={30}>
            <div className="flex items-center">
              {(['architectural', 'law', 'legal', 'notary', 'developers', 'individual'] as const).map((key) => (
                <span key={key} className="flex items-center font-mono text-sm tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                  {t(`partners.${key}`)}
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mx-6 shrink-0" />
                </span>
              ))}
            </div>
          </Marquee>
        </div>

      </div>
    </section>
  );
}
