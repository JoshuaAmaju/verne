import {Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Screen from '../../shared/components/Screen';

export default function Reset() {
  return (
    <Screen>
      <VStack space={10}>
        <VStack space={3}>
          <Text category="h1" style={{textAlign: 'center'}}>
            Forgot your password?
          </Text>

          <Text category="p1">
            No problem. Kindly enter your email address to reset your password.
          </Text>
        </VStack>

        <VStack space={8}>
          <Input keyboardType="email-address" placeholder="Email address" />
          <Button>Continue</Button>
        </VStack>
      </VStack>
    </Screen>
  );
}
