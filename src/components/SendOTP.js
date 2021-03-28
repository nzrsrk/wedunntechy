import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../styles/Theme';


import Modal from 'react-native-modal';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from './Normalize';

import { AppButton } from '../components/AppButton';
import OTPTextView from 'react-native-otp-textinput';
import { Validate } from '../components/validate';
import CountDown from 'react-native-countdown-component';
import Typography from '../styles/Typography';

export default function ViewModal({ ModalVisible,
    setMobileVerified,
    setModalVisible,
    resendotp,
    setotpErrors,
    setOtp,
    setErrors,
    Counter,
    otpData,
    Otp,
    SetCounter,
    Errors,
    mobileno }) {

    const OnSubmitOTP = () => {
        let otpError = Validate('OTP', 'otp', Otp);
        setotpErrors(otpError);
        if (otpError === '' && Otp !== '') {
            if (Otp === otpData.Data) {
                setOtp(null);
                setModalVisible(false)
                setMobileVerified(mobileno)
            } else {
                setotpErrors('Incorrect OTP');
            }
        }
    }
    return (
        <Modal isVisible={ModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={0.6}
            animationOut='zoomOut'
            animationOutTiming={300}
            animationInTiming={300}
            backdropTransitionOutTiming={0}
            onBackButtonPress={() => setModalVisible(false)}
            animationIn='zoomIn'>

            <View style={[{ width: "100%" }, styles.modalContainer]}>
                <OTPTextView
                    handleTextChange={text => {
                        setOtp(text)
                        setErrors(Validate('OTP', 'otp', text))
                    }}
                    containerStyle={styles.textInputContainer}
                    textInputStyle={styles.roundedTextInput}
                    inputCount={4}
                    inputCellLength={1}
                />
                {Boolean(Errors) ?
                    <Text style={styles.error}>{Errors}</Text>
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
                                resendotp()

                        }}>
                        <Text style={{ color: 'red', fontSize: Theme.FONT_SIZE_SMALL, fontFamily: "Roboto-Bold" }}>Resend</Text>
                    </TouchableOpacity>
                }

                <AppButton
                    type='big'
                    style={{ width: '100%', borderColor: Theme.BLUE, marginTop: heightPercentageToDP(2) }}
                    onPress={() => OnSubmitOTP()}
                    title='Verify'
                // disabled={reset}
                />
            </View>

        </Modal>
    )
}


const styles = StyleSheet.create({
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    modalContainer: {
        borderWidth: 2,
        borderColor: Theme.BLUE,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        padding: '5%'
    },
    roundedTextInput: {
        padding: 0,
        borderRadius: 5,
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(6),
        ...Typography.elevation,
        flex: 1,
    },
    textInputContainer: {
        marginTop: heightPercentageToDP(2),
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginTop: heightPercentageToDP(.3),
    },
})