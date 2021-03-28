import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Picker
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Theme from '../../styles/Theme'
import styles from './styles'
import GlobalStyles from '../../styles/GlobalStyles';

import { CheckBox, Button } from 'react-native-elements';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import { AppTextInput } from '../../components/AppTextInput';


import { Validate } from '../../components/validate';



// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';

import { showMessage } from "react-native-flash-message";


import { AddressComponent } from './addressComponent';

import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import { FetchCalling, baseURL, FileUploadService, FileDeleteService } from '../../routes/APICalls';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
import { CustomPicker } from './customPicker'
import ViewModal from '../../components/SendOTP';

export const GeneralDetails = forwardRef(function ({ setactiveSection }, ref) {
    const [serviceLoader, setServiceLoader] = useState();
    const [serviceReturn, setServiceReturn] = useState([]);
    const [Category, setCategory] = useState([]);
    const [ifEmailadded, setifEmail] = useState();
    const bussinessDays = ['7', '6', '5']
    const bussinessTimes = ['8AM - 8PM', '8AM - 7PM', '8AM - 6PM', '9AM - 8PM', '9AM - 7PM', '9AM - 6PM', '10AM - 8PM', '10AM - 7PM', '10AM - 6PM']

    const [MobileVerified, setMobileVerified] = useState();
    const [oldMobileNo, setoldMobileNo] = useState();


    // const collectService = () => {
    //     setServiceLoader(true);
    //     let passData = {
    //         PageIndex: 0,
    //         PageSize: 50
    //     };
    //     let pageFinder = "getService"
    //     FetchCalling(passData, setServiceReturn, setServiceLoader, pageFinder);
    // }


    const setGenenralDetails = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));

        setGeneralData({
            ...GeneralData,
            fullName: details?.FirstName,
            lastName: details?.LastName,
            id_cardcopy: details?.IdCardCopy,
            id_cardno: details?.IdCardNo,
            phoneNumber: details?.Mobile,
            email: details?.Email,
            BusinessTime: details?.BusinessTime,
            BusinessDays: details?.BusinessDays,
        })
        setifEmail(Boolean(details?.Email))
        let services = JSON.parse(details?.OfferService);
        setCategory(services)
        setoldMobileNo(details?.Mobile)
        setMobileVerified(details?.Mobile)
    }
    useEffect(() => {
        // collectService();
        getPermissionAsync();
        setGenenralDetails();
        return () => {
            setServiceLoader()
        }

    }, []);



    // useEffect(() => {
    //     if (serviceLoader == false) {
    //         let sample = [];
    //         serviceReturn.Data.map((e, i) => {
    //             sample.push({
    //                 checked: false,
    //                 name: e.ServiceName,
    //             });
    //             // setCategory(sample);
    //         });
    //         setServices(sample)
    //     }
    // }, [serviceLoader])




    const initialFields = {
        fullName: '',
        LastName: '',
        id_cardcopy: null,
        id_cardno: '',
        phoneNumber: '',
        email: '',
        BusinessTime: '',
        BusinessDays: '',
    }

    const [GeneralData, setGeneralData] = useState(initialFields);

    const initialFieldsError = {
        fullName: '',
        LastName: '',
        id_cardcopy: '',
        id_cardno: '',
        phoneNumber: '',
        email: '',
        categories: '',
        BusinessTime: '',
        BusinessDays: '',
        mobileVerified: ''
    }
    const [GeneralDataErrors, setGeneralDataErrors] = useState(initialFieldsError);

    // const initialAddressFields = {
    //     city: '',
    //     district: '',
    //     state: '',
    //     pinCode: '',
    //     streetAddress: ''
    // }

    // const [AddressData, setAddressData] = useState(initialAddressFields);

    // const initialAddressFieldsError = {
    //     city: '',
    //     district: '',
    //     state: '',
    //     pinCode: '',
    //     streetAddress: ''
    // }


    // const [AddressError, setAddressError] = useState(initialAddressFieldsError);


    const ValidateCategories = () => {
        let errors = 'Offered Products Required'
        Category.map((key, index) => {
            if (key.checked)
                errors = ''
            return errors
        })
        return errors
    }

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };



    const updateCategory = (index) => {
        let sample = [...Category];
        sample[index].checked = !sample[index].checked;
        setCategory(sample)
        setGeneralDataErrors({ ...GeneralDataErrors, categories: ValidateCategories() })

    }

    const ValidateGeneral = () => {
        let fullNameError = Validate('First Name', 'name', GeneralData.fullName)
        let lastNameError = Validate('Last Name', 'name', GeneralData.lastName)
        let id_cardcopyError = Validate('ID Card Copy', 'isEmpty', GeneralData.id_cardcopy)
        let id_cardnoError = Validate('ID Number', 'isEmpty', GeneralData.id_cardno)
        let phoneNumberError = Validate('Phone Number', 'mobile', GeneralData.phoneNumber)
        let emailError = Validate('Email ID', 'email', GeneralData.email)
        let AvilableDatesError = Validate('Service Days', 'isEmpty', GeneralData.BusinessDays)
        let AvilableSlotsError = Validate('Service Time', 'isEmpty', GeneralData.BusinessTime)

        let categoriesError = ValidateCategories()
        let mobileVerifiedError = GeneralDataErrors.mobileVerified
        if (MobileVerified === GeneralData.phoneNumber) {
            mobileVerifiedError = ''
        } else {
            mobileVerifiedError = '\nMobile number not verified.'
        }
        // let cityerror = Validate('City / Town', 'isEmpty', AddressData.city)
        // let districterror = Validate('District', 'isEmpty', AddressData.district)
        // let stateerror = Validate('State', 'isEmpty', AddressData.state)
        // let pinCodeerror = Validate('Pin Code', 'isEmpty', AddressData.pinCode)
        // let streetAddresserror = Validate('Street Address', 'isEmpty', AddressData.streetAddress)

        setGeneralDataErrors({
            ...GeneralDataErrors,
            fullName: fullNameError,
            lastName: lastNameError,
            id_cardcopy: id_cardcopyError ? 'ID Card Copy is not Attatched.' : null,
            id_cardno: id_cardnoError,
            phoneNumber: phoneNumberError,
            email: emailError,
            categories: categoriesError,
            BusinessDays: AvilableDatesError,
            BusinessTime: AvilableSlotsError,
            mobileVerified: mobileVerifiedError
        })
        // setAddressError({
        //     ...AddressError,
        //     city: cityerror,
        //     district: districterror,
        //     state: stateerror,
        //     pinCode: pinCodeerror,
        //     streetAddress: streetAddresserror,
        // })
        if (fullNameError === '' && lastNameError === '' &&
            id_cardcopyError === '' &&
            phoneNumberError === '' && mobileVerifiedError === '' &&
            emailError === '' &&
            AvilableDatesError === ''
            && AvilableSlotsError === ''
            //  &&
            // cityerror === '' && districterror === '' &&
            // stateerror === '' && pinCodeerror === '' && streetAddresserror === ''
            && categoriesError === '') {
            if (!ifEmailadded) {
                let passData = {
                    Email: GeneralData.email
                }
                let pageFinder = "emailcheck";
                SetEmailLoader(true);
                FetchCalling(passData, SetEmailCheckReturn, SetEmailLoader, pageFinder)
            }
            return false
        }
        else
            return true

    }

    const [returnData1, setReturnData1] = useState([]);
    const [uploadLoader, setUploadLoader] = useState();
    const [deleteData, setdeleteData] = useState([]);
    const [deleteLoader, setdeleteLoader] = useState();
    const [idcardUploader, setidcardUploader] = useState();
    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setidcardUploader(true)
                await _removeImage()
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                const formData = new FormData();
                let fileType = result.uri.substring(result.uri.lastIndexOf(".") + 1);
                formData.append('file', {
                    uri: Platform.OS === "android" ? result.uri : result.uri.replace("file://", ""),
                    type: `image/${fileType}`,
                    name: `IDcardCopy${details.Id}.${fileType}`
                });
                // console.log(formData)
                setUploadLoader(true)
                await FileUploadService(formData, setReturnData1, setUploadLoader)
            }

        } catch (E) {
        }
    };


    useEffect(() => {
        if (uploadLoader === false) {
            if (returnData1.Success) {
                setGeneralData({ ...GeneralData, id_cardcopy: baseURL + returnData1.Data });
                let error = returnData1.Data ? null : 'ID Card is Not Attatched.'
                setGeneralDataErrors({ ...GeneralDataErrors, id_cardcopy: error })
                setidcardUploader(false)
            }
        }
    }, [uploadLoader]);

    const _removeImage = async () => {
        if (GeneralData.id_cardcopy != null) {
            var raw = JSON.stringify({ "OldName": GeneralData.id_cardcopy.replace(baseURL, "") });
            await FileDeleteService(raw, setdeleteData, setdeleteLoader)
        }
    }
    useEffect(() => {
        if (deleteLoader === false) {
            if (deleteData.Success) {
                setGeneralData({ ...GeneralData, id_cardcopy: null });
            }
        }
    }, [deleteLoader]);



    const getData = () => {
        let data = {
            FirstName: GeneralData.fullName,
            LastName: GeneralData.lastName,
            IdCardCopy: GeneralData.id_cardcopy,
            IdCardNo: GeneralData.id_cardno,
            Mobile: GeneralData.phoneNumber,
            Email: GeneralData.email,
            BusinessTime: GeneralData.BusinessTime,
            BusinessDays: GeneralData.BusinessDays,
            OfferService: JSON.stringify(Category)
        }
        return data;
    }

    // const ClearFields = () => {
    //     setGeneralData({ ...GeneralData, initialAddressFields });
    //     setGeneralDataErrors({ ...GeneralDataErrors, initialAddressFieldsError });
    //     // setAddressData({ ...AddressData, initialAddressFields });
    //     // setAddressError({ ...AddressError, initialAddressFieldsError });
    // }
    const [EmailLoader, SetEmailLoader] = useState();
    const [EmailCheckReturn, SetEmailCheckReturn] = useState();

    useEffect(() => {
        if (EmailLoader == false) {
            if (!EmailCheckReturn.Success) {
                if (isNaN(EmailCheckReturn.Data.Email)) {
                    setGeneralDataErrors({
                        ...GeneralDataErrors,
                        email: 'Sorry !!! Email Id already exists',
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
    }, [EmailLoader]);


    const onClickNext = () => {
        // console.log(Category)
        const errors = ValidateGeneral();
        if (!errors) {
            setactiveSection([1])
        }
        else {
            showMessage({
                message: "Error! Please Check the General Details",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }

    useImperativeHandle(ref, () => {
        return {
            ValidateGeneral: ValidateGeneral,
            // ClearFields: ClearFields,
            GeneralData: getData,
        };
    });


    const VerifyMobile = () => {
        let phoneError = Validate('Mobile Number', 'mobile', GeneralData.phoneNumber)
        setGeneralDataErrors({ ...GeneralDataErrors, phoneNumber: phoneError })
        // setErrors({
        //     ...Errors,
        //     phoneNumber: phoneError,
        // })
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
            Mobile: GeneralData.phoneNumber
        }
        let pageFinder = "mobileNumberCheck";
        setOtpLoader(true);
        FetchCalling(passData, setNumberData, setOtpLoader, pageFinder)

    }

    useEffect(() => {
        if (otpLoader == false) {
            if (!numberData.Success) {
                setGeneralDataErrors({ ...GeneralDataErrors, phoneNumber: 'Account with this number already exists.' })
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
            mobile: GeneralData.phoneNumber
        }
        let pageFinder = "OTPgen";
        setOtpDataLoader(true);
        FetchCalling(passData, setOtpData, setOtpDataLoader, pageFinder);
    }



    return (

        <View style={[styles.collapseContainerStyle, GlobalStyles.commonPaddingV]}>

            <View style={{ marginBottom: heightPercentageToDP(2) }}>
                <Text style={[styles.label]}>Offered Products</Text>
                {
                    serviceLoader ?

                        <LoaderTwo style={{ marginBottom: heightPercentageToDP(2) }} /> :
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                {Category.map((item, index) => {
                                    return (
                                        <CheckBox
                                            key={index}
                                            textStyle={styles.checkboxLabel}
                                            containerStyle={styles.checkbox}
                                            checkedIcon={
                                                <Icon
                                                    name={'checkedbox'}
                                                    color={'#C9C9C9'}
                                                    size={normalize(18)}
                                                    config={icoMoonConfigSet}
                                                />
                                            }
                                            uncheckedIcon={
                                                <Icon
                                                    name={'checkbox'}
                                                    color={'#C9C9C9'}
                                                    size={normalize(18)}
                                                    config={icoMoonConfigSet}
                                                />
                                            }
                                            title={item.name}
                                            checkedColor={Theme.BLUE}
                                            checked={item.checked}
                                            onPress={() => updateCategory(index)}
                                        />

                                    )
                                })}
                            </View>

                            {Boolean(GeneralDataErrors.categories) ?
                                <Text style={styles.error}>{GeneralDataErrors.categories}</Text>
                                : null}
                        </View>}
            </View>
            <AppTextInput
                label='First Name'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'user'}
                placeholderText='First Name'
                value={GeneralData.fullName}
                errorMessage={GeneralDataErrors.fullName}
                onChangeText={(fullname) => {
                    setGeneralData({ ...GeneralData, fullName: fullname })
                    setGeneralDataErrors({ ...GeneralDataErrors, fullName: Validate('First Name', 'name', fullname) })
                }}

            />
            <AppTextInput
                label='Last Name'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'user'}
                placeholderText='Last Name'
                value={GeneralData.lastName}
                errorMessage={GeneralDataErrors.lastName}
                onChangeText={(lastName) => {
                    setGeneralData({ ...GeneralData, lastName: lastName })
                    setGeneralDataErrors({ ...GeneralDataErrors, lastName: Validate('Last Name', 'name', lastName) })
                }}

            />
            <View>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '75%', }}>
                        <AppTextInput
                            label='Attach ID Card copy'
                            required={true}
                            inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                            icon={'wallet_menu'}
                            placeholderText='ID Number'
                            value={GeneralData.id_cardno}
                            onChangeText={(idcard) => {
                                setGeneralData({ ...GeneralData, id_cardno: idcard })
                                setGeneralDataErrors({ ...GeneralDataErrors, id_cardno: Validate('ID Number', 'isEmpty', GeneralData.id_cardno) })
                            }}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '8%' }}>
                        <Text style={[styles.label]}></Text>
                        {/* <Text style={{ color: Theme.DARK_RED }}>*</Text> */}
                        <Button
                            title='Attatch'
                            type='outline'
                            // onPress={() => _pickImage()}
                            buttonStyle={[styles.attatchButton,]}
                            titleStyle={styles.nextTitleStyle}
                        />
                    </View>
                </View>
                {Boolean(GeneralData.id_cardcopy) &&
                    <Image source={{ uri: GeneralData.id_cardcopy }}
                        style={{ width: widthPercentageToDP(5), height: widthPercentageToDP(5), alignSelf: 'flex-end' }} />}
                {Boolean(GeneralDataErrors.id_cardno) &&
                    <Text style={styles.error}>{GeneralDataErrors.id_cardno}</Text>
                }
                {Boolean(GeneralDataErrors.id_cardcopy) &&
                    <Text style={styles.error}>{GeneralDataErrors.id_cardcopy}</Text>
                }

            </View>
            <AppTextInput
                label='Phone Number'
                // editable={false}
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'call_f'}
                placeholderText='Phone Number'
                keyboardType={'numeric'}
                value={GeneralData.phoneNumber}
                errorMessage={GeneralDataErrors.phoneNumber + GeneralDataErrors.mobileVerified}
                onChangeText={(phonenumber) => {
                    setGeneralData({ ...GeneralData, phoneNumber: phonenumber })
                    setGeneralDataErrors({ ...GeneralDataErrors, phoneNumber: Validate('Phone Number', 'mobile', phonenumber) })
                }}
            />

            {oldMobileNo !== GeneralData.phoneNumber && <Button
                title="Verify Mobile Number"
                type="clear"
                buttonStyle={styles.verifyBtnStyle}
                titleStyle={styles.verifyBtnTitle}
                onPress={() => VerifyMobile()}
            />}
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
                mobileno={GeneralData.phoneNumber}
            />


            {
                EmailLoader ?

                    <LoaderTwo style={{ marginBottom: heightPercentageToDP(2) }} /> :
                    <AppTextInput
                        label='Email'
                        // editable={Boolean(!ifEmailadded)}
                        inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                        icon={'mail'}
                        placeholderText='Email'
                        keyboardType={'email-address'}
                        value={GeneralData.email}
                        errorMessage={GeneralDataErrors.email}
                        onChangeText={(email) => {
                            setGeneralData({ ...GeneralData, email: email })
                            setGeneralDataErrors({ ...GeneralDataErrors, email: Validate('Email', 'email', email) })
                        }}

                    />}


            <CustomPicker
                label='Service Days'
                onchange={(itemValue, itemIndex) => {
                    setGeneralData({ ...GeneralData, BusinessDays: itemValue })
                    setGeneralDataErrors({ ...GeneralDataErrors, BusinessDays: Validate('Service Days', 'isEmpty', itemValue) })
                }}
                value={GeneralData.BusinessDays}
                icon='calender_1'
                errorMessage={GeneralDataErrors.BusinessDays}

                Iositems={bussinessDays}

                pickerItems={

                    bussinessDays.map((item, index) => {
                        return (
                            <Picker.Item
                                label={item}
                                value={item}
                                key={index}
                            />
                        )
                    })
                } />



            <CustomPicker
                label='Service Time'
                onchange={(itemValue, itemIndex) => {
                    setGeneralData({ ...GeneralData, BusinessTime: itemValue })
                    setGeneralDataErrors({ ...GeneralDataErrors, BusinessTime: Validate('Service Time', 'isEmpty', itemValue) })
                }}
                value={GeneralData.BusinessTime}
                icon='calender_1'
                errorMessage={GeneralDataErrors.BusinessTime}
                Iositems={bussinessTimes}
                pickerItems={
                    bussinessTimes.map((item, index) => {
                        return (
                            <Picker.Item
                                label={item}
                                value={item}
                                key={index}
                            />
                        )
                    })
                } />


            <Button
                title='Next'
                type='outline'
                onPress={() => {
                    onClickNext()
                }}
                buttonStyle={styles.nextButtonStyle}
                titleStyle={styles.nextTitleStyle}
            />

        </View>


    )
})



