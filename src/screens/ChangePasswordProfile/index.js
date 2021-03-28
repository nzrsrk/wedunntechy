import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { AppButton } from '../../components/AppButton';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';

import { Validate } from '../../components/validate';

import { showMessage } from "react-native-flash-message";

import { PasswordInput } from '../../components/PasswordInput';

import { LoaderOne } from '../../components/CustomLoader';
import { FetchCalling } from '../../routes/APICalls';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import OTPTextView from 'react-native-otp-textinput';

import { normalize } from '../../components/Normalize';


function ResetPassword({ navigation, route }) {

    const [Data, setData] = useState({
        password: '',
        confirmPassword: '',
        otp: ''
    });
    const [Errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
        otp: '',
        mobile: ''
    });


    const [Otp, setOtp] = useState('');
    const [Counter, SetCounter] = useState(true);
    const [SendOtp, SetSendOtp] = useState(false);
    const [reset, setReset] = useState(true);


    const passwordMatch = (password, cpassword) => {
        let errors = {};
        if (password != cpassword)
            errors = 'Your password and confirmation password do not match. '
        else
            errors = '';
        return errors;
    };


    const onChangePassword = (password) => {
        setData({ ...Data, password: password })
        setErrors({
            ...Errors,
            password: Validate('Password', 'password', password),
        })
    }


    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const SubmitForm = () => {
        let passwordError = Validate('Password', 'password', Data.password)
        let cpasswordError = passwordMatch(Data.password, Data.confirmPassword)
        setErrors({
            ...Errors,
            password: passwordError,
            confirmPassword: cpasswordError
        })
        if (
            (passwordError === '' && cpasswordError === '')
        ) {
            sendOtpfun()
        }
    }

    const [otpData, setOtpData] = useState([]);
    const [otpDataLoader, setOtpDataLoader] = useState();


    const sendOtpfun = async () => {
        let value = await AsyncStorage.getItem('userinfo');
        let Mobile = JSON.parse(value)?.Mobile
        let passData = {
            mobile: Mobile
        }
        let pageFinder = "OTPgen";
        setOtpDataLoader(true);
        FetchCalling(passData, setOtpData, setOtpDataLoader, pageFinder);
    }


    useEffect(() => {
        if (otpDataLoader == false) {
            if (otpData.Success) {
                setReset(false)
            }
            else {
                showMessage({
                    message: "Something went Wrong!",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'info',
                    backgroundColor: "orange",
                    color: '#fff',
                });
            }
        }
        return () => {
            setReset(true)
        }
    }, [otpDataLoader])


    const OnSubmit = () => {

        let otpError = Validate('OTP', 'otp', Otp);
        setErrors({
            ...Errors,
            otp: otpError,
        });

        if (
            (Otp != '' && Errors.otp == '')
        ) {
            if (Otp == otpData.Data) {
                updatePassword()
                setOtp(null);

            } else {
                setErrors({
                    ...Errors,
                    otp: 'Incorrect OTP',
                });
            }

        }
    }

    const [passwordData, setpasswordData] = useState([]);
    const [passwordLoader, setpasswordLoader] = useState();

    const updatePassword = async () => {
        let value = await AsyncStorage.getItem('userinfo');
        let Mobile = JSON.parse(value)?.Mobile
        let passData = {
            Username: Mobile,
            Password: Data.password,
            ConfirmPassword: Data.confirmPassword
        }
        let pageFinder = 'changePassWord';

        if (
            (Data.password != '' && Errors.password == '') &&
            (Data.confirmPassword != '' && Errors.confirmPassword == '')
        ) {
            setLoader(true)
            FetchCalling(passData, setpasswordData, setpasswordLoader, pageFinder);
        }
    }

    useEffect(() => {
        if (passwordLoader === false) {
            if (passwordData.Success) {
                showMessage({
                    message: "Password Changed successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                navigation.navigate('ProfileFillView');

            } else {
                showMessage({
                    message: "Something went wrong",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'info',
                    backgroundColor: "orange",
                    color: '#fff',
                });
            }
        }
        return () => {
            setpasswordLoader()
        }
    }, [passwordLoader]);






    const ResetContainer = () => {
        return (
            <View style={{ width: "100%" }}>
                <OTPTextView
                    handleTextChange={(e) => setOtp(e)}
                    handleTextChange={text => {
                        setOtp(text)
                        setErrors({
                            ...Errors,
                            otp: Validate('OTP', 'otp', text),
                        })
                    }}
                    containerStyle={styles.textInputContainer}
                    textInputStyle={styles.roundedTextInput}
                    inputCount={4}
                    inputCellLength={1}
                />
                {Boolean(Errors.otp) ?
                    <Text style={styles.error}>{Errors.otp}</Text>
                    : null}

                {Counter ?
                    <View style={{ flexDirection: 'row', alignItems: "center", alignSelf: 'flex-start' }}>
                        <CountDown
                            size={normalize(10)}
                            until={40}
                            onFinish={() => SetCounter(false)}
                            digitStyle={{ backgroundColor: '#FFF', }}
                            digitTxtStyle={{ color: Theme.BLUE, fontSize: Theme.FONT_SIZE_SMALL }}
                            separatorStyle={{ color: Theme.BLUE, fontSize: Theme.FONT_SIZE_SMALL, }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: null, s: null }}
                            showSeparator
                        />
                        <Text style={{ color: Theme.BLUE, fontSize: Theme.FONT_SIZE_SMALL, fontFamily: "Roboto-Bold" }}>minute</Text>
                    </View>

                    : <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-start' }}
                        onPress={() => {
                            SetCounter(true),
                                sendOtpfun()
                        }}>
                        <Text style={{ color: 'red', fontSize: Theme.FONT_SIZE_SMALL, fontFamily: "Roboto-Bold" }}>Resend</Text>
                    </TouchableOpacity>
                }

                <AppButton
                    type='big'
                    style={{ width: '100%', borderColor: Theme.BLUE, marginTop: 20 }}
                    onPress={() => OnSubmit()}
                    title='Change Password'
                    disabled={reset}
                />
            </View>
        )
    }



    return (
        <SafeAreaView style={Typography.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} enableOnAndroid={Platform.OS === 'android'} enableAutomaticScroll={true} >

                <ScrollView contentContainerStyle={Typography.commonWrapper} >

                    <LoaderOne loader={loader || otpDataLoader || passwordLoader} />

                    <View style={Typography.formContainer}>

                        <Text style={Typography.headingText}>Change password</Text>
                        <PasswordInput label='New Password'
                            icon={'pasword_f'}
                            inputStyle={{}}
                            placeholderText='******'
                            value={Data.password}
                            errorMessage={Errors.password}
                            onChangeText={(password) => onChangePassword(password)}

                        />
                        <PasswordInput label='Retype New Password'
                            icon={'pasword_f'}
                            inputStyle={{}}
                            placeholderText='******'
                            value={Data.confirmPassword}
                            errorMessage={Errors.confirmPassword}
                            onChangeText={(cpassword) => setData({ ...Data, confirmPassword: cpassword })}

                        />
                        {reset && <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN, marginTop: heightPercentageToDP(2) }}
                            onPress={() => SubmitForm()} title='Send OTP' />}
                        {!reset && ResetContainer()}
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}
export default ResetPassword;