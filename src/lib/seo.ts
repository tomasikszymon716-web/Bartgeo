export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BartGeo Usługi Geodezyjno-Kartograficzne',
  founder: 'mgr inż. Bartłomiej Tomasik',
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
  image: '/og-image.jpg',
  vatID: 'PL5170221234',
};
