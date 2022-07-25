import {Divider, Text} from '@ui-kitten/components';
import {Box, HStack, Select, VStack} from 'native-base';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import authStore, {setData} from '@shared/stores/auth';

import Camera from './assets/camera.svg';

import {COVER} from '../../../../dummy.data';
import IconButton from '../../../../../shared/components/IconButton';

import {factory} from '@shared/lib/form';
import {useForm} from '@shared/lib/form/hook';
import {save_profile} from '@shared/services/profile';
import {useTheme} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {displayName} from '../../../../../app.json';

type Form = {
  about: string;
  gender: string;
  fullname: string;
  username: string;
};

type FormData = Awaited<ReturnType<typeof save_profile>>;

export default function EditProfile() {
  const {primary} = useTheme().colors;

  const {about, fullname, username, gender} = authStore(n => n.data!);

  const form = useRef(
    factory<Form, any, FormData, any>({
      initialErrors: {},
      initialValues: {about, gender, fullname, username},

      onValidate() {
        // const data = schema.safeParse(values);
        // if (!data.success) throw data.error.format();
      },

      async onSubmit(values) {
        return save_profile(values).catch(error => {
          return Promise.reject(
            error instanceof Error && error.name === 'NetworkError'
              ? {message: error.message}
              : error,
          );
        });
      },
    }),
  );

  const [
    {data, error, submit, values, isError, setValue, submitted, isSubmitting},
  ] = useForm(form.current);

  console.log(data, error);

  const setFieldValue = useCallback<
    <N extends keyof Form>(name: N) => (value: Form[N]) => void
  >(name => value => setValue({...values, [name]: value}), [setValue, values]);

  useEffect(() => {
    if (submitted && data) {
      showMessage({
        type: 'success',
        message: displayName,
        description: 'Profile updated successfully',
      });

      setData(data);
    }
  }, [submitted, data]);

  useEffect(() => {
    if (isError) {
      showMessage({
        type: 'danger',
        message: displayName,
        description: 'An error occurred while updating your profile',
      });
    }
  }, [isError]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 24}}>
      <VStack space={8}>
        <Box px={4} py={8} alignItems="center">
          <View>
            <Image source={COVER} style={avatar.img} />

            <Box
              bg="#fff"
              right={-5}
              bottom={-5}
              borderRadius={100}
              position="absolute">
              <IconButton size="small" icon={Camera} />
            </Box>
          </View>
        </Box>

        <VStack divider={<Divider />}>
          <HStack py={3} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Full name
            </Text>

            <TextInput
              style={styles.input}
              value={values.fullname}
              placeholder="Enter your name"
              onChangeText={setFieldValue('fullname')}
            />
          </HStack>

          <HStack py={3} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Username
            </Text>

            <TextInput
              style={styles.input}
              value={values.username}
              onChangeText={setFieldValue('username')}
            />
          </HStack>

          <HStack py={3} space={4}>
            <Text category="p1" style={styles.label}>
              About
            </Text>

            <TextInput
              multiline
              value={values.about}
              style={styles.input}
              onChangeText={setFieldValue('about')}
              placeholder="Write something about yourself"
            />
          </HStack>

          <HStack py={2} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Gender
            </Text>

            <Box w="3/4" maxW="100%">
              <Select
                // minWidth="200"
                fontSize={15}
                borderWidth={0}
                placeholder="Set"
                selectedValue={values.gender}
                onValueChange={setFieldValue('gender')}>
                <Select.Item label="Female" value="female" />
                <Select.Item label="male" value="male" />
                <Select.Item label="Non binary" value="non-binary" />
                <Select.Item
                  value="undisclosed"
                  label="Prefer not to disclose"
                />
              </Select>
            </Box>
          </HStack>

          {/* <HStack py={2} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Location
            </Text>

            <Box w="3/4" maxW="100%">
              <Select
                // minWidth="200"
                fontSize={15}
                borderWidth={0}
                placeholder="Set">
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
              </Select>
            </Box>
          </HStack> */}

          <Divider />
        </VStack>

        <Box alignItems="center">
          <TouchableOpacity style={styles.btn} onPress={() => submit()}>
            <HStack space={4} alignItems="center">
              {isSubmitting && (
                <ActivityIndicator size="small" color={primary} />
              )}
              <Text category="p1">Save changes</Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h: {
    alignItems: 'center',
  },
  label: {
    color: '#6B6B6B',
  },
  input: {
    flex: 1,
    padding: 0,
  },
  btn: {
    minWidth: '40%',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EFFBF9',
  },
});

const avatar = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
