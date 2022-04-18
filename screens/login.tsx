import {useNavigation} from '@react-navigation/native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import Facebook from '../assets/icons/facebook.svg';
import Google from '../assets/icons/google.svg';
import Button from '../shared/components/Button';
import Input from '../shared/components/Input';
import PasswordInput from '../shared/components/PasswordInput';
import colors from '../theme/colors';
import * as auth from '../shared/stores/auth';

export default function Signup() {
  const nav = useNavigation();

  return (
    <Layout style={[styles.expand, styles.screen]}>
      <VStack space={12}>
        <VStack space={2}>
          <Text category="h1" style={{textAlign: 'center'}}>
            Login
          </Text>

          <Text>
            Kindly provide the following information to login to your account
          </Text>
        </VStack>

        <VStack space={9}>
          <VStack space={3}>
            <VStack space={4}>
              <Input
                keyboardType="email-address"
                placeholder="Username or email address"
              />

              <PasswordInput placeholder="Password" />
            </VStack>

            <TouchableNativeFeedback
              onPress={() => nav.navigate('ForgotPassword' as any)}>
              <Text style={{color: colors.accent}}>I forgot my password</Text>
            </TouchableNativeFeedback>
          </VStack>

          <VStack space={4}>
            <Button
              onPress={() => {
                auth.login();
                // nav.navigate('Home' as any);
              }}>
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
                accessoryLeft={({style}: any) => <Google {...style} />}>
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

        <TouchableNativeFeedback onPress={() => nav.navigate('Signup' as any)}>
          <Text style={styles.link}>Create free account</Text>
        </TouchableNativeFeedback>
      </HStack>
    </Layout>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  screen: {
    padding: 24,
    justifyContent: 'space-between',
  },
  link: {
    color: colors.accent,
  },
  divider: {
    flex: 1,
  },
});
