import {Box, VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import SearchBar from '../../../../shared/components/SearchBar';
import {Communities} from '../../../dummy.data';
import Community from '../components/community';

export default function Explore() {
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Box p={4} bg="#fff">
        <SearchBar placeholder="Search" />
      </Box>

      <VStack space={4} p={4}>
        {Communities.map(community => (
          <Community key={community.id} {...community} />
        ))}
      </VStack>
    </ScrollView>
  );
}
