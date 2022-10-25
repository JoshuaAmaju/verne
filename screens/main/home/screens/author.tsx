import {useRoute} from '@react-navigation/native';
import Screen from '@shared/components/Screen';
import {http} from '@shared/http';
import {Author as IAuthor} from '@shared/types/story';
import {Text} from '@ui-kitten/components';
import {Box, VStack} from 'native-base';
import React from 'react';
import {useQuery} from 'react-query';

export default function Author() {
  const {params = {} as any} = useRoute();

  const {_id} = params as IAuthor;

  const query = useQuery(['author', _id], async () => {
    const res = await http.get<IAuthor>(`/user/author/${_id}`);
    return res.data;
  });

  console.log('author query', query.data);

  return (
    <Screen style={{padding: 0}}>
      <Box>
        <Box h={400} bg="gray.100" />

        <VStack>
          <Text>{query.data?.fullname}</Text>
        </VStack>
      </Box>

      <Box p={4} mt={-10} bg="white" borderTopRadius={24}>
        <Text>{query.data?.about}</Text>
      </Box>
    </Screen>
  );
}
