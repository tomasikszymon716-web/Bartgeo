/**
 * Custom smooth scroll with controlled speed.
 *
 * Uses a hand-rolled rAF animation instead of browser scroll-behavior
 * so we control the speed through the Oferta sticky section.
 * Duration scales with distance — longer scroll = more time,
 * ensuring the tacheometer animation plays smoothly.
 */

let activeScrollRaf = 0;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const target = document.getElementById(id);
  if (!target) return;

  // Cancel any in-progress scroll animation
  if (activeScrollRaf) cancelAnimationFrame(activeScrollRaf);

  const start = window.scrollY;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const distance = Math.abs(targetTop - start);

  // Scale duration with distance — min 600ms, max 2800ms
  // ~0.5ms per pixel gives ~2300ms for 4560px Oferta crossing
  const duration = Math.min(2800, Math.max(600, distance * 0.5));

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + (targetTop - start) * eased);

    if (progress < 1) {
      activeScrollRaf = requestAnimationFrame(step);
    } else {
      activeScrollRaf = 0;
    }
  }

  activeScrollRaf = requestAnimationFrame(step);
}
