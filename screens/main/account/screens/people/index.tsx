import React from 'react';
import {useTheme} from 'react-native-paper';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Followers from './followers';
import Following from './following';

const Tab = createMaterialTopTabNavigator();

export default function People() {
  const {primary} = useTheme().colors;

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{tabBarIndicatorStyle: {backgroundColor: primary}}}>
      <Tab.Screen name="Followers" component={Followers} />
      <Tab.Screen name="Following" component={Following} />
    </Tab.Navigator>
  );
}
