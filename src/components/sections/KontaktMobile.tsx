import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from '../forms/ContactForm';
import { company } from '../../data/company';

export function KontaktMobile() {
  const { t } = useTranslation();

  return (
    <section id="kontakt" className="py-16 px-5" aria-labelledby="kontakt-heading-m">
      <SectionHeading
        eyebrow={t('contact.eyebrow')}
        heading={t('contact.heading')}
        description={t('contact.sub')}
        id="kontakt-heading-m"
      />

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 bg-[var(--color-graphite)] text-[var(--color-bg)] rounded-[20px] p-7 shadow-[var(--shadow-soft)]"
      >
        <h3 className="font-bold text-lg leading-[1.2] mb-1">{company.name}</h3>
        <p className="text-sm text-[var(--color-gold-hi)] mb-5">{company.owner}</p>

        <div className="border-t border-[var(--color-gold)]/30 pt-5 space-y-4">
          <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
            {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-sm">
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
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 bg-[var(--color-card)] rounded-[20px] p-6 border border-[var(--color-line)]"
      >
        <ContactForm />
      </motion.div>

      {/* Map */}
      <div className="mt-6 rounded-[20px] overflow-hidden h-[300px] grayscale-[80%] contrast-[1.05]">
        <iframe
          src="https://www.google.com/maps?q=Trzebownisko+949,+36-001+Trzebownisko&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          title="BartGeo location"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
