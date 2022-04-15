import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider} from '@ui-kitten/components';
import {NativeBaseProvider} from 'native-base';
import React, {useLayoutEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/onboarding/intro';
import Setup from './screens/onboarding/setup';
import Signup from './screens/signup';
import onboardedStore, {selector} from './shared/stores/onborading';
import evaTheme from './theme/eva.json';
import mapping from './theme/mapping.json';

const Stack = createNativeStackNavigator();

export default function App() {
  const onboarded = onboardedStore(selector);

  // useEffect(() => {
  //   AsyncStorage.getItem(ONBOARDING).then(n => {
  //     if (n) setOnboarded(true);
  //   });
  // }, []);

  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApplicationProvider
      {...eva}
      customMapping={mapping as any}
      theme={{...eva.light, ...evaTheme}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={!onboarded ? 'Onboarding' : 'Main'}>
            {!onboarded && (
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Setup" component={Setup} />
              </Stack.Group>
            )}

            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>

        {/* <NativeRouter>
          <BackHandler />

          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </NativeRouter> */}
      </NativeBaseProvider>
    </ApplicationProvider>
  );
}
