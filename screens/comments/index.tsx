import {useNavigation} from '@react-navigation/native';
import {useParams} from '@shared/hooks/use_params';
import {Input, Layout} from '@ui-kitten/components';
import {Box, Select} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Xmark from '../assets/icons/xmark.svg';
import {COMMENTS} from '../dummy.data';

import firestore from '@react-native-firebase/firestore';

import {Reply} from './Reply';
import {StoreType} from './types';

export default function Comments() {
  const nav = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState('0');

  const {id, type} = useParams<{id: string; type: StoreType}>()!;

  useEffect(() => {
    const store = firestore().collection('comments').doc(type).collection(id);

    const unsubscribe = store.onSnapshot(snapshot => {
      for (const doc of snapshot.docs) {
        const docId = doc.id;
        const data = doc.data();
        console.log(docId, data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, type]);

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <IconButton
          size={15}
          onPress={() => nav.goBack()}
          icon={({size, color}) => (
            <Xmark width={size} height={size} color={color} />
          )}
        />
      ),
    });
  }, [nav]);

  return (
    <Layout style={styles.expand}>
      <FlatList
        data={COMMENTS}
        ItemSeparatorComponent={() => <Box h={5} />}
        ListHeaderComponentStyle={{marginBottom: 30}}
        renderItem={({item}) => <Reply reply={item} />}
        contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 40}}
        ListHeaderComponent={
          <View style={{maxWidth: '40%'}}>
            <Select
              selectedValue={selectedIndex}
              onValueChange={index => setSelectedIndex(index)}>
              <Select.Item value="0" label="All comments" />
              <Select.Item value="1" label="Top rated" />
              <Select.Item value="2" label="Most viewed" />
            </Select>
          </View>
        }
      />

      <Box px={4} pt={2} pb={16}>
        <Input
          style={styles.messageBox}
          placeholder="Write a comment"
          textStyle={{paddingVertical: 5}}
        />
      </Box>
    </Layout>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  messageBox: {
    borderRadius: 100,
    backgroundColor: '#EBEBEB',
  },
});
