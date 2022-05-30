import {useNavigation, useRoute} from '@react-navigation/native';
import {Divider, Text} from '@ui-kitten/components';
import {Box, HStack} from 'native-base';
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import Screen from '../../shared/components/Screen';
import {ChevronRight, Xmark} from '../../shared/exports/icons';
import {ReportTypes} from '../dummy.data';

export default function Report() {
  const nav = useNavigation();
  const {params = {} as any} = useRoute();

  const {id} = params;

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <IconButton
          size={15}
          icon={({size, color}) => (
            <Xmark width={size} height={size} color={color} />
          )}
        />
      ),
    });
  }, [nav]);

  return (
    <Screen>
      <Text category="h2">What is your reason for reporting this story?</Text>

      <Box mt={4}>
        <FlatList
          data={ReportTypes}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                nav.navigate('SingleReport', {id, type: item.type});
              }}>
              <HStack py={4} alignItems="center" justifyContent="space-between">
                <Text>{item.label}</Text>
                <ChevronRight width={15} height={15} color="#383838" />
              </HStack>
            </TouchableOpacity>
          )}
        />
      </Box>
    </Screen>
  );
}
