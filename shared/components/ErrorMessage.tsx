import {Text} from '@ui-kitten/components';
import {HStack} from 'native-base';
import React from 'react';
import Exclamation from '../../assets/icons/exclamation.triangle.svg';

export default function ErrorMessage({children}: {children: string}) {
  return (
    <HStack space={2} alignItems="center">
      <Exclamation color="#EE404C" />
      <Text category="p2" style={{color: '#EE404C'}}>
        {children}
      </Text>
    </HStack>
  );
}
