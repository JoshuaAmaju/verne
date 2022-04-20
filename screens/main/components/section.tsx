import {Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export default function Section({
  title,
  style,
  children,
}: {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <VStack space={3} style={style}>
      <Text category="h6" style={{marginStart: 24}}>
        {title}
      </Text>

      {children}
    </VStack>
  );
}
