import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './router/MainNavigator';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { Linking, ActivityIndicator } from 'react-native';

const theme = extendTheme({});

const App = () => {

  const handleDeepLink = ({ url }: any) => {
    console.log(`url = `, url);
  };

  useEffect(() => {
    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <NavigationContainer
        fallback={<ActivityIndicator color="blue" size="large" />} >
        <NativeBaseProvider theme={theme}>
          <MainNavigator />
        </NativeBaseProvider>
    </NavigationContainer >
  );
};

export default App;
