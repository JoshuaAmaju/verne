import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {Link, NativeRouter, Route, Routes} from 'react-router-native';
import BackHandler from './shared/components/BackHandler';
import * as header from './shared/components/Header';
import evaTheme from './theme/eva.json';
import mapping from './theme/mapping.json';

const Home = () => {
  return (
    <Layout style={{flex: 1}}>
      <header.Container>
        <header.Title>Home</header.Title>
      </header.Container>

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
      <TopNavigation title="About" />

      <Text>About</Text>
    </Layout>
  );
};

export default function App() {
  return (
    <ApplicationProvider
      {...eva}
      customMapping={mapping as any}
      theme={{...eva.dark, ...evaTheme}}>
      <NativeRouter>
        <BackHandler />

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NativeRouter>
    </ApplicationProvider>
  );
}
