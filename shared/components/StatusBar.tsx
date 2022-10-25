import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {StatusBar as RNStatusBar, StatusBarProps} from 'react-native';

export function StatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();
  return isFocused ? <RNStatusBar {...props} /> : null;
}
