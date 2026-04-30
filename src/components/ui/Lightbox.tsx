import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  /** Service title shown in header (e.g. "Mapy do celów projektowych") */
  title: string;
  images: string[];
  startIndex?: number;
}

const SWIPE_THRESHOLD = 70;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Lightbox({ open, onClose, title, images, startIndex = 0 }: LightboxProps) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, next, prev]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1000] flex flex-col bg-[var(--color-ink)]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* ── Header ───────────────────────────────────────── */}
          <div className="shrink-0 flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 pt-5 sm:pt-7 lg:pt-8 pb-3 lg:pb-4">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-1.5">
                {t('realizacje.lightbox.eyebrow')}
              </p>
              <h2 className="font-display font-bold text-[18px] sm:text-[22px] lg:text-[28px] tracking-[-0.02em] text-white leading-tight truncate">
                {title}
              </h2>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              <span className="font-mono text-[11px] lg:text-[12px] tracking-[0.14em] text-white/55 hidden sm:block tabular-nums">
                {String(index + 1).padStart(2, '0')}{' '}
                <span className="text-white/30">/</span>{' '}
                {String(images.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('realizacje.lightbox.close')}
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Main image ───────────────────────────────────── */}
          <div className="flex-1 relative flex items-center justify-center px-4 sm:px-12 lg:px-20 py-2 lg:py-4 min-h-0 select-none">
            {/* Prev (desktop) */}
            <button
              type="button"
              onClick={prev}
              aria-label={t('realizacje.lightbox.prev')}
              className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/[0.08] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] text-white items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
                drag={images.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x > SWIPE_THRESHOLD) prev();
                  else if (info.offset.x < -SWIPE_THRESHOLD) next();
                }}
                className="relative w-full h-full max-w-[1280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <img
                  src={images[index]}
                  alt={`${title} — ${index + 1}/${images.length}`}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Next (desktop) */}
            <button
              type="button"
              onClick={next}
              aria-label={t('realizacje.lightbox.next')}
              className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/[0.08] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] text-white items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* ── Mobile prev/next + counter ───────────────────── */}
          <div className="lg:hidden shrink-0 flex items-center justify-between px-5 sm:px-8 pb-3">
            <button
              type="button"
              onClick={prev}
              aria-label={t('realizacje.lightbox.prev')}
              className="w-10 h-10 rounded-full bg-white/[0.08] active:bg-[var(--color-gold)] active:text-[var(--color-ink)] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-[11px] tracking-[0.14em] text-white/55 tabular-nums">
              {String(index + 1).padStart(2, '0')}{' '}
              <span className="text-white/30">/</span>{' '}
              {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label={t('realizacje.lightbox.next')}
              className="w-10 h-10 rounded-full bg-white/[0.08] active:bg-[var(--color-gold)] active:text-[var(--color-ink)] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* ── Thumbnail strip ──────────────────────────────── */}
          {images.length > 1 && (
            <div className="shrink-0 px-5 sm:px-8 lg:px-12 pb-5 sm:pb-7 lg:pb-8">
              <div
                className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-1"
                role="tablist"
              >
                {images.map((src, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setIndex(i)}
                      aria-label={`${i + 1} / ${images.length}`}
                      className={`shrink-0 overflow-hidden rounded-lg transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-[68px] h-[48px] sm:w-[88px] sm:h-[60px] ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-ink)]'
                          : 'w-[60px] h-[42px] sm:w-[76px] sm:h-[52px] opacity-45 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
