import {Layout} from '@ui-kitten/components';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

export default function Screen({
  style,
  children,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <Layout style={[styles.screen, style]}>{children}</Layout>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
});
