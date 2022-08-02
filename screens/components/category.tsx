import {Category as ICategory} from '@shared/services/category';
import colors from '@theme/colors';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Category({data}: {data: ICategory}) {
  return (
    <View style={styles.container}>
      <Text category="label" style={styles.label}>
        {data.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 17,
    backgroundColor: '#ffffff',
  },
  label: {
    color: colors.accent,
    textTransform: 'capitalize',
  },
});
