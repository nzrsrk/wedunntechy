import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../../styles/Theme';


import Modal from 'react-native-modal';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

import { AppButton } from '../../components/AppButton';
import OTPTextView from 'react-native-otp-textinput';
import { Validate } from '../../components/validate';
import CountDown from 'react-native-countdown-component';
import Typography from '../../styles/Typography';
import { FetchCalling } from '../../routes/APICalls';
import moment from 'moment';

export default function ViewModal({ ModalVisible,
    setModalVisible,
    setotpErrors,
    setOtp,
    setErrors,
    otpData,
    Otp,
    Errors,
    stepUpdation
}) {

    const OnSubmitOTP = () => {

        let otpError = Validate('OTP', 'otp', Otp);
        setotpErrors(otpError);
        if (otpError === '' && Otp !== '') {
            getOtpOfServicePerson()
        }
    }

    const [OtpData, setOtpData] = useState([]);
    const [OtpLoader2, setOtpLoader2] = useState();

    const getOtpOfServicePerson = async () => {
        setOtpLoader2(true)
        let userinfo = JSON.parse(await AsyncStorage.getItem('userinfo'))
        let passData = {
            OTP: Otp,
            UserId: userinfo?.Id
        }
        let pageFinder = "ServiceValidateOtp";
        FetchCalling(passData, setOtpData, setOtpLoader2, pageFinder);
    }

    useEffect(() => {
        if (OtpLoader2 === false) {
            if (!OtpData.Success) {
                setModalVisible(false)
                stepUpdation('Delivery Complete and Service Started', 9)
            } else {
                setErrors(OtpData.Message)
                Alert.alert(
                    '',
                    OtpData.Message,
                    [
                        { text: "ok", style: 'cancel', onPress: () => { } },
                    ]
                );
                setModalVisible(false)
            }
        }

        return () => {
            setOtpLoader2()
        }
    }, [OtpLoader2]);

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