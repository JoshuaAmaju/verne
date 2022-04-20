import {Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entity as TEntity} from '../dummy.data';
import Image from 'react-native-fast-image';
import Star from '../../../assets/icons/star.svg';

export default function Entity({cover, title, author, rating}: TEntity) {
  return (
    <VStack space={1}>
      <View style={styles.entityCard}>
        <Image source={cover} style={StyleSheet.absoluteFillObject} />

        <Text category="h1" style={styles.title}>
          {title}
        </Text>
      </View>

      <HStack space={2} justifyContent="space-between">
        <Text category="c2">{author}</Text>

        <HStack space={1} alignItems="center">
          <Text category="s2">{rating}</Text>
          <Star width={13} height={13} color="#FFC107" />
        </HStack>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
  },
  entityCard: {
    width: 180,
    height: 160,
    padding: 18,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});
