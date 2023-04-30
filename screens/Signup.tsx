import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLOURS, _Items } from '../database/Database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackScreenProps } from '../router/routes';
import  {CheckBox} from 'react-native-elements';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';


const Signup = ({ navigation }: MainStackScreenProps<'Signup'>) => {
    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
        // launchImageLibrary({ noData: true }, (response) => {
        //     // console.log(response);
        //     if (response) {
        //         setPhoto(response);
        //     }
        // });
    };

    const handleUploadPhoto = () => {
        // fetch(`s ${SERVER_URL}/api/upload`, {
        //     method: 'POST',
        //     body: createFormData(photo, { userId: '123' }),
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         console.log('response', response);
        //     })
        //     .catch((error) => {
        //         console.log('error', error);
        //     });
    };

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
                    onPress={() => navigation.navigate('LogIn')}
                    name="arrow-back-outline"
                    size={36}
                    style={{
                        color: COLOURS.black
                    }}
                />
            </View>
            {/* Sign up */}
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
                    Sign up
                </Text>
            </View>

            {/* Image Picker */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',
                }}
            >
                {/* {photo && ( */}
                <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png' }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                    }}
                />
                {/* )} */}
                {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
            </View>
            {/* Username Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',

                }}
            >
                <TextInput
                    placeholder='Username'
                    style={{
                        paddingHorizontal: 16,
                        borderColor: COLOURS.border,
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '100%',
                        height: 48
                    }}
                    underlineColorAndroid="transparent"
                >

                </TextInput>
            </View>
            {/* Email Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',

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
                    underlineColorAndroid="transparent"
                >

                </TextInput>
            </View>
            {/* Password Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',

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
                    underlineColorAndroid="transparent"
                >

                </TextInput>
            </View>
            {/* Text1 */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '3%'
                }}
            >
                <CheckBox
                    title={'I’d like to receive personalized offers and be the first to know about the latest updates to WTT via email.'}
                    style={{
                        alignSelf: 'center'
                    }}
                >

                </CheckBox>
                {/* <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.textColor,
                        fontWeight: '400',
                    }}
                >
                    
                </Text> */}
            </View>

            {/* Text2 */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '3%'
                }}
            >
                <CheckBox
                    title={'By registering, I confirm that I accept WTT’s Terms & Conditions and Pro terms of sale, have read the Privacy policy, and I’m at least 18 years old.'}
                    style={{
                        alignSelf: 'center',
                    }}
                    fontFamily=''
                    titleProps={{}}
                >
                    
                </CheckBox>
                {/* <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.textColor,
                        fontWeight: '400',
                    }}
                >
                    
                </Text> */}
            </View>

            {/* Sign up */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '7%',
                    paddingBottom: '7%',
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
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Signup;
