import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {Divider} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import Profile from './components/profile';

export default function Followers() {
  const query = useQuery(['followers'], async () => {
    const res = await http.get<Paginated<any>>('/user/relation/followers');
    return res.data;
  });

  console.log('followers', query.data);

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
