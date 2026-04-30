import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactRow } from '../ui/ContactRow';
import { ContactForm } from '../forms/ContactForm';
import { company } from '../../data/company';

const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

export function KontaktMobile() {
  const { t } = useTranslation();

  return (
    <section id="kontakt" className="py-14 px-6" aria-labelledby="kontakt-heading-m">
      <SectionHeading
        eyebrow={t('contact.eyebrow')}
        heading={t('contact.heading')}
        description={t('contact.sub')}
        id="kontakt-heading-m"
      />

      {/* Info card */}
      <div
        className="mt-10 bg-[var(--color-graphite)] text-[var(--color-bg)] rounded-2xl p-7"
        style={{ boxShadow: '0 20px 50px -16px rgba(45, 64, 87, 0.28)' }}
      >
        <div className="flex items-center gap-2.5 mb-6">
          <img src="/brand/logo-icon.png" alt="BartGeo" className="h-8 w-8 object-contain" />
          <span className="text-[17px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <span className="italic text-[var(--color-gold)]">Bart</span>
            <span className="italic text-white">Geo</span>
          </span>
        </div>

        <h3 className="font-bold text-[17px] leading-[1.3] mb-1">{company.name}</h3>
        <p className="text-[13px] text-[var(--color-gold-hi)] mb-6">{company.owner}</p>

        <div className="border-t border-white/10 pt-6 space-y-4">
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

        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[12px] leading-relaxed text-white/40">{t('contact.info_note')}</p>
        </div>
      </div>

      {/* Form card */}
      <div
        className="mt-5 bg-[var(--color-card)] rounded-2xl p-7 border border-[var(--color-line)]"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <ContactForm />
      </div>

      {/* Map */}
      <div className="mt-5 rounded-2xl overflow-hidden h-[280px] grayscale-[80%] contrast-[1.05]">
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
