import ArrowBackward from '../../assets/icons/arrow.backward.svg';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import IconButton from './IconButton';

export default function BackButton() {
  const nav = useNavigation();
  return (
    <IconButton
      onPress={() => nav.goBack()}
      icon={props => <ArrowBackward {...props} color="#000" />}
    />
  );
}
