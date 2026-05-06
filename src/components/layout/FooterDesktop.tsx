import { useTranslation } from 'react-i18next';
import { navItems } from '../../data/nav';
import { company } from '../../data/company';
import { LangSwitcher } from './LangSwitcher';
import { CopyInline } from '../ui/CopyInline';
import { useNavLink } from '../../lib/useNavLink';

export function FooterDesktop() {
  const { t } = useTranslation();
  const navTo = useNavLink();
  const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)] pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-12 gap-10">
        {/* Brand */}
        <div className="col-span-4">
          <div className="flex items-center gap-2.5 mb-5">
            <img src="/brand/logo-icon.png" alt="BartGeo logo" className="h-10 w-10 object-contain" />
            <span className="text-[22px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              <span className="italic text-[var(--color-gold)]">Bart</span>
              <span className="italic text-white">Geo</span>
            </span>
          </div>
          <p className="text-[13px] text-white/75 leading-snug max-w-[280px]">{company.name}</p>
          <p className="text-[13px] text-[var(--color-gold-hi)] mt-1 mb-5">{company.owner}</p>
          <p className="text-[12px] text-white/40 mb-6">NIP: {company.nip}</p>
          <p className="text-[11px] font-semibold tracking-[0.06em] text-[var(--color-gold)]">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Navigation */}
        <div className="col-span-3">
          <h3 className="font-mono text-xs tracking-[0.12em] text-white/40 uppercase mb-6">{t('footer.nav')}</h3>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); navTo(item.href); }}
                  className="text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-3">
          <h3 className="font-mono text-xs tracking-[0.12em] text-white/40 uppercase mb-6">{t('footer.contact')}</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <CopyInline
                value={company.phone}
                href={`tel:${company.phoneRaw}`}
                ariaLabel={t('contact.actions.callPhone')}
              >
                {company.phone}
              </CopyInline>
            </li>
            <li>
              <CopyInline
                value={company.email}
                href={`mailto:${company.email}`}
                ariaLabel={t('contact.actions.sendEmail')}
              >
                {company.email}
              </CopyInline>
            </li>
            <li>
              <CopyInline value={fullAddress} ariaLabel={t('contact.actions.directions')}>
                {fullAddress}
              </CopyInline>
            </li>
          </ul>
        </div>

        {/* Language & Legal */}
        <div className="col-span-2">
          <h3 className="font-mono text-xs tracking-[0.12em] text-white/40 uppercase mb-6">{t('footer.language')}</h3>
          <div className="mb-6">
            <LangSwitcher variant="light" />
          </div>
          <a
            href="/polityka-prywatnosci"
            className="text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors"
          >
            {t('footer.privacy')}
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1280px] mx-auto px-10 mt-16 pt-8 border-t border-[var(--color-gold)]/20">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {company.shortName}. {t('footer.rights')}</p>
          <p className="font-mono text-xs tracking-[0.12em] text-white/30">{t('footer.made')}</p>
        </div>
      </div>
    </footer>
  );
}
