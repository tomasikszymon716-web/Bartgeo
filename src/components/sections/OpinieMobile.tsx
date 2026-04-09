import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { opinie } from '../../data/opinie';
import { company } from '../../data/company';

export function OpinieMobile() {
  const { t } = useTranslation();

  return (
    <section id="opinie" className="py-16 px-5" aria-labelledby="opinie-heading-m">
      <SectionHeading
        eyebrow={t('reviews.eyebrow')}
        heading={t('reviews.heading')}
        center
        id="opinie-heading-m"
      />

      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
          ))}
        </div>
        <span className="font-mono text-xs tracking-[0.08em] text-[var(--color-muted)]">
          {t('reviews.google_rating')}
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {opinie.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[var(--color-card)] rounded-[20px] p-6 border border-[var(--color-line)]"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              ))}
            </div>
            <p className="text-base leading-[1.6] text-[var(--color-ink-soft)] mb-4">
              &ldquo;{t(review.textKey)}&rdquo;
            </p>
            <div className="border-t border-[var(--color-line)] pt-3">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{review.author}</p>
              <p className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-muted)] mt-0.5">
                {t('reviews.google_client')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={company.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--color-gold)]"
        >
          {t('reviews.see_all_long')}
        </a>
      </div>
    </section>
  );
}
