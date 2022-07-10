import {Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function AccountType() {
  const {primary} = useTheme().colors;

  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10}}>
      <VStack space={10}>
        <VStack space={6}>
          <VStack space={4}>
            <Text style={{fontSize: 24}}>Change your access on Verne</Text>
            <Text category="h2" style={{color: '#383838'}}>
              What do you want to do on Verne?
            </Text>
          </VStack>

          <TouchableOpacity
            style={[
              styles.item,
              {borderColor: primary},
              {backgroundColor: '#D3F3EF'},
            ]}>
            <Text category="h2">Read books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, {borderColor: primary}]}>
            <Text category="h2">Write and publish your books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, {borderColor: primary}]}>
            <Text category="h2">Both</Text>
          </TouchableOpacity>
        </VStack>

        <VStack space={4} alignItems="center">
          <TouchableOpacity style={styles.btn}>
            <Text category="p1">Save changes</Text>
          </TouchableOpacity>

          <Text category="p2">
            You have to restart Verne to effect the changes
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    minWidth: '40%',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EFFBF9',
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
});
