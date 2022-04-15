import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import {NativeBaseProvider} from 'native-base';
import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {Link, NativeRouter, Route, Routes} from 'react-router-native';
import Notification from './assets/icons/notification.svg';
import BackHandler from './shared/components/BackHandler';
import * as header from './shared/components/Header';
import IconButton from './shared/components/IconButton';
import evaTheme from './theme/eva.json';
import mapping from './theme/mapping.json';
import SplashScreen from 'react-native-splash-screen';

const Home = () => {
  return (
    <Layout style={{flex: 1}}>
      <TopNavigation title={() => <header.Title>Home</header.Title>} />

      <View>
        <Link to="/about">
          <Text>Go to about</Text>
        </Link>

        <Link to="/">
          <Text>Go to Nested 1</Text>
        </Link>

        <Link to="/2">
          <Text>Go to Nested 2</Text>
        </Link>

        <Routes>
          <Route path="/" element={<Text>Nested 1</Text>} />
          <Route path="/2" element={<Text>Nested 2</Text>} />
        </Routes>
      </View>
    </Layout>
  );
};

const About = () => {
  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        alignment="center"
        accessoryLeft={header.BackButton}
        title={() => <header.CenterTitle>About</header.CenterTitle>}
        accessoryRight={() => (
          <>
            <IconButton icon={Notification} />
          </>
        )}
      />

      <Text>About</Text>
    </Layout>
  );
};

export default function App() {
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApplicationProvider
      {...eva}
      customMapping={mapping as any}
      theme={{...eva.dark, ...evaTheme}}>
      <NativeBaseProvider>
        <NativeRouter>
          <BackHandler />

          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </NativeRouter>
      </NativeBaseProvider>
    </ApplicationProvider>
  );
}
