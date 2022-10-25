import Screen from '@shared/components/Screen';
import {Text, Toggle} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React, {useContext, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation, StackActions} from '@react-navigation/native';
import {ChevronRight} from '@shared/exports/icons';

import Button from '@shared/components/Button';
import {http} from '@shared/http';
import {Chip} from 'react-native-paper';
import {useMutation} from 'react-query';
import {Context, CoverType} from '../provider';

import storage from '@react-native-firebase/storage';
import {Res} from '@shared/types/server_response';
import {showMessage} from 'react-native-flash-message';
import {Story} from '@shared/types/story';

const Icon = () => <ChevronRight width={15} height={15} color="#000" />;

export default function StorySettings() {
  const nav = useNavigation();

  const {story, setStory} = useContext(Context);

  const {categories, tags} = story;

  const reference = useRef(storage().ref(`${story.title}_cover`));

  const mutation = useMutation(
    async () => {
      const {cover, ...rest} = story;

      let nCover: string | undefined;

      if (cover) {
        if (cover.type === CoverType.image) {
          // const form = new FormData();
          // form.append('image', cover.value);

          try {
            const f = await http.post('/story/upload/coverImage', {
              image: cover.value.base64,
            });

            console.log('image uploaded', f);
          } catch (error) {
            console.log('image upload error', error);
            throw error;
          }

          // await reference.current.putFile(cover.value);
          // nCover = await reference.current.getDownloadURL();
        } else {
          nCover = cover?.value;
        }
      }

      console.log(nCover);

      const res = await http.post<Story>('/story/create', {
        ...rest,
        categories: story.categories?.map(c => c._id),
        ...(cover && cover.type === CoverType.color
          ? {coverColor: cover.value}
          : {coverimageUrl: nCover}),
      });

      console.log(res.data);

      return res.data;
    },
    {
      onSuccess(data) {
        showMessage({type: 'success', message: 'Story created'});
        nav.dispatch(StackActions.replace('Writer.Write', {story: data._id}));
      },
      onError(error: Res<any>) {
        showMessage({type: 'danger', message: error.message});
      },
    },
  );

  return (
    <Screen>
      <VStack flex={1} space={4} justifyContent="space-between">
        <VStack space={12}>
          <VStack space={4}>
            <Text category="h1" style={{textAlign: 'center'}}>
              Almost Done
            </Text>

            <Text category="h2" style={{fontWeight: '400'}}>
              Kindly provide more information on your story
            </Text>
          </VStack>

          <VStack space={2}>
            <TouchableOpacity
              onPress={() => nav.navigate('SelectCategories' as any)}>
              <HStack space={2} style={styles.item}>
                {categories && categories?.length > 0 ? (
                  <View style={styles.chips}>
                    {categories.map(category => (
                      <Chip style={styles.chip}>{category.name}</Chip>
                    ))}
                  </View>
                ) : (
                  <Text category="p1">Category</Text>
                )}

                <Icon />
              </HStack>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => nav.navigate('SelectTags' as any)}>
              <HStack space={2} style={styles.item}>
                {tags && tags?.length > 0 ? (
                  <View style={styles.chips}>
                    {tags.map(tag => (
                      <Chip style={styles.chip}>{tag}</Chip>
                    ))}
                  </View>
                ) : (
                  <Text category="p1">Tags</Text>
                )}

                <Icon />
              </HStack>
            </TouchableOpacity>

            <HStack space={2} style={styles.item}>
              <Text category="p1">Is your story Rated 18+?</Text>

              <Toggle
                checked={story.rate18}
                onChange={rate18 => setStory({rate18})}
              />
            </HStack>
          </VStack>
        </VStack>

        {tags && tags?.length > 0 && categories && categories?.length > 0 ? (
          <Button
            {...(mutation.isLoading && {
              accessoryLeft: ({style}: any) => (
                <ActivityIndicator style={style} size="small" />
              ),
            })}
            onPress={() => mutation.mutate()}>
            Create story
          </Button>
        ) : (
          <Button
            onPress={() => {
              if (!categories || categories.length <= 0) {
                nav.navigate('SelectCategories' as any);
              } else if (!tags || tags.length <= 0) {
                nav.navigate('SelectTags' as any);
              }
            }}>
            Continue
          </Button>
        )}
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    justifyContent: 'space-between',
  },
  chip: {
    margin: 3,
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
