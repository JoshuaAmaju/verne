import {http} from '@shared/http';
import {Pageable} from '@shared/types/server_response';
import {Story} from '@shared/types/story';

export async function get_all(): Promise<Story[]> {
  const {data} = await http.get<Pageable<{stories: Story[]}>>(
    'story/user/stories',
    {params: {isPublished: false}},
  );

  return data.data.stories;
}

export async function get_recentlyAdded(): Promise<Story[]> {
  const {data} = await http.get<Pageable<{stories: Story[]}>>('/story/all');
  return data.data.stories;
}

export async function get_byCategory(usingId: string): Promise<Story[]> {
  const {data} = await http.get<Pageable<{stories: Story[]}>>(
    `/category/${usingId}`,
  );
  return data.data.stories;
}