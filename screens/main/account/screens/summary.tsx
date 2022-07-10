import {Divider, Text, Toggle} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../../shared/components/Button';
import {ChevronRight} from '../../../../shared/exports/icons';
import {COVER} from '../../../dummy.data';

import Exit from '../../../../assets/icons/exit.svg';
import {useNavigation} from '@react-navigation/native';

export default function Summary() {
  const nav = useNavigation();

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
                  <Text category="h2">Jane Andrews</Text>
                  <Text category="p1" style={{color: '#798486'}}>
                    @jane12
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
                Just here to read great stories and connect with amazing people
              </Text>

              <HStack space={6}>
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('People', {screen: 'Followers'});
                  }}>
                  <Text category="p1">
                    100.8k{' '}
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
                    20k{' '}
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
            <TouchableOpacity>
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
