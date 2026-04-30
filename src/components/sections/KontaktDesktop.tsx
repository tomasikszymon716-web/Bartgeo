import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactRow } from '../ui/ContactRow';
import { ContactForm } from '../forms/ContactForm';
import { company } from '../../data/company';

const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

export function KontaktDesktop() {
  const { t } = useTranslation();

  return (
    <section id="kontakt" className="py-[56px]" aria-labelledby="kontakt-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          heading={t('contact.heading')}
          description={t('contact.sub')}
          id="kontakt-heading"
        />

        <div className="grid grid-cols-12 gap-10 mt-16">
          {/* ── Info card ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-5"
          >
            <div
              className="bg-[var(--color-graphite)] text-[var(--color-bg)] rounded-[24px] p-10 h-full flex flex-col"
              style={{ boxShadow: '0 24px 64px -20px rgba(45, 64, 87, 0.3)' }}
            >
              {/* Logo + name */}
              <div className="flex items-center gap-2.5 mb-8">
                <img src="/brand/logo-icon.png" alt="BartGeo" className="h-9 w-9 object-contain" />
                <span className="text-[20px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  <span className="italic text-[var(--color-gold)]">Bart</span>
                  <span className="italic text-white">Geo</span>
                </span>
              </div>

              <h3 className="font-bold text-[20px] leading-[1.3] mb-1">{company.name}</h3>
              <p className="text-[13px] text-[var(--color-gold-hi)] mb-8">{company.owner}</p>

              {/* Contact items */}
              <div className="border-t border-white/10 pt-7 space-y-5 flex-1">
                <ContactRow
                  icon={<Phone className="w-4 h-4 text-[var(--color-gold)]" />}
                  href={`tel:${company.phoneRaw}`}
                  copyValue={company.phone}
                  ariaLabel={t('contact.actions.callPhone')}
                >
                  {company.phone}
                </ContactRow>
                <ContactRow
                  icon={<Mail className="w-4 h-4 text-[var(--color-gold)]" />}
                  href={`mailto:${company.email}`}
                  copyValue={company.email}
                  ariaLabel={t('contact.actions.sendEmail')}
                >
                  {company.email}
                </ContactRow>
                <ContactRow
                  icon={<MapPin className="w-4 h-4 text-[var(--color-gold)]" />}
                  href={directionsUrl}
                  external
                  copyValue={fullAddress}
                  ariaLabel={t('contact.actions.directions')}
                  align="start"
                >
                  {fullAddress}
                </ContactRow>
                <ContactRow
                  icon={<Clock className="w-4 h-4 text-[var(--color-gold)]" />}
                  align="start"
                >
                  <p>{t('hours.monSat')}: 07:00–18:00</p>
                  <p className="text-white/50">{t('hours.sunday')}: {t('hours.closed')}</p>
                </ContactRow>
              </div>

              {/* Info note */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[12px] leading-relaxed text-white/40">
                  {t('contact.info_note')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Form ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-7 bg-[var(--color-card)] rounded-[24px] p-10 border border-[var(--color-line)]"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* ── Google Maps ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-[24px] overflow-hidden h-[480px] grayscale-[80%] contrast-[1.05] hover:grayscale-0 transition-[filter] duration-700"
        >
          <iframe
            src="https://www.google.com/maps?q=Trzebownisko+949,+36-001+Trzebownisko&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            title="BartGeo location"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
