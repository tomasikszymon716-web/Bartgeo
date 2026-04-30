import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  id?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  error,
  id,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  const hasValue = value !== '';

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

  /* Keyboard nav */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(options.findIndex((o) => o.value === value));
        } else if (focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setOpen(false);
        }
        return;
      }
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [open, focusedIndex, options, value, onChange],
  );

  /* Scroll focused item into view */
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return;
    const items = listRef.current.children;
    if (items[focusedIndex]) {
      (items[focusedIndex] as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        onClick={() => {
          setOpen(!open);
          if (!open) setFocusedIndex(options.findIndex((o) => o.value === value));
        }}
        onKeyDown={handleKeyDown}
        className={`
          w-full text-left bg-transparent border rounded-xl px-4 pt-6 pb-2 text-base
          outline-none transition-all duration-200 cursor-pointer
          ${error
            ? 'border-[#D4634B] focus:border-[#D4634B] focus:ring-1 focus:ring-[#D4634B]/30'
            : open
              ? 'border-[var(--color-gold)] ring-1 ring-[var(--color-gold)]'
              : 'border-[var(--color-line)] hover:border-[var(--color-line-strong)]'
          }
        `}
      >
        <span className={hasValue ? 'text-[var(--color-ink)]' : 'text-transparent'}>
          {hasValue ? selectedLabel : '.'}
        </span>

        {/* Floating label */}
        <span
          className={`
            absolute left-4 pointer-events-none transition-all duration-200
            ${hasValue || open
              ? 'top-1.5 text-xs'
              : 'top-4 text-base'
            }
            ${open ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}
          `}
        >
          {label} *
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]
            transition-transform duration-200
            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 left-0 right-0 mt-1.5 bg-[var(--color-card)] border border-[var(--color-line)] rounded-xl overflow-hidden"
            style={{ boxShadow: '0 12px 40px -12px rgba(45, 64, 87, 0.18)' }}
          >
            <div
              ref={listRef}
              role="listbox"
              className="max-h-[240px] overflow-y-auto py-1"
            >
              {options.map((option, i) => {
                const isSelected = option.value === value;
                const isFocused = i === focusedIndex;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    onMouseEnter={() => setFocusedIndex(i)}
                    className={`
                      w-full text-left px-4 py-2.5 text-[14px] flex items-center justify-between
                      transition-colors duration-100 cursor-pointer
                      ${isFocused ? 'bg-[var(--color-gold-tint)]' : ''}
                      ${isSelected ? 'text-[var(--color-gold)] font-medium' : 'text-[var(--color-ink)]'}
                    `}
                  >
                    {option.label}
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-gold)]" />}
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
