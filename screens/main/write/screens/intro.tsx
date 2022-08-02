import {Text} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';

import ChevronRight from '@assets/icons/chevron.right.svg';
import {useNavigation} from '@react-navigation/native';

const icon = {
  width: 15,
  height: 15,
  color: '#6B6B6B',
};

export default function Intro() {
  const nav = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <View>
        <TouchableOpacity
          onPress={() => nav.navigate('Writer.WriteStory' as any)}>
          <View style={styles.item}>
            <Text category="h2" style={styles.label}>
              Write new story
            </Text>
            <ChevronRight {...icon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => nav.navigate('Writer.Stories' as any)}>
          <View style={styles.item}>
            <Text category="h2" style={styles.label}>
              My stories
            </Text>
            <ChevronRight {...icon} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '400',
    fontFamily: 'Besley-Regular',
  },
});
