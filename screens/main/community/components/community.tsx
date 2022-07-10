import React from 'react';
import {Avatar, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';

// @ts-ignore
import abbreviate from 'mout/number/abbreviate';

import {Community as ICommunity} from '../../../dummy.data';
import Button from '../../../../shared/components/Button';

export default function Community({
  type,
  name,
  avatar,
  status,
  members,
  description,
}: ICommunity) {
  return (
    <HStack px={4} py={6} space={4} bg="#F7FDFC" borderRadius={8}>
      <Avatar size="large" source={avatar as any} />

      <VStack space={6} flex={1}>
        <VStack space={4}>
          <Text category="h2">{name}</Text>

          <HStack flex={1} space={2} alignItems="center">
            <Text category="p2">{abbreviate(members.length)} members</Text>
            <Box size={2} bg="#F9DED7" borderRadius={100} />
            <Text
              category="p2"
              style={{textTransform: 'capitalize'}}>{`${type} community`}</Text>
          </HStack>

          <Text style={{color: '#525252'}}>{description}</Text>
        </VStack>

        {!status ? (
          <Button
            appearance="outline"
            style={{borderRadius: 8, backgroundColor: '#fff'}}>
            Join community
          </Button>
        ) : (
          <Text style={{color: '#858585'}}>Member</Text>
        )}
      </VStack>
    </HStack>
  );
}
