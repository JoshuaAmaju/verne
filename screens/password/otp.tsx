import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Screen from '../../shared/components/Screen';

export default function Reset() {
  const nav = useNavigation();
  const [otp, setOTP] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setOTP('123456');
    }, 3000);
  }, []);

  useEffect(() => {
    if (otp) {
      setTimeout(() => {
        nav.navigate('ResetPassword' as any);
      }, 1000);
    }
  }, [otp, nav]);

  return (
    <Screen>
      <VStack space={32}>
        <VStack space={3}>
          <Text category="h1" style={{textAlign: 'center'}}>
            Reset your password
          </Text>

          <Text category="p1">
            Kindly enter the OTP that was sent to your email address
          </Text>
        </VStack>

        <VStack space={8} alignItems="center">
          <Input
            value={otp}
            textAlign="center"
            style={styles.otp}
            keyboardType="number-pad"
            textStyle={styles.otpText}
          />

          <VStack space={3} alignItems="center">
            <Button appearance="outline">Resend OTP</Button>
            <Text category="c1">Resend in 5s</Text>
          </VStack>
        </VStack>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  otp: {
    maxWidth: '70%',
  },
  otpText: {
    fontSize: 32,
    letterSpacing: 20,
  },
});
