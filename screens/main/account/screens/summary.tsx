import {Divider, Text, Toggle} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../../../../shared/components/Button';
import {ChevronRight} from '../../../../shared/exports/icons';
import {COVER} from '../../../dummy.data';

import Exit from '../../../../assets/icons/exit.svg';
import {useNavigation} from '@react-navigation/native';

import authStore, {logout} from '@shared/stores/auth';
import {abbreviate} from '@shared/utils';
import {Colors} from 'react-native-paper';
import {StatusBar} from '@shared/components/StatusBar';

export default function Summary() {
  const nav = useNavigation();

  const {
    about,
    fullname,
    username,
    following = 0,
    followers = 0,
  } = authStore(n => n.data!);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={{padding: 24}}>
        <VStack space={6}>
          {/* head */}
          <VStack space={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={3} alignItems="center">
                <Image
                  source={COVER}
                  style={{width: 80, height: 80, borderRadius: 100}}
                />

                <VStack space={1}>
                  <Text category="h2">{fullname || 'No name'}</Text>
                  <Text category="p1" style={{color: '#798486'}}>
                    @{username}
                  </Text>
                </VStack>
              </HStack>

              <Button
                appearance="outline"
                style={styles.editProfile}
                onPress={() => nav.navigate('EditProfile' as any)}>
                Edit profile
              </Button>
            </HStack>

            <VStack space={3}>
              <Text>
                {about || (
                  <Text category="p1" style={{color: Colors.grey400}}>
                    Write something about yourself
                  </Text>
                )}
              </Text>

              <HStack space={6}>
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('People', {screen: 'Followers'});
                  }}>
                  <Text category="p1">
                    {abbreviate(followers)}{' '}
                    <Text category="p2" style={{color: '#383838'}}>
                      Followers
                    </Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('People', {screen: 'Following'});
                  }}>
                  <Text category="p1">
                    {abbreviate(following)}{' '}
                    <Text category="p2" style={{color: '#383838'}}>
                      Following
                    </Text>
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>

          {/* body */}
          <VStack space={4}>
            <VStack>
              <Text category="p1" style={{color: '#858585'}}>
                Preferences
              </Text>

              <VStack divider={<Divider />} space={2}>
                <HStack
                  py={2}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">Enable push notifications</Text>
                  <Toggle checked />
                </HStack>

                <HStack
                  py={2}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">Enable dark mode</Text>
                  <Toggle checked />
                </HStack>
              </VStack>
            </VStack>

            <VStack>
              <Text category="p1" style={{color: '#858585'}}>
                Radish
              </Text>

              <VStack divider={<Divider />} space={2}>
                <HStack
                  py={3}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">Invite friends</Text>
                  <ChevronRight />
                </HStack>

                <TouchableOpacity
                  onPress={() => nav.navigate('AccountType' as any)}>
                  <HStack
                    py={3}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <Text category="p1">Change account access</Text>
                    <ChevronRight />
                  </HStack>
                </TouchableOpacity>

                <HStack
                  py={3}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">Community rules and guidelines</Text>
                  <ChevronRight />
                </HStack>

                <HStack
                  py={3}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">FAQs</Text>
                  <ChevronRight />
                </HStack>

                <HStack
                  py={3}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text category="p1">Contact us</Text>
                  <ChevronRight />
                </HStack>
              </VStack>
            </VStack>
          </VStack>

          {/* footer */}
          <VStack alignItems="center" justifyContent="center">
            <TouchableOpacity onPress={() => logout()}>
              <HStack space={3} alignItems="center" style={styles.logout}>
                <Exit width={20} height={20} color="#EE404C" />
                <Text category="p1">Logout</Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  editProfile: {
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  logout: {
    minWidth: '40%',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FEF8F6',
  },
});
