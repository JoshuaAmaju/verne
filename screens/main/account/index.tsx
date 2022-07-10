import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BackButton from '../../../shared/components/BackButton';

import Summary from './screens/summary';
import People from './screens/people';

const Stack = createNativeStackNavigator();

export default function Account() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {backgroundColor: '#fff'},
        headerLeft: props => props.canGoBack && <BackButton />,
      }}>
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={{title: 'Account'}}
      />

      <Stack.Screen
        name="People"
        component={People}
        options={{title: 'jane12', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}
