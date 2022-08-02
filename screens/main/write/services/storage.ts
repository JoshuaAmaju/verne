import Storage from '@react-native-async-storage/async-storage';
import {Story} from '@shared/types/story';

export const key = 'verne/stories';

export async function getStories(): Promise<Record<Story['_id'], Story>> {
  const json = await Storage.getItem(key);
  return json ? JSON.parse(json) : [];
}

export async function getStory(id: Story['_id']): Promise<Story | undefined> {
  const stories = await getStories();
  return stories[id];
}

export async function saveStory(story: Story): Promise<void> {
  const stories = await getStories();
  return Storage.setItem(key, JSON.stringify({...stories, [story._id]: story}));
}
