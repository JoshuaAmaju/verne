import {Layout, Text} from '@ui-kitten/components';
import {Box, HStack, Spacer, VStack} from 'native-base';
import React, {ReactNode} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import Button from '../shared/components/Button';
import colors from '../theme/colors';
import Image from 'react-native-fast-image';
import Star from '../assets/icons/star.svg';
import {FlatGrid} from 'react-native-super-grid';

// @ts-ignore
import {Col, Cols} from 'react-native-cols';

const {width} = Dimensions.get('screen');

const DATA = [
  {
    rating: 4.5,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    cover: require('../assets/png/img.jpg'),
    categories: [
      'play',
      'action',
      'romance',
      'adventure',
      'fiction',
      'mystery',
    ],
  },
  {
    rating: 4.5,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    cover: require('../assets/png/img.jpg'),
    categories: ['play', 'action', 'romance'],
  },
  {
    rating: 4.5,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    cover: require('../assets/png/img.jpg'),
    categories: ['play', 'action', 'romance'],
  },
  {
    rating: 4.5,
    title: 'A plan too late',
    author: 'Reynolds Andrews',
    subtitle: 'Reynolds Andrews',
    cover: require('../assets/png/img.jpg'),
    categories: ['play', 'action', 'romance'],
  },
];

const Section = ({
  title,
  style,
  children,
}: {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <VStack space={3} style={style}>
      <Text category="h6" style={{marginStart: 24}}>
        {title}
      </Text>

      {children}
    </VStack>
  );
};

export default function Home() {
  const hero = DATA[0];

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView style={{flex: 1}}>
        <View style={styles.hero}>
          <Image source={hero.cover} style={StyleSheet.absoluteFillObject} />

          <VStack space={1} alignItems="center">
            <VStack p={4} space={2} alignItems="center">
              <Text category="h1" style={styles.title}>
                {hero.title}
              </Text>

              <Text category="h2" style={styles.subtitle}>
                {hero.subtitle}
              </Text>
            </VStack>

            <FlatList
              horizontal
              data={hero.categories}
              contentContainerStyle={{padding: 16}}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box width={2} />}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.categoryPill}>
                      <Text category="label" style={styles.pillLabel}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </VStack>
        </View>

        <VStack space={4} py={4}>
          <Section title="Continue reading">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => {
                return (
                  <VStack space={1}>
                    <View style={styles.entityCard}>
                      <Image
                        source={item.cover}
                        style={StyleSheet.absoluteFillObject}
                      />

                      <Text category="h1" style={{color: '#fff'}}>
                        {item.title}
                      </Text>
                    </View>

                    <HStack space={2} justifyContent="space-between">
                      <Text category="c2">{item.author}</Text>

                      <HStack space={1} alignItems="center">
                        <Text category="s2">{item.rating}</Text>
                        <Star width={13} height={13} color="#FFC107" />
                      </HStack>
                    </HStack>
                  </VStack>
                );
              }}
            />
          </Section>

          <Section title="Categories">
            {/* <Cols
              cols={2}
              colSpace={10}
              rowSpace={10}
              style={{paddingHorizontal: 24}}>
              {DATA[0].categories.map(c => (
                <Col>
                  <View
                    style={{
                      padding: 30,
                      borderRadius: 8,
                      backgroundColor: '#DDEEED',
                    }}>
                    <Text category="h2">{c}</Text>
                  </View>
                </Col>
              ))}
            </Cols> */}

            <FlatGrid
              spacing={7}
              numColumns={2}
              data={DATA[0].categories}
              staticDimension={width / 2 - 20}
              contentContainerStyle={{paddingHorizontal: 24}}
              renderItem={({item}) => {
                return (
                  <View style={styles.category}>
                    <Text category="h2" style={{textTransform: 'capitalize'}}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </Section>

          <Section title="Based on your likes">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => {
                return (
                  <VStack space={1}>
                    <View style={styles.entityCard}>
                      <Image
                        source={item.cover}
                        style={StyleSheet.absoluteFillObject}
                      />

                      <Text category="h1" style={{color: '#fff'}}>
                        {item.title}
                      </Text>
                    </View>

                    <HStack space={2} justifyContent="space-between">
                      <Text category="c2">{item.author}</Text>

                      <HStack space={1} alignItems="center">
                        <Text category="s2">{item.rating}</Text>
                        <Star width={13} height={13} color="#FFC107" />
                      </HStack>
                    </HStack>
                  </VStack>
                );
              }}
            />
          </Section>
        </VStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
  },
  categoryPill: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 17,
    backgroundColor: '#ffffff',
  },
  pillLabel: {
    color: colors.accent,
    textTransform: 'capitalize',
  },
  hero: {
    height: 300,
    justifyContent: 'flex-end',
  },
  entityCard: {
    width: 180,
    height: 160,
    padding: 18,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  category: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: '#DDEEED',
  },
});
