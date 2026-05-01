import { useDevice } from './useDevice';

/* Back-compat: returns true for both mobile and tablet (touch-first
   tiers) — used by CursorDot and any caller that just needs "is this
   a non-desktop / non-pointer-precise device?". For three-way layout
   routing, use useDevice() directly. */
export function useIsMobile(): boolean {
  return useDevice() !== 'desktop';
}
