import {useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar} from '@shared/components/StatusBar';
import {Text} from '@ui-kitten/components';
import {HStack, Slider, VStack} from 'native-base';
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  LayoutRectangle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share as RNShare,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {IconButton, List} from 'react-native-paper';
import ArrowDown from '../assets/icons/arrow.down.svg';
import ChevronDown from '../assets/icons/chevron.down.svg';
import Flag from '../assets/icons/flag.svg';
import Next from '../assets/icons/next.svg';
import Pause from '../assets/icons/pause.circle.fill.svg';
import PersonSpeaker from '../assets/icons/person.speaker.svg';
import Play from '../assets/icons/play.circle.fill.svg';
import Previous from '../assets/icons/previous.svg';
import Star from '../assets/icons/rate.star.svg';
import Share from '../assets/icons/share.svg';
import Speaker from '../assets/icons/speaker.svg';
import SquareChat from '../assets/icons/square.chat.bubble.svg';
import Xmark from '../assets/icons/xmark.svg';
import Button from '../shared/components/Button';
import Spacer from '../shared/components/Spacer';
import colors from '../theme/colors';
import {DATA} from './dummy.data';

type Speeds = Record<number, number>;

const IconProps = {
  width: 20,
  height: 20,
};

const bottomActions = [
  {
    title: 'Rate',
    icon: <Star {...IconProps} stroke="#FFC107" />,
  },
  {
    title: 'Comment',
    icon: <SquareChat {...IconProps} color="#000" />,
  },
  {
    title: 'Share',
    icon: <Share {...IconProps} color="#000" />,
  },
  {
    title: 'Report',
    icon: <Flag {...IconProps} color="#000" />,
  },
];

const speeds = [
  {
    value: 0.5,
  },
  {
    value: 0.75,
  },
  {
    value: 1,
    label: 'Normal',
  },
  {
    value: 1.25,
  },
  {
    value: 1.5,
  },
];

const speedMapping: Speeds = {
  0: 0.5,
  0.25: 0.75,
  0.5: 1,
  0.75: 1.25,
  1: 1.5,
};

const reverseSpeedMapping: Speeds = {
  0.5: 0,
  0.75: 0.25,
  1: 0.5,
  1.25: 0.75,
  1.5: 1,
};

const AccordionToggle = ({expanded}: {expanded: boolean}) => {
  const value = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(value.current, {
      duration: 250,
      useNativeDriver: true,
      toValue: expanded ? 1 : 0,
    }).start();
  }, [expanded, value]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: value.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            }),
          },
        ],
      }}>
      <ChevronDown width={15} height={15} color="#525252" />
    </Animated.View>
  );
};

