export interface Opinia {
  author: string;
  textKey: string;
  rating: 5;
}

export const opinie: Opinia[] = [
  {
    author: 'Mateusz B.',
    textKey: 'reviews.review1',
    rating: 5,
  },
  {
    author: 'Grzegorz I.',
    textKey: 'reviews.review2',
    rating: 5,
  },
  {
    author: 'Rafał W.',
    textKey: 'reviews.review3',
    rating: 5,
  },
];
