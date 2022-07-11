/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {hydrate as hydrateAuth} from './shared/stores/auth';
import {hydrate as hydrateOnboarding} from './shared/stores/onborading';

// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// hydrateOnboarding();

// hydrateAuth();

AppRegistry.registerComponent(appName, () => App);
