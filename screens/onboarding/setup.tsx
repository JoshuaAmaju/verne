import {useNavigation} from '@react-navigation/native';
import {Button, RadioGroup, Text} from '@ui-kitten/components';
import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import CheckCircle from '../../assets/icons/check.circle.svg';
import Spacer from '../../shared/components/Spacer';
import colors from '../../theme/colors';
import Image from 'react-native-fast-image';
// import MaskedView from '@react-native-masked-view/masked-view';
// import ImageColors from 'react-native-image-colors';

// @ts-ignore
// import GetPixelColor from 'react-native-get-pixel-color';

const TYPES = [
  {
    value: 'reader',
    label: 'Read books',
  },
  {
    value: 'writer',
    label: 'Write and publish your books',
  },
  {
    value: 'both',
    label: 'Both',
  },
];

const CATEGORIES = [
  {
    value: 'action',
    label: 'Action',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'adventure',
    label: 'Adventure',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'fantasy',
    label: 'Fantasy',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'fiction',
    label: 'Fiction',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'horror',
    label: 'Horror',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'mystery',
    label: 'Mystery',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'poetry',
    label: 'Poetry',
    cover: require('../../assets/png/img.jpg'),
  },
  {
    value: 'romance',
    label: 'Romance',
    cover: require('../../assets/png/img.jpg'),
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
      <Button
        style={styles.rounded}
        onPress={() => nav.navigate('Setup.Type' as any)}>
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
            {TYPES.map((t, i) => (
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
        style={styles.rounded}
        onPress={() => nav.navigate('Setup.Categories' as any)}>
        Continue
      </Button>
    </View>
  );
}

export function Categories() {
  const nav = useNavigation();
  const [categories, setCategory] = useState<string[]>([]);

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

          <VStack space={3}>
            {CATEGORIES.map(item => {
              return (
                <View style={styles.categoryContainer}>
                  <TouchableNativeFeedback
                    onPress={_ => setCategory(c => [...c, item.value])}>
                    <View style={styles.category}>
                      <Text>{item.label}</Text>

                      <View style={styles.mackContainer}>
                        <Image
                          resizeMode="cover"
                          source={item.cover}
                          style={styles.maskImg}
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

                      {categories.includes(item.value) && (
                        <CheckCircle style={styles.check} color="#ffffff" />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                </View>
              );
            })}
          </VStack>
        </Spacer>
      </ScrollView>

      <Button
        style={[styles.rounded, styles.categoriesCTA]}
        onPress={() => nav.navigate('Setup.Final' as any)}>
        Continue
      </Button>
    </View>
  );
}

export function Final() {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.navigate('Home' as any);
    }, 3000);
  }, [nav]);

  return (
    <View style={[styles.expand, styles.screen]}>
      <VStack m={8} space={4} style={{alignItems: 'center'}}>
        <Image
          style={{width: 180, height: 280}}
          resizeMode={Image.resizeMode.contain}
          source={require('../../assets/png/image.png')}
        />

        <VStack space={3}>
          <Text category="h1" style={styles.textCenter}>
            Please hold on
          </Text>

          <Text category="p1" style={styles.textCenter}>
            We are curating and organizing your stories
          </Text>
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
  rounded: {
    borderRadius: 100,
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
