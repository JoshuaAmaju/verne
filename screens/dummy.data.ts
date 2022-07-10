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

export type Room = {
  id: number;
  cover: string;
  title: string;
  community: string;
  participants: {
    id: number;
    type: 'host';
    name: string;
    avatar: string;
  }[];
};

export const ROOMS: Room[] = new Array(10).fill(0).map((_, i) => {
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

type Profile = {
  id: number;
  name: string;
  avatar: string;
};

export const PROFILES: Profile[] = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    avatar: COVER,
    name: 'Reynolds Andrews',
  };
});

export type Comment = {
  id: number;
  user: number;
  likes: number;
  comment: string;
  createdAt: string;
  comments: Comment[];
};

export const COMMENTS: Comment[] = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    user: i,
    likes: 1000,
    createdAt: new Date(),
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas aperiam sequi, delectus dolorum officia aliquam sed molestiae mollitia. Mollitia, aliquid repellat corporis voluptate corrupti blanditiis ipsa illo dignissimos iure laborum?',
    comments: [],
  };
});

export const ReportTypes = [
  {
    type: 1,
    label: 'Matured content',
    description:
      'This content should have been placed in matured category and rated 18',
  },
  {
    type: 2,
    label: 'Inappropraite story',
    description:
      'This story is reported as inappropraite if it contains any or all of the following',
    policy: [
      'Rape or non-consensual sex',
      'Sex involving a minor',
      'Incest',
      'Sex involving animals',
      'Includes or promotes violence',
      'Rape or non-consensual sex',
      'Animal cruelty',
      'Promotes descrimination or hate',
    ],
  },
  {
    type: 3,
    label: 'The cover image is inappropraite',
    description:
      'The cover image can be reported as inappropraite if it belongs in any of these categories',
    policy: [
      'Explicit cover',
      'Contains images of popular people',
      'Infringement of copyright',
    ],
  },
  {
    type: 4,
    label: 'The story violates copyright',
    description:
      'Kindly provide more details on how this story violates copyright',
  },
  {
    type: 5,
    label: 'Other reasons',
    description: 'Kindly provide the reason why you are reporting this story',
  },
];

export type Community = {
  id: number;
  name: string;
  avatar: string;
  members: Profile[];
  status?: 'member';
  description: string;
  type: 'free' | 'paid';
  rules: {name: string; description: string}[];
};

export const Communities: Community[] = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    type: 'free',
    avatar: COVER,
    name: 'Reynolds Andrews lovers',
    rules: new Array(10).fill(0).map(() => {
      return {
        name: 'Molestie diam.',
        description:
          'Only members have access to this community and can interact with it, see who is a member as well as what everyone else post',
      };
    }),
    members: new Array(10).fill(0).map((_, j) => {
      return {
        id: j,
        avatar: COVER,
        name: 'Reynolds Andrews',
      };
    }),
    description:
      'Everything Reynold Andrews, love, family, books, life, fans, travel and more',
  };
});
