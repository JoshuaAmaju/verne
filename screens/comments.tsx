import {useNavigation} from '@react-navigation/native';
import {Input, Layout, Text} from '@ui-kitten/components';
import {Box, HStack, Select, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Image from 'react-native-fast-image';
import {IconButton} from 'react-native-paper';
import ThumbsUpFill from '../assets/icons/thumbsup.fill.svg';
import Xmark from '../assets/icons/xmark.svg';
import {abbreviate} from '../shared/utils';
import type {Comment as IComment} from './dummy.data';
import {COMMENTS, PROFILES} from './dummy.data';

const Reply = ({reply}: {reply: IComment}) => {
  const {user, likes, comment} = reply;
  const profile = PROFILES.find(p => p.id === user);

  const [expanded, setExpanded] = useState(false);

  const previewReply = COMMENTS[0];

  const previewUser = PROFILES.find(p => p.id === previewReply.user);

  const [replies, setReplies] = useState(COMMENTS.slice(0, 2));

  return (
    <HStack space={4}>
      {profile && (
        <Image
          source={require('../assets/png/img.jpg')}
          style={{width: 40, height: 40, borderRadius: 100}}
        />
      )}

      <VStack space={6} flex={1}>
        <VStack space={2}>
          <VStack space={4} p={4} bg="#EFFBF9" borderRadius={18}>
            <Text>{profile?.name}</Text>
            <Text numberOfLines={3}>{comment}</Text>
          </VStack>

          <HStack ml={4} space={6} alignItems="center">
            <Text category="p2">9h</Text>

            <HStack space={1} alignItems="center">
              <TouchableOpacity onPress={() => {}}>
                <ThumbsUpFill width={15} height={15} color="#000" />
              </TouchableOpacity>

              <Text category="p2">{abbreviate(likes)} likes</Text>
            </HStack>

            <TouchableOpacity onPress={() => {}}>
              <Text category="p2">Reply</Text>
            </TouchableOpacity>
          </HStack>
        </VStack>

        {expanded ? (
          <VStack space={4}>
            {replies.map(c => {
              const subProfile = PROFILES.find(p => p.id === c.user);

              return (
                <HStack key={c.id} space={4}>
                  {subProfile && (
                    <Image
                      style={styles.tiny}
                      source={require('../assets/png/img.jpg')}
                    />
                  )}

                  <VStack space={4} p={4} bg="#EFFBF9" borderRadius={18}>
                    <Text>{subProfile?.name}</Text>
                    <Text numberOfLines={2}>{c.comment}</Text>
                  </VStack>
                </HStack>
              );
            })}

            <TouchableOpacity
              onPress={() => setReplies(COMMENTS)}
              style={{marginStart: 40, color: '#383838'}}>
              <Text category="p2">View more replies</Text>
            </TouchableOpacity>
          </VStack>
        ) : (
          <View>
            <TouchableOpacity onPress={() => setExpanded(true)}>
              <HStack space={2} alignItems="center">
                <HStack space={1} alignItems="center">
                  <Image
                    style={styles.tiny}
                    source={require('../assets/png/img.jpg')}
                  />

                  {previewUser && (
                    <HStack space={1}>
                      <Text
                        category="p2"
                        numberOfLines={1}
                        style={{maxWidth: 100}}>
                        {previewUser.name}
                      </Text>

                      <Text category="c1">replied</Text>
                    </HStack>
                  )}
                </HStack>

                <Box w={1} h={1} bg="#D1D1D1" borderRadius={100} />

                <Text category="p2">{abbreviate(COMMENTS.length)} Replies</Text>
              </HStack>
            </TouchableOpacity>
          </View>
        )}
      </VStack>
    </HStack>
  );
};

export default function Comments() {
  const nav = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState('0');

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <IconButton
          size={15}
          onPress={() => nav.goBack()}
          icon={({size, color}) => (
            <Xmark width={size} height={size} color={color} />
          )}
        />
      ),
    });
  }, [nav]);

  return (
    <Layout style={styles.expand}>
      <FlatList
        data={COMMENTS}
        ItemSeparatorComponent={() => <Box h={5} />}
        ListHeaderComponentStyle={{marginBottom: 30}}
        renderItem={({item}) => <Reply reply={item} />}
        contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 40}}
        ListHeaderComponent={
          <View style={{maxWidth: '40%'}}>
            <Select
              selectedValue={selectedIndex}
              onValueChange={index => setSelectedIndex(index)}>
              <Select.Item value="0" label="All comments" />
              <Select.Item value="1" label="Top rated" />
              <Select.Item value="2" label="Most viewed" />
            </Select>
          </View>
        }
      />

      <Box px={4} pt={2} pb={16}>
        <Input
          style={styles.messageBox}
          placeholder="Write a comment"
          textStyle={{paddingVertical: 5}}
        />
      </Box>
    </Layout>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  messageBox: {
    borderRadius: 100,
    backgroundColor: '#EBEBEB',
  },
  tiny: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});
