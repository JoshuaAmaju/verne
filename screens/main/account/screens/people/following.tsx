import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {Divider} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import Profile from './components/profile';

export default function Following() {
  const query = useQuery(['following'], async () => {
    const res = await http.get<Paginated<any>>('/user/relation/following');
    return res.data;
  });

  console.log('following', query.data);

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
