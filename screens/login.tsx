import {useNavigation} from '@react-navigation/native';
import {Divider, Input as UIInput, Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React, {createRef, useCallback, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
// import {
//   statusCodes,
//   GoogleSignin,
//   NativeModuleError,
// } from '@react-native-google-signin/google-signin';

import Facebook from '../assets/icons/facebook.svg';
import Google from '../assets/icons/google.svg';

import Button from '../shared/components/Button';
import Input from '../shared/components/Input';
import PasswordInput from '../shared/components/PasswordInput';

import * as auth from '../shared/stores/auth';
import colors from '../theme/colors';

import axios, {AxiosError} from 'axios';
import * as z from 'zod';

import {api_url} from '@env';
import {displayName} from '../app.json';

import {factory} from '@shared/lib/form';
import {useForm} from '@shared/lib/form/hook';
import {showMessage} from 'react-native-flash-message';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

type Form = z.infer<typeof schema> & {strategy: auth.Strategy};

type FormErrors = z.ZodFormattedError<Form>;

type FormData = Awaited<ReturnType<typeof login>>;

type Res = {
  error: boolean;
  message: string;
  data: auth.Info;
  statusCode: number;
};

const login = async ({strategy, ...args}: Form): Promise<Res> => {
  const body = {
    ...args,
    social: strategy !== auth.Strategy.local,
  };

  const {data} = await axios.post(`${api_url}/auth/login`, body);

  return data;
};

export default function Login() {
  const nav = useNavigation();

  const passwordRef = createRef<UIInput>();

  const form = useRef(
    factory<Form, FormErrors, FormData, Res>({
      initialErrors: {},
      initialValues: {
        strategy: auth.Strategy.local,
      },

      onValidate(values) {
        const data = schema.safeParse(values);
        if (!data.success) throw data.error.format();
      },

      async onSubmit(values) {
        return login(values).catch(error => {
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
      data,
      error,
      errors,
      submit,
      values,
      isError,
      setValue,
      submitted,
      isSubmitting,
    },
  ] = useForm(form.current);

  // console.log(data, error);

  const setFieldValue = useCallback<
    <N extends keyof Form>(name: N) => (value: Form[N]) => void
  >(
    name => value => {
      setValue({...values, [name]: value});
    },
    [setValue, values],
  );

  useEffect(() => {
    if (submitted && data) {
      showMessage({
        type: 'success',
        message: displayName,
        description: data.message,
      });

      auth.login(data.data);

      // nav.navigate('Setup.Initial' as any);
    }
  }, [submitted, data]);

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
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screen}>
      <VStack flex={1} space={4} justifyContent="space-between">
        <VStack space={12}>
          <Text>
            Kindly provide the following information to login to your account
          </Text>

          <VStack space={9}>
            <VStack space={3}>
              <VStack space={4}>
                <Input
                  returnKeyType="next"
                  value={values.username}
                  keyboardType="email-address"
                  placeholder="Username or email address"
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
                  keyboardType="visible-password"
                  onSubmitEditing={() => submit()}
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

              <TouchableNativeFeedback
                onPress={() => nav.navigate('ForgotPassword' as any)}>
                <Text style={{color: colors.accent}}>I forgot my password</Text>
              </TouchableNativeFeedback>
            </VStack>

            <VStack space={4}>
              <Button
                onPress={() => submit()}
                {...(isSubmitting && {
                  accessoryLeft: (props: any) => (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                      style={props.style}
                    />
                  ),
                })}>
                Login
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
                  accessoryLeft={({style}: any) => <Google {...style} />}
                  onPress={() => {
                    // GoogleSignin.configure();
                    // GoogleSignin.signIn()
                    //   .then(info => {
                    //     console.log(info, statusCodes);
                    //   })
                    //   .catch(error => {
                    //     const err = error as NativeModuleError;
                    //     console.log(err.message);
                    //     console.log(err.code);
                    //     console.log(statusCodes);
                    //     console.log(JSON.stringify(error));
                    //     switch (error.code) {
                    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    //         break;
                    //       default:
                    //         break;
                    //     }
                    //   });
                  }}>
                  Login with Google
                </Button>

                <Button
                  appearance="outline"
                  accessoryLeft={({style}: any) => (
                    <Facebook {...style} color="#3D6AD6" />
                  )}>
                  Login with facebook
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </VStack>

        <HStack mt={3} space={1} alignItems="center" justifyContent="center">
          <Text>I don't have an account.</Text>

          <TouchableNativeFeedback
            onPress={() => nav.navigate('Signup' as any)}>
            <Text style={styles.link}>Create free account</Text>
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
});
