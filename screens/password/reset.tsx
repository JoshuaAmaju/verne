import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import Button from '../../shared/components/Button';
import ErrorMessage from '../../shared/components/ErrorMessage';
import PasswordInput from '../../shared/components/PasswordInput';
import Screen from '../../shared/components/Screen';
import * as auth from '../../shared/stores/auth';

export default function Reset() {
  const nav = useNavigation();

  return (
    <Screen>
      <VStack space={10}>
        <VStack space={3}>
          <Text category="h1" style={{textAlign: 'center'}}>
            Reset your password
          </Text>

          <Text category="p1">Kindly enter your new password</Text>
        </VStack>

        <VStack space={12}>
          <VStack space={6}>
            <PasswordInput />

            <VStack space={4}>
              <PasswordInput />
              <ErrorMessage>Password does not match</ErrorMessage>
            </VStack>
          </VStack>

          <Button
            onPress={() => {
              auth.logout();
              nav.navigate('Login' as any);
            }}>
            Reset Password
          </Button>
        </VStack>
      </VStack>
    </Screen>
  );
}
