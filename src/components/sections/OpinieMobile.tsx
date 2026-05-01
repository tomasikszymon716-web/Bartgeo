import { useTranslation } from 'react-i18next';
import { Star, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { opinie } from '../../data/opinie';
import { company } from '../../data/company';

export function OpinieMobile() {
  const { t } = useTranslation();

  return (
    <section id="opinie" className="py-14 md:py-16 px-6 md:px-8" aria-labelledby="opinie-heading-m">
      <div className="md:max-w-[760px] md:mx-auto">
      <SectionHeading
        eyebrow={t('reviews.eyebrow')}
        heading={t('reviews.heading')}
        id="opinie-heading-m"
      />

      {/* Google badge */}
      <a
        href={company.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 mt-5 mb-8"
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-muted)]">
          {t('reviews.google_rating')}
        </span>
      </a>

      {/* Stacked reviews — no framer-motion, pure CSS */}
      <div className="flex flex-col gap-8">
        {opinie.map((review, i) => (
          <div key={i}>
            <span className="block text-[56px] leading-[0.7] font-serif text-[var(--color-gold)] opacity-25 select-none mb-4">
              &ldquo;
            </span>

            <p className="text-[16px] leading-[1.8] text-[var(--color-ink)] pl-1">
              {t(review.textKey)}
            </p>

            <div className="mt-5 pl-1">
              <div className="w-8 h-px bg-[var(--color-gold)] opacity-40 mb-4" />
              <p className="text-[14px] font-semibold text-[var(--color-ink)]">
                {review.author}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex gap-px">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-[9px] h-[9px] fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  ))}
                </div>
                <span className="text-[9px] tracking-[0.08em] text-[var(--color-muted)] uppercase">
                  Google
                </span>
              </div>
            </div>

            {i < opinie.length - 1 && (
              <div className="mt-8 h-px bg-[var(--color-line)]" />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <a
          href={company.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-line-strong)] text-[13px] font-medium text-[var(--color-muted)] active:text-[var(--color-gold)] active:border-[var(--color-gold)] transition-colors"
        >
          {t('reviews.see_all')}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
      </div>
    </section>
  );
}
