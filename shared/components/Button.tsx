import React from 'react';
import {Button as UIKButton, ButtonProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function Button({style, children, ...props}: ButtonProps) {
  return (
    <UIKButton
      {...props}
      style={[
        styles.button,
        props.appearance === 'outline' && styles.outline,
        style,
      ]}>
      {children}
    </UIKButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
  },
  outline: {
    backgroundColor: 'transparent',
  },
});
