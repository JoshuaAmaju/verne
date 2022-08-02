import Button from '@shared/components/Button';
import Input from '@shared/components/Input';
import Screen from '@shared/components/Screen';
import {Camera} from '@shared/exports/icons';
import {Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {factory} from '@shared/lib/form';
import {useForm} from '@shared/lib/form/hook';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as Storage from '../../services/storage';
import {useQuery} from 'react-query';

import * as z from 'zod';

const colors = ['red.500', 'red.700', 'green.700', 'black', 'yellow.400'];

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  cover: z.string({
    required_error: 'Please add a cover image or select a cover color',
  }),
});

export default function StorySummary() {
  const nav = useNavigation();

  const {id} = (useRoute().params ?? {}) as any;

  const {data} = useQuery(['writer.story', id], () => Storage.getStory(id), {
    enabled: !!id,
    refetchInterval: false,
  });

  const form = useRef(
    factory({
      initialValues: {},
      initialErrors: {},

      onValidate(values) {
        const d = schema.safeParse(values);
        if (!d.success) throw d.error.format();
      },

      async onSubmit() {
        // @ts-ignore
        nav.navigate('Writer.StorySettings', {story: data?._id});
      },
    }),
  );

  const [{}] = useForm(form.current);

  return (
    <Screen>
      <VStack flex={1} space={4} justifyContent="space-between">
        <VStack space={8}>
          <VStack space={4}>
            <Text category="h1" style={{textAlign: 'center'}}>
              Write new story
            </Text>

            <Text category="h2">
              Kindly provide the following information for your new book
            </Text>
          </VStack>

          <VStack space={6}>
            <Input
              textStyle={styles.textfield}
              placeholder="Enter story title"
            />

            <VStack space={2}>
              <Text category="h2">Summary</Text>

              <TextInput
                style={styles.textarea}
                placeholder="Type summary here..."
              />
            </VStack>

            <VStack space={2}>
              <Text category="h2">Cover</Text>

              <HStack space={4}>
                <VStack flex={1} space={2}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.card, styles.touch_camera]}>
                    <Camera width={40} height={40} />
                  </TouchableOpacity>

                  <Text category="p1" style={styles.card_title}>
                    Upload
                  </Text>
                </VStack>

                <VStack flex={1} space={2}>
                  <TouchableOpacity onPress={() => {}}>
                    <HStack style={styles.card}>
                      {colors.map((color, i) => {
                        const last = i >= colors.length - 1;

                        return (
                          <Box
                            bg={color}
                            key={color}
                            flex={last ? 3 : 1}
                            {...(last && {borderRightRadius: 8})}
                            {...(i === 0 && {borderLeftRadius: 8})}
                          />
                        );
                      })}
                    </HStack>
                  </TouchableOpacity>

                  <Text category="p1" style={styles.card_title}>
                    Choose color
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </VStack>

        <Button>Continue</Button>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    // width: 175,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textfield: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  textarea: {
    height: 120,
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D1D1D1',
    textAlignVertical: 'top',
  },
  touch_camera: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFFBF9',
  },
  card_title: {
    textAlign: 'center',
  },
});
