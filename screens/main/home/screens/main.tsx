import {useNavigation} from '@react-navigation/native';
import {Avatar, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import {IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import CircleChat from '../../../../assets/icons/circle.chat.bubble.svg';
import Notification from '../../../../assets/icons/notification.svg';
import colors from '../../../../theme/colors';
import Entity from '../../../components/entity';
import Room from '../../../components/room';
import Section from '../../../components/section';
import {DATA, ROOMS} from '../../../dummy.data';

import * as Category from '@shared/services/category';
import {useQuery} from 'react-query';

const {width} = Dimensions.get('screen');

export default function Home() {
  const hero = DATA[0];
  const nav = useNavigation();

  const categories = useQuery(['categories'], Category.get_all);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.hero}>
          <Image source={hero.cover} style={StyleSheet.absoluteFillObject} />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
            ]}
          />

          <SafeAreaView>
            <HStack m={2} space={2} alignSelf="flex-end" alignItems="center">
              <IconButton
                color="#fff"
                onPress={() => nav.navigate('Notifications' as any)}
                icon={({size, color}) => (
                  <Notification width={size} height={size} color={color} />
                )}
              />

              <IconButton
                color="#fff"
                onPress={() => nav.navigate('Messages' as any)}
                icon={({size, color}) => (
                  <CircleChat width={size} height={size} color={color} />
                )}
              />

              <TouchableOpacity onPress={() => nav.navigate('Account' as any)}>
                <Avatar
                  source={require('../../../../assets/png/unnamed.png')}
                />
              </TouchableOpacity>
            </HStack>
          </SafeAreaView>

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
              data={categories.data}
              keyExtractor={item => item._id}
              contentContainerStyle={{padding: 16}}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box width={2} />}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    // @ts-ignore
                    onPress={() => nav.navigate('Category', {id: item._id})}>
                    <View style={styles.categoryPill}>
                      <Text category="label" style={styles.pillLabel}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </VStack>
        </View>

        <VStack space={4} py={4}>
          <Section title="Live audio rooms">
            <FlatList
              horizontal
              data={ROOMS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => {
                // const host = item.participants.find(p => p.type === 'host');

                return <Room {...item} />;

                // return (
                //   <VStack
                //     p={5}
                //     space={4}
                //     borderRadius={20}
                //     backgroundColor="mistyrose">
                //     <VStack space={2}>
                //       <Text category="c1">{item.community}</Text>
                //       <Text category="h6" style={{maxWidth: 300}}>
                //         {item.title}
                //       </Text>
                //     </VStack>

                //     <HStack
                //       space={3}
                //       alignItems="center"
                //       justifyContent="space-between">
                //       {host && (
                //         <HStack space={2} alignItems="center">
                //           <HStack space={2} alignItems="center">
                //             <Avatar size="tiny" source={host.avatar as any} />
                //             <Text category="c2">{host.name}</Text>
                //           </HStack>

                //           <View style={styles.hostLabel}>
                //             <Text category="c2">Host</Text>
                //           </View>
                //         </HStack>
                //       )}

                //       <Text category="c2">
                //         {abbreviate(item.participants.length)} Listeners
                //       </Text>
                //     </HStack>
                //   </VStack>
                // );
              }}
            />
          </Section>

          <Section title="Continue reading">
            <FlatList
              horizontal
              data={DATA}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
              renderItem={({item}) => (
                <Entity
                  {...item}
                  onPress={() => {
                    // @ts-ignore
                    nav.navigate('Entity', item);
                  }}
                />
              )}
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
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{paddingHorizontal: 24}}
              renderItem={({item}) => {
                return (
                  <View style={styles.category}>
                    <Text category="h2" style={{textTransform: 'capitalize'}}>
                      {item.name}
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
              renderItem={({item}) => <Entity {...item} />}
              contentContainerStyle={{paddingHorizontal: 24}}
              ItemSeparatorComponent={() => <Box width={3} />}
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
    justifyContent: 'space-between',
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
  hostLabel: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#EBEBEB',
  },
});
