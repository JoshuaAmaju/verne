import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Button, ButtonProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function IconButton({
  icon: Icon,
  style,
  ...props
}: ButtonProps & {icon: React.FC<SvgProps>}) {
  return (
    <Button
      {...props}
      appearance="ghost"
      style={[styles.button, style]}
      accessoryLeft={({style}: any) => (
        <Icon {...style} color={style.tintColor} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
