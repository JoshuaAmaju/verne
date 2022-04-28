export type Category = {
  id: number;
  name: string;
};

type Chapter = {
  id: number;
  title: string;
  content: string[];
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
  parts: {
    chapters: Chapter[];
  }[];
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

const arrayTen = new Array(10).fill(0);

const content = arrayTen.map(
  () =>
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque commodi obcaecati, dicta corporis repudiandae voluptatibus numquam labore veniam dolore quo enim recusandae expedita unde hic at non! Explicabo, sit rem.',
);

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
    parts: arrayTen.map(() => ({
      chapters: arrayTen.map((_, i) => ({
        id: i,
        content,
        title: 'The very beginning',
      })),
    })),
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
