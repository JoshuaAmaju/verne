import React from 'react';
import {VStack, HStack} from 'native-base';
import {Text, Avatar} from '@ui-kitten/components';

// @ts-ignore
import abbreviate from 'mout/number/abbreviate';

import type {Room as IRoom} from '../dummy.data';
import {StyleSheet, View} from 'react-native';

export default function Room(room: IRoom) {
  const host = room.participants.find(p => p.type === 'host');

  return (
    <VStack p={5} space={4} borderRadius={20} backgroundColor="mistyrose">
      <VStack space={2}>
        <Text category="c1">{room.community}</Text>
        <Text category="h6" style={{maxWidth: 300}}>
          {room.title}
        </Text>
      </VStack>

      <HStack space={3} alignItems="center" justifyContent="space-between">
        {host && (
          <HStack space={2} alignItems="center">
            <HStack space={2} alignItems="center">
              <Avatar size="tiny" source={host.avatar as any} />
              <Text category="c2">{host.name}</Text>
            </HStack>

            <View style={styles.hostLabel}>
              <Text category="c2">Host</Text>
            </View>
          </HStack>
        )}

        <Text category="c2">
          {abbreviate(room.participants.length)} Listeners
        </Text>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  hostLabel: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#EBEBEB',
  },
});
