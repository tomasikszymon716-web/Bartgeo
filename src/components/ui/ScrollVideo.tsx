import { useRef, useEffect, useCallback, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface ScrollVideoProps {
  src: string;
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Apple-style scroll-scrubbed product showcase.
 *
 * Pipeline per frame:
 * 1. Draw video to offscreen canvas at native video resolution
 * 2. Process pixels: near-white → transparent (removes background)
 * 3. Draw processed result scaled up to retina display canvas
 *
 * Result: product floats on page with no visible box/edges.
 */
export function ScrollVideo({ src, className = '', containerRef }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const readyRef = useRef(false);
  const lastPaintedTime = useRef(-1);
  const seekingRef = useRef(false);
  const lastSeekedTime = useRef(-1);
  const videoW = useRef(0);
  const videoH = useRef(0);
  const loadedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Draw video frame with white-background removal
  const paint = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Skip if video hasn't actually advanced to a new frame
    const t = video.currentTime;
    if (Math.abs(t - lastPaintedTime.current) < 0.01) return;
    lastPaintedTime.current = t;

    const vw = videoW.current;
    const vh = videoH.current;

    // Get or create offscreen canvas at native video resolution
    let offscreen = offscreenRef.current;
    if (!offscreen) {
      offscreen = document.createElement('canvas');
      offscreen.width = vw;
      offscreen.height = vh;
      offscreenRef.current = offscreen;
    }

    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    // 1. Draw video at native resolution
    offCtx.drawImage(video, 0, 0, vw, vh);

    // 2. Remove near-white background via alpha
    const imageData = offCtx.getImageData(0, 0, vw, vh);
    const buf = imageData.data;
    const len = buf.length;

    // Use Uint32 view for faster iteration where possible
    for (let i = 0; i < len; i += 4) {
      if (buf[i] > 230 && buf[i + 1] > 230 && buf[i + 2] > 230) {
        buf[i + 3] = 0;
      }
    }
    offCtx.putImageData(imageData, 0, 0);

    // 3. Draw processed result to display canvas (scaled for retina)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
  }, []);

  // Continuous rAF loop — lerps toward target time, seeks only when a new frame is reachable
  const loop = useCallback(() => {
    const video = videoRef.current;
    if (!video || !readyRef.current) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    const target = targetTimeRef.current;
    const current = currentTimeRef.current;
    const delta = target - current;

    if (Math.abs(delta) > 0.0005) {
      // Gentle lerp — slow enough to never outrun the decoder
      const next = current + delta * 0.1;
      currentTimeRef.current = next;

      // Only issue a seek when we're not mid-seek and have moved enough for a new frame
      if (!seekingRef.current && Math.abs(next - lastSeekedTime.current) > 0.016) {
        seekingRef.current = true;
        video.currentTime = next;
      }
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Scroll → target time
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current;
    if (!video || !readyRef.current) return;
    targetTimeRef.current = progress * video.duration;
  });

  // Init
  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    videoRef.current = video;

    const onReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;

      videoW.current = video.videoWidth;
      videoH.current = video.videoHeight;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = video.videoWidth * dpr;
      canvas.height = video.videoHeight * dpr;

      video.currentTime = 0;
      currentTimeRef.current = 0;
      targetTimeRef.current = 0;

      // Paint only when the decoder delivers a new frame — eliminates jank
      video.addEventListener('seeked', () => {
        seekingRef.current = false;
        lastSeekedTime.current = video.currentTime;
        paint();
        if (!loadedRef.current) {
          loadedRef.current = true;
          setLoaded(true);
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    video.addEventListener('canplaythrough', onReady, { once: true });
    video.addEventListener('canplay', () => {
      setTimeout(() => { if (!readyRef.current) onReady(); }, 200);
    }, { once: true });
    video.load();

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      readyRef.current = false;
      video.src = '';
      videoRef.current = null;
    };
  }, [src, paint, loop]);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none select-none"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
}
