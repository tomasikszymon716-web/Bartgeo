/*
 * Cross-platform flag component.
 *
 * Why inline SVG, not emoji: Windows ships without country flag glyphs
 * by default — emoji like 🇵🇱 / 🇬🇧 / 🇩🇪 fall back to letter pairs
 * (PL / GB / DE) on most Windows + Chromium combos. SVG renders the
 * same on every OS / browser / display density.
 *
 * The flags fill a fixed aspect-ratio container with rounded corners
 * and a subtle ring so they read as crisp badges at small sizes.
 */

type FlagCode = 'PL' | 'EN' | 'GB' | 'DE' | 'CZ' | 'SK' | 'UA' | 'AT';

interface FlagProps {
  code: FlagCode;
  className?: string;
  /** Width × height in CSS pixels. Defaults to a 21×14 badge. */
  size?: { w: number; h: number };
  /** Skip the rounded ring (use raw SVG only). */
  bare?: boolean;
}

function FlagSvg({ code }: { code: FlagCode }) {
  switch (code) {
    case 'PL':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="8" height="5" fill="#FFFFFF" />
          <rect width="8" height="2.5" y="2.5" fill="#DC143C" />
        </svg>
      );

    case 'DE':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="5" height="1" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      );

    case 'EN':
    case 'GB':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" preserveAspectRatio="none" className="w-full h-full block">
          <clipPath id="bg-clip"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
          <clipPath id="diag-clip"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
          <g clipPath="url(#bg-clip)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#diag-clip)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'CZ':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="60" height="20" fill="#FFFFFF" />
          <rect y="20" width="60" height="20" fill="#D7141A" />
          <path d="M0,0 L30,20 L0,40 z" fill="#11457E" />
        </svg>
      );

    case 'SK':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="9" height="2" fill="#FFFFFF" />
          <rect y="2" width="9" height="2" fill="#0B4EA2" />
          <rect y="4" width="9" height="2" fill="#EE1C25" />
        </svg>
      );

    case 'UA':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 4" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="6" height="2" fill="#0057B7" />
          <rect width="6" height="2" y="2" fill="#FFD700" />
        </svg>
      );

    case 'AT':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" preserveAspectRatio="none" className="w-full h-full block">
          <rect width="9" height="2" fill="#ED2939" />
          <rect y="2" width="9" height="2" fill="#FFFFFF" />
          <rect y="4" width="9" height="2" fill="#ED2939" />
        </svg>
      );
  }
}

export function Flag({ code, className = '', size, bare = false }: FlagProps) {
  const w = size?.w ?? 21;
  const h = size?.h ?? 14;

  const inner = <FlagSvg code={code} />;

  if (bare) {
    return (
      <span className={`inline-block ${className}`} style={{ width: w, height: h }} aria-hidden>
        {inner}
      </span>
    );
  }

  return (
    <span
      className={`inline-block overflow-hidden rounded-[3px] ring-1 ring-black/[0.08] align-middle shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${className}`}
      style={{ width: w, height: h }}
      aria-hidden
    >
      {inner}
    </span>
  );
}
