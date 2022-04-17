import React from 'react';
import {Button as UIKButton, ButtonProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function Button({style, ...props}: ButtonProps) {
  return (
    <UIKButton {...props} style={[styles.rounded, style]}>
      Continue
    </UIKButton>
  );
}

const styles = StyleSheet.create({
  rounded: {
    borderRadius: 100,
  },
});
