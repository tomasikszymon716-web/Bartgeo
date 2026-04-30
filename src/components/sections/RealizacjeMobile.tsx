import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { realizacjeMobile } from '../../data/realizacje';

/*  Editorial layout: alternates full-width & 2-column rows
    Row 0: full (item 0)
    Row 1: split (items 1, 2)
    Row 2: full (item 3)
    Row 3: split (items 4, 5)  */

export function RealizacjeMobile() {
  const { t } = useTranslation();

  const rows: { items: typeof realizacjeMobile; full: boolean }[] = [];
  let idx = 0;
  let isFull = true;
  while (idx < realizacjeMobile.length) {
    if (isFull) {
      rows.push({ items: [realizacjeMobile[idx]], full: true });
      idx += 1;
    } else {
      rows.push({ items: realizacjeMobile.slice(idx, idx + 2), full: false });
      idx += 2;
    }
    isFull = !isFull;
  }

  return (
    <section id="realizacje" className="py-14 px-6" aria-labelledby="realizacje-heading-m">
      <SectionHeading
        eyebrow={t('realizacje.eyebrow')}
        heading={t('realizacje.heading')}
        description={t('realizacje.sub')}
        id="realizacje-heading-m"
      />

      <div className="flex flex-col gap-3 mt-8">
        {rows.map((row, ri) =>
          row.full ? (
            <div key={ri} className="relative rounded-2xl overflow-hidden h-[220px]">
              <img
                src={row.items[0].src}
                alt={t(row.items[0].captionKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-black/30 text-white/90">
                {t(row.items[0].tagKey)}
              </span>
              <p className="absolute bottom-3 left-3 right-3 text-[13px] font-medium text-white leading-snug">
                {t(row.items[0].captionKey)}
              </p>
            </div>
          ) : (
            <div key={ri} className="grid grid-cols-2 gap-3">
              {row.items.map((item, ii) => (
                <div key={ii} className="relative rounded-2xl overflow-hidden h-[180px]">
                  <img
                    src={item.src}
                    alt={t(item.captionKey)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full bg-black/30 text-white/85">
                    {t(item.tagKey)}
                  </span>
                </div>
              ))}
            </div>
          ),
        )}
      </div>

      {/* Partner marquee */}
      <div className="mt-10 relative border-t border-b border-[var(--color-line)] py-7">
        <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 px-3.5 bg-[var(--color-bg)] flex items-center gap-2 whitespace-nowrap">
          <span className="h-px w-3.5 bg-[var(--color-gold)]/60" />
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-gold)]">
            {t('partners.label')}
          </span>
          <span className="h-px w-3.5 bg-[var(--color-gold)]/60" />
        </div>
        <Marquee duration={25}>
          <div className="flex items-center">
            {(['architectural', 'law', 'legal', 'notary', 'developers', 'individual'] as const).map((key) => (
              <span key={key} className="flex items-center font-mono text-[11px] tracking-[0.06em] text-[var(--color-muted)] whitespace-nowrap">
                {t(`partners.${key}`)}
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)] mx-4 shrink-0" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
