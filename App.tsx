import React from 'react';
import {StatusBar, Text, useColorScheme, View} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View>
        <Text>Hello World</Text>
      </View>
    </>
  );
};

export default App;
