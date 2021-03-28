import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AppTopScreenTheme } from '../../components/AppTopScreenTheme';
import { SafeAreaView } from 'react-native-safe-area-context';


import { AppButton } from '../../components/AppButton';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';

import { TermsAndConditions } from '../../components/TermsAndConditions';
import { Validate } from '../../components/validate';

import { showMessage } from "react-native-flash-message";

import { PasswordInput } from '../../components/PasswordInput';

import { LoaderOne } from '../../components/CustomLoader';
import { FetchCalling } from '../../routes/APICalls';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';



function ResetPassword({ navigation, route }) {

    const [Data, setData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [Errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });



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



    const validation = () => {
        let passwordError = Validate('Password', 'password', Data.password)
        let cpasswordError = passwordMatch(Data.password, Data.confirmPassword)
        setErrors({
            ...Errors,
            password: passwordError,
            confirmPassword: cpasswordError
        })
    }



    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const SubmitForm = () => {
        validation();
        let passData = {
            Username: route.params.Username,
            Password: Data.password,
            ConfirmPassword: Data.confirmPassword
        }
        let pageFinder = 'changePassWord';

        if (
            (Data.password != '' && Errors.password == '') &&
            (Data.confirmPassword != '' && Errors.confirmPassword == '')
        ) {
            setLoader(true)
            FetchCalling(passData, setReturnData, setLoader, pageFinder);
        }
    }






    useEffect(() => {
        if (loader == false) {
            if (returnData.Success) {
                showMessage({
                    message: "Password Changed successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                navigation.navigate('LogIn');
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
    }, [loader])




    return (
        <SafeAreaView style={Typography.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} enableOnAndroid={Platform.OS === 'android'} enableAutomaticScroll={true} >

                <ScrollView contentContainerStyle={Typography.commonWrapper} >

                    <LoaderOne loader={loader} />

                    <AppTopScreenTheme
                        navigation={navigation}
                        image={require('../../assets/images/beforelogin/resetPassword.png')}
                    />

                    <View style={Typography.formContainer}>

                        <Text style={Typography.headingText}>Reset password</Text>
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
                        <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN, marginTop: heightPercentageToDP(2) }}
                            onPress={() => SubmitForm()} title='Confirm' />
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
export default ResetPassword;