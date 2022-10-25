import {Story} from '@shared/types/story';
import {createContext} from 'react';
import {Asset} from 'react-native-image-picker';

export enum CoverType {
  color = 'color',
  image = 'image',
}

export type PartialStory = Partial<
  Story & {
    cover:
      | {type: CoverType.image; value: Asset}
      | {type: CoverType.color; value: string};
  }
>;

export type Actions = {
  setStory(story: PartialStory): void;
};

export const Context = createContext<{story: PartialStory} & Actions>(
  {} as any,
);
