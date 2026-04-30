import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

interface ScrollFramesProps {
  /** Folder under /public, e.g. "/tachymeter" */
  basePath: string;
  /** Filename pattern with %d placeholder, e.g. "frame_%03d.webp" */
  pattern: string;
  /** Number of frames (1-indexed). */
  frameCount: number;
  /** Native frame size — used as the canvas backing-store. */
  frameSize: number;
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
  /** Scroll offset window — same shape as framer's useScroll. */
  offset?: ['start center' | 'start start' | 'start end', 'end center' | 'end start' | 'end end'];
}

/**
 * Scroll-driven image-sequence player.
 *
 * Why this exists: video.currentTime seek is OS-dependent (smooth on macOS,
 * choppy on Windows). Per-pixel JS chroma-key kills any browser. This
 * component preloads N transparent PNG/WebP frames and only ever does
 * `ctx.drawImage(bitmap)` per scroll tick — pure GPU blit, smooth on every
 * OS / browser / input device.
 */
export function ScrollFrames({
  basePath,
  pattern,
  frameCount,
  frameSize,
  className = '',
  containerRef,
  offset = ['start center', 'end center'],
}: ScrollFramesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnRef = useRef(-1);
  const rafRef = useRef(0);
  const targetIdxRef = useRef(0);
  const dirtyRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset });

  // Preload all frames as <img> with decoded pixel data ready.
  useEffect(() => {
    let cancelled = false;
    const frames: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    framesRef.current = frames;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        // Filename is 1-indexed.
        const idx = (i + 1).toString().padStart(3, '0');
        img.src = `${basePath}/${pattern.replace('%03d', idx)}`;
        img.onload = () => {
          if (cancelled) return resolve();
          frames[i] = img;
          // Decode now so first paint doesn't stall.
          img.decode().catch(() => {}).finally(() => resolve());
        };
        img.onerror = () => resolve();
      });

    // Stagger load: first frame immediately, then a few in parallel.
    (async () => {
      // Load first frame fast → can paint a still while the rest stream in.
      await loadOne(0);
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (canvas && frames[0]) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frames[0], 0, 0, canvas.width, canvas.height);
          lastDrawnRef.current = 0;
        }
      }
      // Load the rest with bounded concurrency to avoid network thrash.
      const concurrency = 6;
      const queue: number[] = [];
      for (let i = 1; i < frameCount; i++) queue.push(i);
      const workers = Array.from({ length: concurrency }, async () => {
        while (queue.length && !cancelled) {
          const i = queue.shift();
          if (i === undefined) break;
          await loadOne(i);
        }
      });
      await Promise.all(workers);
      if (!cancelled) setLoaded(true);
    })();

    return () => {
      cancelled = true;
      framesRef.current = [];
    };
  }, [basePath, pattern, frameCount]);

  // Continuous rAF loop — pulls latest scroll progress and draws if frame changed.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (idx: number) => {
      const frames = framesRef.current;
      if (!frames.length) return;
      // Find nearest loaded frame near target — prevents flicker if a frame
      // is still streaming in.
      let chosen = idx;
      if (!frames[chosen]) {
        for (let d = 1; d < frameCount; d++) {
          if (frames[idx - d]) { chosen = idx - d; break; }
          if (frames[idx + d]) { chosen = idx + d; break; }
        }
      }
      const img = frames[chosen];
      if (!img) return;
      if (chosen === lastDrawnRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastDrawnRef.current = chosen;
    };

    /*
     * Tick only when scroll has advanced — eliminates the constant
     * 16ms wakeups when the section is on-screen but the user isn't
     * scrolling. Each scroll change marks the next frame dirty; rAF
     * draws once and goes idle until the next change.
     */
    const tick = () => {
      if (dirtyRef.current) {
        dirtyRef.current = false;
        draw(targetIdxRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const unsubscribe = scrollYProgress.on('change', (p) => {
      const idx = Math.max(0, Math.min(frameCount - 1, Math.round(p * (frameCount - 1))));
      if (idx !== targetIdxRef.current) {
        targetIdxRef.current = idx;
        dirtyRef.current = true;
      }
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      unsubscribe();
    };
  }, [scrollYProgress, frameCount]);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-7 h-7 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={frameSize}
        height={frameSize}
        className="w-full h-full pointer-events-none select-none"
        style={{
          opacity: loaded ? 1 : 0.4,
          transition: 'opacity 0.4s ease',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
