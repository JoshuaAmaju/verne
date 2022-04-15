import React from 'react';
import {Input as UIKInput, InputProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function Input({style, ...props}: InputProps) {
  return <UIKInput {...props} style={[style, styles.input]} />;
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
