import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StatusBar, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { COLOURS, _Items } from '../database/Database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackScreenProps } from '../router/routes';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { err } from 'react-native-svg/lib/typescript/xml';

import { buildUrl, redirectUrl } from "../utils/buildUrl";
import storage from "../utils/storage";
import { encryptPayload } from "../utils/encryptPayload";

import nacl from "tweetnacl";
import bs58 from "bs58";
import { decryptPayload } from "../utils/decryptPayload";

// import firebase from '../firebaseConfig';
// import * as Crypto from "expo-crypto";
// import * as AppleAuthentication from "expo-apple-authentication";

GoogleSignin.configure({
    webClientId: '1064351666274-5vukpttfc8u57t0495t00eon3l24j5l0.apps.googleusercontent.com',

    offlineAccess: true
});

async function onGoogleButtonPress() {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);

    // // Get the users ID token
    // const { idToken, accessToken } = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
}

async function signIn() {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
    } catch (error: any) {
        console.log('error in google signin', error);
    }
}

// const loginWithApple = async () => {
//     const csrf = Math.random().toString(36).substring(2, 15);
//     const nonce = Math.random().toString(36).substring(2, 10);
//     const hashedNonce = await Crypto.digestStringAsync(
//         Crypto.CryptoDigestAlgorithm.SHA256, nonce);
//     const appleCredential = await AppleAuthentication.signInAsync({
//         requestedScopes: [
//             AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//             AppleAuthentication.AppleAuthenticationScope.EMAIL
//         ],
//         state: csrf,
//         nonce: hashedNonce
//     });
//     const { identityToken, email, state } = appleCredential;
// }

// const sendVerification = (phoneNumber: string, recaptchaVerifier: any, setVerificationId: any) => {

//     const phoneProvider = new firebase.auth().PhoneAuthProvider();
//     phoneProvider
//         .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
//         .then(setVerificationId);
// };

// Function to be called when confirming the verification code that we received
// from Firebase via SMS
// const confirmCode = (verificationId: string, code: string) => {
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//         verificationId,
//         code
//     );
//     firebase.auth()
//         .signInWithCredential(credential)
//         .then((result: any) => {
//             // Do something with the results here
//             console.log(result);
//         });
// }

const LogIn = ({ navigation }: MainStackScreenProps<'LogIn'>) => {

    // Set an initializing state whilst Firebase connects
    const [walletConnected, setWalletConnected] = useState<boolean>(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [dappInfo, setDAppInfo] = useState();

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        if (!user) {
            return;
        }
        console.log(user);
        navigation.navigate('Signup')
        // setUser(user);
        // if (initializing) setInitializing(false);
    }

    const setDappInfo = async (dappInfo: any) => {
        setDAppInfo(dappInfo);
        await storage.setItem("dappInfo", dappInfo);
    }

    const handleDeepLink = async (deepLink: any) => {
        try {
            console.log(`url = `, deepLink.url);
            if (!deepLink.url) {
                return;
            }
            const url = new URL(deepLink.url);
            const params = url.searchParams;

            if (params.get("errorCode")) {
                const error = Object.fromEntries([...params]);
                const message =
                    error?.errorMessage ??
                    JSON.stringify(Object.fromEntries([...params]), null, 2);
                console.log("error: ", message);

                setDappInfo(null);
                return;
            }

            // Handle a `connect` response from Phantom
            if (/connect/.test(url.pathname)) {
                const dappKeyPair = await storage.getItem("dappKeyPair");
                const sharedSecret = nacl.box.before(
                    bs58.decode(params.get("phantom_encryption_public_key")!),
                    Uint8Array.from( Object.values(dappKeyPair.secretKey))
                );
                const connectData = decryptPayload(
                    params.get("data")!,
                    params.get("nonce")!,
                    sharedSecret
                );
                console.log(`connected to ${connectData.public_key.toString()}`);
                setDappInfo({
                    ...connectData, sharedSecret
                });
                setWalletConnected(true);
            }

            // Handle a `disconnect` response from Phantom
            if (/onDisconnect/.test(url.pathname)) {
                setDappInfo(null);
                setWalletConnected(false);
                console.log("disconnected wallet");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        storage.getItem("dappInfo").then(dappInfo => {
            setDAppInfo(dappInfo);
        }).catch(err => {
            console.log(err);
        });

        auth().signOut().then(() => {

        }).catch(err => {
            console.log(err);
        });
        const listener = Linking.addEventListener("url", handleDeepLink);
        // return () => {
        //   listener.remove();
        // };

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const onConnectWallet = () => {
        storage.getItem("dappKeyPair").then(dappKeyPair => {
            const params = new URLSearchParams({
                dapp_encryption_public_key: bs58.encode(Object.values(dappKeyPair.publicKey)),
                cluster: "mainnet-beta",
                app_url: "https://deeplink-movie-tutorial-dummy-site.vercel.app/",
                redirect_link: redirectUrl("connect"),
            });

            const url = buildUrl("connect", params);

            console.log(url);
            Linking.openURL(url);
        }).catch(err => {
            console.log(err);
        });
    }

    const onDisconnectWallet = () => {
        if (!dappInfo) {
            return;
        }
        const payload = {
            session: dappInfo["session"],
        };
        const [nonce, encryptedPayload] = encryptPayload(payload, dappInfo["sharedSecret"]);
        storage.getItem("dappKeyPair").then(dappKeyPair => {
            const params = new URLSearchParams({
                dapp_encryption_public_key: bs58.encode(Object.values(dappKeyPair.publicKey)),
                nonce: bs58.encode(nonce),
                redirect_link: redirectUrl("disconnect"),
                payload: bs58.encode(encryptedPayload),
            });
            const url = buildUrl("disconnect", params);
            console.log(url);
            Linking.openURL(url);
        });
    }

    //if (initializing) return null;

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
                // onPress={() => onAppleButtonPress().then(() => navigation.navigate('HomeTabs'))}
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
                    onPress={() => onGoogleButtonPress().then(() => {

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
                <TouchableOpacity
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

                </Text>
            </View>
        </ScrollView>
    );
};

export default LogIn;
