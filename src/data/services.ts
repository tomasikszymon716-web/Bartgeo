export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

export const services: Service[] = [
  { id: 'mapy-projektowe', icon: 'Map', titleKey: 'services.map.title', descKey: 'services.map.desc' },
  { id: 'tyczenie', icon: 'Crosshair', titleKey: 'services.stake.title', descKey: 'services.stake.desc' },
  { id: 'inwentaryzacje', icon: 'ClipboardCheck', titleKey: 'services.inventory.title', descKey: 'services.inventory.desc' },
  { id: 'podzialy', icon: 'Scissors', titleKey: 'services.division.title', descKey: 'services.division.desc' },
  { id: 'wznowienia', icon: 'Flag', titleKey: 'services.boundary.title', descKey: 'services.boundary.desc' },
  { id: 'mapy-prawne', icon: 'Scale', titleKey: 'services.legal.title', descKey: 'services.legal.desc' },
];
