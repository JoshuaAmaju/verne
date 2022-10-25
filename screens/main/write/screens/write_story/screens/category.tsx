import React, {useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import {get_all} from '@shared/services/category';
import {useQuery} from 'react-query';

import CheckIcon from '@assets/icons/check.circle.svg';
import Button from '@shared/components/Button';
import Screen from '@shared/components/Screen';
import {Text} from '@ui-kitten/components';

import {useNavigation} from '@react-navigation/native';
import {Box, VStack} from 'native-base';
import {Context} from '../provider';

export default function SelectCategory() {
  const categories = useQuery(['categories'], get_all);

  const {story, setStory} = useContext(Context);

  const nav = useNavigation();

  return (
    <Screen style={{padding: 0}}>
      <VStack flex={1} space={4} justifyContent="space-between">
        <Box flex={1}>
          <Box mx={6} my={4}>
            <Text category="h2">Select your story category</Text>
          </Box>

          <FlatList
            data={categories.data}
            keyExtractor={item => item._id}
            contentContainerStyle={{padding: 24}}
            ItemSeparatorComponent={() => <Box h={5} />}
            renderItem={({item}) => {
              const existing = story.categories?.find(c => c._id === item._id);

              return (
                <View style={styles.categoryContainer}>
                  <TouchableNativeFeedback
                    onPress={_ => {
                      setStory({
                        categories: existing
                          ? story.categories?.filter(
                              cat => cat._id !== item._id,
                            )
                          : [...(story.categories ?? []), item],
                      });
                    }}>
                    <View style={styles.category}>
                      <Text category="h2">{item.name}</Text>

                      {/* <View style={styles.maskContainer}>
                      <Image
                        resizeMode="cover"
                        style={styles.maskImg}
                        source={{uri: item.imageUrl}}
                      />
                    </View> */}

                      {existing && (
                        <CheckIcon style={styles.check} color="#ffffff" />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                </View>
              );
            }}
          />
        </Box>

        <Box px={6} py={4}>
          <Button onPress={() => nav.goBack()}>Continue</Button>
        </Box>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  check: {
    top: 10,
    right: 10,
    position: 'absolute',
  },

  category: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: '#DCE8EF',
  },
  categoryContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  maskContainer: {
    right: 0,
    bottom: -80,
    position: 'absolute',
  },
  maskImg: {
    width: 150,
    height: 250,
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
  },
});
