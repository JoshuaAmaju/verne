import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider} from '@ui-kitten/components';
import {NativeBaseProvider} from 'native-base';
import React, {useLayoutEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/onboarding/intro';
import Signup from './screens/signup';
import Login from './screens/login';
import onboardedStore, {selector} from './shared/stores/onborading';
import evaTheme from './theme/eva.json';
import mapping from './theme/mapping.json';
import * as Setup from './screens/onboarding/setup';
import authStore, {selector as authSelector} from './shared/stores/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const isAuth = authStore(authSelector);
  const onboarded = onboardedStore(selector);

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
          <Stack.Navigator>
            {!onboarded && (
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{headerShown: false}}
              />
            )}

            {isAuth ? null : (
              <>
                <Stack.Group screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />

                  <Stack.Screen
                    name="Setup.Initial"
                    component={Setup.Initial}
                  />

                  <Stack.Screen
                    name="Setup.Type"
                    component={Setup.Type}
                    options={{animation: 'none'}}
                  />

                  <Stack.Screen
                    name="Setup.Categories"
                    component={Setup.Categories}
                    options={{animation: 'none'}}
                  />

                  <Stack.Screen name="Setup.Final" component={Setup.Final} />
                </Stack.Group>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApplicationProvider>
  );
}
