import {InputProps, Text} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {TouchableNativeFeedback} from 'react-native';
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
      style={style}
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
