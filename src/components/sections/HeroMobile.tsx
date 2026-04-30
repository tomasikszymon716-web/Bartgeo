import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Highlight } from '../ui/Highlight';
import { Button } from '../ui/Button';

const photos = [
  { src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80', h: 240, mt: 0 },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', h: 190, mt: 28 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMobile() {
  const { t } = useTranslation();

  const highlight = t('hero.h1_highlight');
  const before = t('hero.h1_1');
  const after = t('hero.h1_2');

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col pt-24 pb-12 px-6" aria-labelledby="hero-heading-m">
      {/* Eyebrow */}
      <motion.p
        className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--color-gold)] uppercase mb-4"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t('hero.eyebrow')}
      </motion.p>

      {/* Heading — single fade-up, no per-word split (mobile perf) */}
      <motion.h1
        id="hero-heading-m"
        className="font-display font-extrabold text-[clamp(34px,9vw,46px)] tracking-[-0.03em] leading-[1.05] mb-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
      >
        {before}{' '}
        <Highlight delay={0.7}>{highlight}</Highlight>{' '}
        {after}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-[15px] leading-[1.7] text-[var(--color-graphite-soft)] mb-7"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {t('hero.sub')}
      </motion.p>

      {/* Photo gallery */}
      <motion.div
        className="flex gap-3 mb-7"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="flex-1 overflow-hidden rounded-2xl ring-1 ring-black/[0.06] shadow-[0_4px_20px_-6px_rgba(0,0,0,0.1)]"
            style={{ height: photo.h, marginTop: photo.mt }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-10 mix-blend-multiply z-10" />
              <img
                src={photo.src}
                alt={`BartGeo geodesy ${i + 1}`}
                className="w-full h-full object-cover grayscale"
                fetchPriority={i === 0 ? 'high' : undefined}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <Button variant="primary" href="#kontakt" className="w-full">{t('hero.cta_primary')}</Button>
        <Button variant="ghost" href="#realizacje" className="w-full">{t('hero.cta_ghost')}</Button>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        className="flex items-center justify-center gap-5 flex-wrap mt-auto pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {[
          { value: '15', label: t('hero.stat_years') },
          { value: '2014', label: t('hero.stat_projects') },
          { value: '5', label: t('hero.stat_counties') },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px] tracking-[0.02em] text-[var(--color-muted)]">
            {i > 0 && <span className="text-[var(--color-line-strong)] -ml-3 mr-0.5">·</span>}
            <span className="font-bold text-[var(--color-ink)]">{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
