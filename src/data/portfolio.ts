/*
 * Portfolio data — six services, each with a gallery of photos.
 *
 * cover = gallery[0] by convention, so opening the lightbox starts on
 * the same photo shown in the card. Image URLs prefer local /photos/
 * assets where available, falling back to Unsplash IDs already
 * battle-tested elsewhere on the site (Hero, ONas, original Realizacje).
 *
 * w=1600 q=85 is sized for the lightbox at retina widths up to ~1280;
 * the card uses the same URL — Unsplash will serve a cached scaled
 * variant via auto=format. fit=crop keeps composition consistent.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export interface PortfolioEntry {
  /** services.ts id, used to look up titleKey/descKey/icon */
  serviceId: string;
  /** lucide icon name, mirrors services.ts for consistency */
  icon: string;
  /** translation key for service title (services.{key}.title) */
  titleKey: string;
  /** photos in display order — gallery[0] is the cover shown on the card */
  gallery: string[];
}

export const portfolio: PortfolioEntry[] = [
  {
    serviceId: 'mapy-projektowe',
    icon: 'Map',
    titleKey: 'services.map.title',
    gallery: [
      '/photos/realizacja-plan.jpg',
      u('1503387762-592deb58ef4e'),
      u('1564013799919-ab600027ffc6'),
      u('1486325212027-8081e485255e'),
    ],
  },
  {
    serviceId: 'tyczenie',
    icon: 'Crosshair',
    titleKey: 'services.stake.title',
    gallery: [
      u('1581094288338-2314dddb7ece'),
      '/photos/realizacja-pomiar.jpg',
      u('1572120360610-d971b9d7767c'),
      u('1465447142348-e9952c393450'),
    ],
  },
  {
    serviceId: 'inwentaryzacje',
    icon: 'ClipboardCheck',
    titleKey: 'services.inventory.title',
    gallery: [
      '/photos/realizacja-dom.jpg',
      u('1487958449943-2429e8be8625'),
      u('1564013799919-ab600027ffc6'),
      u('1517022812141-23620dba5c23'),
    ],
  },
  {
    serviceId: 'podzialy',
    icon: 'Scissors',
    titleKey: 'services.division.title',
    gallery: [
      u('1500382017468-9049fed747ef'),
      u('1486325212027-8081e485255e'),
      u('1429497419816-9ca5cfb4571a'),
      u('1504307651254-35680f356dfd'),
    ],
  },
  {
    serviceId: 'wznowienia',
    icon: 'Flag',
    titleKey: 'services.boundary.title',
    gallery: [
      u('1541976590-713941681591'),
      '/photos/realizacja-pomiar.jpg',
      u('1465447142348-e9952c393450'),
      u('1429497419816-9ca5cfb4571a'),
    ],
  },
  {
    serviceId: 'mapy-prawne',
    icon: 'Scale',
    titleKey: 'services.legal.title',
    gallery: [
      u('1564013799919-ab600027ffc6'),
      '/photos/realizacja-plan.jpg',
      u('1503387762-592deb58ef4e'),
      u('1572120360610-d971b9d7767c'),
    ],
  },
];
