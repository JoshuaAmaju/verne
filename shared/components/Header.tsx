import {Text, TopNavigationAction} from '@ui-kitten/components';
import React, {ReactElement, ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {useNavigate} from 'react-router-native';
import ArrowBack from '../../assets/icons/arrow.backward.svg';
import Spacer from './Spacer';

type Style = StyleProp<ViewStyle>;

export function Title({
  style,
  children,
}: {
  children: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text category="h1" style={style}>
      {children}
    </Text>
  );
}

export function CenterTitle({
  style,
  children,
}: {
  children: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text category="h2" style={style}>
      {children}
    </Text>
  );
}

export function BackButton() {
  const navigate = useNavigate();

  return (
    <TopNavigationAction
      onPress={() => navigate('..')}
      icon={({style}: any) => <ArrowBack {...style} color={style.tintColor} />}
    />
  );
}

export function Actions({
  style,
  children,
}: {
  style?: Style;
  children: ReactElement | ReactElement[];
}) {
  return (
    <View style={[styles.actions, style]}>
      <Spacer direction="horizontal">{children}</Spacer>
    </View>
  );
}

export function Container({
  style,
  children,
}: {
  style?: Style;
  children: ReactNode;
}) {
  return (
    <View style={[styles.container, style]}>
      <Spacer direction="horizontal">{children}</Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
  },
  centerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
});
