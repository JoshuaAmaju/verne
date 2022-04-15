import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Button, ButtonProps} from '@ui-kitten/components';

export default function IconButton({
  icon: Icon,
  ...props
}: ButtonProps & {icon: React.FC<SvgProps>}) {
  return (
    <Button
      {...props}
      appearance="ghost"
      accessoryLeft={({style}: any) => (
        <Icon {...style} color={style.tintColor} />
      )}
    />
  );
}
