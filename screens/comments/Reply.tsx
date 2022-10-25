import {Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Image from 'react-native-fast-image';
import ThumbsUpFill from '../../assets/icons/thumbsup.fill.svg';
import {abbreviate} from '../../shared/utils';
// import {Comment as IComment} from '../dummy.data';
import {PROFILES} from '../dummy.data';

import {formatDistanceToNowStrict} from 'date-fns';

import {Comment as IComment} from './types';

import {useProvider} from './provider';

export function Reply({reply, depth = 3}: {reply: IComment; depth?: number}) {
  console.log(depth);

  const {id, by, likes, content, createdAt} = reply;

  const provider = useProvider();

  const profile = PROFILES.find(p => p.id === by);

  const [expanded, setExpanded] = useState(false);
  const [displayAll, setDisplayAll] = useState(false);

  const filteredReplies = provider.comments.filter(
    comment => comment.replyingTo === id,
  );

  const previewReply = filteredReplies[0];

  const previewUser =
    previewReply && PROFILES.find(p => p.id === previewReply.by);

  const replies = displayAll ? filteredReplies : filteredReplies.slice(0, 2);

  // const [replies, setReplies] = useState(COMMENTS.slice(0, 2));

  // useEffect(() => {
  //   const store = firestore().collection('comments').doc(type).collection(id);

  //   const unsubscribe = store.onSnapshot(snapshot => {
  //     for (const doc of snapshot.docs) {
  //       const docId = doc.id;
  //       const data = doc.data();
  //       console.log(docId, data);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [id]);

  return (
    <HStack space={4}>
      {profile && (
        <Image
          source={require('../../assets/png/img.jpg')}
          style={{width: 40, height: 40, borderRadius: 100}}
        />
      )}

      <VStack space={6} flex={1}>
        <VStack space={2}>
          <VStack space={4} p={4} bg="#EFFBF9" borderRadius={18}>
            <Text>{profile?.name}</Text>
            <Text numberOfLines={3}>{content}</Text>
          </VStack>

          <HStack ml={4} space={6} alignItems="center">
            <Text category="p2">
              {formatDistanceToNowStrict(new Date(createdAt))}
            </Text>

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
              const subProfile = PROFILES.find(p => p.id === c.by);

              return (
                <HStack key={c.id} space={4}>
                  {subProfile && (
                    <Image
                      style={styles.tiny}
                      source={require('../../assets/png/img.jpg')}
                    />
                  )}

                  <VStack space={4} p={4} bg="#EFFBF9" borderRadius={18}>
                    <Text>{subProfile?.name}</Text>
                    <Text numberOfLines={2}>{c.content}</Text>
                  </VStack>
                </HStack>
              );
            })}

            <TouchableOpacity
              style={{marginStart: 40}}
              onPress={() => setDisplayAll(true)}>
              <Text category="p2" style={{color: '#383838'}}>
                View more replies
              </Text>
            </TouchableOpacity>
          </VStack>
        ) : (
          <View>
            <TouchableOpacity onPress={() => setExpanded(true)}>
              <HStack space={2} alignItems="center">
                <HStack space={1} alignItems="center">
                  <Image
                    style={styles.tiny}
                    source={require('../../assets/png/img.jpg')}
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

                <Text category="p2">
                  {abbreviate(filteredReplies.length)} Replies
                </Text>
              </HStack>
            </TouchableOpacity>
          </View>
        )}
      </VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  tiny: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});
