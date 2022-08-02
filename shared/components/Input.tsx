import {Input as UIKInput, InputProps} from '@ui-kitten/components';
import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';

export default forwardRef<UIKInput, InputProps>(function Input(
  {style, ...props},
  ref,
) {
  return <UIKInput {...props} ref={ref} style={[styles.input, style]} />;
});

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'transparent',
  },
});
