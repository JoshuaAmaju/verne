/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {hydrate as hydrateAuth} from './shared/stores/auth';

// import {GoogleSignin} from '@react-native-google-signin/google-signin';

hydrateAuth();

AppRegistry.registerComponent(appName, () => App);
