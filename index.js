/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import { Navigation } from "react-native-navigation";
Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      topMargin: 0,
      visible: false,
      drawBehind: true,
      animate: false,
      height: 0
    },
    layout: {
      orientation: 'portrait',
      backgroundColor: 'white',
      componentBackgroundColor: 'white',
      fitSystemWindows: true,
      topMargin: 0,
    },
    statusBar: {
      drawBehind: true,
      visible: false,
      backgroundColor: 'transparent',
      style: 'light'
    },
  });

   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.myApp.WelcomeScreen'
             }
           }
         ]
       }
     }
  });
});
