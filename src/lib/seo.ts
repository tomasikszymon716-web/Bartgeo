export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://www.bartgeo.pl/#business',
  name: 'BartGeo Usługi Geodezyjno-Kartograficzne',
  alternateName: 'BartGeo',
  description:
    'Geodeta z powiatu rzeszowskiego z 15-letnim doświadczeniem. Mapy do celów projektowych, tyczenia budynków, podziały nieruchomości, wznowienia granic i mapy prawne. Laureat plebiscytu Orły Geodezji 2025–2026.',
  url: 'https://www.bartgeo.pl/',
  logo: 'https://www.bartgeo.pl/brand/logo-icon.png',
  image: 'https://www.bartgeo.pl/brand/logo-icon.png',
  founder: {
    '@type': 'Person',
    name: 'Bartłomiej Tomasik',
    honorificPrefix: 'mgr inż.',
  },
  telephone: '+48669563771',
  email: 'bbartgeo@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Trzebownisko 949',
    postalCode: '36-001',
    addressLocality: 'Trzebownisko',
    addressCountry: 'PL',
  },
  areaServed: [
    'Powiat rzeszowski',
    'Powiat łańcucki',
    'Powiat kolbuszowski',
    'Powiat ropczycko-sędziszowski',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  vatID: 'PL5170221234',
  taxID: '5170221234',
  award: [
    'Laureat plebiscytu Orły Geodezji 2026',
    'Laureat plebiscytu Orły Geodezji 2025',
    'Silver — plebiscyt Orły Geodezji 2025',
  ],
  sameAs: [
    'https://www.orlygeodezji.pl/profile-1350-bartgeo-uslugi-geodezyjno-kartograficzne',
  ],
};
