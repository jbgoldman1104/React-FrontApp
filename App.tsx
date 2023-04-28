import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './router/MainNavigator';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { Linking, ActivityIndicator } from 'react-native';

import stroage from './utils/storage';


import nacl  from "tweetnacl";
import bs58 from "bs58";
import storage from "./utils/storage";
import { decryptPayload } from "./utils/decryptPayload";

const theme = extendTheme({});

let deeplinkHanders: any[] = [];

const dappKeyPair = nacl.box.keyPair();

const App = () => {

  const setDappInfo = async (dappInfo: any) => {
    await storage.setItem("dappInfo", dappInfo);
  }


  const dplinkWater = {
    register: (handler: any) => {
      deeplinkHanders.push(handler);
    },
    unregister: (handler: any) => {
      const index = deeplinkHanders.indexOf(handler);
      if (index > -1) { // only splice array when item is found
        deeplinkHanders.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  useEffect(() => {

    storage.setItem("dappKeyPair", dappKeyPair);
    setDappInfo(null);
    return () => {
    };
  }, []);

  return (
    <NavigationContainer
      fallback={<ActivityIndicator color="blue" size="large" />} >
      <NativeBaseProvider theme={theme}>
        <MainNavigator/>
      </NativeBaseProvider>
    </NavigationContainer >
  );
};

export default App;
