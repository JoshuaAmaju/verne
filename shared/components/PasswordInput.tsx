import {InputProps, Text, Input as UIInput} from '@ui-kitten/components';
import React, {forwardRef, useCallback, useState} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import colors from '../../theme/colors';
import Input from './Input';

export default forwardRef<UIInput, InputProps>(function PasswordInput(
  {style, ...props},
  ref,
) {
  const [isSecureEntry, setSecureEntry] = useState(true);

  const toggle = useCallback(() => {
    setSecureEntry(s => !s);
  }, []);

  return (
    <Input
      {...props}
      ref={ref}
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
});
