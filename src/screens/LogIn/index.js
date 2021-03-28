import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import styles from './styles';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';

import { AuthContext } from '../../routes/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppButton } from '../../components/AppButton';
import { PasswordInput } from '../../components/PasswordInput';
import { AppTextInput } from '../../components/AppTextInput';
import { TermsAndConditions } from '../../components/TermsAndConditions';
import { AppTopScreenTheme } from '../../components/AppTopScreenTheme';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Validate } from '../../components/validate';
import { showMessage } from "react-native-flash-message";

import { LoaderOne } from '../../components/CustomLoader';
import { FetchCalling } from '../../routes/APICalls';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


function LogIn({ navigation }) {

    const [userCredentials, setuserCredentials] = useState({
        phoneNumber: '',
        password: ''
    });
    const [Errors, setErrors] = useState({
        phoneNumber: '',
        password: ''
    });

    const { signIn } = React.useContext(AuthContext);



    const validation = () => {
        let phoneError = Validate('Phone Number', 'mobile', userCredentials.phoneNumber)
        let passwordError = Validate('Password', 'isEmpty', userCredentials.password)

        setErrors({
            ...Errors,
            phoneNumber: phoneError,
            password: passwordError
        })
    }


    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const OnSubmit = () => {
        validation();
        let passData = {
            Username: userCredentials.phoneNumber,
            Password: userCredentials.password
        }
        let pageFinder = 'login';


        if (
            (userCredentials.phoneNumber != '' && Errors.phoneNumber == '') &&
            (userCredentials.password != '' && Errors.password == '')
        ) {
            setLoader(true);
            FetchCalling(passData, setReturnData, setLoader, pageFinder)
        }
    }





    useEffect(() => {
        if (loader == false) {
            if (returnData.Success) {
                userStoreData();

                if (returnData.Data.Status == 'Created') {
                    navigation.navigate('Verification');
                } else {
                    signIn()
                    // navigation.navigate('Verification');
                }

                showMessage({
                    message: "You are successfully logged in",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });

            } else {
                setErrors({
                    ...Errors,
                    password: 'Invalid Username or Password.',
                })
                showMessage({
                    message: "LogIn failed! Invalid Username or Password.",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'danger',
                    backgroundColor: "red",
                    color: '#fff',
                });
            }
        }
    }, [loader]);





    const userStoreData = async () => {
        try {
            await AsyncStorage.setItem('userinfo', JSON.stringify(returnData.Data));
            // Speech.speak('Hi ' + returnData?.Data.FirstName + '.... welcome to wedunn family!');
            tokenUpdating();
        } catch (e) {
            showMessage({
                message: e,
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'info',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }



    const tokenUpdating = async () => {
        try {
            let expotoken = await AsyncStorage.getItem('expoToken');
            let userInfoData = JSON.stringify(returnData.Data);


            if (expotoken) {
                let passData = {
                    Id: JSON.parse(userInfoData).Id,
                    Token: JSON.parse(expotoken)
                }


                fetch('http://godlandit.pythonanywhere.com/api/ServicePerson/UpdateTokenServicePerson/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(passData)
                })
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        // console.log(responseJSON);
                    })
                    .catch((error) => { console.error(error) })
                    .finally(() => { })

            }
        } catch (e) {
        }
    }



    return (
        <SafeAreaView style={Typography.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} enableOnAndroid={Platform.OS === 'android'} enableAutomaticScroll={true} >

                <ScrollView contentContainerStyle={Typography.commonWrapper}>
                    <LoaderOne loader={loader} />

                    <AppTopScreenTheme
                        navigation={navigation}
                        image={require('../../assets/images/beforelogin/login.png')}
                    />

                    <View style={Typography.formContainer}>
                        <Text style={Typography.headingText}>Log In</Text>
                        <AppTextInput label='Phone Number'
                            inputStyle={{}}
                            keyboardType={'numeric'}
                            icon={'call_f'}
                            placeholderText='Phone Number'
                            value={userCredentials.phoneNumber}
                            errorMessage={Errors.phoneNumber}
                            onChangeText={(phonenumber) => {
                                setuserCredentials({ ...userCredentials, phoneNumber: phonenumber.trim() })
                                setErrors({
                                    ...Errors, phoneNumber: Validate('Phone Number', 'mobile', phonenumber.trim())
                                })
                            }}

                        />
                        <PasswordInput label='Password'
                            inputStyle={{}}
                            icon={'pasword_f'}
                            placeholderText='******'
                            value={userCredentials.password}
                            errorMessage={Errors.password}
                            onChangeText={(password) => {
                                setuserCredentials({ ...userCredentials, password: password })
                                setErrors({ ...Errors, password: Validate('Password', 'isEmpty', password) })
                            }}
                        />
                        <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN, marginTop: heightPercentageToDP(2) }}
                            onPress={() => OnSubmit()} title='Log In' />
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPassword}
                            >Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Typography.bottomItems}>
                        <Text style={Typography.nmText}>Not a member?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={Typography.bottomText}
                            >Register Now</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </KeyboardAvoidingView> */}
                </ScrollView>

                {Platform.OS === 'android' && <View style={[Typography.bottomContainer, {
                    // position: 'absolute',
                    bottom: 0
                }
                ]}>
                    <TermsAndConditions navigation={navigation} />
                </View>}
            </KeyboardAwareScrollView>
            { Platform.OS === 'ios' && <View style={[Typography.bottomContainer,
            ]}>
                <TermsAndConditions navigation={navigation} />
            </View>}

        </SafeAreaView>
    )


}

export default LogIn;