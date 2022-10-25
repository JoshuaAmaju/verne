export type Chapter = {
  _id: string;
  title: string;
  views: number;
  content: string;
  isFree: boolean;
  comments: number;
  createdAt: string;
  updatedAt: string;
  wordsCount: number;
  isDisable: boolean;
  isPublished: boolean;
};

export type Story = {
  _id: string;
  title: string;
  views: number;
  tags: string[];
  author: string;
  rating: number;
  summary: string;
  rate18: boolean;
  comments: number;
  chapters: number;
  createdAt: string;
  updatedAt: string;
  coverColor: string;
  isPublished: boolean;
  coverimageUrl: string;
  publishedDate: string;
  categories: {_id: string; name: string}[];
};

export type Author = {
  _id: string;
  about: string;
  email: string;
  fullname: string;
  followers: number;
  following: number;
  gender: 'male';
  location: '';
  username: string;
};

export type StoryWithAuthor = Omit<Story, 'author'> & {author: Author};

export type StoryWithChapters = Omit<Story, 'chapters'> & {chapters: Chapter[]};
