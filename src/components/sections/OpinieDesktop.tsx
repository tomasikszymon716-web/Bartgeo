import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { opinie } from '../../data/opinie';
import { company } from '../../data/company';

export function OpinieDesktop() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <section
      id="opinie"
      className="py-[56px]"
      aria-labelledby="opinie-heading"
    >
      <div className="max-w-[1280px] mx-auto px-10 w-full">
        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-10">
          <SectionHeading
            eyebrow={t('reviews.eyebrow')}
            heading={t('reviews.heading')}
            id="opinie-heading"
          />

          <a
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 pb-1 shrink-0 group"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-[14px] h-[14px] fill-[var(--color-gold)] text-[var(--color-gold)]"
                />
              ))}
            </div>
            <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
              {t('reviews.google_rating')}
            </span>
          </a>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          {opinie.map((review, i) => (
            <motion.div
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between"
            >
              {/* Quote mark */}
              <div>
                <span className="block text-[64px] leading-[0.8] font-serif text-[var(--color-gold)] opacity-30 select-none mb-4">
                  &ldquo;
                </span>
                <p className="text-[16px] leading-[1.8] tracking-[-0.01em] text-[var(--color-ink)] pl-1">
                  {t(review.textKey)}
                </p>
              </div>

              {/* Separator + Author */}
              <div className="mt-8 pl-1">
                <div className="w-10 h-px bg-[var(--color-gold)] opacity-40 mb-4" />
                <p className="text-[14px] font-semibold text-[var(--color-ink)]">
                  {review.author}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex gap-px">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-[10px] h-[10px] fill-[var(--color-gold)] text-[var(--color-gold)]"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.06em] text-[var(--color-muted)] uppercase">
                    Google
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <a
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--color-line-strong)] text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors group"
          >
            {t('reviews.see_all_long')}
            <ArrowUpRight className="w-[14px] h-[14px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
