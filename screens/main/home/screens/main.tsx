import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Avatar, Spinner, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import {IconButton} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import CircleChat from '../../../../assets/icons/circle.chat.bubble.svg';
import Notification from '../../../../assets/icons/notification.svg';
import colors from '../../../../theme/colors';
import Room from '../../../components/room';
import Section from '../../../components/section';
import Story from '../../../components/story';
import {DATA, ROOMS} from '../../../dummy.data';

import {http} from '@shared/http';
import * as Category from '@shared/services/category';
import {Paginated, Res} from '@shared/types/server_response';
import {Author, Story as IStory} from '@shared/types/story';
import {useQuery} from 'react-query';

import {useHeaderHeight} from '@react-navigation/elements';
import {StatusBar} from '@shared/components/StatusBar';

export default function Home() {
  const hero = DATA[0];
  const nav = useNavigation();

  const {width} = useWindowDimensions();

  const isFocused = useIsFocused();

  const headerHeight = useHeaderHeight();

  const topSearches = useQuery(['top_searches'], async () => {
    const res = await http.get<
      Paginated<{stories: Array<Omit<IStory, 'author'> & {author: Author}>}>
    >('/story/topsearches');
    return res.data;
  });

  const categories = useQuery(['categories'], Category.get_all);

  const continueReading = useQuery(['continue_reading'], async () => {
    const res = await http.get<Res<{story: IStory}[]>>(
      '/story/continue/reading',
    );

    console.log('continue reading http', res.data);

    return res.data.data;
  });

  console.log('continue reading', continueReading.data);

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <HStack m={2} space={2} alignSelf="flex-end" alignItems="center">
          <IconButton
            color="#fff"
            onPress={() => nav.navigate('Notifications' as any)}
            icon={({size, color}) => (
              <Notification width={size} height={size} color={color} />
            )}
          />

          <IconButton
            color="#fff"
            onPress={() => nav.navigate('Messages' as any)}
            icon={({size, color}) => (
              <CircleChat width={size} height={size} color={color} />
            )}
          />

          <TouchableOpacity onPress={() => nav.navigate('Account' as any)}>
            <Avatar source={require('../../../../assets/png/unnamed.png')} />
          </TouchableOpacity>
        </HStack>
      ),
    });
  }, [nav]);

  // console.log('home categories', categories.data);

  // console.log('continue', continueReading.data);

  // console.log('top searches', JSON.stringify(topSearches.data));

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {topSearches.data ? (
          <FlatList
            horizontal
            pagingEnabled
            style={{height: 400}}
            data={topSearches.data?.stories}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('Entity', item);
                  }}>
                  <View
                    style={[
                      styles.hero,
                      {width, backgroundColor: item.coverColor},
                    ]}>
                    <Image
                      style={StyleSheet.absoluteFillObject}
                      source={
                        item.coverimageUrl
                          ? {uri: item.coverimageUrl}
                          : hero.cover
                      }
                    />

                    <View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
                      ]}
                    />

                    <View
                      style={{
                        height: '100%',
                        paddingVertical: 40,
                        paddingTop: headerHeight,
                        justifyContent: 'flex-end',
                      }}>
                      <VStack p={4} space={2} alignItems="center">
                        <Text category="h1" style={styles.title}>
                          {item.title}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            nav.navigate('Author', item.author);
                          }}>
                          <Text category="h2" style={styles.subtitle}>
                            {item.author.fullname}
                          </Text>
                        </TouchableOpacity>

                        <HStack space={2}>
                          {item.categories.slice(0, 4).map(category => {
                            return (
                              <TouchableOpacity
                                key={category._id}
                                onPress={() => {
                                  // @ts-ignore
                                  nav.navigate('Category', {id: category._id});
                                }}>
                                <View style={styles.categoryPill}>
                                  <Text
                                    category="label"
                                    style={styles.pillLabel}>
                                    {category.name}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            );
                          })}
                        </HStack>
                      </VStack>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Box
            alignItems="center"
            justifyContent="center"
            style={{height: 400}}>
            <Spinner size="medium" />
          </Box>
        )}

        <VStack space={4} py={4}>
          <Section title="Live audio rooms">
            <FlatList
              horizontal
              data={ROOMS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => {
                // const host = item.participants.find(p => p.type === 'host');

                return <Room {...item} />;

                // return (
                //   <VStack
                //     p={5}
                //     space={4}
                //     borderRadius={20}
                //     backgroundColor="mistyrose">
                //     <VStack space={2}>
                //       <Text category="c1">{item.community}</Text>
                //       <Text category="h6" style={{maxWidth: 300}}>
                //         {item.title}
                //       </Text>
                //     </VStack>

                //     <HStack
                //       space={3}
                //       alignItems="center"
                //       justifyContent="space-between">
                //       {host && (
                //         <HStack space={2} alignItems="center">
                //           <HStack space={2} alignItems="center">
                //             <Avatar size="tiny" source={host.avatar as any} />
                //             <Text category="c2">{host.name}</Text>
                //           </HStack>

                //           <View style={styles.hostLabel}>
                //             <Text category="c2">Host</Text>
                //           </View>
                //         </HStack>
                //       )}

                //       <Text category="c2">
                //         {abbreviate(item.participants.length)} Listeners
                //       </Text>
                //     </HStack>
                //   </VStack>
                // );
              }}
            />
          </Section>

          <Section title="Continue reading">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => (
                <Story
                  {...item}
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('Entity', item);
                  }}
                />
              )}
            />
          </Section>

          <Section title="Categories">
            {/* <Cols
              cols={2}
              colSpace={10}
              rowSpace={10}
              style={{paddingHorizontal: 24}}>
              {DATA[0].categories.map(c => (
                <Col>
                  <View
                    style={{
                      padding: 30,
                      borderRadius: 8,
                      backgroundColor: '#DDEEED',
                    }}>
                    <Text category="h2">{c}</Text>
                  </View>
                </Col>
              ))}
            </Cols> */}

            {categories.data ? (
              <FlatGrid
                spacing={7}
                numColumns={2}
                data={categories.data}
                keyExtractor={item => item._id}
                staticDimension={width / 2 - 20}
                contentContainerStyle={{paddingHorizontal: 24}}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        // @ts-ignore
                        nav.navigate('Category', {id: item._id});
                      }}>
                      <View style={styles.category}>
                        <Text
                          category="h2"
                          style={{textTransform: 'capitalize'}}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <Box p={6}>
                <Spinner />
              </Box>
            )}
          </Section>

          <Section title="Based on your likes">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <Story {...item} />}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
            />
          </Section>
        </VStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: '#fff',
    textTransform: 'capitalize',
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
    // height: 300,
    height: '100%',
    // justifyContent: 'space-between',
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
