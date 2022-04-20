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
  subtitle: string;
  categories: Category[];
};

export const COVER = require('../../assets/png/img.jpg');

export const PROFILES = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    avatar: COVER,
    name: 'Reynolds Andrews',
  };
});

export const DATA: Entity[] = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    rating: 4.5,
    cover: COVER,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    categories: [
      {id: 1, name: 'play'},
      {id: 2, name: 'action'},
      {id: 3, name: 'romance'},
      {id: 4, name: 'adventure'},
      {id: 5, name: 'fiction'},
      {id: 6, name: 'mystery'},
    ],
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
