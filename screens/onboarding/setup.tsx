import {useNavigation, useRoute} from '@react-navigation/native';
import {RadioGroup, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';

import CheckCircle from '../../assets/icons/check.circle.svg';

import Button from '../../shared/components/Button';
import Spacer from '../../shared/components/Spacer';
import colors from '../../theme/colors';
// import MaskedView from '@react-native-masked-view/masked-view';
// import ImageColors from 'react-native-image-colors';

// @ts-ignore
// import GetPixelColor from 'react-native-get-pixel-color';

import {useMutation, useQuery} from 'react-query';
import {showMessage} from 'react-native-flash-message';

import {http} from '@shared/http';

import {Info, setData, Role} from '@shared/stores/auth';
import * as onboarding from '@shared/stores/onborading';

import {useTheme} from 'react-native-paper';
import {displayName} from '../../app.json';
import {get_all} from '@shared/services/category';

const types: {value: Role; label: string}[] = [
  {
    value: Role.reader,
    label: 'Read books',
  },
  {
    value: Role.writer,
    label: 'Write and publish your books',
  },
  {
    label: 'Both',
    value: Role.both,
  },
];

// type Colors = Record<'background' | 'primary' | 'secondary' | 'detail', string>;

// const Palette = ({
//   uri,
//   children,
// }: {
//   uri: string;
//   children: (colors?: Colors) => JSX.Element;
// }) => {
//   const [palette, setColors] = useState<Colors>();

//   useEffect(() => {
//     if (uri) {
//       colorsFromUrl(uri, (err: any, c: any) => {
//         console.log(err);
//         if (!err) console.log('colors', c);
//       });
//     }
//   }, [uri]);

//   return children(palette);
// };

export function Initial() {
  const nav = useNavigation();

  return (
    <View style={[styles.expand, styles.between, styles.screen]}>
      <Text category="h1">Let’s customize your Verne experience...</Text>
      <Button onPress={() => nav.navigate('Setup.Type' as any)}>
        Continue
      </Button>
    </View>
  );
}

export function Type() {
  const nav = useNavigation();
  const [type, setType] = useState<string>();

  return (
    <View style={[styles.expand, styles.between, styles.screen]}>
      <VStack space={10}>
        <Text category="h1">What would you like to do on Verne?</Text>

        <RadioGroup>
          <VStack space={4}>
            {types.map((t, i) => (
              <TouchableNativeFeedback key={i} onPress={_ => setType(t.value)}>
                <View
                  style={[styles.control, t.value === type && styles.selected]}>
                  <Text>{t.label}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </VStack>
        </RadioGroup>
      </VStack>

      <Button
        // @ts-ignore
        onPress={() => nav.navigate('Setup.Categories', {type})}>
        Continue
      </Button>
    </View>
  );
}

export function Categories() {
  const nav = useNavigation();
  const {params = {} as any} = useRoute();
  const [categories, setCategory] = useState<string[]>([]);

  const query = useQuery(['categories'], get_all);

  return (
    <View style={[styles.expand, styles.between]}>
      <ScrollView contentContainerStyle={{padding: 24}}>
        <Spacer gap={30}>
          <VStack space={4} marginX={6}>
            <Text category="h1">Select your favorite categories</Text>
            <Text>
              Select the categories you are interested in, you would only get
              contents from here
            </Text>
          </VStack>

          {query.isLoading ? (
            <Box p={4} flex={1} alignItems="center" justifyContent="center">
              <ActivityIndicator size="large" color="#000" />
            </Box>
          ) : (
            <VStack space={3}>
              {query.data?.map(category => {
                return (
                  <View key={category._id} style={styles.categoryContainer}>
                    <TouchableNativeFeedback
                      onPress={_ => {
                        setCategory(c => {
                          if (c.includes(category._id)) {
                            return c.filter(cat => cat !== category._id);
                          } else {
                            return [...c, category._id];
                          }
                        });
                      }}>
                      <View style={styles.category}>
                        <Text category="h2">{category.name}</Text>

                        <View style={styles.mackContainer}>
                          <Image
                            resizeMode="cover"
                            style={styles.maskImg}
                            source={{uri: category.imageUrl}}
                          />
                        </View>

                        {/* <MaskedView
                      style={styles.mackContainer}
                      maskElement={<View style={styles.mask} />}>
                      <Image
                        resizeMode="cover"
                        source={item.cover}
                        style={{width: 150, height: 250}}
                      />
                    </MaskedView> */}

                        {categories.includes(category._id) && (
                          <CheckCircle style={styles.check} color="#ffffff" />
                        )}
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                );
              })}
            </VStack>
          )}
        </Spacer>
      </ScrollView>

      <Button
        style={styles.categoriesCTA}
        onPress={() => {
          // @ts-ignore
          nav.navigate('Setup.Final', {type: params.type, categories});
        }}>
        Continue
      </Button>
    </View>
  );
}

const update_profile = async ({
  type,
  ...body
}: {
  type: string;
  categories: string[];
}): Promise<Info> => {
  const {data} = await http.put('/user/update/profile', {...body, role: type});
  return data;
};

export function Final() {
  // const nav = useNavigation();

  const {params = {} as any} = useRoute();

  const {primary} = useTheme().colors;

  const [, send] = onboarding.useContext();

  const mutation = useMutation(update_profile, {
    onSuccess(data) {
      showMessage({
        type: 'success',
        message: displayName,
        description: `Welcome to ${displayName}. We hope you enjoy every bit of your experience on ${displayName}.`,
      });

      setData(data);
      send(onboarding.Action.complete);
      // nav.navigate('Home' as any);
    },
    onError() {
      showMessage({
        type: 'danger',
        message: displayName,
        description: 'Unable to complete setup',
      });

      send(onboarding.Action.complete);
    },
  });

  console.log(mutation.data, mutation.error);

  useEffect(() => {
    mutation.mutate(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <View style={[styles.expand, styles.screen]}>
      <VStack m={8} space={4} style={{alignItems: 'center'}}>
        <Image
          style={{width: 180, height: 280}}
          resizeMode={Image.resizeMode.contain}
          source={require('../../assets/png/image.png')}
        />

        {/* <Box h={280} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" color="#000" />
        </Box> */}

        <VStack space={3}>
          <Text category="h1" style={styles.textCenter}>
            Please hold on
          </Text>

          <HStack space={2} alignItems="center">
            <Text category="p1" style={styles.textCenter}>
              We are curating and organizing your stories
            </Text>

            {mutation.isLoading && (
              <ActivityIndicator size="small" color={primary} />
            )}
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
  expand: {
    flex: 1,
  },
  between: {
    justifyContent: 'space-between',
  },
  control: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: colors.primary,
  },
  selected: {
    backgroundColor: '#D3F3EF',
  },
  category: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 35,
    paddingHorizontal: 15,
    backgroundColor: '#DCE8EF',
  },
  categoryContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  check: {
    top: 20,
    right: 20,
    position: 'absolute',
  },
  mackContainer: {
    right: 0,
    bottom: -80,
    position: 'absolute',
  },
  // mask: {
  //   flex: 1,
  //   height: '100%',
  //   borderTopLeftRadius: 200,
  //   borderBottomLeftRadius: 200,
  // },
  maskImg: {
    width: 150,
    height: 250,
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
  },
  categoriesCTA: {
    margin: 24,
  },
  textCenter: {
    textAlign: 'center',
  },
});
