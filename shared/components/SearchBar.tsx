import React from 'react';
import {Input, InputProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

import {Search} from '../exports/icons';

export default function SearchBar({
  style,
  size = 'large',
  ...props
}: InputProps) {
  return (
    <Input
      {...props}
      size={size}
      style={[styles.search, style]}
      accessoryLeft={(attr: any) => (
        <Search {...attr.style} width={17} color="#525252" />
      )}
    />
  );
}

const styles = StyleSheet.create({
  search: {
    // flex: 1,
    borderRadius: 32,
    backgroundColor: '#EBEBEB',
  },
});
