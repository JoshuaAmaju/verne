import React from 'react';
// import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyCommunity from './screens/mycommunity';
import Explore from './screens/explore';
import Details from './screens/detail';
import BackButton from '../../../shared/components/BackButton';
import {StatusBar} from '@shared/components/StatusBar';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs() {
  const {primary} = useTheme().colors;

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{tabBarIndicatorStyle: {backgroundColor: primary}}}>
      <Tab.Screen
        name="MyCommunity"
        component={MyCommunity}
        options={{title: 'My Communities'}}
      />

      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  );
}

export default function Community() {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          contentStyle: {backgroundColor: '#fff'},
          headerLeft: props => props.canGoBack && <BackButton />,
        }}>
        <Stack.Screen
          name="Root"
          component={Tabs}
          options={{title: 'Community'}}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={
            {
              // headerTransparent: true,
              // headerStyle: {backgroundColor: '#fff'},
            }
          }
        />
      </Stack.Navigator>
    </>
  );
}
