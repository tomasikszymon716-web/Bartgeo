import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Flag } from './Flag';

type FlagCode = 'PL' | 'DE' | 'CZ' | 'SK' | 'UA' | 'GB' | 'AT';

interface Country {
  code: FlagCode;
  dial: string;
  name: string;
}

const countries: Country[] = [
  { code: 'PL', dial: '+48',  name: 'Polska' },
  { code: 'DE', dial: '+49',  name: 'Deutschland' },
  { code: 'CZ', dial: '+420', name: 'Česko' },
  { code: 'SK', dial: '+421', name: 'Slovensko' },
  { code: 'UA', dial: '+380', name: 'Україна' },
  { code: 'GB', dial: '+44',  name: 'United Kingdom' },
  { code: 'AT', dial: '+43',  name: 'Österreich' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  id?: string;
}

export function PhoneInput({ value, onChange, label, error, id }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(countries[0]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Strip dial code from display value */
  const displayValue = value.startsWith(country.dial)
    ? value.slice(country.dial.length).trimStart()
    : value;

  const hasValue = displayValue.length > 0;

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d\s-]/g, '');
    onChange(`${country.dial} ${raw}`);
  };

  const selectCountry = (c: Country) => {
    setCountry(c);
    setOpen(false);
    /* Update phone value with new dial code */
    onChange(`${c.dial} ${displayValue}`);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`
          flex items-center border rounded-xl transition-all duration-200
          ${error
            ? 'border-[#D4634B] focus-within:border-[#D4634B] focus-within:ring-1 focus-within:ring-[#D4634B]/30'
            : 'border-[var(--color-line)] focus-within:border-[var(--color-gold)] focus-within:ring-1 focus-within:ring-[var(--color-gold)]'
          }
        `}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 pl-4 pr-2 py-2 shrink-0 cursor-pointer hover:bg-[var(--color-bg-alt)] rounded-l-xl transition-colors"
          aria-label="Select country code"
        >
          <Flag code={country.code} size={{ w: 20, h: 14 }} />
          <span className="text-[13px] font-mono text-[var(--color-muted)]">{country.dial}</span>
          <ChevronDown className={`w-3 h-3 text-[var(--color-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-[var(--color-line)] shrink-0" />

        {/* Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            id={id}
            type="tel"
            value={displayValue}
            onChange={handleInputChange}
            placeholder=" "
            autoComplete="tel"
            className="w-full bg-transparent px-3 pt-6 pb-2 text-base text-[var(--color-ink)] placeholder-transparent outline-none peer"
          />
          <label
            htmlFor={id}
            className={`
              absolute left-3 pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--color-gold)]
              ${hasValue ? 'top-1.5 text-xs' : 'top-4 text-base'}
              text-[var(--color-muted)]
            `}
          >
            {label} *
          </label>
        </div>
      </div>

      {/* Country dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 left-0 mt-1.5 bg-[var(--color-card)] border border-[var(--color-line)] rounded-xl overflow-hidden min-w-[220px]"
            style={{ boxShadow: '0 12px 40px -12px rgba(45, 64, 87, 0.18)' }}
          >
            <div className="py-1">
              {countries.map((c) => {
                const isActive = c.code === country.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => selectCountry(c)}
                    className={`
                      w-full text-left px-4 py-2.5 flex items-center gap-3 text-[14px]
                      transition-colors duration-100 cursor-pointer
                      hover:bg-[var(--color-gold-tint)]
                      ${isActive ? 'text-[var(--color-gold)] font-medium bg-[var(--color-gold-tint)]' : 'text-[var(--color-ink)]'}
                    `}
                  >
                    <Flag code={c.code} size={{ w: 22, h: 15 }} />
                    <span className="flex-1">{c.name}</span>
                    <span className="font-mono text-[12px] text-[var(--color-muted)]">{c.dial}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#D4634B] text-xs mt-1.5 pl-1"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
