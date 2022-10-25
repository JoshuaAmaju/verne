import {useNavigation} from '@react-navigation/native';
import Button from '@shared/components/Button';
import Screen from '@shared/components/Screen';
import {Xmark} from '@shared/exports/icons';
import {Text} from '@ui-kitten/components';
import {Box, VStack} from 'native-base';
import React, {createRef, useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Chip} from 'react-native-paper';

import {Context} from '../provider';

export default function SelectTags() {
  const {story, setStory} = useContext(Context);

  const {tags} = story;

  const nav = useNavigation();

  const ref = createRef<TextInput>();

  return (
    <Screen>
      <VStack flex={1} space={4} justifyContent="space-between">
        <VStack space={6}>
          <Text category="h2" style={{fontWeight: '400'}}>
            Type the tags for your story
          </Text>

          <Box
            py={2}
            flexWrap="wrap"
            flexDirection="row"
            alignItems="center"
            borderBottomWidth={1}
            borderBottomColor="#EBEBEB">
            <Box flexDirection="row" flexWrap="wrap">
              {tags?.map((tag, i) => (
                <Chip
                  key={`${tag}_${i}`}
                  style={{margin: 3}}
                  onClose={() => setStory({tags: tags?.filter(t => t !== tag)})}
                  closeIcon={({color}) => (
                    <Xmark width={12} height={12} color={color} />
                  )}>
                  {tag}
                </Chip>
              ))}
            </Box>

            <TextInput
              ref={ref}
              placeholder="Tag"
              returnKeyType="send"
              style={styles.input}
              placeholderTextColor="#ccc"
              onSubmitEditing={e => {
                const tag = e.nativeEvent.text;

                if (tag.trim() !== '') {
                  setStory({tags: [...(tags ?? []), tag]});
                  ref.current?.clear();
                  ref.current?.focus();
                }
              }}
            />
          </Box>
        </VStack>

        <Button onPress={() => nav.goBack()}>Continue</Button>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 0,
    color: '#000',
    // borderWidth: 2,
    minWidth: '40%',
    paddingHorizontal: 3,
  },
});
