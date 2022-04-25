export type Category = {
  id: number;
  name: string;
};

export type Entity = {
  id: number;
  cover: number;
  title: string;
  rating: number;
  author: string;
  summary: string;
  subtitle: string;
  categories: Category[];
};

export const COVER = require('../assets/png/img.jpg');

export const PROFILES = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    avatar: COVER,
    name: 'Reynolds Andrews',
  };
});

export const CATEGORIES = [
  {id: 1, name: 'Play'},
  {id: 2, name: 'Action'},
  {id: 3, name: 'Romance'},
  {id: 4, name: 'Adventure'},
  {id: 5, name: 'Fiction'},
  {id: 6, name: 'Mystery'},
];

export const DATA: Entity[] = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    rating: 4.5,
    cover: COVER,
    categories: CATEGORIES,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat et duis diam lectus posuere aliquam...',
  };
});

export const ROOMS = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    cover: COVER,
    community: 'Reynolds Andrews',
    title: 'Virtual video hangout with Reynolds Andrews, Yes or No?',
    participants: new Array(10000).fill(0).map((_, j) => {
      return {
        id: j,
        type: 'host',
        avatar: COVER,
        name: 'Reynolds Andrews',
      };
    }),
  };
});
