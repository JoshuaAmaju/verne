import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Button from '@shared/components/Button';
import {useParam} from '@shared/hooks/use_params';
import {http} from '@shared/http';
import {Box, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useMutation, useQuery} from 'react-query';

import {MoreVertical} from '@shared/exports/icons';
import {Chapter as IChapter, StoryWithChapters} from '@shared/types/story';
import {MenuItem, OverflowMenu, Spinner, Text} from '@ui-kitten/components';
import {format, formatDistanceToNow} from 'date-fns';

import RenderHtml from 'react-native-render-html';

function Chapter({
  data,
  index,
  onMutate,
}: {
  index: number;
  data: IChapter;
  onMutate?: () => void;
}) {
  const {width} = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const deleteMutation = useMutation(
    async () => {
      const res = await http.delete(`/chapter/delete/${data._id}`);
      return res.data;
    },
    {onSuccess: () => onMutate?.()},
  );

  return (
    <VStack space={2} p={4} bg="#EFFBF9" borderRadius={8}>
      <Text category="c2" style={styles.chapter_caption}>
        Chapter {index}
      </Text>

      <VStack space={2}>
        <HStack space={4} justifyContent="space-between">
          <Text category="h2">{data.title}</Text>

          <OverflowMenu
            visible={visible}
            onSelect={() => deleteMutation.mutate()}
            onBackdropPress={() => setVisible(false)}
            anchor={() => (
              <TouchableOpacity onPress={() => setVisible(true)}>
                <MoreVertical width={15} height={15} color="#525252" />
              </TouchableOpacity>
            )}>
            <MenuItem title="Delete this chapter" />
          </OverflowMenu>
        </HStack>

        <RenderHtml
          contentWidth={width}
          baseStyle={{color: 'black'}}
          source={{html: data.content.slice(0, 100)}}
        />

        {/* <Text numberOfLines={3}>{data.content}</Text> */}
      </VStack>

      <Text category="c1" style={styles.chapter_caption}>
        Last updated{' '}
        {formatDistanceToNow(new Date(data.updatedAt), {addSuffix: true})}
      </Text>
    </VStack>
  );
}

export default function Story() {
  const nav = useNavigation();

  const id = useParam<{id: string}>('id');

  const query = useQuery(['author_story', id], async () => {
    const res = await http.get<StoryWithChapters>(`/story/${id}`);
    return res.data;
  });

  // console.log(query.data);

  const publishMutation = useMutation(async () => {
    const res = await http.get(`/story/publish/${id}`);
    return res.data;
  });

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <Button
          {...(publishMutation.isLoading && {
            accessoryLeft: () => <Spinner size="tiny" />,
          })}
          appearance="ghost"
          onPress={() => publishMutation.mutate()}>
          Publish
        </Button>
      ),
    });
  }, [nav, id, publishMutation]);

  useFocusEffect(
    useCallback(() => {
      query.refetch();
    }, [query]),
  );

  if (!query.data) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <VStack flex={1} justifyContent="space-between">
      <FlatList
        extraData={query.data}
        initialNumToRender={5}
        data={query.data.chapters}
        contentContainerStyle={{padding: 24}}
        ItemSeparatorComponent={() => <Box h={3} />}
        ListHeaderComponentStyle={{marginBottom: 24}}
        ListHeaderComponent={() => {
          return (
            <VStack space={4}>
              {/* <Image
                style={{width: 80, height: 100}}
                source={{uri: query.data?.coverimageUrl}}
              /> */}

              <Text category="h1" style={{fontSize: 24}}>
                {query.data?.title}
              </Text>

              <VStack space={2}>
                <Text>{query.data?.chapters.length ?? 0} chapter(s)</Text>

                <Text category="p2" style={{color: '#9E9E9E'}}>
                  Created{' '}
                  {format(new Date(query.data?.createdAt), 'do LLLL yyyy')}
                </Text>

                <Text category="p2" style={{color: '#9E9E9E'}}>
                  Last updated{' '}
                  {formatDistanceToNow(new Date(query.data.updatedAt), {
                    addSuffix: true,
                  })}
                </Text>
              </VStack>
            </VStack>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                nav.navigate('Writer.Write', {
                  chapter: item._id,
                  story: query.data._id,
                });
              }}>
              <Chapter index={index + 1} data={item} onMutate={() => {}} />
            </TouchableOpacity>
          );
        }}
      />

      <Box p={4}>
        <Button
          onPress={() => {
            // @ts-ignore
            nav.navigate('Writer.Write', {story: query.data._id});
          }}>
          Add chapter
        </Button>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  chapter_caption: {
    color: '#9E9E9E',
  },
});
