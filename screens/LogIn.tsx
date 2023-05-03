import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StatusBar, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { COLOURS, _Items } from '../database/Database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackScreenProps } from '../router/routes';

import { buildUrl, redirectUrl } from "../utils/buildUrl";
import storage from "../utils/storage";

import { SolanaWallet, SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CustomChainConfig } from "@web3auth/base";

import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK, State } from "@web3auth/react-native-sdk";

const clientId = "BLBGQI79m_0DSiq2vWKRIlEk3YZ29s8ySNDa9ohLSOL-RtDA0aTciWtefWEfjYWMy-cdDEKA-vR1OIJrlj4AZuQ";

const providerUrl = "https://https://api.testnet.solana.com";

const solanaChainConfig : CustomChainConfig = {
    chainNamespace: "solana",
    rpcTarget: providerUrl,
    blockExplorer: "https://explorer.solana.com?cluster=testnet",
    chainId: "0x2",
    displayName: "testnet",
    ticker: "SOL",
    tickerName: "solana",
  };


const LogIn = ({ navigation }: MainStackScreenProps<'LogIn'>) => {

    const [userInfo, setUserInfo] = useState<State>();
    const [dappInfo, setDAppInfo] = useState();

    const loginWithGoogle = async () => {
        try {
            const web3auth = new Web3Auth(WebBrowser, {
                clientId,
                network: OPENLOGIN_NETWORK.TESTNET, // or other networks
            });
            const info = await web3auth.login({
                loginProvider: LOGIN_PROVIDER.GOOGLE,
                redirectUrl: redirectUrl("login"),
                mfaLevel: 'default',
                curve: 'secp256k1',
            });

            console.log(info);
            setUserInfo(info);
            const provider = await SolanaPrivateKeyProvider.getProviderInstance({privKey: info.privKey ? info.privKey : '' , chainConfig: solanaChainConfig});
            if ( provider.provider ) {
                const solanaWallet = new SolanaWallet(provider.provider);
                const accounts = await solanaWallet.requestAccounts();
                console.log(accounts);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const loginWithApple = async () => {
        try {
            const web3auth = new Web3Auth(WebBrowser, {
                clientId,
                network: OPENLOGIN_NETWORK.TESTNET, // or other networks
            });
            const info = await web3auth.login({
                loginProvider: LOGIN_PROVIDER.APPLE,
                redirectUrl: redirectUrl("login"),
                mfaLevel: 'default',
                curve: 'secp256k1',
            });

            console.log(info);

            setUserInfo(info);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {

        // storage.getItem("dappInfo").then(dappInfo => {
        //     setDAppInfo(dappInfo);
        // }).catch(err => {
        //     console.log(err);
        // });

        return () => {

        };
    }, []);


    return (
        <ScrollView showsVerticalScrollIndicator={false}
            style={{
                width: '100%',
                height: '100%',
                paddingHorizontal: '5%',
                backgroundColor: COLOURS.paleGrey,
            }}
        >
            {/* Back Button */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '10%',
                }}
            >
                <Ionicons
                    onPress={() => navigation.navigate('OnBoarding')}
                    name="arrow-back-outline"
                    size={36}
                    style={{
                        color: COLOURS.black
                    }}
                />
            </View>
            {/* Welcome Text */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: '2%',
                    marginLeft: 8
                }}
            >
                <Text
                    style={{
                        fontSize: 48,
                        color: COLOURS.black,
                        fontWeight: '600',
                    }}
                >
                    Welcome!
                </Text>
            </View>

            {/* Email Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '30%',

                }}
            >
                <TextInput
                    placeholder='Email'
                    style={{
                        paddingHorizontal: 16,
                        borderColor: COLOURS.border,
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '100%',
                        height: 48
                    }}
                >

                </TextInput>
            </View>

            {/* Password Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '3%',

                }}
            >
                <TextInput
                    placeholder='Password'
                    style={{
                        paddingHorizontal: 16,
                        borderColor: COLOURS.border,
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '100%',
                        height: 48
                    }}
                >

                </TextInput>
            </View>
            {/* Log in / Sign up */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingTop: '7%',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeTabs')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLOURS.purple,
                        borderRadius: 30,
                        width: '40%',
                        height: 48
                    }}
                    activeOpacity={0.5}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.white,
                            fontWeight: '500',
                            textAlign: 'center'
                        }}
                    >
                        Log in
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLOURS.purple,
                        borderRadius: 30,
                        width: '40%',
                        height: 48
                    }}
                    activeOpacity={0.5}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.white,
                            fontWeight: '500',
                            textAlign: 'center'
                        }}
                    >
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Or Text */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '7%'
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        color: COLOURS.black,
                        fontWeight: '500',
                    }}
                >
                    or
                </Text>
            </View>
            {/* Icons */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingTop: '7%',
                    paddingHorizontal: '10%'
                }}
            >
                <Ionicons
                    name="phone-portrait-outline"
                    size={30}

                />

                {/* <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 160,
                        height: 45,
                    }}
                    onPress={() => onAppleButtonPress().then(() => navigation.navigate('HomeTabs'))}
                /> */}
                <Ionicons
                    name="logo-apple"
                    size={30}
                    onPress={() => loginWithApple().then(() => {

                    }).catch(err => {
                        console.log(err);
                    })}
                />

                {/* <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={{ width: 250, height: 50 }}
                    onPress={loginWithApple}
                /> */}
                <Ionicons
                    name="logo-google"
                    size={30}
                    onPress={() => loginWithGoogle().then(() => {

                    }).catch((err) => {
                        console.log(err);
                    })}
                />

                {/* <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => signIn().then(() => navigation.navigate('HomeTabs'))}
                    // disabled={this.state.isSigninInProgress}
                />; */}
                <Ionicons
                    name="logo-facebook"
                    size={30}
                // onPress={() => onFacebookButtonPress().then(() => navigation.navigate('HomeTabs'))}
                />
            </View>

            {/* Connect wallet */}
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '7%',
                    paddingBottom: '4%',
                }}
            >
                {/* <TouchableOpacity
                    onPress={dappInfo ? onDisconnectWallet : onConnectWallet}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLOURS.purple,
                        borderRadius: 30,
                        width: '100%',
                        height: 48
                    }}
                    activeOpacity={0.5}>
                    <Ionicons
                        name="wallet-outline"
                        size={20}
                        style={{
                            color: COLOURS.white,
                            marginRight: 8
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.white,
                            fontWeight: '500',
                            textAlign: 'center'
                        }}
                    >
                        {
                            dappInfo ? `Disconnect wallet` : `Connect wallet`
                        }

                    </Text>
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.darkGrey,
                        textAlign: 'center'
                    }}
                >
                    {
                        dappInfo ? `Wallet Connected: ${dappInfo["public_key"]}` : ``
                    }

                </Text> */}
            </View>
        </ScrollView>
    );
};

export default LogIn;
