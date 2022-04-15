import {InputProps, Text} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import colors from '../../theme/colors';
import Input from './Input';

export default function PasswordInput({style, ...props}: InputProps) {
  const [isSecureEntry, setSecureEntry] = useState(true);

  const toggle = useCallback(() => {
    setSecureEntry(s => !s);
  }, []);

  return (
    <Input
      {...props}
      style={[style, styles.input]}
      secureTextEntry={isSecureEntry}
      accessoryRight={() => (
        <TouchableNativeFeedback onPress={toggle}>
          <Text style={{color: colors.accent}}>
            {isSecureEntry ? 'show' : 'hide'}
          </Text>
        </TouchableNativeFeedback>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'transparent',
  },
});
