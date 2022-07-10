import {Divider} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import Profile from './components/profile';

export default function Followers() {
  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
      <VStack divider={<Divider />}>
        {new Array(10).fill(0).map((_, i) => {
          return <Profile key={i} />;
        })}
      </VStack>
    </ScrollView>
  );
}
