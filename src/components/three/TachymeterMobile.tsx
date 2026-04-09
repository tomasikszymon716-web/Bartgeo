import { useScroll, useTransform, motion } from 'framer-motion';

export function TachymeterMobile({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <motion.div className={`flex items-center justify-center ${className}`} style={{ rotate }}>
      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[200px] h-auto"
      >
        {/* Tripod legs */}
        <line x1="100" y1="180" x2="50" y2="275" stroke="#1F2A36" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="180" x2="150" y2="275" stroke="#1F2A36" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="180" x2="100" y2="278" stroke="#1F2A36" strokeWidth="4" strokeLinecap="round" />

        {/* Central column */}
        <rect x="96" y="120" width="8" height="65" rx="3" fill="#2D4057" />

        {/* Tripod hub */}
        <rect x="88" y="175" width="24" height="12" rx="4" fill="#2D4057" />

        {/* Main body */}
        <rect x="65" y="70" width="70" height="55" rx="8" fill="#F0A500" />

        {/* Screen */}
        <rect x="78" y="82" width="35" height="22" rx="4" fill="#0a0a0a" />

        {/* Telescope */}
        <rect x="45" y="56" width="110" height="14" rx="7" fill="#2D4057" />

        {/* Telescope lens left */}
        <circle cx="45" cy="63" r="9" fill="#1F2A36" />

        {/* Telescope lens right */}
        <circle cx="155" cy="63" r="9" fill="#1F2A36" />

        {/* Antenna */}
        <rect x="98" y="30" width="4" height="28" rx="2" fill="#2D4057" />

        {/* Side knobs */}
        <circle cx="65" cy="88" r="5" fill="#2D4057" />
        <circle cx="135" cy="88" r="5" fill="#2D4057" />
      </svg>
    </motion.div>
  );
}
