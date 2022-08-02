import Section from '@screens/components/section';
import React from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';

import {get_all} from '@shared/services/category';
import {useQuery} from 'react-query';
import Category from '@screens/components/category';

import CheckIcon from '@assets/icons/check.circle.svg';
import Screen from '@shared/components/Screen';
import Button from '@shared/components/Button';
import {Box} from 'native-base';

export default function SelectCategory() {
  const categories = useQuery(['categories'], get_all);

  return (
    <Screen>
      <Section title="Select your story category">
        <FlatList
          data={categories.data}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <View>
                  <Category data={item} />
                  <CheckIcon style={styles.check} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Section>

      <Box>
        <Button>Continue</Button>
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  check: {
    top: 10,
    right: 10,
    position: 'absolute',
  },
});
