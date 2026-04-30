import { useState, type ReactNode, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContactRowProps {
  icon: ReactNode;
  href?: string;
  external?: boolean;
  copyValue?: string;
  ariaLabel?: string;
  align?: 'center' | 'start';
  children: ReactNode;
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

export function ContactRow({
  icon,
  href,
  external,
  copyValue,
  ariaLabel,
  align = 'center',
  children,
}: ContactRowProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!copyValue) return;
    await writeToClipboard(copyValue);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const itemsAlign = align === 'start' ? 'items-start' : 'items-center';
  const textPad = align === 'start' ? 'pt-1.5' : '';
  const iconPad = align === 'start' ? 'mt-0.5' : '';

  const linkClasses = `flex-1 min-w-0 ${textPad} ${
    href ? 'cursor-pointer hover:text-[var(--color-gold)]' : ''
  } transition-colors`;

  return (
    <div className={`group flex ${itemsAlign} gap-3.5 text-[14px]`}>
      <div
        className={`w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 ${iconPad}`}
      >
        {icon}
      </div>

      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          aria-label={ariaLabel}
          className={linkClasses}
        >
          {children}
        </a>
      ) : (
        <div className={linkClasses}>{children}</div>
      )}

      {copyValue && (
        <div className="relative shrink-0 w-[120px] h-8 flex items-center justify-end">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.9, x: 4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 4 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-[var(--color-gold)]/15 text-[var(--color-gold)] font-mono text-[10.5px] tracking-[0.14em] uppercase whitespace-nowrap"
                role="status"
                aria-live="polite"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                {t('contact.actions.copied')}
              </motion.span>
            ) : (
              <motion.button
                key="copy"
                type="button"
                onClick={handleCopy}
                aria-label={t('contact.actions.copy')}
                title={t('contact.actions.copy')}
                whileTap={{ scale: 0.92 }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[var(--color-gold)]/15 text-white/55 hover:text-[var(--color-gold)] flex items-center justify-center cursor-pointer transition-[background-color,color,opacity] duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
              >
                <Copy className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
