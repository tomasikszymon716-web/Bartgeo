import { useTranslation } from 'react-i18next';
import { navItems } from '../../data/nav';
import { company } from '../../data/company';

export function FooterMobile() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)] pt-16 pb-8 px-5">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-3">
        <img src="/brand/logo-icon.png" alt="BartGeo logo" className="h-8 w-auto" />
        <span className="font-display font-bold text-base">{company.shortName}</span>
      </div>
      <p className="text-sm text-white/60 mb-1">{company.name}</p>
      <p className="text-sm text-white/60 mb-8">NIP: {company.nip}</p>

      <div className="border-t border-white/10 pt-8 mb-8">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors">
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 pt-8 mb-8">
        <ul className="space-y-3 text-sm">
          <li>
            <a href={`tel:${company.phoneRaw}`} className="text-white/70 hover:text-[var(--color-gold)] transition-colors">
              {company.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`} className="text-white/70 hover:text-[var(--color-gold)] transition-colors">
              {company.email}
            </a>
          </li>
          <li className="text-white/70">{company.address.street}, {company.address.postalCode} {company.address.city}</li>
        </ul>
      </div>

      <div className="border-t border-white/10 pt-8 mb-8 flex items-center justify-between">
        <a href="/polityka-prywatnosci" className="text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors">
          {t('footer.privacy')}
        </a>
        <div className="flex items-center gap-3">
          {(['pl', 'en', 'de'] as const).map((code) => (
            <button
              key={code}
              onClick={() => i18n.changeLanguage(code)}
              className={`text-sm font-medium cursor-pointer ${i18n.language === code ? 'text-[var(--color-gold)]' : 'text-white/50'}`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-gold)]/20 pt-6">
        <p className="text-xs text-white/40 text-center">&copy; {new Date().getFullYear()} {company.shortName}. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
