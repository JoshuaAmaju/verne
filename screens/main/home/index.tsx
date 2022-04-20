import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/main';
import Category from './screens/category';

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />

      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: true,
          //   headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
