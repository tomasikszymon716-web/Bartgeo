import { useTranslation } from 'react-i18next';
import { navItems } from '../../data/nav';
import { company } from '../../data/company';
import { useNavLink } from '../../lib/useNavLink';

export function FooterMobile() {
  const { t, i18n } = useTranslation();
  const navTo = useNavLink();

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)] pt-16 pb-10 px-6">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-5">
        <img src="/brand/logo-icon.png" alt="BartGeo logo" className="h-9 w-9 object-contain" />
        <span className="text-[19px] font-bold leading-none" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          <span className="italic text-[var(--color-gold)]">Bart</span>
          <span className="italic text-white">Geo</span>
        </span>
      </div>
      <p className="text-[13px] text-white/75 leading-snug">{company.name}</p>
      <p className="text-[13px] text-[var(--color-gold-hi)] mt-1 mb-4">{company.owner}</p>
      <p className="text-[12px] text-white/40 mb-5">NIP: {company.nip}</p>
      <p className="text-[11px] font-semibold tracking-[0.06em] text-[var(--color-gold)]">
        {t('footer.tagline')}
      </p>

      {/* Navigation */}
      <div className="mt-10 pt-8 border-t border-white/10">
        <h3 className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase mb-5">
          {t('footer.nav')}
        </h3>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); navTo(item.href); }}
                className="text-[13px] text-white/70 active:text-[var(--color-gold)] transition-colors cursor-pointer"
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <h3 className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase mb-5">
          {t('footer.contact')}
        </h3>
        <ul className="space-y-3 text-[13px]">
          <li>
            <a href={`tel:${company.phoneRaw}`} className="text-white/70 active:text-[var(--color-gold)] transition-colors">
              {company.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`} className="text-white/70 active:text-[var(--color-gold)] transition-colors">
              {company.email}
            </a>
          </li>
          <li className="text-white/70">{company.address.street}, {company.address.postalCode} {company.address.city}</li>
        </ul>
      </div>

      {/* Language & Privacy */}
      <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase mb-3">
            {t('footer.language')}
          </h3>
          <div className="flex items-center gap-3">
            {(['pl', 'en', 'de'] as const).map((code) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`text-[12px] font-semibold tracking-[0.06em] cursor-pointer transition-colors ${
                  i18n.language === code ? 'text-[var(--color-gold)]' : 'text-white/50 active:text-[var(--color-gold)]'
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <a
          href="/polityka-prywatnosci"
          className="text-[12px] text-white/50 active:text-[var(--color-gold)] transition-colors"
        >
          {t('footer.privacy')}
        </a>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-[var(--color-gold)]/20">
        <p className="text-[11px] text-white/40 text-center mb-2">
          &copy; {new Date().getFullYear()} {company.shortName}. {t('footer.rights')}
        </p>
        <p className="font-mono text-[9px] tracking-[0.14em] text-white/25 text-center">
          {t('footer.made')}
        </p>
      </div>
    </footer>
  );
}
