import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { opinie } from '../../data/opinie';
import { company } from '../../data/company';

export function OpinieDesktop() {
  const { t } = useTranslation();

  return (
    <section id="opinie" className="py-[80px]" aria-labelledby="opinie-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('reviews.eyebrow')}
          heading={t('reviews.heading')}
          center
          id="opinie-heading"
        />

        {/* Rating bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            ))}
          </div>
          <span className="font-mono text-sm tracking-[0.08em] text-[var(--color-muted)]">
            {t('reviews.google_rating')}
          </span>
          <a
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-hi)] transition-colors"
          >
            {t('reviews.see_all')}
          </a>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-3 gap-6 mt-16">
          {opinie.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-[var(--color-card)] rounded-[20px] p-8 border border-[var(--color-line)] shadow-[var(--shadow-card)]"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                ))}
              </div>
              <p className="text-[17px] leading-[1.6] text-[var(--color-ink-soft)] mb-6">
                &ldquo;{t(review.textKey)}&rdquo;
              </p>
              <div className="border-t border-[var(--color-line)] pt-4">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{review.author}</p>
                <p className="font-mono text-xs tracking-[0.08em] text-[var(--color-muted)] mt-0.5">
                  {t('reviews.google_client')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-hi)] transition-colors"
          >
            {t('reviews.see_all_long')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
