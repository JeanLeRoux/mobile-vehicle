/**
 * @format
 */

import {AppRegistry, Linking, NativeModules, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Amplify, {Auth, Analytics } from 'aws-amplify';
import awsmobile from './aws-exports';
import PushNotification from '@aws-amplify/pushnotification';
PushNotification.configure(awsmobile);
Amplify.configure(awsmobile);
Auth.configure(awsmobile);

AppRegistry.registerComponent(appName, () => App);
