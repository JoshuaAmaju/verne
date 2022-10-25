import React, {useState} from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import Screen from '@shared/components/Screen';
import {Eye, MoreVertical, Star} from '@shared/exports/icons';
import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {Story} from '@shared/types/story';
import {Text, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {formatDistanceToNow} from 'date-fns';
import {Box, HStack, VStack} from 'native-base';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {abbreviate} from '@shared/utils';
import ChatSquare from '@assets/icons/square.chat.bubble.svg';

const Tab = createMaterialTopTabNavigator();

enum Indices {
  publish,
  downloadPDF,
  downloadWord,
  delete,
}

enum StoryStatus {
  published,
  notPublished,
}

const iconProps = {
  width: 13,
  height: 13,
  color: '#000',
};

function StoryCard({
  data,
  status,
  onMutate,
}: {
  data: Story;
  status: StoryStatus;
  onMutate?: () => void;
}) {
  const [visible, setVisible] = useState(false);

  const publishMutation = useMutation(
    async () => {
      const res = await http.get(`/story/publish/${data._id}`);
      return res.data;
    },
    {
      onSuccess: () => onMutate?.(),
    },
  );

  const deleteMutation = useMutation(
    async () => {
      const res = await http.delete(`/story/delete/${data._id}`);
      return res.data;
    },
    {onSuccess: () => onMutate?.()},
  );

  const menus = (
    <>
      <MenuItem title="Download PDF" />
      <MenuItem title="Download Word" />
      <MenuItem title="Delete" />
    </>
  );

  return (
    <HStack
      p={4}
      space={4}
      bg="#EFFBF9"
      borderRadius={8}
      justifyContent="space-between">
      <HStack space={6} flex={1}>
        <Image
          source={{uri: data.coverimageUrl}}
          style={{width: 64, height: 100, borderRadius: 8}}
        />

        <VStack flex={1} space={4} justifyContent="space-between">
          <VStack space={3} flex={1}>
            <Text category="h2" style={{flex: 1}}>
              {data.title}
            </Text>
            <Text category="p2">{data.chapters} Chapters</Text>
          </VStack>

          {status === StoryStatus.notPublished ? (
            <Text category="p2" style={{color: '#858585'}}>
              Updated{' '}
              {formatDistanceToNow(new Date(data.updatedAt), {addSuffix: true})}
            </Text>
          ) : (
            <HStack space={6}>
              <HStack space={1} alignItems="center">
                <Text category="c1">{data.rating}</Text>
                <Star {...iconProps} color="#FFC107" />
              </HStack>

              <HStack space={1} alignItems="center">
                <Text category="c1">{abbreviate(data.views)}</Text>
                <Eye {...iconProps} />
              </HStack>

              <HStack space={1} alignItems="center">
                <Text category="c1">{abbreviate(data.comments)}</Text>
                <ChatSquare {...iconProps} />
              </HStack>
            </HStack>
          )}
        </VStack>
      </HStack>

      <OverflowMenu
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        anchor={() => (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <MoreVertical width={15} height={15} color="#525252" />
          </TouchableOpacity>
        )}
        onSelect={val => {
          // pad the index by when when the story status is published,
          // cause the first items isn't rendered
          switch (status === StoryStatus.published ? val.row + 1 : val.row) {
            case Indices.publish:
              publishMutation.mutate();
              break;

            case Indices.downloadPDF:
              console.log('download pdf');
              break;

            case Indices.downloadWord:
              console.log('download word');
              break;

            case Indices.delete:
              console.log('delete');
              deleteMutation.mutate();
              break;
          }

          setVisible(false);
        }}>
        {status === StoryStatus.notPublished ? (
          <>
            <MenuItem title="Publish" />
            {menus}
          </>
        ) : (
          menus
        )}
      </OverflowMenu>
    </HStack>
  );
}

function Stories({status}: {status: StoryStatus}) {
  const nav = useNavigation();

  const client = useQueryClient();

  const query = useQuery(['stories', status], async () => {
    const {data} = await http.get<Paginated<{stories: Story[]}>>(
      `/story/user/stories`,
      {params: {isPublished: status === StoryStatus.published}},
    );

    return data.stories;
  });

  console.log(`stories:[${status}]`, JSON.stringify(query.data));

  return (
    <Screen>
      {query.isLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={query.data}
          ItemSeparatorComponent={() => <Box h={5} />}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  nav.navigate('Writer.Story', {id: item._id});
                }}>
                <StoryCard
                  data={item}
                  status={status}
                  onMutate={() => {
                    client.cancelQueries(['stories']);
                    client.invalidateQueries(['stories']);
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Screen>
  );
}

function Unpublished() {
  return <Stories status={StoryStatus.notPublished} />;

  // const nav = useNavigation();

  // const client = useQueryClient();

  // const query = useQuery(['published stories'], async () => {
  //   const {data} = await http.get<Pageable<{stories: Story[]}>>(
  //     '/story/user/stories?isPublished=false',
  //   );

  //   return data.stories;
  // });

  // return (
  //   <Screen>
  //     {query.isLoading ? (
  //       <Box flex={1} alignItems="center" justifyContent="center">
  //         <ActivityIndicator />
  //       </Box>
  //     ) : (
  //       <FlatList
  //         data={query.data}
  //         ItemSeparatorComponent={() => <Box h={5} />}
  //         renderItem={({item}) => {
  //           return (
  //             <TouchableOpacity
  //               onPress={() => {
  //                 // @ts-ignore
  //                 nav.navigate('Writer.WriteSummary');
  //               }}>
  //               <StoryCard
  //                 data={item}
  //                 onMutate={() => {
  //                   client.cancelQueries(['published stories']);
  //                   client.invalidateQueries(['published stories']);
  //                 }}
  //               />
  //             </TouchableOpacity>
  //           );
  //         }}
  //       />
  //     )}
  //   </Screen>
  // );
}

function Published() {
  return <Stories status={StoryStatus.published} />;
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
