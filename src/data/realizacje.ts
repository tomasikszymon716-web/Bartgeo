export interface Realizacja {
  src: string;
  captionKey: string;
  tagKey: string;
}

export const realizacje: Realizacja[] = [
  {
    src: '/photos/realizacja-plan.jpg',
    captionKey: 'realizacje.caption1',
    tagKey: 'realizacje.tags.maps',
  },
  {
    src: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800',
    captionKey: 'realizacje.caption2',
    tagKey: 'realizacje.tags.settingOut',
  },
  {
    src: '/photos/realizacja-dom.jpg',
    captionKey: 'realizacje.caption3',
    tagKey: 'realizacje.tags.asBuilt',
  },
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    captionKey: 'realizacje.caption4',
    tagKey: 'realizacje.tags.divisions',
  },
  {
    src: '/photos/realizacja-pomiar.jpg',
    captionKey: 'realizacje.caption5',
    tagKey: 'realizacje.tags.restorations',
  },
  {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    captionKey: 'realizacje.caption6',
    tagKey: 'realizacje.tags.legalMaps',
  },
  {
    src: 'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800',
    captionKey: 'realizacje.caption7',
    tagKey: 'realizacje.tags.support',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    captionKey: 'realizacje.caption8',
    tagKey: 'realizacje.tags.divisions',
  },
  {
    src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800',
    captionKey: 'realizacje.caption9',
    tagKey: 'realizacje.tags.settingOut',
  },
];

export const realizacjeMobile = realizacje.slice(0, 6);
