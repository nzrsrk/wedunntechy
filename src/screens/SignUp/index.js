
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import Theme from '../../styles/Theme'
import Typography from '../../styles/Typography';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';


import { AppButton } from '../../components/AppButton';
import { AppTextInput } from '../../components/AppTextInput';
import { TermsAndConditions } from '../../components/TermsAndConditions';
import { AppTopScreenTheme } from '../../components/AppTopScreenTheme';
import { Validate } from '../../components/validate';
import { showMessage } from "react-native-flash-message";

import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import { FetchCalling } from '../../routes/APICalls';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewModal from '../../components/SendOTP';
import Geolocation from '@react-native-community/geolocation';

function SignUp({ navigation }) {


    const [serviceLoader, setServiceLoader] = useState();
    const [serviceReturn, setServiceReturn] = useState([]);
    const [checkboxSelect, setCheckboxSelect] = useState([]);
    const [MobileVerified, setMobileVerified] = useState();


    const collectService = () => {
        setServiceLoader(true);
        let passData = {
            PageIndex: 0,
            PageSize: 50
        };
        let pageFinder = "getService"
        FetchCalling(passData, setServiceReturn, setServiceLoader, pageFinder);
    }

    useEffect(() => {
        collectService();
        getLocationAsync()
        return () => {
            setServiceLoader()
        }
    }, []);


    useEffect(() => {
        if (serviceLoader == false) {

            let sample = [];
            serviceReturn.Data.map((e, i) => {
                sample.push({
                    checked: false,
                    name: e.ServiceName
                });
                setCheckboxSelect(sample);
            });
        }
    }, [serviceLoader])



    const [data, setdata] = useState({
        fullName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        services: ''
    });
    const [Errors, setErrors] = useState({
        fullName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        services: '',
        mobileVerified: ''
    });

    const checkboxChoose = (index) => {
        let sample = [...checkboxSelect];
        sample[index].checked = !sample[index].checked;
        setCheckboxSelect(sample);
        setdata({ ...data, services: sample });
        setErrors({ ...Errors, services: ValidateServices() })
    }


    const ValidateServices = () => {
        let errors = 'Offered Services Required'
        checkboxSelect.map((key, index) => {
            if (key.checked)
                errors = ''
            return errors
        })
        return errors
    }



    const validation = () => {
        let nameError = Validate('First Name', 'name', data.fullName)
        let name2Error = Validate('Last Name', 'name', data.lastName)
        let phoneError = Validate('Mobile Number', 'mobile', data.phoneNumber)
        let passwordError = Validate('Password', 'password', data.password)
        let checkboxerror = ValidateServices()
        let mobileVerifiedError = Errors.mobileVerified
        if (MobileVerified === data.phoneNumber) {
            mobileVerifiedError = ''
        } else {
            mobileVerifiedError = '\nMobile number not verified.'
        }

        setErrors({
            ...Errors,
            fullName: nameError,
            lastName: name2Error,
            phoneNumber: phoneError,
            password: passwordError,
            services: checkboxerror,
            mobileVerified: mobileVerifiedError
        })
    }



    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);
    const [GeoLocationData, setGeoLocation] = useState();
    const [locationFullDetails, setLocationFullDetails] = useState();


    const getLocationAsync = async () => {
        Geolocation.getCurrentPosition(
            async position => {
                console.log(position)
                setGeoLocation(position)
                fullLocationFecthing(position);
            },
            error => {
                console.log(JSON.stringify(error))
                // alert('Error', JSON.stringify(error))
            },
            { enableHighAccuracy: true, },
        );
    };


    // const [expoToken, setExpoToken] = useState();
    // const [expoTokenLoader, setExpoTokenLoader] = useState(true);

    // const expoTokenStoreData = async () => {
    //     try {
    //         var expoToken = await AsyncStorage.getItem('expoToken');
    //         if (expoToken) setExpoTokenLoader(false);
    //         await setExpoToken(expoToken);
    //     } catch (e) {
    //     }
    // }


    const fullLocationFecthing = (location) => {
        try {
            // fetch('http://apis.mapmyindia.com/advancedmaps/v1/4uqmhizo29sxh1gn25na1o45xdh7agsd/rev_geocode?lat=' + location?.coords.latitude + '&lng=' + location?.coords.longitude)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location?.coords.latitude + ',' + location?.coords.longitude + '&key= AIzaSyDwEsEpAv34XZKcQNuLDDEsN2Ov6Jb0SYw')
                // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=10.561731,76.2435668999999&key= AIzaSyDwEsEpAv34XZKcQNuLDDEsN2Ov6Jb0SYw')
                .then((response) => response.json())
                .then((responseJson) => {
                    let loca = JSON.stringify(responseJson);
                    loca = JSON.parse(loca);
                    setLocationFullDetails(loca?.results);
                });
        } catch (error) {
            showMessage({
                message: error,
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'info',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }






    const OnSubmit = async () => {
        // expoTokenStoreData();
        // getLocationAsync()
        var dist = '';
        if (locationFullDetails?.length > 0) {
            if (locationFullDetails[0].address_components?.length > 0) {

                validation();
                // console.log(locationFullDetails.results[0].address_components[3].long_name);
                // console.log(locationFullDetails);

                let pageFinder = "register";

                locationFullDetails[0].address_components.map((e, i) => {
                    if (e.types[0] == 'administrative_area_level_2') {
                        dist = e.long_name;
                    }
                })


                if ((data.fullName != '' && Errors.fullName === '') &&
                    (data.lastName != '' && Errors.lastName === '') &&
                    (data.phoneNumber != '' && Errors.phoneNumber === '' && Errors.mobileVerified === '') &&
                    (data.services != '' && Errors.services === '') &&
                    (data.password != '' && Errors.password === '')
                ) {
                    if (locationFullDetails.length === 0) {

                        showMessage({
                            message: "Something went wrong , collecting the exact loacation. Please try again",
                            type: "default",
                            floating: true,
                            position: 'bottom',
                            icon: 'info',
                            backgroundColor: "orange",
                            color: '#fff',
                        });

                    } else {
                        let passData = {
                            Id: 0,
                            FirstName: data.fullName,
                            LastName: data.lastName,
                            Mobile: data.phoneNumber,
                            Password: data.password,
                            OfferService: JSON.stringify(data.services),
                            Latitude: GeoLocationData?.coords.latitude,
                            Longitude: GeoLocationData?.coords.longitude,
                            // Token: JSON.parse(expoToken),
                            District: dist,
                            Status: 'Created'
                        }

                        setLoader(true);
                        FetchCalling(passData, setReturnData, setLoader, pageFinder);
                        dist = '';
                    }
                }
            }
            else {
                alert('Turn on location service to allow WedunnService to determine your Current Location.');
            }

        }

    }


    useEffect(() => {
        if (loader == false) {

            if (returnData.Success) {
                showMessage({
                    message: "Account created successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                navigation.navigate('ListDealers', { spid: returnData.Data.Id });

                setCheckboxSelect([])
                setdata({
                    ...data,
                    fullName: '',
                    lastName: '',
                    phoneNumber: '',
                    password: '',
                    services: ''
                })

            } else {

                if (isNaN(returnData.Data.Mobile)) {
                    setErrors({
                        ...Errors,
                        phoneNumber: 'Sorry !!! Mobile number already exists',
                    });
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
        }
    }, [loader])

    const VerifyMobile = () => {
        let phoneError = Validate('Mobile Number', 'mobile', data.phoneNumber)
        setErrors({
            ...Errors,
            phoneNumber: phoneError,
        })
        if (!Boolean(phoneError)) {
            sendOtpfun()
        }

    }

    const [Otp, setOtp] = useState('');
    const [otpErrors, setotpErrors] = useState('');
    const [Counter, SetCounter] = useState(true);
    const [SendOtp, SetSendOtp] = useState(false);
    const [reset, setReset] = useState(false);

    const [otpLoader, setOtpLoader] = useState();
    const [numberData, setNumberData] = useState();


    const sendOtpfun = () => {
        let passData = {
            Mobile: data.phoneNumber
        }
        let pageFinder = "mobileNumberCheck";
        setOtpLoader(true);
        FetchCalling(passData, setNumberData, setOtpLoader, pageFinder)

    }

    useEffect(() => {
        if (otpLoader == false) {
            if (!numberData.Success) {
                setErrors({
                    ...Errors,
                    phoneNumber: 'Account with this number already exists.',
                });
                setReset(false)
            } else {
                SetCounter(true)
                setReset(true);
                otpGenfunc();
            }
        }
    }, [otpLoader]);



    const [otpData, setOtpData] = useState([]);
    const [otpDataLoader, setOtpDataLoader] = useState();


    const otpGenfunc = () => {
        let passData = {
            mobile: data.phoneNumber
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




    return (
        <SafeAreaView style={Typography.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} enableOnAndroid={Platform.OS === 'android'} enableAutomaticScroll={true} >
                <ScrollView contentContainerStyle={Typography.commonWrapper} style={{ position: 'relative' }}>
                    <LoaderOne loader={loader} />
                    <AppTopScreenTheme
                        navigation={navigation}
                        image={require('../../assets/images/beforelogin/login.png')}
                    />
                    <View style={Typography.formContainer}>
                        <Text style={Typography.headingText}>Register for an account</Text>
                        <AppTextInput
                            label='First Name'
                            inputStyle={Typography.sectionStyle}
                            icon={'user'}
                            placeholderText='First Name'
                            value={data.fullName}
                            errorMessage={Errors.fullName}
                            onChangeText={(fullname) => {
                                setdata({ ...data, fullName: fullname })
                                setErrors({ ...Errors, fullName: Validate('First Name', 'name', fullname) })
                            }}
                        />
                        <AppTextInput
                            label='Last Name'
                            inputStyle={Typography.sectionStyle}
                            icon={'user'}
                            placeholderText='Last Name'
                            value={data.lastName}
                            errorMessage={Errors.lastName}
                            onChangeText={(lastName) => {
                                setdata({ ...data, lastName: lastName })
                                setErrors({ ...Errors, lastName: Validate('Last Name', 'name', lastName) })
                            }}
                        />
                        <AppTextInput
                            label='Mobile Number'
                            inputStyle={Typography.sectionStyle}
                            icon={'call_f'}
                            placeholderText='Mobile Number'
                            keyboardType={'numeric'}
                            value={data.phoneNumber}
                            errorMessage={Errors.phoneNumber + Errors.mobileVerified}
                            onChangeText={(phonenumber) => {
                                setdata({ ...data, phoneNumber: phonenumber.trim() })
                                setErrors({ ...Errors, phoneNumber: Validate('Mobile Number', 'mobile', phonenumber.trim()) })
                            }}
                        />
                        <Button
                            title="Verify Mobile Number"
                            type="clear"
                            buttonStyle={styles.verifyBtnStyle}
                            titleStyle={styles.verifyBtnTitle}
                            onPress={() => VerifyMobile()}
                        />
                        {
                            otpLoader &&
                            <LoaderTwo style={{ marginVertical: heightPercentageToDP(3.5) }} />
                        }
                        <ViewModal
                            ModalVisible={reset}
                            setModalVisible={setReset}
                            resendotp={VerifyMobile}
                            setotpErrors={setotpErrors}
                            setOtp={setOtp}
                            otpData={otpData}
                            Otp={Otp}
                            setErrors={setotpErrors}
                            Errors={otpErrors}
                            Counter={Counter}
                            SetCounter={SetCounter}
                            setMobileVerified={setMobileVerified}
                            mobileno={data.phoneNumber}
                        />


                        {
                            serviceLoader ?
                                <LoaderTwo style={{ marginBottom: heightPercentageToDP(2) }} /> :
                                <View>
                                    <Text style={styles.text1}>Offered Services</Text>
                                    <View style={{ marginBottom: heightPercentageToDP(2) }}>
                                        <View style={{ flexDirection: 'row', marginVertical: heightPercentageToDP(.5), flexWrap: 'wrap' }}>
                                            {
                                                checkboxSelect.map((item, index) => {
                                                    return (
                                                        <CheckBox
                                                            key={index}
                                                            textStyle={styles.checkboxLabel}
                                                            containerStyle={styles.checkbox}
                                                            title={item.name}
                                                            checkedColor='red'
                                                            checkedIcon={
                                                                <Icon
                                                                    name='checkedbox'
                                                                    color={Theme.DIM_GRAY}
                                                                    size={normalize(19)}
                                                                    config={icoMoonConfigSet}
                                                                />
                                                            }
                                                            uncheckedIcon={
                                                                <Icon
                                                                    name='checkbox'
                                                                    color={Theme.DIM_GRAY}
                                                                    size={normalize(19)}
                                                                    config={icoMoonConfigSet}
                                                                />
                                                            }
                                                            checked={item.checked}
                                                            onPress={() => checkboxChoose(index)}
                                                        />
                                                    )
                                                })
                                            }
                                        </View>
                                        {Boolean(Errors.services) ?
                                            <Text style={styles.error}>{Errors.services}</Text>
                                            : null}
                                    </View>
                                </View>
                        }

                        <PasswordInput
                            label='Password'
                            secureTextEntry={true}
                            inputStyle={Typography.sectionStyle}
                            icon={'pasword_f'}
                            placeholderText='Password'
                            value={data.password}
                            errorMessage={Errors.password}
                            onChangeText={(password) => {
                                setdata({ ...data, password: password })
                                setErrors({ ...Errors, password: Validate('Password', 'password', password) })
                            }}
                        />
                        <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN }}
                            onPress={() => OnSubmit()} title='Sign Up' />

                        <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
                            Forgot Password?
                    </Text>
                    </View>
                    <View style={Typography.bottomItems}>
                        <Text style={Typography.nmText}>Already a member?</Text>
                        <Text style={Typography.bottomText}
                            onPress={() => navigation.navigate('LogIn')}>Log in</Text>
                    </View>
                </ScrollView>
                {Platform.OS === 'android' && <View style={[Typography.bottomContainer, {
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

export default SignUp;