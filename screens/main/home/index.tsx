import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/main';
import Category from './screens/category';
import Author from './screens/author';

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: '#fff'}}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{title: '', headerTransparent: true}}
      />

      <Stack.Screen
        name="Category"
        component={Category}
        options={{title: '', headerTransparent: true}}
      />

      <Stack.Screen
        name="Author"
        component={Author}
        options={{title: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
}