export default function Reader() {
  const nav = useNavigation();
  const {params = {} as any} = useRoute();

  const {entity, part = 0, chapter = 0} = params;

  const {id, name} = entity;

  const _entity = DATA.find(d => d.id === id);

  const {parts} = _entity!;

  const _chapter = parts[part].chapters[chapter];

  const speedActionSheetRef = createRef<ActionSheet>();

  const [speed, setSpeakingSpeed] = useState(1);
  const [speaking, setSpeaking] = useState(true);
  const [playing, setPlayPause] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const [sliderRect, setSliderRect] = useState<LayoutRectangle>();

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={() => setShowDropdown(true)}>
          <HStack space={1} alignItems="center">
            <Text>Chapter 1</Text>
            {!showDropdown && <ArrowDown color="#04100F" />}
          </HStack>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <HStack space={1} alignItems="center">
          <IconButton
            size={20}
            onPress={() => setSpeaking(c => !c)}
            color={speaking ? '#E76F51' : '#F3B9AA'}
            icon={({size, color}) => (
              <Speaker width={size} height={size} color={color} />
            )}
          />

          <IconButton
            size={15}
            onPress={() => {
              showDropdown ? setShowDropdown(false) : nav.goBack();
            }}
            icon={({size, color}) => (
              <Xmark width={size} height={size} color={color} />
            )}
          />
        </HStack>
      ),
    });
  }, [nav, showDropdown, speaking]);

  return (
    <>
      <View style={[styles.screen, {flex: 1}]}>
        <StatusBar translucent={false} barStyle="dark-content" />

        {showDropdown && (
          <SafeAreaView style={styles.overlay}>
            <FlatList
              data={parts}
              contentContainerStyle={styles.parts}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <List.Accordion
                  style={styles.dropdown}
                  title={`Part ${index + 1}`}
                  right={({isExpanded}) => (
                    <AccordionToggle expanded={isExpanded} />
                  )}>
                  {item.chapters.map((c, j) => (
                    <List.Item
                      key={j}
                      style={styles.dropdown}
                      title={`Chapter ${j + 1}: ${c.title}`}
                      onPress={() => {
                        // @ts-ignore
                        nav.navigate('Reader', {part: index, chapter: j});
                      }}
                    />
                  ))}
                </List.Accordion>
              )}
            />
          </SafeAreaView>
        )}

        <ScrollView style={{flex: 1}}>
          <VStack space={12} px={6} py={12}>
            <VStack space={6}>
              <VStack space={1} alignItems="center">
                <Text style={{fontSize: 24, fontFamily: 'Besley-SemiBold'}}>
                  Chapter {chapter + 1}
                </Text>

                <Text style={styles.chapterTitle}>{_chapter.title}</Text>
              </VStack>

              <VStack space={2}>
                {_chapter.content.map((c, i) => (
                  <Text key={i}>{c}</Text>
                ))}
              </VStack>
            </VStack>

            <Button style={{alignSelf: 'center', minWidth: '60%'}}>
              Next chapter
            </Button>
          </VStack>

          <HStack px={2} py={4} justifyContent="space-evenly">
            {bottomActions.map(a => (
              <TouchableOpacity
                onPress={() => {
                  if (a.title === 'Share') {
                    RNShare.share({message: `Verne | Share ${name}`});
                  } else {
                    // @ts-ignore
                    nav.navigate(a.title, {id});
                  }
                }}>
                <VStack px={4} py={2} flex={1} space={1} alignItems="center">
                  {a.icon}
                  <Text category="c1">{a.title}</Text>
                </VStack>
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>

        {speaking && (
          <VStack>
            <VStack>
              <Slider
                step={1}
                minValue={0}
                maxValue={100}
                defaultValue={40}
                style={{marginTop: -10}}>
                <Slider.Track bg="#F9DED7">
                  <Slider.FilledTrack bg={colors.accent} />
                </Slider.Track>
                <Slider.Thumb bg={colors.accent} />
              </Slider>

              <HStack
                px={4}
                space={1}
                alignItems="center"
                justifyContent="space-between">
                <Text category="c2">1.20</Text>
                <Text category="c2">1.20</Text>
              </HStack>
            </VStack>

            <HStack
              px={6}
              mb={10}
              space={2}
              alignItems="center"
              justifyContent="space-evenly">
              <IconButton
                size={20}
                color="#858585"
                icon={({size, color}) => (
                  <PersonSpeaker width={size} height={size} color={color} />
                )}
              />

              <IconButton
                size={15}
                color="#858585"
                icon={({size, color}) => (
                  <Previous width={size} height={size} color={color} />
                )}
              />

              <IconButton
                size={40}
                color="#2A9D8F"
                onPress={() => setPlayPause(c => !c)}
                icon={({size, color}) => {
                  const Icon = playing ? Pause : Play;
                  return <Icon width={size} height={size} color={color} />;
                }}
              />

              <IconButton
                size={15}
                color="#858585"
                icon={({size, color}) => (
                  <Next width={size} height={size} color={color} />
                )}
              />

              <TouchableOpacity
                onPress={() => {
                  speedActionSheetRef.current?.setModalVisible(true);
                }}>
                <Text category="p2">{speed}x</Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        )}
      </View>

      <ActionSheet
        ref={speedActionSheetRef}
        containerStyle={{backgroundColor: '#EBEBEB'}}>
        <VStack space={4} px={6} py={8}>
          <IconButton
            size={15}
            color="#04100F"
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              speedActionSheetRef.current?.setModalVisible(false);
            }}
            icon={({size, color}) => (
              <Xmark width={size} height={size} color={color} />
            )}
          />

          <View>
            <Slider
              step={25}
              minValue={0}
              maxValue={100}
              defaultValue={reverseSpeedMapping[speed] * 100}
              onChangeEnd={value => {
                setSpeakingSpeed(speedMapping[value / 100]);
              }}
              onLayout={({nativeEvent}) => {
                setSliderRect(nativeEvent.layout);
              }}>
              <Slider.Track bg="#F9DED7">
                <Slider.FilledTrack bg={colors.accent} />
              </Slider.Track>
              <Slider.Thumb bg={colors.accent} />
            </Slider>

            <HStack justifyContent="space-evenly">
              <Spacer
                direction="horizontal"
                gap={sliderRect ? (sliderRect.width - 50) / 5 : 10}>
                {speeds.map(s => {
                  return (
                    <TouchableOpacity onPress={() => setSpeakingSpeed(s.value)}>
                      <Text style={{textAlign: 'center'}}>{s.value}x</Text>
                      {s.label && <Text>{s.label}</Text>}
                    </TouchableOpacity>
                  );
                })}
              </Spacer>
            </HStack>
          </View>
        </VStack>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  parts: {
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  chapterTitle: {
    fontSize: 20,
    color: '#383838',
    fontFamily: 'Besley-Regular',
  },
});
