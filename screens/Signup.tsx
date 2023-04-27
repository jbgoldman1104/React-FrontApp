import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLOURS, _Items } from '../database/Database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackScreenProps } from '../router/routes';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';


const Signup = ({ navigation }: MainStackScreenProps<'Signup'>) => {


    return (
        <View
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

                }}
            >
                
            </View>
            {/* Username Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '50%',

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

            {/* Text1 */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '5%'
                }}
            >
                {/* <CheckBox
                    style={{

                    }}
                >
                    
                </CheckBox> */}
                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.textColor,
                        fontWeight: '400',
                    }}
                >
                    I’d like to receive personalized offers and be the first to know about the latest updates to WTT via email.
                </Text>
            </View>

            {/* Text2 */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '5%'
                }}
            >
                {/* <CheckBox
                    style={{

                    }}
                >
                    
                </CheckBox> */}
                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.textColor,
                        fontWeight: '400',
                    }}
                >
                    By registering, I confirm that I accept WTT’s Terms & Conditions and Pro terms of sale, have read the Privacy policy, and I’m at least 18 years old. 
                </Text>
            </View>
        
            {/* Sign up */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '7%',
                }}
            >
                <TouchableOpacity
                    // onPress={() => navigation.navigate('Home')}
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
        </View>
    );
};

export default Signup;
