import React, {useCallback, useState} from 'react';

import {Actions, Context, PartialStory} from './provider';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BackButton from '@shared/components/BackButton';

import SelectCategory from './screens/category';
import Settings from './screens/settings';
import Summary from './screens/summary';
import SelectTags from './screens/tags';

const Stack = createNativeStackNavigator();

export default function Root() {
  const [story, setState] = useState<PartialStory>({rate18: false});

  const setStory = useCallback<Actions['setStory']>(pStory => {
    setState(s => ({...s, ...pStory}));
  }, []);

  return (
    <Context.Provider value={{story, setStory}}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          contentStyle: {backgroundColor: '#fff'},
          headerLeft: props => props.canGoBack && <BackButton />,
        }}>
        <Stack.Group screenOptions={{title: ''}}>
          <Stack.Screen name="Summary" component={Summary} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Group>

        <Stack.Screen
          name="SelectCategories"
          component={SelectCategory}
          options={{title: 'Category'}}
        />

        <Stack.Screen
          name="SelectTags"
          component={SelectTags}
          options={{title: 'Story Tags'}}
        />
      </Stack.Navigator>
    </Context.Provider>
  );
}
