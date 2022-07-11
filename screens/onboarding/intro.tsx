import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React, {createRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {set} from '../../shared/stores/onborading';
import Image from 'react-native-fast-image';
import Button from '../../shared/components/Button';

const {width} = Dimensions.get('screen');

const SLIDES = [
  {
    image: require('../../assets/png/img.jpg'),
    title: 'Stories available in audio',
    caption:
      'For a multitasker, you can listen to all of your favorite stories while you work. You can also customize the voice that reads to you.',
  },
  {
    image: require('../../assets/png/unnamed.png'),
    title: 'Closely knit communities',
    caption:
      'Join communities and talk about your favorites. You can schedule and have conversations with your community via audio',
  },
  {
    image: require('../../assets/png/img.jpg'),
    title: 'Offline mode available',
    caption:
      'You can save your stories and read them later while off the internet',
  },
  {
    image: require('../../assets/png/img.jpg'),
    title: 'Write and Publish',
    caption:
      'You get a canvas to write your stories, import images,save and export as a file type. Share your stories to our millions of readers.',
  },
];

export default function Onboarding() {
  const nav = useNavigation();
  const ref = createRef<FlatList>();
  const [index, setIndex] = useState(0);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.expand}>
        <FlatList
          ref={ref}
          horizontal
          data={SLIDES}
          pagingEnabled
          scrollEnabled={false}
          initialNumToRender={1}
          keyExtractor={(_, i) => i.toString()}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          renderItem={({item: {image}}) => (
            <Image
              source={image}
              style={styles.image}
              resizeMode={Image.resizeMode.cover}
            />
          )}
        />

        <FlatList
          horizontal
          pagingEnabled
          data={SLIDES}
          style={styles.expand}
          keyExtractor={(_, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent}) => {
            const {contentOffset} = nativeEvent;
            ref.current?.scrollToOffset({
              animated: false,
              offset: contentOffset.x,
            });
          }}
          onMomentumScrollEnd={({nativeEvent}) => {
            const {contentOffset} = nativeEvent;
            setIndex(contentOffset.x / width);
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.page}>
                <Text style={styles.pageTitle}>{item.title}</Text>
                <Text style={styles.pageCaption}>{item.caption}</Text>
              </View>
            );
          }}
        />

        <VStack space={10} p={6}>
          <HStack space={1} style={styles.dots}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === index && styles.activeDot]}
              />
            ))}
          </HStack>

          <View>
            <Button
              onPress={() => {
                nav.navigate('Signup' as any);
                // set(true);
              }}>
              Join for free
            </Button>

            <HStack
              mt={3}
              space={1}
              alignItems="center"
              justifyContent="center">
              <Text style={{color: '#ffffff'}}>I already have an account.</Text>

              <TouchableNativeFeedback
                onPress={() => {
                  nav.navigate('Login' as any);
                  set(true);
                }}>
                <Text style={styles.link}>Login</Text>
              </TouchableNativeFeedback>
            </HStack>
          </View>
        </VStack>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  page: {
    width,
    padding: 24,
    justifyContent: 'flex-end',
  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#FDF0ED',
  },
  activeDot: {
    width: 16,
    backgroundColor: '#E76F51',
  },
  pageTitle: {
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pageCaption: {
    fontSize: 16,
    marginTop: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  link: {
    color: '#E76F51',
  },
  image: {
    width,
    height: '100%',
  },
});
