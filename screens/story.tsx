import {useNavigation, useRoute} from '@react-navigation/native';
import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {Author, Chapter, Story as IStory} from '@shared/types/story';
import {Layout, Text} from '@ui-kitten/components';
import {Box, Center, HStack, VStack} from 'native-base';
import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import {IconButton} from 'react-native-paper';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Bookmark from '../assets/icons/bookmark.svg';
import ChevronRight from '../assets/icons/chevron.right.svg';
import Eye from '../assets/icons/eye.svg';
import Flag from '../assets/icons/flag.svg';
import Share from '../assets/icons/share.svg';
import ChatSquare from '../assets/icons/square.chat.bubble.svg';
import Star from '../assets/icons/star.svg';
import Button from '../shared/components/Button';
import {abbreviate} from '../shared/utils';
import colors from '../theme/colors';
import {DATA} from './dummy.data';

const {height} = Dimensions.get('screen');

const IconProps = {
  width: 13,
  height: 13,
  color: '#fff',
};

export default function Story() {
  const nav = useNavigation();
  const {params = {} as any} = useRoute();

  const {_id} = params as IStory;

  const queryClient = useQueryClient();

  const query = useQuery(['story', _id], async () => {
    const res = await http.get<
      Omit<IStory, 'author' | 'chapters'> & {
        author: Author;
        chapters: Chapter[];
      }
    >(`/story/${_id}`);

    return res.data;
  });

  const savedStoriesQuery = useQuery(['saved_stories'], async () => {
    const res = await http.get<Paginated<any>>('/story/saved');
    return res.data;
  });

  console.log('saved stories', savedStoriesQuery.data);

  const save = useMutation(
    async () => {
      const res = await http.get(`/story/save/${_id}`);
      return res.data;
    },
    {
      onSuccess(data) {
        queryClient.cancelQueries(['saved_stories']);
        queryClient.invalidateQueries(['saved_stories']);
      },
    },
  );

  console.log('save', save.data);

  // console.log('query', query.data, _id);

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <HStack space={2}>
          {save.isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <IconButton
              size={18}
              color="#fff"
              onPress={() => save.mutate()}
              icon={({size, color}) => (
                <Bookmark width={size} height={size} color={color} />
              )}
            />
          )}

          <IconButton
            size={18}
            color="#fff"
            icon={({size, color}) => (
              <Flag width={size} height={size} color={color} />
            )}
          />

          <IconButton
            size={18}
            color="#fff"
            icon={({size, color}) => (
              <Share width={size} height={size} color={color} />
            )}
          />
        </HStack>
      ),
    });
  }, [nav, save]);

  if (query.data) {
    const {data} = query;
    const {title, author, coverimageUrl} = query.data;

    return (
      <Layout style={styles.expand}>
        <Image
          source={{uri: coverimageUrl}}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <VStack space={6}>
            {/* Details */}
            <VStack px={6} space={0.5}>
              {/* <HStack space={2} alignItems="center">
                <Text style={styles.textWhite}>Completed</Text>
                <Box w={2} h={2} borderRadius={100} backgroundColor="#C4C4C4" />
                <Text style={styles.textWhite}>4 parts</Text>
              </HStack> */}

              <Text category="h1" style={[styles.textWhite, {fontSize: 32}]}>
                {title}
              </Text>

              <VStack space={2}>
                <HStack space={0} alignItems="center">
                  <Text style={styles.author}>{author.fullname}</Text>
                  <ChevronRight {...IconProps} style={{marginTop: 4}} />
                </HStack>

                {/* Stats */}
                <HStack space={6}>
                  <HStack space={1} alignItems="center">
                    <Text category="c1" style={styles.textWhite}>
                      {data.rating}
                    </Text>
                    <Star {...IconProps} color="#FFC107" />
                  </HStack>

                  <HStack space={1} alignItems="center">
                    <Text category="c1" style={styles.textWhite}>
                      {abbreviate(data.views)}
                    </Text>
                    <Eye {...IconProps} />
                  </HStack>

                  <HStack space={1} alignItems="center">
                    <Text category="c1" style={styles.textWhite}>
                      {abbreviate(data.comments)}
                    </Text>
                    <ChatSquare {...IconProps} />
                  </HStack>
                </HStack>
              </VStack>
              {/* Stats */}
            </VStack>
            {/* Details */}

            {/* Tags */}
            <VStack>
              <Text category="h2" style={styles.sectionTitle}>
                Story tags
              </Text>

              <FlatList
                horizontal
                data={data.categories}
                keyExtractor={item => item._id}
                contentContainerStyle={{padding: 16}}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <Box width={2} />}
                renderItem={({item}) => {
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
                }}
              />
            </VStack>
            {/* Tags */}

            {/* Summary */}
            <VStack px={6}>
              <Text category="h2" style={styles.textWhite}>
                Summary
              </Text>
              <Text category="p2" style={styles.textWhite}>
                {data.summary}
              </Text>
            </VStack>
            {/* Summary */}

            {/* Similar */}
            <VStack space={3}>
              <Text category="h2" style={styles.sectionTitle}>
                Other stories like this one
              </Text>

              <FlatList
                horizontal
                data={DATA}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 24}}
                ItemSeparatorComponent={() => <Box width={3} />}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      // @ts-ignore
                      nav.navigate('Entity', item);
                    }}>
                    <VStack space={1}>
                      <View style={styles.entityCard}>
                        <Image
                          source={item.cover}
                          style={StyleSheet.absoluteFillObject}
                        />

                        <Text category="h1" style={styles.textWhite}>
                          {item.title}
                        </Text>
                      </View>

                      <HStack space={2} justifyContent="space-between">
                        <Text category="c2" style={styles.textWhite}>
                          {item.author}
                        </Text>

                        <HStack space={1} alignItems="center">
                          <Text category="s2" style={styles.textWhite}>
                            {item.rating}
                          </Text>
                          <Star width={13} height={13} color="#FFC107" />
                        </HStack>
                      </HStack>
                    </VStack>
                  </TouchableOpacity>
                )}
              />
            </VStack>
            {/* Similar */}
          </VStack>
        </ScrollView>

        <Box mx={6} mb={8}>
          <Button
            onPress={() => {
              // @ts-ignore
              nav.navigate('Reader', {entity: params});
            }}>
            Start reading
          </Button>
        </Box>
      </Layout>
    );
  }

  return (
    <Center flex={1}>
      <ActivityIndicator />
    </Center>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
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
  textWhite: {
    color: '#fff',
  },
  entityCard: {
    width: 180,
    height: 160,
    padding: 18,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  author: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    color: '#fff',
    marginHorizontal: 24,
  },
  scrollContainer: {
    paddingTop: height / 1.6,
    paddingBottom: 70,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
