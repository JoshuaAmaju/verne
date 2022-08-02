import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import BackButton from '@shared/components/BackButton';
import React from 'react';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  contentStyle: {backgroundColor: '#fff'},
  headerLeft: props => props.canGoBack && <BackButton />,
};
