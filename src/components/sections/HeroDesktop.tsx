import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SplitText } from '../ui/SplitText';
import { Highlight } from '../ui/Highlight';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const photos = [
  { src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80', h: 480, mt: 48, pos: 'center' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', h: 572, mt: 0, pos: 'center' },
  { src: '/photos/hero-3.jpg', h: 424, mt: 90, pos: 'center 45%' },
];

export function HeroDesktop() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const y0 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY = [y0, y1, y2];

  return (
    <section ref={sectionRef} id="hero" className="min-h-screen flex flex-col pt-36 pb-14" aria-labelledby="hero-heading">
      <div className="max-w-[1280px] mx-auto px-10 w-full grid grid-cols-12 gap-10 flex-1">
        {/* Left column — text */}
        <div className="col-span-5 pt-8 flex flex-col">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-gold)] mb-7 uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {t('hero.eyebrow')}
          </motion.p>
          <h1 id="hero-heading" className="font-display font-extrabold text-[clamp(36px,3.6vw,56px)] tracking-[-0.025em] leading-[1.15] mb-7">
            <SplitText delay={1.4} renderWord={(word, i) => {
              const highlight = t('hero.h1_highlight');
              const highlightWords = highlight.split(' ');
              if (highlightWords.includes(word)) {
                return <Highlight delay={2.2 + i * 0.1}>{word}</Highlight>;
              }
              return word;
            }}>
              {`${t('hero.h1_1')} ${t('hero.h1_highlight')} ${t('hero.h1_2')}`}
            </SplitText>
          </h1>
          <motion.p
            className="text-[16px] leading-[1.65] tracking-[-0.005em] text-[var(--color-graphite-soft)] max-w-[420px] mb-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            {t('hero.sub')}
          </motion.p>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <Button variant="primary" href="#kontakt">{t('hero.cta_primary')}</Button>
            <Button variant="ghost" href="#realizacje">{t('hero.cta_ghost')}</Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex items-center gap-6 text-[13px] tracking-[-0.005em] text-[var(--color-muted)] mt-auto pt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.4 }}
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
                    <span className="font-bold text-[var(--color-gold)] ml-[1px]">{stat.suffix}</span>
                  )}
                </span>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — photos */}
        <div className="col-span-7 relative">
          <div className="flex gap-5 justify-end">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                className="w-[27.5%] overflow-hidden rounded-[20px] ring-1 ring-black/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                style={{
                  height: photo.h,
                  marginTop: photo.mt,
                  y: reduced ? 0 : parallaxY[i],
                  willChange: reduced ? 'auto' : 'transform',
                }}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.5 + i * 0.12 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-10 mix-blend-multiply z-10" />
                  <img
                    src={photo.src}
                    alt={`BartGeo geodesy project ${i + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                    style={{ objectPosition: photo.pos }}
                    fetchPriority={i === 0 ? 'high' : undefined}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
