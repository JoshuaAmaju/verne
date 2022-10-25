import React from 'react';
import {useTheme} from 'react-native-paper';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CurrentlyReading from './screens/current';
import Saved from './screens/saved';

const Tab = createMaterialTopTabNavigator();

export default function People() {
  const {primary} = useTheme().colors;

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{tabBarIndicatorStyle: {backgroundColor: primary}}}>
      <Tab.Screen
        name="CurrentlyReading"
        component={CurrentlyReading}
        options={{title: 'Currently Reading'}}
      />

      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{title: 'Saved Stories'}}
      />
    </Tab.Navigator>
  );
}
