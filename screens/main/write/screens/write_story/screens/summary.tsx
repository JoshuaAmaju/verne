import Button from '@shared/components/Button';
import Input from '@shared/components/Input';
import Screen from '@shared/components/Screen';
import {Camera} from '@shared/exports/icons';
import {Modal, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker';

import {useNavigation} from '@react-navigation/native';
import {factory} from '@shared/lib/form';
import {useForm} from '@shared/lib/form/hook';

import * as z from 'zod';

import {launchImageLibrary} from 'react-native-image-picker';
import {Caption} from 'react-native-paper';

import {Context, CoverType} from '../provider';

const colors = ['red.500', 'red.700', 'green.700', 'black', 'yellow.400'];

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  cover: z.any({
    required_error: 'Please add a cover image or select a cover color',
  }),
});

type FormValues = z.infer<typeof schema>;

type FormErrors = z.ZodFormattedError<FormValues>;

export default function StorySummary() {
  const nav = useNavigation();

  // const {id} = (useRoute().params ?? {}) as any;

  const [showPicker, setShowPicker] = useState(false);

  const {setStory} = useContext(Context);

  // const {data} = useQuery(['writer.story', id], () => Storage.getStory(id), {
  //   enabled: !!id,
  //   refetchInterval: false,
  // });

  const form = useRef(
    factory<FormValues, FormErrors>({
      initialErrors: {},
      initialValues: {} as any,

      onValidate(values) {
        const d = schema.safeParse(values);
        if (!d.success) throw d.error.format();
      },

      async onSubmit(vals) {
        setStory(vals);
        nav.navigate('Settings' as any);
      },
    }),
  );

  const [{values, errors, setValue, submit}] = useForm(form.current);

  const setFieldValue = useCallback<
    (name: keyof FormValues) => (value: FormValues[typeof name]) => void
  >(
    name => value => {
      setValue({...values, [name]: value});
    },
    [values, setValue],
  );

  const closePicker = useCallback(() => setShowPicker(false), []);

  return (
    <>
      <Screen>
        <VStack flex={1} space={4} justifyContent="space-between">
          <VStack space={8}>
            <VStack space={4}>
              <Text category="h1" style={{textAlign: 'center'}}>
                Write new story
              </Text>

              <Text category="h2" style={{fontWeight: '400'}}>
                Kindly provide the following information for your new book
              </Text>
            </VStack>

            <VStack space={6}>
              <VStack space={2}>
                <Input
                  textStyle={styles.textfield}
                  placeholder="Enter story title"
                  status={errors?.title && 'danger'}
                  onChangeText={setFieldValue('title')}
                />

                {errors?.title && (
                  <Caption style={{color: 'red'}}>
                    {errors.title?._errors.join(', ')}
                  </Caption>
                )}
              </VStack>

              <VStack space={2}>
                <Text category="h2">Summary</Text>

                <TextInput
                  placeholder="Type summary here..."
                  onChangeText={setFieldValue('summary')}
                  style={[
                    styles.textarea,
                    errors?.summary && {borderColor: 'red'},
                  ]}
                />

                {errors?.summary && (
                  <Caption style={{color: 'red'}}>
                    {errors.summary?._errors.join(', ')}
                  </Caption>
                )}
              </VStack>

              <VStack space={2}>
                <Text category="h2">Cover</Text>

                <HStack space={4}>
                  <VStack flex={1} space={2}>
                    <TouchableOpacity
                      onPress={async () => {
                        const result = await launchImageLibrary({
                          selectionLimit: 1,
                          mediaType: 'photo',
                          includeBase64: true,
                        });

                        if (result.assets) {
                          const [asset] = result.assets;

                          setFieldValue('cover')({
                            value: asset,
                            type: CoverType.image,
                          });
                        }
                      }}
                      style={[styles.card, styles.touch_camera]}>
                      {values.cover && values.cover.type === CoverType.image ? (
                        <Image
                          source={{uri: values.cover.value.uri}}
                          style={{width: '100%', height: '100%'}}
                        />
                      ) : (
                        <Camera width={40} height={40} />
                      )}
                    </TouchableOpacity>

                    <Text category="p1" style={styles.card_title}>
                      Upload
                    </Text>
                  </VStack>

                  <VStack flex={1} space={2}>
                    <TouchableOpacity onPress={() => setShowPicker(true)}>
                      <HStack style={styles.card}>
                        {values.cover?.type === CoverType.color ? (
                          <Box w="full" h="full" bg={values.cover.value} />
                        ) : (
                          colors.map((color, i) => {
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
                          })
                        )}
                      </HStack>
                    </TouchableOpacity>

                    <Text category="p1" style={styles.card_title}>
                      Choose color
                    </Text>
                  </VStack>
                </HStack>

                {errors?.cover && (
                  <Caption style={{color: 'red'}}>
                    {errors.cover?._errors.join(', ')}
                  </Caption>
                )}
              </VStack>
            </VStack>
          </VStack>

          <Button onPress={submit}>Continue</Button>
        </VStack>
      </Screen>

      {/* <Box flex={1} bg="white" style={StyleSheet.absoluteFillObject}>
        <IconButton
          icon={Xmark}
          style={{top: 0, right: 0, position: 'absolute'}}
          onPress={() => {}}
        />

        <ColorPicker
          style={{flex: 1}}
          color={values.cover}
          onColorSelected={setFieldValue('cover')}
        />
      </Box> */}

      <Modal
        visible={showPicker}
        onBackdropPress={closePicker}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={styles.modalContainer}>
          <ColorPicker
            // value="red"
            style={{width: '80%'}}
            onComplete={color => {
              setFieldValue('cover')({
                value: color.rgba,
                type: CoverType.color,
              });
            }}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>

          <Button onPress={closePicker} style={{marginTop: 10}}>
            Close
          </Button>
        </View>
      </Modal>
    </>
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
  modalContainer: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
