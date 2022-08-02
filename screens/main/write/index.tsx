import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BackButton from '@shared/components/BackButton';
import Intro from './screens/intro';
import Stories from './screens/stories';
import Story from './screens/story';

const Stack = createNativeStackNavigator();

export default function Writer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        contentStyle: {backgroundColor: '#fff'},
        headerLeft: props => props.canGoBack && <BackButton />,
      }}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{title: 'Write', headerTitleAlign: 'left'}}
      />

      <Stack.Screen
        component={Stories}
        name="Writer.Stories"
        options={{title: 'My stories'}}
      />

      <Stack.Screen name="Story" component={Story} />
      {/* <Stack.Screen name="Category" component={StoryCategory} /> */}

      {/* <Stack.Group screenOptions={{title: ''}}>
        <Stack.Screen name="Summary" component={WriteSummary} />
        <Stack.Screen name="Write" component={Write} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
