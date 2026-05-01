import { useState, useEffect } from 'react';

/* Breakpoints — chosen so iPad portrait/landscape (768–1180), iPad
   Pro 12.9" portrait (1024) and Surface Pro (912) all land in the
   tablet tier. Laptops typically open at ≥1280, so they get the
   desktop tier. */
const TABLET_MIN = 768;
const DESKTOP_MIN = 1280;

export type DeviceTier = 'mobile' | 'tablet' | 'desktop';

function detect(): DeviceTier {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < TABLET_MIN) return 'mobile';
  if (w < DESKTOP_MIN) return 'tablet';
  return 'desktop';
}

export function useDevice(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(detect);

  useEffect(() => {
    const update = () => setTier(detect());
    /* matchMedia changes only fire when crossing a single breakpoint,
       so we listen on both lines plus orientationchange as a belt-and-
       braces fallback for tablets that resize without firing resize. */
    const mqlTablet = window.matchMedia(`(min-width: ${TABLET_MIN}px)`);
    const mqlDesktop = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    mqlTablet.addEventListener('change', update);
    mqlDesktop.addEventListener('change', update);
    window.addEventListener('orientationchange', update);
    update();
    return () => {
      mqlTablet.removeEventListener('change', update);
      mqlDesktop.removeEventListener('change', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return tier;
}

export function useIsTablet(): boolean {
  return useDevice() === 'tablet';
}
