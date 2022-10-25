import {http} from '@shared/http';
import {Chapter, Story} from '@shared/types/story';
import {Box, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Button from '@shared/components/Button';
import {useParams} from '@shared/hooks/use_params';
import {RichEditor} from 'react-native-pell-rich-editor';
import {useMutation, useQuery} from 'react-query';
import {Spinner} from '@ui-kitten/components';

export default function WriteStory() {
  const params = useParams<{chapter: string; story: Story['_id']}>();

  const navigator = useNavigation();

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  // const [modeSet, setModeSet] = useState(false);

  const [mode, setMode] = useState<'new' | 'editing'>(
    !params?.chapter ? 'new' : 'editing',
  );

  // const timeout = useRef<NodeJS.Timeout>();

  const details = {
    title,
    content: story,
    storyId: params?.story,
    wordsCount: story.length.toString(),
  };

  const query = useQuery(
    ['chapter', params?.chapter],
    async () => {
      const res = await http.get<Chapter>(`/chapter/find/${params?.chapter}`);
      return res.data;
    },
    {
      refetchInterval: false,
      enabled: !!params?.chapter,
      onSuccess(data) {
        setMode('editing');
        setTitle(data.title);
        setStory(data.content);
      },
    },
  );

  // console.log('chapter', query.data);

  const createMutation = useMutation(
    async () => {
      const res = await http.post<Chapter>('/chapter/create', details);
      return res.data;
    },
    {
      onSuccess() {
        setMode('editing');
      },
    },
  );

  const updateMutation = useMutation<any, any, string>(async id => {
    const {data} = await http.put(`/chapter/update/${id}`, details);
    console.log('update', data);
    return data;
  });

  console.log(mode, createMutation.isLoading);

  const chapterId = params?.chapter ?? createMutation.data?._id;

  useEffect(() => {
    if (
      mode === 'new' &&
      !createMutation.isLoading &&
      !createMutation.isSuccess &&
      title.trim() !== '' &&
      story.trim() !== ''
    ) {
      createMutation.mutate();
    }
  }, [mode, createMutation, title, story]);

  useEffect(() => {
    navigator.setOptions({
      headerRight: () =>
        createMutation.isLoading ? (
          <Spinner size="tiny" />
        ) : (
          mode === 'editing' &&
          chapterId && (
            <Button
              appearance="ghost"
              {...(updateMutation.isLoading && {
                accessoryLeft: () => <Spinner size="tiny" />,
              })}
              onPress={() => {
                updateMutation.mutate(chapterId);
              }}>
              Save
            </Button>
          )
        ),
    });
  }, [mode, chapterId, navigator, updateMutation, createMutation.isLoading]);

  if (params?.chapter && (query.isLoading || query.isFetching)) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Spinner size="medium" />
      </Box>
    );
  }

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
          // onBlur={_ => {
          //   Storage.saveStory({title} as any);
          // }}
        />

        <RichEditor
          onChange={setStory}
          placeholder="Write here"
          initialContentHTML={story}
        />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chapter: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
