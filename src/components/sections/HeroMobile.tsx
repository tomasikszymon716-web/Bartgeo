import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SplitText } from '../ui/SplitText';
import { Highlight } from '../ui/Highlight';
import { Button } from '../ui/Button';

export function HeroMobile() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-[100svh] pt-28 pb-6 px-5" aria-labelledby="hero-heading-m">
      <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-[var(--color-gold)] mb-5">
        {t('hero.eyebrow')}
      </p>
      <h1 id="hero-heading-m" className="font-display font-extrabold text-5xl tracking-[-0.035em] leading-[0.95] mb-6">
        <SplitText delay={1.4} renderWord={(word) => {
          const highlight = t('hero.h1_highlight');
          const highlightWords = highlight.split(' ');
          if (highlightWords.includes(word)) {
            return <Highlight delay={2.2}>{word}</Highlight>;
          }
          return word;
        }}>
          {`${t('hero.h1_1')} ${t('hero.h1_highlight')} ${t('hero.h1_2')}`}
        </SplitText>
      </h1>
      <motion.p
        className="text-base leading-[1.55] text-[var(--color-graphite-soft)] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        {t('hero.sub')}
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <Button variant="primary" href="#kontakt" className="w-full">{t('hero.cta_primary')}</Button>
        <Button variant="ghost" href="#realizacje" className="w-full">{t('hero.cta_ghost')}</Button>
      </motion.div>

      {/* Photo */}
      <motion.div
        className="rounded-xl overflow-hidden mb-8"
        style={{ height: 'min(60vw, 420px)' }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[var(--color-gold-tint)] opacity-15 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
            alt="Surveyor at work"
            className="w-full h-full object-cover grayscale"
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* Stats 2x2 grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.08em] text-[var(--color-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        {[
          { value: '15', label: t('hero.stat_years') },
          { value: '2014', label: t('hero.stat_projects') },
          { value: '5', label: t('hero.stat_counties') },
          { value: '🏆', label: t('hero.stat_award') },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="font-bold text-[var(--color-ink)]">{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
