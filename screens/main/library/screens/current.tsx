import {Text} from '@ui-kitten/components';
import {HStack, Progress, VStack} from 'native-base';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {COVER} from '../../../dummy.data';

export default function CurrentlyReading() {
  return (
    <ScrollView contentContainerStyle={{padding: 24}}>
      <VStack space={6}>
        <HStack space={4} alignItems="center" justifyContent="space-between">
          <Text category="h2">Last read</Text>
          <Text category="p1" style={{color: '#858585'}}>
            Manage list
          </Text>
        </HStack>

        <VStack>
          {new Array(10).fill(0).map((_, i) => {
            return (
              <HStack key={i} py={4} space={4}>
                <Image source={COVER} style={styles.cover} />

                <VStack space={4} flex={1}>
                  <VStack space={1}>
                    <Text category="p1">A plan too late</Text>
                    <Text category="c2">Reynolds Andrews</Text>
                  </VStack>

                  <Text numberOfLines={2} style={{color: '#6B6B6B'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Feugiat et duis diam lectus posuere aliquam...
                  </Text>

                  <Progress size="xs" bg="#EFFBF9" value={30} />
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: 80,
    height: '100%',
    minHeight: 100,
    borderRadius: 8,
  },
});
