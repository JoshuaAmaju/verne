import {http} from '@shared/http';
import {Story} from '@shared/types/story';

export const key = 'verne/stories';

export async function getStories(): Promise<Record<Story['_id'], Story>> {
  const res = await http.get('/story/create');
  return res.data;
}

export async function getStory(id: Story['_id']): Promise<Story | undefined> {
  const res = await http.get(`/story/create/${id}`);
  return res.data;
}

export async function createStory(
  story: Pick<Story, 'title' | 'summary'>,
): Promise<void> {
  const res = await http.post('/story/create', story);
  return res.data;
}

export async function saveStory({
  _id,
  ...story
}: Partial<Story>): Promise<void> {
  const res = await http.put(`/story/update/${_id}`, story);
  return res.data;
}

export async function createChapter(
  story: Story['_id'],
  chapter: Record<'title' | 'content', string>,
): Promise<Story> {
  const res = await http.post('/story/create', {...chapter, storyId: story});
  return res.data;
}

export async function saveChapter(
  story: Story['_id'],
  chapter: Record<'title' | 'content', string>,
): Promise<Story> {
  const res = await http.post('/story/create', {...chapter, storyId: story});
  return res.data;
}
