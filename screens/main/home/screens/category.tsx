import {useNavigation, useRoute} from '@react-navigation/native';
import {IndexPath, MenuItem, OverflowMenu, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import Eye from '../../../../assets/icons/eye.svg';
import Settings from '../../../../assets/icons/settings.svg';
import ChatSquare from '../../../../assets/icons/square.chat.bubble.svg';
import Star from '../../../../assets/icons/star.svg';
import colors from '../../../../theme/colors';
import Section from '../../../components/section';
import Story from '../../../components/story';
import {DATA} from '../../../dummy.data';

import {useHeaderHeight} from '@react-navigation/elements';

import {abbreviate} from '@shared/utils';
import {useQuery} from 'react-query';

import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {StoryWithAuthor} from '@shared/types/story';
import {StatusBar} from '@shared/components/StatusBar';
// import * as Category from '@shared/services/category';

type ICategory = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
};

export default function Category() {
  const hero = DATA[0];

  const nav = useNavigation();

  const {id} = (useRoute().params ?? {}) as any;

  const headerHeight = useHeaderHeight();

  // const category = CATEGORIES.find(c => c.id === id);

  const [sortVisible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>();

  const category = useQuery(['category', 1, id], async () => {
    const res = await http.get<ICategory>(`/category/find/${id}`);
    return res.data;
  });

  const stories = useQuery(['category', id], async () => {
    const res = await http.get<Paginated<{stories: Array<StoryWithAuthor>}>>(
      `/story/category/${id}`,
    );

    return res.data;
  });

  // console.log('here', JSON.stringify(_stories.data));

  // const recent = useQuery(['recent_stories_by_category', id], () => {
  //   return Story.get_recentlyAdded();
  // });

  // const stories = useQuery(['stories_by_category', id], () => {
  //   return StoryService.get_byCategory(id);
  // });

  console.log(stories.data);

  const onItemSelect = useCallback<(index: IndexPath) => void>(index => {
    setSelectedIndex(index);
    setVisible(false);
  }, []);

  // useLayoutEffect(() => {
  //   if (category) {
  //     nav.setOptions({title: category.name});
  //   }
  // }, [category, nav]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero]}>
          <Image source={hero.cover} style={StyleSheet.absoluteFillObject} />

          <View
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
            ]}
          />

          <VStack
            py={6}
            h="full"
            space={2}
            justifyContent="space-between"
            style={{paddingTop: headerHeight}}>
            <HStack mx={6} my={3}>
              <Text category="h1">{category.data?.name}</Text>
            </HStack>

            <VStack p={4} space={2} alignItems="center">
              <Text category="h1" style={styles.title}>
                {hero.title}
              </Text>

              <Text category="h2" style={styles.subtitle}>
                {hero.subtitle}
              </Text>

              <HStack space={2}>
                {hero.categories.slice(0, 4).map(item => {
                  return (
                    <TouchableOpacity
                      // @ts-ignore
                      onPress={() => nav.navigate('Category', item)}>
                      <View style={styles.categoryPill}>
                        <Text category="label" style={styles.pillLabel}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </HStack>
            </VStack>
          </VStack>
        </View>

        <VStack space={4} py={4}>
          <Section title="Most Rated">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <Story {...item} />}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
            />
          </Section>

          <VStack space={4}>
            <HStack
              mx={6}
              space={1}
              alignItems="center"
              justifyContent="space-between">
              <Text category="h6">
                {category.data ? `All ${category.data.name} stories` : ''}
              </Text>

              <OverflowMenu
                visible={sortVisible}
                onSelect={onItemSelect}
                selectedIndex={selectedIndex}
                onBackdropPress={() => setVisible(false)}
                anchor={() => (
                  <TouchableNativeFeedback onPress={() => setVisible(true)}>
                    <HStack space={2} alignItems="center">
                      <Settings width={18} height={18} color="#000" />
                      <Text category="p2">Sort</Text>
                    </HStack>
                  </TouchableNativeFeedback>
                )}>
                <MenuItem title="Rating" />
                <MenuItem title="Reads" />
                <MenuItem title="A - Z" />
              </OverflowMenu>
            </HStack>

            <VStack space={6}>
              {stories.data?.stories.map(story => {
                return (
                  <HStack key={story._id} space={6} px={6}>
                    <Image
                      source={{uri: story.coverimageUrl}}
                      style={{width: 90, height: '100%', borderRadius: 8}}
                    />

                    <VStack space={3} flex={1}>
                      <VStack space={2}>
                        <VStack space="0.5">
                          <Text category="s1">{story.title}</Text>
                          <Text category="c1">{story.author.fullname}</Text>
                        </VStack>

                        <HStack space={8}>
                          <HStack space={1} alignItems="center">
                            <Text category="p2">{story.rating}</Text>
                            <Star width={13} height={13} color="#FFC107" />
                          </HStack>

                          <HStack space={1} alignItems="center">
                            <Text category="p2">{abbreviate(story.views)}</Text>
                            <Eye width={13} height={13} color="#000" />
                          </HStack>

                          <HStack space={1} alignItems="center">
                            <Text category="p2">
                              {abbreviate(story.comments)}
                            </Text>
                            <ChatSquare width={13} height={13} color="#000" />
                          </HStack>
                        </HStack>
                      </VStack>

                      <Text category="p2" numberOfLines={2}>
                        {story.summary}
                      </Text>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
  },
  categoryPill: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 17,
    backgroundColor: '#ffffff',
  },
  pillLabel: {
    color: colors.accent,
    textTransform: 'capitalize',
  },
  hero: {
    height: 400,
    // justifyContent: 'flex-end',
  },
  entityCard: {
    width: 180,
    height: 160,
    padding: 18,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  category: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: '#DDEEED',
  },
  hostLabel: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#EBEBEB',
  },
});
