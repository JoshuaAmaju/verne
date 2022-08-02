import React from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COVER} from '@screens/dummy.data';
import Screen from '@shared/components/Screen';
import {MoreVertical} from '@shared/exports/icons';
import {http} from '@shared/http';
import {Pageable} from '@shared/types/server_response';
import {Story} from '@shared/types/story';
import {Text} from '@ui-kitten/components';
import {formatDistanceToNow} from 'date-fns';
import {Box, HStack, VStack} from 'native-base';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function StoryCard({data}: {data: Story}) {
  return (
    <HStack
      space={4}
      p={4}
      bg="#EFFBF9"
      borderRadius={8}
      justifyContent="space-between">
      <HStack space={6}>
        <Image
          source={{uri: data.coverimageUrl}}
          style={{width: 64, height: 100, borderRadius: 8}}
        />

        <VStack space={4} justifyContent="space-between">
          <VStack space={3}>
            <Text category="h2">{data.title}</Text>
            <Text category="p2">{data.chapters} Chapters</Text>
          </VStack>

          <Text category="p2" style={{color: '#858585'}}>
            {formatDistanceToNow(new Date(data.updatedAt), {addSuffix: true})}
          </Text>
        </VStack>
      </HStack>

      <TouchableOpacity>
        <MoreVertical width={20} height={20} color="#525252" />
      </TouchableOpacity>
    </HStack>
  );
}

function Unpublished() {
  const nav = useNavigation();

  const query = useQuery(['published stories'], async () => {
    // const {data} = await http.get<Pageable<{stories: Story[]}>>(
    //   '/story/user/stories?isPublished=true',
    // );

    // return data.stories;

    return Promise.resolve();
  });

  return (
    <Screen>
      {query.isLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={[1, 2, 3, 4]}
          ItemSeparatorComponent={() => <Box h={5} />}
          renderItem={({item}) => {
            // return (
            //   <TouchableOpacity>
            //     <StoryCard data={item} />
            //   </TouchableOpacity>
            // );

            return (
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  nav.navigate('Writer.WriteSummary');
                }}>
                <HStack
                  p={4}
                  space={4}
                  bg="#EFFBF9"
                  borderRadius={8}
                  justifyContent="space-between">
                  <HStack space={6}>
                    <Image
                      source={COVER}
                      style={{width: 64, height: 100, borderRadius: 8}}
                    />

                    <VStack space={4} justifyContent="space-between">
                      <VStack space={3}>
                        <Text category="h2">Understanding in bits</Text>
                        <Text category="p2">5 Chapters</Text>
                      </VStack>

                      <Text category="p2" style={{color: '#858585'}}>
                        Updated yesterday
                      </Text>
                    </VStack>
                  </HStack>

                  <TouchableOpacity>
                    <MoreVertical width={20} height={20} color="#525252" />
                  </TouchableOpacity>
                </HStack>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Screen>
  );
}

function Published() {
  return <></>;
}

export default function People() {
  const {primary} = useTheme().colors;

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{tabBarIndicatorStyle: {backgroundColor: primary}}}>
      <Tab.Screen name="Unpublished" component={Unpublished} />
      <Tab.Screen name="Published" component={Published} />
    </Tab.Navigator>
  );
}
