import {http} from '@shared/http';
import {Res} from '@shared/types/server_response';
import {Story} from '@shared/types/story';
import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

import * as Storage from '../../services/storage';

import {RichEditor} from 'react-native-pell-rich-editor';
import {useMutation} from 'react-query';

export default function WriteStory() {
  const [title, setTitle] = useState<string>();
  const [story, setStory] = useState<string>();

  const mutation = useMutation(async () => {
    const {data} = await http.post<Res<Story>>('/story/create', {
      title: '',
      // summary: '',
      // coverimageUrl: '',
      // categories: [''],
      // tags: ['test'],
      // rate18: true,
      // coverColor: '#383838',
    });

    return data.data;
  });

  useEffect(() => {
    mutation.mutate();
  }, [mutation]);

  console.log(mutation.data);

  return (
    <ScrollView contentContainerStyle={{padding: 24}}>
      <VStack space={8}>
        <TextInput
          multiline
          value={title}
          style={styles.chapter}
          onChangeText={setTitle}
          placeholder="Chapter Title"
          placeholderTextColor="#9E9E9E"
          onBlur={_ => {
            Storage.saveStory({title} as any);
          }}
        />

        <RichEditor
          onChange={setStory}
          initialContentHTML="Write here"
          onBlur={() => {
            // Storage.saveStory({title});
          }}
        />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chapter: {
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
});
