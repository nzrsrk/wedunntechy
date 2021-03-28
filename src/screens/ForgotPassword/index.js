import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';

import { AppTopScreenTheme } from '../../components/AppTopScreenTheme'
import { TermsAndConditions } from '../../components/TermsAndConditions';
import { AppTextInput } from '../../components/AppTextInput';
import { AppButton } from '../../components/AppButton';
import OTPTextView from 'react-native-otp-textinput';
import { Validate } from '../../components/validate';
import CountDown from 'react-native-countdown-component';

import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import { FetchCalling } from '../../routes/APICalls';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

function ForgotPassword({ navigation }) {

    const [mobile, setmobile] = useState('');
    const [Otp, setOtp] = useState('');
    const [Errors, setErrors] = useState({ mobile: '', otp: '' });
    const [Counter, SetCounter] = useState(true);
    const [SendOtp, SetSendOtp] = useState(false);
    const [reset, setReset] = useState(true);


    const validation = () => {
        let phoneError = Validate('Mobile Number', 'mobile', mobile);
        setErrors({
            ...Errors,
            mobile: phoneError,
        });
    }

    const [otpLoader, setOtpLoader] = useState();
    const [numberData, setNumberData] = useState();


    const sendOtpfun = () => {
        validation();
        let passData = {
            Mobile: mobile
        }
        let pageFinder = "mobileNumberCheck";

        if (mobile != '' && Errors.mobile == '') {
            setOtpLoader(true);
            setReset(true);
            FetchCalling(passData, setNumberData, setOtpLoader, pageFinder)
        }

    }

    useEffect(() => {
        if (otpLoader == false) {
            if (numberData.Success) {
                setReset(true);
                setErrors({
                    ...Errors,
                    mobile: 'Not registered with this number',
                });
            } else {
                setReset(false);
                otpGenfunc();
            }
        }
    }, [otpLoader]);



    const [otpData, setOtpData] = useState([]);
    const [otpDataLoader, setOtpDataLoader] = useState();


    const otpGenfunc = () => {
        let passData = {
            mobile: mobile
        }
        let pageFinder = "OTPgen";
        setOtpDataLoader(true);
        FetchCalling(passData, setOtpData, setOtpDataLoader, pageFinder);
    }




    // useEffect(() => {
    //     if (otpDataLoader == false) {
    //         console.log(otpData)
    //     }
    // }, [otpDataLoader])




    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const OnSubmit = () => {

        let otpError = Validate('OTP', 'otp', Otp);
        setErrors({
            ...Errors,
            otp: otpError,
        });
        validation();


        if ((mobile != '' && Errors.mobile == '') &&
            (Otp != '' && Errors.otp == '')
        ) {
            if (Otp == otpData.Data) {

                navigation.navigate('ResetPassword', {
                    'Username': mobile,
                });
                setmobile(null);
                setOtp(null);

            } else {
                setErrors({
                    ...Errors,
                    otp: 'Incorrect OTP',
                });
            }

        }
    }




    return (
        <SafeAreaView style={Typography.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} enableOnAndroid={Platform.OS === 'android'} enableAutomaticScroll={true} >

                <ScrollView contentContainerStyle={Typography.commonWrapper}>
                    <AppTopScreenTheme navigation={navigation}
                        image={require('../../assets/images/beforelogin/forgotPassword.png')}
                    />
                    <View style={Typography.formContainer}>

                        <Text style={Typography.headingText}>Reset password</Text>
                        <AppTextInput
                            inputStyle={Typography.sectionStyle} label='Enter Registered Mobile Number'
                            icon={'call_f'}
                            placeholderText='Mobile Number'
                            keyboardType={'numeric'}
                            value={mobile}
                            errorMessage={Errors.mobile}
                            onChangeText={(mobile) => {
                                setmobile(mobile)
                                setErrors({ ...Errors, mobile: Validate('Mobile Number', 'mobile', mobile) })
                                setReset(true)
                            }}
                        />
                        <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN }}
                            onPress={() => { sendOtpfun() }} title='Send OTP' />

                        {
                            otpLoader &&
                            <LoaderTwo style={{ marginVertical: heightPercentageToDP(3.5) }} />
                        }

                        {
                            !reset &&
                            <View style={{ width: "100%" }}>
                                <OTPTextView
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

                                    : <TouchableOpacity style={{ paddingHorizontal: widthPercentageToDP(.5), paddingVertical: heightPercentageToDP(.5), alignSelf: 'flex-start' }}
                                        onPress={() => {
                                            SetCounter(true),
                                                otpGenfunc()
                                        }}>
                                        <Text style={{ color: 'red', fontSize: Theme.FONT_SIZE_SMALL, fontFamily: "Roboto-Bold" }}>Resend</Text>
                                    </TouchableOpacity>
                                }

                                <AppButton
                                    type='big'
                                    style={{ width: '100%', borderColor: Theme.BLUE, marginTop: heightPercentageToDP(2) }}
                                    onPress={() => OnSubmit()}
                                    title='Reset Password'
                                // disabled={reset}
                                />
                            </View>
                        }
                    </View>
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



export default ForgotPassword;
