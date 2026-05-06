import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CopyInlineProps {
  /** Value placed on the clipboard. */
  value: string;
  /** Visible label shown to the user (may differ from `value`, e.g. formatted phone). */
  children: React.ReactNode;
  /** Optional `tel:` / `mailto:` / external URL — when set, the label becomes a link. */
  href?: string;
  external?: boolean;
  /** Tailwind class for the link/text colour states (defaults to footer-style). */
  textClass?: string;
  /** Tailwind class for the copy button (defaults to footer-style). */
  buttonClass?: string;
  ariaLabel?: string;
}

async function writeToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      /* fall through to fallback */
    }
  }
  const ta = document.createElement('textarea');
  ta.value = value;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  ta.style.pointerEvents = 'none';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* swallow */
  }
  document.body.removeChild(ta);
}

/* Slim inline variant of ContactRow tailored for the footer: no icon
   chip, label first, copy button to the right. The button is always
   visible on touch and fades in on hover for desktop, mirroring the
   contact card's behaviour but without the heavier card chrome. */
export function CopyInline({
  value,
  children,
  href,
  external,
  textClass = 'text-white/70 hover:text-[var(--color-gold)]',
  buttonClass = 'text-white/40 hover:text-[var(--color-gold)] hover:bg-white/[0.06]',
  ariaLabel,
}: CopyInlineProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await writeToClipboard(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const labelClasses = `min-w-0 transition-colors ${textClass}`;

  return (
    <span className="group inline-flex items-center gap-2 max-w-full">
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          aria-label={ariaLabel}
          className={labelClasses}
        >
          {children}
        </a>
      ) : (
        <span className={labelClasses}>{children}</span>
      )}

      <span className="relative shrink-0 w-7 h-7">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, scale: 0.9, x: 4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 flex items-center gap-1 h-7 px-2 rounded-md bg-[var(--color-gold)]/15 text-[var(--color-gold)] font-mono text-[9.5px] tracking-[0.14em] uppercase whitespace-nowrap"
              role="status"
              aria-live="polite"
            >
              <Check className="w-3 h-3" strokeWidth={2.5} />
              {t('contact.actions.copied')}
            </motion.span>
          ) : (
            <motion.button
              key="copy"
              type="button"
              onClick={onCopy}
              aria-label={t('contact.actions.copy')}
              title={t('contact.actions.copy')}
              whileTap={{ scale: 0.92 }}
              className={`absolute top-0 right-0 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-[background-color,color,opacity] duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100 ${buttonClass}`}
            >
              <Copy className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
