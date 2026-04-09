export interface Realizacja {
  src: string;
  height: number;
  captionKey: string;
}

export const realizacje: Realizacja[] = [
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800', height: 320, captionKey: 'realizacje.caption1' },
  { src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800', height: 260, captionKey: 'realizacje.caption2' },
  { src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800', height: 380, captionKey: 'realizacje.caption3' },
  { src: 'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800', height: 300, captionKey: 'realizacje.caption4' },
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800', height: 340, captionKey: 'realizacje.caption5' },
  { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', height: 280, captionKey: 'realizacje.caption6' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800', height: 360, captionKey: 'realizacje.caption7' },
  { src: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800', height: 300, captionKey: 'realizacje.caption8' },
  { src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800', height: 320, captionKey: 'realizacje.caption9' },
];

export const realizacjeMobile = realizacje.slice(0, 6);
