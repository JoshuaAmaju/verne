// import {useNavigation} from '@react-navigation/native';
import {Input, Spinner, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Eye, Search, SquareChatBubble, Star} from '../../shared/exports/icons';
import {abbreviate} from '../../shared/utils';
import {DATA} from '../dummy.data';

import {http} from '@shared/http';
import * as Category from '@shared/services/category';
import {Paginated} from '@shared/types/server_response';
import {StoryWithAuthor} from '@shared/types/story';
import {useQuery} from 'react-query';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar} from '@shared/components/StatusBar';

export default function Explore() {
  // const nav = useNavigation();

  const {width} = useWindowDimensions();

  const isFocused = useIsFocused();

  const [editing, setEditing] = useState(false);
  const [term, setSearchTerm] = useState<string>();

  const topSearches = useQuery(['top_searches'], async () => {
    const res = await http.get<Paginated<{stories: Array<StoryWithAuthor>}>>(
      '/story/topsearches',
    );

    return res.data;
  });

  console.log('here data', JSON.stringify(topSearches));

  const categories = useQuery(['categories'], Category.get_all);

  useEffect(() => {
    setEditing(!term ? false : term.trim() !== '');
  }, [term]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        stickyHeaderIndices={[0]}
        // contentContainerStyle={{padding: 24}}
      >
        <HStack p={4} space={2} bg="#fff" alignItems="center">
          <Input
            size="large"
            value={term}
            placeholder="Search"
            style={styles.search}
            onChangeText={setSearchTerm}
            accessoryLeft={({style}: any) => (
              <Search {...style} width={17} color="#525252" />
            )}
          />

          {editing && (
            <TouchableOpacity
              style={{paddingHorizontal: 5}}
              onPress={() => setSearchTerm(undefined)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          )}
        </HStack>

        <VStack flex={1} p={6} space={6}>
          {term !== undefined && term.trim() !== '' && (
            <VStack space={4}>
              {DATA.map(item => (
                <HStack space={4}>
                  <Image source={item.cover} style={{width: 24, height: 24}} />
                  <Text category="p1">{item.title}</Text>
                </HStack>
              ))}
            </VStack>
          )}

          <VStack space={4}>
            <VStack space={4}>
              <Text category="h2">Top Searches</Text>

              {topSearches.data ? (
                <VStack space={3}>
                  {topSearches.data.stories.map(item => (
                    <HStack space={4} alignItems="center">
                      <Box bg={item.coverColor} style={styles.cover}>
                        <Image
                          source={{uri: item.coverimageUrl}}
                          style={{width: '100%', height: '100%'}}
                        />
                      </Box>

                      <VStack space={2.5} flex={1}>
                        <View>
                          <Text>{item.title}</Text>
                          <Text
                            category="p2"
                            style={{
                              color: '#6B6B6B',
                              textTransform: 'capitalize',
                            }}>
                            {item.author.fullname}
                          </Text>
                        </View>

                        <HStack space={8} alignItems="center">
                          <HStack space={1} alignItems="center">
                            <Text category="c2" style={{color: '#383838'}}>
                              {abbreviate(item.rating ?? 0)}
                            </Text>

                            <Star width={13} height={13} color="#FFC107" />
                          </HStack>

                          <HStack space={1} alignItems="center">
                            <Text category="c2" style={{color: '#383838'}}>
                              {abbreviate(item.views ?? 0)}
                            </Text>

                            <Eye width={13} height={13} color="#383838" />
                          </HStack>

                          <HStack space={1} alignItems="center">
                            <Text category="c2" style={{color: '#383838'}}>
                              {abbreviate(item.comments ?? 0)}
                            </Text>

                            <SquareChatBubble
                              width={13}
                              height={13}
                              color="#383838"
                            />
                          </HStack>
                        </HStack>

                        <Text
                          category="p2"
                          numberOfLines={2}
                          style={{color: '#6B6B6B'}}>
                          {item.summary}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <Box p={6} alignItems="center" justifyContent="center">
                  <Spinner size="medium" />
                </Box>
              )}
            </VStack>

            <VStack space={4}>
              <Text category="h2">Categories</Text>

              {categories.data && (
                <FlatGrid
                  spacing={7}
                  numColumns={2}
                  data={categories.data}
                  keyExtractor={item => item._id}
                  staticDimension={width / 2 - 20}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.category}>
                        <Text
                          category="h2"
                          style={{textTransform: 'capitalize'}}>
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                />
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: '#EBEBEB',
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  category: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: '#DDEEED',
  },
});
