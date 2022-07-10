// import {useNavigation} from '@react-navigation/native';
import {Input, Text} from '@ui-kitten/components';
import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import {Eye, Search, SquareChatBubble, Star} from '../../shared/exports/icons';
import {abbreviate} from '../../shared/utils';
import {CATEGORIES, DATA} from '../dummy.data';

export default function Explore() {
  // const nav = useNavigation();

  const {width} = useWindowDimensions();

  const [editing, setEditing] = useState(false);
  const [term, setSearchTerm] = useState<string>();

  useEffect(() => {
    setEditing(!term ? false : term.trim() !== '');
  }, [term]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <HStack p={4} space={2} alignItems="center">
        <Input
          size="large"
          value={term}
          placeholder="Search"
          style={styles.search}
          onChangeText={setSearchTerm}
          accessoryLeft={({style}: any) => (
            <Search {...style} width={17} color="#525252" />
          )}
        />

        {editing && (
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => setSearchTerm(undefined)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
      </HStack>

      <ScrollView contentContainerStyle={{padding: 24}}>
        <VStack space={6}>
          {term !== undefined && term.trim() !== '' && (
            <VStack space={4}>
              {DATA.map(item => (
                <HStack space={4}>
                  <Image source={item.cover} style={{width: 24, height: 24}} />
                  <Text category="p1">{item.title}</Text>
                </HStack>
              ))}
            </VStack>
          )}

          <VStack space={4}>
            <VStack space={4}>
              <Text category="h2">Top Searches</Text>

              <VStack space={3}>
                {DATA.map(item => (
                  <HStack space={4} alignItems="center">
                    <Image source={item.cover} style={styles.cover} />

                    <VStack space={2.5} flex={1}>
                      <View>
                        <Text>{item.title}</Text>
                        <Text category="p2" style={{color: '#6B6B6B'}}>
                          {item.author}
                        </Text>
                      </View>

                      <HStack space={8} alignItems="center">
                        <HStack space={1} alignItems="center">
                          <Text category="c2" style={{color: '#383838'}}>
                            {abbreviate(item.rating)}
                          </Text>

                          <Star width={13} height={13} color="#FFC107" />
                        </HStack>

                        <HStack space={1} alignItems="center">
                          <Text category="c2" style={{color: '#383838'}}>
                            {abbreviate(2000)}
                          </Text>

                          <Eye width={13} height={13} color="#383838" />
                        </HStack>

                        <HStack space={1} alignItems="center">
                          <Text category="c2" style={{color: '#383838'}}>
                            {abbreviate(30)}
                          </Text>

                          <SquareChatBubble
                            width={13}
                            height={13}
                            color="#383838"
                          />
                        </HStack>
                      </HStack>

                      <Text
                        category="p2"
                        numberOfLines={2}
                        style={{color: '#6B6B6B'}}>
                        {item.summary}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <VStack space={4}>
              <Text category="h2">Categories</Text>

              <FlatGrid
                spacing={7}
                numColumns={2}
                data={CATEGORIES}
                staticDimension={width / 2 - 20}
                keyExtractor={item => item.id.toString()}
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
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: '#EBEBEB',
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  category: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: '#DDEEED',
  },
});
