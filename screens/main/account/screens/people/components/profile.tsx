import {Avatar, Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {COVER} from '../../../../../dummy.data';

export default function Profile() {
  const {primary} = useTheme().colors;

  return (
    <HStack py={6} space={4} alignItems="center" justifyContent="space-between">
      <HStack space={3} alignItems="center">
        <Avatar source={COVER} />
        <VStack>
          <Text category="p1">Jane Andrews</Text>
          <Text category="p2" style={{color: '#525252'}}>
            @jane12
          </Text>
        </VStack>
      </HStack>

      <TouchableOpacity
        style={[styles.btn, {borderColor: primary}, styles.disabled]}>
        <Text category="p2" style={[{color: '#04100F'}, label.disabled]}>
          Follow
        </Text>
      </TouchableOpacity>
    </HStack>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  disabled: {
    borderWidth: 0,
    backgroundColor: '#EFFBF9',
  },
});

const label = StyleSheet.create({
  disabled: {
    color: '#9E9E9E',
  },
});
