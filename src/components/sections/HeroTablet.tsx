import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Highlight } from '../ui/Highlight';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/* Tablet hero — text column up top (centered, generous max-width),
   then a row of three editorial photos spanning full content width,
   then CTAs + stats anchored to the bottom. Bigger than Mobile,
   tighter than Desktop's 5+7 grid (which would cramp at <1280px). */

const photos = [
  { src: '/photos/hero-1.jpg', h: 320, mt: 20, pos: 'center' },
  { src: '/photos/hero-2.jpg', h: 380, mt: 0, pos: 'center 30%' },
  { src: '/photos/hero-3.jpg', h: 280, mt: 50, pos: 'center 45%' },
];

export function HeroTablet() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const y0 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const parallaxY = [y0, y1, y2];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col pt-28 pb-12 px-8"
      aria-labelledby="hero-heading-t"
    >
      <div className="max-w-[840px] mx-auto w-full">
        {/* ── Eyebrow ── */}
        <motion.p
          className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {t('hero.eyebrow')}
        </motion.p>

        {/* ── Heading ── */}
        <motion.h1
          id="hero-heading-t"
          className="font-display font-extrabold text-[clamp(40px,5.2vw,52px)] tracking-[-0.025em] leading-[1.1] mb-6"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {t('hero.h1_1')}{' '}
          <Highlight delay={0.85}>{t('hero.h1_highlight')}</Highlight>{' '}
          {t('hero.h1_2')}
        </motion.h1>

        {/* ── Sub + tagline ── */}
        <motion.p
          className="text-[16px] leading-[1.65] tracking-[-0.005em] text-[var(--color-graphite-soft)] max-w-[600px] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('hero.sub')}
        </motion.p>
        <motion.p
          className="text-[16px] leading-[1.6] tracking-[-0.005em] text-[var(--color-graphite)] max-w-[600px] font-medium mb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('hero.sub_tagline')}
        </motion.p>
      </div>

      {/* ── Photo row ── */}
      <motion.div
        className="max-w-[1100px] mx-auto w-full mt-2 mb-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        <div className="flex gap-4 justify-center">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="flex-1 max-w-[280px] overflow-hidden rounded-[18px] ring-1 ring-black/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
              style={{
                height: photo.h,
                marginTop: photo.mt,
                y: reduced ? 0 : parallaxY[i],
                willChange: reduced ? 'auto' : 'transform',
              }}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.1 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-10 mix-blend-multiply z-10" />
                <img
                  src={photo.src}
                  alt={`BartGeo geodesy project ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                  style={{ objectPosition: photo.pos }}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CTAs ── */}
      <div className="max-w-[840px] mx-auto w-full">
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Button variant="primary" href="#kontakt">{t('hero.cta_primary')}</Button>
          <Button variant="ghost" href="#realizacje">{t('hero.cta_ghost')}</Button>
        </motion.div>

        {/* ── Stats strip — anchored to bottom of column ── */}
        <motion.div
          className="flex items-center gap-6 text-[13.5px] tracking-[-0.005em] text-[var(--color-muted)] mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          {[
            { value: '15',   label: t('hero.stat_years') },
            { value: '2014', label: t('hero.stat_projects'), suffix: '+' },
            { value: '5',    label: t('hero.stat_counties') },
          ].map((stat, i) => (
            <div key={i} className="flex items-baseline gap-1.5">
              {i > 0 && <span className="text-[var(--color-line-strong)] -ml-2 mr-1">·</span>}
              <span className="flex items-baseline">
                <span className="font-bold text-[var(--color-ink)]">{stat.value}</span>
                {stat.suffix && (
                  <span className="font-bold text-[var(--color-gold)] ml-[1px] inline-block translate-y-[-0.12em]">{stat.suffix}</span>
                )}
              </span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
