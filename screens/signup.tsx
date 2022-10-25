import {useNavigation} from '@react-navigation/native';
import {Divider, Text, Input as UIInput} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React, {createRef, useCallback, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import Facebook from '../assets/icons/facebook.svg';
import Google from '../assets/icons/google.svg';
import Button from '../shared/components/Button';
import Input from '../shared/components/Input';
import PasswordInput from '../shared/components/PasswordInput';
import colors from '../theme/colors';

import {displayName} from '../app.json';

import axios, {AxiosError} from 'axios';
import * as auth from '../shared/stores/auth';

import {api_url} from '@env';

import * as onboarding from '@shared/stores/onborading';

import * as z from 'zod';

import {factory} from '@shared/lib/form';
import {useForm} from '@shared/lib/form/hook';
import {showMessage} from 'react-native-flash-message';

const schema = z.object({
  password: z.string({required_error: 'Password is required'}),
  username: z.string({required_error: 'Username is required'}),
  email: z
    .string({required_error: 'Email address is required'})
    .email({message: 'Please enter a valid email address'}),
});

type Form = z.infer<typeof schema> & {strategy: auth.Strategy};

type FormErrors = z.ZodFormattedError<Form>;

type FormData = Awaited<ReturnType<typeof signup>>;

type Res = {
  error: boolean;
  message: string;
  data: auth.Info;
  statusCode: number;
};

const signup = async ({strategy, ...args}: Form): Promise<Res> => {
  const body = {
    ...args,
    social: strategy !== auth.Strategy.local,
  };

  const {data} = await axios.post(`${api_url}/signup/user`, body);

  return data;
};

export default function Signup() {
  const nav = useNavigation();

  const usernameRef = createRef<UIInput>();
  const passwordRef = createRef<UIInput>();

  const [, send] = onboarding.useContext();

  const form = useRef(
    factory<Form, FormErrors, FormData, Res>({
      initialErrors: {},
      initialValues: {},

      onValidate(values) {
        const data = schema.safeParse(values);
        if (!data.success) throw data.error.format();
      },

      async onSubmit(values) {
        return signup(values).catch(error => {
          const err =
            (error as AxiosError<Record<string, string[]>>).response?.data ??
            (error as Error);

          return Promise.reject(
            err instanceof Error && err.name === 'NetworkError'
              ? {message: err.message}
              : err,
          );
        });
      },
    }),
  );

  const [
    {
      values,
      data,
      isError,
      error,
      errors,
      submit,
      isSubmitting,
      submitted,
      setValue,
    },
  ] = useForm(form.current);

  // console.log(error, (error as any)?.response?.data, data);

  const setFieldValue = useCallback<
    <N extends keyof Form>(name: N) => (value: Form[N]) => void
  >(
    name => value => {
      setValue({...values, [name]: value});
    },
    [setValue, values],
  );

  const onSubmit = useCallback(() => {
    send(onboarding.Action.reset);
    submit();
  }, [send, submit]);

  useEffect(() => {
    if (submitted && data) {
      showMessage({
        type: 'success',
        message: displayName,
        description: data.message,
      });

      auth.login(data.data);

      send(onboarding.Action.next);

      // nav.navigate('Setup.Initial' as any);
    }
  }, [nav, submitted, data, send]);

  useEffect(() => {
    if (isError && error) {
      showMessage({
        type: 'danger',
        message: displayName,
        description: error.message,
      });
    }
  }, [isError, error]);

  return (
    <ScrollView
      style={styles.expand}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screen}>
      <VStack space={4} flex={1} justifyContent="space-between">
        <VStack space={12}>
          <Text>
            Kindly provide the following information to create your free account
          </Text>

          <VStack space={9}>
            <VStack space={4}>
              <Input
                autoComplete="off"
                value={values.email}
                returnKeyType="next"
                placeholder="Email address"
                keyboardType="email-address"
                onChangeText={setFieldValue('email')}
                onSubmitEditing={() => usernameRef.current?.focus()}
                {...(!!errors?.email && {
                  status: 'danger',
                  caption: () => (
                    <Text style={styles.error}>
                      {errors.email?._errors.join(', ')}
                    </Text>
                  ),
                })}
              />

              <Input
                ref={usernameRef}
                autoComplete="off"
                returnKeyType="next"
                placeholder="Username"
                value={values.username}
                onChangeText={setFieldValue('username')}
                onSubmitEditing={() => passwordRef.current?.focus()}
                {...(!!errors?.username && {
                  status: 'danger',
                  caption: () => (
                    <Text style={styles.error}>
                      {errors.username?._errors.join(', ')}
                    </Text>
                  ),
                })}
              />

              <PasswordInput
                ref={passwordRef}
                placeholder="Password"
                value={values.password}
                onSubmitEditing={onSubmit}
                onChangeText={setFieldValue('password')}
                {...(!!errors?.password && {
                  status: 'danger',
                  caption: () => (
                    <Text style={styles.error}>
                      {errors.password?._errors.join(', ')}
                    </Text>
                  ),
                })}
              />
            </VStack>

            <VStack space={4}>
              <Button
                {...(isSubmitting && {
                  accessoryLeft: (props: any) => (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                      style={props.style}
                    />
                  ),
                })}
                onPress={onSubmit}>
                Join for free
              </Button>

              <HStack space={2} alignItems="center">
                <Divider style={styles.expand} />
                <Text appearance="hint" style={{lineHeight: 16.8}}>
                  or
                </Text>
                <Divider style={styles.expand} />
              </HStack>

              <VStack space={4}>
                <Button
                  appearance="outline"
                  accessoryLeft={({style}: any) => <Google {...style} />}>
                  Sign up with Google
                </Button>

                <Button
                  appearance="outline"
                  accessoryLeft={({style}: any) => (
                    <Facebook {...style} color="#3D6AD6" />
                  )}>
                  Sign up with facebook
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </VStack>

        <HStack mt={3} space={1} alignItems="center" justifyContent="center">
          <Text>I already have an account.</Text>

          <TouchableNativeFeedback onPress={() => nav.navigate('Login' as any)}>
            <Text style={styles.link}>Login</Text>
          </TouchableNativeFeedback>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  screen: {
    padding: 24,
    minHeight: '100%',
  },
  link: {
    color: colors.accent,
  },
  divider: {
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
