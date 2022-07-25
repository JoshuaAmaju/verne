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
