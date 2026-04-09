export interface NavItem {
  labelKey: string;
  href: string;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.oferta', href: '#oferta' },
  { labelKey: 'nav.realizacje', href: '#realizacje' },
  { labelKey: 'nav.onas', href: '#o-nas' },
  { labelKey: 'nav.opinie', href: '#opinie' },
  { labelKey: 'nav.kontakt', href: '#kontakt' },
];
