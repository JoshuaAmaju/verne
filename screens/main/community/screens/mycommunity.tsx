import {useNavigation} from '@react-navigation/native';
import {Box, VStack} from 'native-base';
import React from 'react';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import SearchBar from '../../../../shared/components/SearchBar';
import Room from '../../../components/room';
import Section from '../../../components/section';
import {Communities, ROOMS} from '../../../dummy.data';
import Community from '../components/community';

export default function MyCommunity() {
  const nav = useNavigation();

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Box p={4} bg="#fff">
        <SearchBar placeholder="Search" />
      </Box>

      <VStack space={4}>
        <Section title="Live audio rooms">
          <FlatList
            horizontal
            data={ROOMS}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Room {...item} />}
            contentContainerStyle={{paddingHorizontal: 24}}
            ItemSeparatorComponent={() => <Box width={3} />}
          />
        </Section>

        <VStack space={4} p={4}>
          {Communities.map(community => (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                nav.navigate('Details', {id: community.id});
              }}>
              <Community {...community} status="member" />
            </TouchableOpacity>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
