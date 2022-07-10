import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, Text, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Communities, COVER} from '../../../../dummy.data';

import Repost from './assets/repost.svg';
import ThumbsUp from '../../../../../assets/icons/thumbsup.svg';
import ArrowDown from '../../../../../assets/icons/arrow.down.svg';
import CircleChatBubble from '../../../../../assets/icons/circle.chat.bubble.svg';

import Lock from './assets/lock.svg';
import Plus from './assets/plus.svg';
import Members from './assets/members.svg';

// @ts-ignore
import abbreviate from 'mout/number/abbreviate';
import Button from '../../../../../shared/components/Button';
import IconButton from '../../../../../shared/components/IconButton';

export default function Community() {
  const nav = useNavigation();
  const {id} = useRoute().params as {id: number};

  const community = Communities.find(c => c.id === id);

  const [status, setStatus] = useState(community?.status);

  const [visible, setVisible] = useState(false);

  const {type, members} = community ?? {};

  useEffect(() => {
    if (community) {
      nav.setOptions({title: community.name});
    }
  }, [nav, community]);

  return (
    <>
      <ScrollView>
        <Box h={400} bg="#ccc" flexDirection="column" justifyContent="flex-end">
          {community && (
            <Image
              source={community.avatar as any}
              style={StyleSheet.absoluteFillObject}
            />
          )}

          <VStack space={4} py={4} px={6}>
            <OverflowMenu
              fullWidth
              visible={visible}
              placement="bottom end"
              appearance="noDivider"
              // style={{width: '100%'}}
              style={{elevation: 4, width: '100%'}}
              // selectedIndex={selectedIndex}
              onSelect={() => {}}
              onBackdropPress={() => setVisible(false)}
              anchor={() => (
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <HStack space={1} alignItems="center">
                    <Text category="h1">{community?.name}</Text>
                    <ArrowDown width={10} height={10} color="#000" />
                  </HStack>
                </TouchableOpacity>
              )}>
              {/* <MenuItem title="View community informatiom" /> */}
              <MenuItem title="Schedule audio room" />
              <MenuItem title="Leave community" />
            </OverflowMenu>

            <HStack space={2} alignItems="center">
              <HStack flex={1} space={2} alignItems="center">
                <Text category="p2">{abbreviate(members?.length)} members</Text>
                <Box size={2} bg="#F9DED7" borderRadius={100} />
                <Text
                  category="p2"
                  style={styles.capitalize}>{`${type} community`}</Text>
              </HStack>

              {status === 'member' ? (
                <Text category="p2" style={{color: '#383838'}}>
                  Member
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setStatus('member')}>
                  <Text>Join</Text>
                </TouchableOpacity>
              )}
            </HStack>
          </VStack>
        </Box>

        <Box bg="#fff" p={6} borderTopRadius={24}>
          {status !== 'member' ? (
            <VStack space={6}>
              <VStack space={4}>
                <Text category="h2">About this community</Text>

                <Text>{community?.description}</Text>

                <VStack space={3}>
                  <HStack space={4}>
                    <Lock width={16} height={16} />

                    <VStack space={2} flex={1}>
                      <Text category="p1" style={styles.capitalize}>
                        {type}
                      </Text>
                      <Text category="p2">
                        Only members have access to this community and can
                        interact with it, see who is a member as well as what
                        everyone else post
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack space={4}>
                    <Members width={16} height={16} />

                    <VStack space={2}>
                      <Text category="p1">Membership</Text>
                      <Text category="p2">Free membership</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>

              <VStack space={4}>
                <Text category="h2">Community rules</Text>

                <VStack space={3}>
                  {community?.rules.map((rule, i) => (
                    <HStack key={i} space={3}>
                      <Text style={{color: '#383838'}}>{i + 1}</Text>

                      <VStack space={1} flex={1}>
                        <Text category="p1">{rule.name}</Text>
                        <Text category="p2" style={{color: '#6B6B6B'}}>
                          {rule.description}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>

              <Button appearance="outline" onPress={() => setStatus('member')}>
                Join community
              </Button>
            </VStack>
          ) : (
            <VStack space={4}>
              {new Array(10).fill(0).map((_, i) => {
                return (
                  <HStack key={i} space={4}>
                    <Avatar size="large" source={COVER} />

                    <VStack space={3} flex={1}>
                      <View>
                        <VStack p={3} space={3} bg="#F7FDFC" borderRadius={8}>
                          <HStack space={1} alignItems="center">
                            <Text>
                              Jane A @
                              <Text category="p2" style={{color: '#858585'}}>
                                jane12
                              </Text>
                            </Text>
                            <Box size={1} bg="#F9DED7" borderRadius={100} />
                            <Text category="p2" style={{color: '#858585'}}>
                              9h
                            </Text>
                          </HStack>

                          <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Convallis amet, tincidunt sit gravida. Cursus
                            diam erat morbi pretium sit.
                          </Text>
                        </VStack>

                        <Image source={COVER} style={styles.postImage} />
                      </View>

                      <HStack space={4} style={styles.postActions}>
                        <TouchableOpacity
                          onPress={() => nav.navigate('Comment' as any)}>
                          <HStack space={1} alignItems="center">
                            <CircleChatBubble
                              width={16}
                              height={16}
                              color="#525252"
                            />
                            <Text category="p2">191</Text>
                          </HStack>
                        </TouchableOpacity>

                        <HStack space={1} alignItems="center">
                          <ThumbsUp width={16} height={16} color="#525252" />
                          <Text category="p2">191</Text>
                        </HStack>

                        <HStack space={1} alignItems="center">
                          <Repost width={16} height={16} color="#525252" />
                          <Text category="p2">2</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
          )}
        </Box>
      </ScrollView>

      {status === 'member' && (
        <IconButton
          size="large"
          icon={Plus}
          style={styles.fab}
          appearance="filled"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    backgroundColor: '#EFFBF9',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  fab: {
    right: 10,
    zIndex: 10,
    bottom: 10,
    borderRadius: 100,
    position: 'absolute',
  },
  postActions: {
    maxWidth: '80%',
    justifyContent: 'space-between',
  },
  postImage: {
    height: 237,
    width: '100%',
    borderRadius: 8,
  },
});
