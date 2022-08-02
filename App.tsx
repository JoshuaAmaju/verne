import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider} from '@ui-kitten/components';
import {NativeBaseProvider} from 'native-base';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import React, {useLayoutEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator, StatusBar} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';

import evaTheme from './theme/eva.json';
import mapping from './theme/mapping.json';

import Onboarding from './screens/onboarding/intro';
import * as onboardingStore from './shared/stores/onborading';
import authStore, {selector as authSelector} from './shared/stores/auth';

import colors from './theme/colors';

import BackButton from './shared/components/BackButton';

import Signup from './screens/signup';
import Login from './screens/login';
import * as Setup from './screens/onboarding/setup';
import ForgotPassword from './screens/password/forgot';
import ResetPassword from './screens/password/reset';
import OTP from './screens/password/otp';
import Main from './screens/main';
import Entity from './screens/entity';
import Reader from './screens/reader';
import Comments from './screens/comments';
import Report from './screens/report';
import SingleReport from './screens/report/single';
import EditProfile from './screens/main/account/screens/edit';
import AccountType from './screens/main/account/screens/type';

import Write from './screens/main/write/screens/write_story/write';
import WriteSummary from './screens/main/write/screens/write_story/summary';
import StoryCategory from './screens/main/write/screens/write_story/category';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: colors.accent,
    primary: colors.primary,
  },
};

const Stack = createNativeStackNavigator();

function Root() {
  const isAuth = authStore(authSelector);

  const [onboardingState] = onboardingStore.useContext();

  const isHydratingOnboarding = onboardingState.matches({
    [onboardingStore.State.unknown]: onboardingStore.State.hydrating,
  });

  useLayoutEffect(() => {
    if (!isHydratingOnboarding) {
      SplashScreen.hide();
    }
  }, [isHydratingOnboarding]);

  console.log(
    onboardingState.value,
    onboardingState.matches({
      [onboardingStore.State.notOnboarded]:
        onboardingStore.NotOnboardedState.setup,
    }),
  );

  if (isHydratingOnboarding) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: {backgroundColor: '#fff'},
          headerLeft: props => props.canGoBack && <BackButton />,
        }}>
        {onboardingState.matches(onboardingStore.State.notOnboarded) && (
          <Stack.Group screenOptions={{headerShown: false}}>
            {onboardingState.matches({
              [onboardingStore.State.notOnboarded]:
                onboardingStore.NotOnboardedState.intro,
            }) && <Stack.Screen name="Onboarding" component={Onboarding} />}

            {onboardingState.matches({
              [onboardingStore.State.notOnboarded]:
                onboardingStore.NotOnboardedState.setup,
            }) && (
              <>
                <Stack.Screen name="Setup.Initial" component={Setup.Initial} />

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
              </>
            )}
          </Stack.Group>
        )}

        {isAuth && onboardingState.matches(onboardingStore.State.onboarded) && (
          <Stack.Group>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: 'Edit profile',
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="AccountType"
              options={{title: ''}}
              component={AccountType}
            />

            <Stack.Screen
              name="Entity"
              component={Entity}
              options={{
                title: '',
                headerTintColor: '#fff',
                headerTransparent: true,
              }}
            />

            <Stack.Group
              screenOptions={{
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen name="Reader" component={Reader} />

              <Stack.Screen
                name="Comment"
                component={Comments}
                options={{title: 'Comments'}}
              />

              <Stack.Screen name="Report" component={Report} />
            </Stack.Group>

            <Stack.Screen
              name="SingleReport"
              component={SingleReport}
              options={{title: 'Report', headerTitleAlign: 'center'}}
            />

            <Stack.Group
              screenOptions={{title: '', headerShadowVisible: false}}>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="OTP" component={OTP} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Group>

            <Stack.Screen name="Category" component={StoryCategory} />

            <Stack.Group screenOptions={{title: ''}}>
              <Stack.Screen
                component={WriteSummary}
                name="Writer.WriteSummary"
              />
              <Stack.Screen name="Writer.WriteStory" component={Write} />
            </Stack.Group>
          </Stack.Group>
        )}

        {!isAuth && (
          <Stack.Group screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{title: 'Create free account'}}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />

      <ApplicationProvider
        {...eva}
        customMapping={mapping as any}
        theme={{...eva.light, ...evaTheme}}>
        <NativeBaseProvider>
          <PaperProvider theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
              <onboardingStore.Provider value={onboardingStore.create()}>
                <Root />
              </onboardingStore.Provider>
            </QueryClientProvider>
          </PaperProvider>
        </NativeBaseProvider>
      </ApplicationProvider>

      <FlashMessage floating />
    </>
  );
}
