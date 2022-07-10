import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Button, ButtonProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function IconButton({
  icon: Icon,
  style,
  appearance = 'ghost',
  ...props
}: ButtonProps & {icon: React.FC<SvgProps>}) {
  return (
    <Button
      {...props}
      appearance={appearance}
      style={[styles.button, style]}
      accessoryLeft={(attr: any) => (
        <Icon {...attr.style} color={attr.tintColor} />
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
