import {http} from '@shared/http';

type Category = {
  _id: string;
  name: string;
  imageUrl: string;
};

export async function get_categories(): Promise<Category[]> {
  const {data} = await http.get('/category/all');
  return data;
}
