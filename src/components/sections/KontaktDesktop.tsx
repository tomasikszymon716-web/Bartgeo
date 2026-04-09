import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from '../forms/ContactForm';
import { company } from '../../data/company';

export function KontaktDesktop() {
  const { t } = useTranslation();

  return (
    <section id="kontakt" className="py-[80px]" aria-labelledby="kontakt-heading">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          heading={t('contact.heading')}
          description={t('contact.sub')}
          id="kontakt-heading"
        />

        <div className="grid grid-cols-12 gap-12 mt-16">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-5 bg-[var(--color-graphite)] text-[var(--color-bg)] rounded-[24px] p-10 shadow-[var(--shadow-soft)] self-start"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/brand/logo-icon.png" alt="BartGeo" className="h-9 w-9 object-contain" />
              <span className="text-[20px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                <span className="italic text-[var(--color-gold)]">Bart</span>
                <span className="text-white">Geo</span>
              </span>
            </div>
            <h3 className="font-bold text-[22px] leading-[1.2] mb-1">{company.name}</h3>
            <p className="text-sm text-[var(--color-gold-hi)] mb-6">{company.owner}</p>

            <div className="border-t border-[var(--color-gold)]/30 pt-6 space-y-5">
              <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-3 text-sm hover:text-[var(--color-gold)] transition-colors">
                <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-sm hover:text-[var(--color-gold)] transition-colors">
                <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                {company.email}
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>{company.address.street}, {company.address.postalCode} {company.address.city}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <div>
                  <p>{t('hours.monSat')}: 07:00–18:00</p>
                  <p>{t('hours.sunday')}: {t('hours.closed')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[var(--color-gold-tint)]/10 rounded-xl p-4">
              <p className="text-xs leading-relaxed text-[var(--color-gold-tint)]">
                {t('contact.info_note')}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-7 bg-[var(--color-card)] rounded-[24px] p-10 border border-[var(--color-line)] shadow-[var(--shadow-card)]"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Google Maps */}
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
