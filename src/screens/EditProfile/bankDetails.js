import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'
import GlobalStyles from '../../styles/GlobalStyles';

import { CheckBox, Button } from 'react-native-elements';

import { AppTextInput } from '../../components/AppTextInput';


import { Validate } from '../../components/validate';


import { showMessage } from "react-native-flash-message";

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';


import { CustomTextArea } from './TextArea';



export const BankDetails = forwardRef(function ({ setactiveSection }, ref) {


    const initialFields = {
        bankName: '',
        organizationName: '',
        branchAddress: '',
        MICRCode: '',
        accountNo: '',
        ifscCode: '',
        city: ''
    }

    const initialFieldsError = {
        bankName: '',
        organizationName: '',
        branchAddress: '',
        MICRCode: '',
        accountNo: '',
        ifscCode: '',
        city: ''

    }
    const [BankData, setBankData] = useState(initialFields);
    const [BankDataErrors, setBankDataErrors] = useState(initialFieldsError);

    const setBankDetails = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));

        setBankData({
            ...BankData,
            bankName: details?.NameOfBanker,
            organizationName: details?.NameOfOrg,
            branchAddress: details?.BranchName,
            MICRCode: details?.MICRCode,
            accountNo: details?.BankAccountNo,
            ifscCode: details?.IFSCCode,
            city: details?.City,
        })
    }

    useEffect(() => {
        setBankDetails();
    }, []);

    const ValidateBank = () => {
        let bankNameError = Validate('Bank Name', 'name', BankData.bankName)
        let organizationNameError = Validate('Organization Name', 'name', BankData.organizationName)
        let branchAddressError = Validate('Branch name', 'isEmpty', BankData.branchAddress)
        let MICRCodeError = Validate('MICR Code', 'micrcode', BankData.MICRCode)
        let accountNoError = Validate('Account No', 'accountNo', BankData.accountNo)
        let ifscCodeError = Validate('IFSC Code', 'ifsc', BankData.ifscCode)
        let cityError = Validate('City', 'isEmpty', BankData.city)
        setBankDataErrors({
            ...BankDataErrors,
            bankName: bankNameError,
            organizationName: organizationNameError,
            branchAddress: branchAddressError,
            MICRCode: MICRCodeError,
            accountNo: accountNoError,
            ifscCode: ifscCodeError,
            city: cityError

        })
        // setTimeout(Submit(),3000)
        if (bankNameError === '' &&
            organizationNameError === '' && branchAddressError === '' &&
            MICRCodeError === '' && accountNoError === ''
            && ifscCodeError === '' && cityError === '')
            return false
        // setactiveSection([2])
        else
            return true
        // Alert.alert('Error! Please Check the form');

    }
    const onClickNext = () => {
        const errors = ValidateBank();
        if (!errors)
            setactiveSection([2])
        else
            showMessage({
                message: "Error! Please Check the Bank Details",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
    }
    // const ClearFields = () => {
    //     setBankData({ ...BankData, initialFields });
    //     setBankDataErrors({ ...BankDataErrors, initialFieldsError });
    //     // setAddressData({ ...AddressData, initialAddressFields });
    //     // setAddressError({ ...AddressError, initialAddressFieldsError });
    // }
    const getData = () => {
        let data = {
            NameOfBanker: BankData.bankName,
            NameOfOrg: BankData.organizationName,
            BranchName: BankData.branchAddress,
            MICRCode: BankData.MICRCode,
            BankAccountNo: BankData.accountNo,
            IFSCCode: BankData.ifscCode,
            City: BankData.city,

        }
        return data;
    }

    useImperativeHandle(ref, () => {
        return {
            ValidateBank: ValidateBank,
            // ClearFields: ClearFields,
            BankData: getData,
        };
    });
    return (

        <View style={[styles.collapseContainerStyle, { paddingBottom: heightPercentageToDP(2) }]}>

            <AppTextInput
                label='Name of your Banker'
                inputStyle={GlobalStyles.commonPaddingV}
                icon={'shop_t'}
                placeholderText='Bank Name'
                value={BankData.bankName}
                errorMessage={BankDataErrors.bankName}
                onChangeText={(bankname) => {
                    setBankData({ ...BankData, bankName: bankname })
                    setBankDataErrors({ ...BankDataErrors, bankName: Validate('Bank Name', 'name', bankname) })
                }}

            />
            <CustomTextArea
                label={'Name of the Organization as per Bank Records'}
                placeholderText='Enter Name of the Organization'
                onChangeText={(organization) => {
                    setBankData({ ...BankData, organizationName: organization })
                    setBankDataErrors({ ...BankDataErrors, organizationName: Validate('Organization Name', 'name', organization) })
                }}
                value={BankData.organizationName}
            />

            <CustomTextArea
                label={'Branch Name'}
                placeholderText='Enter Branch name'
                onChangeText={(branch) => {
                    setBankData({ ...BankData, branchAddress: branch })
                    setBankDataErrors({ ...BankDataErrors, branchAddress: Validate('Branch name', 'isEmpty', branch) })
                }}
                value={BankData.branchAddress}
            />

            <CustomTextArea
                label={'City'}
                placeholderText='Enter City'
                onChangeText={(city) => {
                    setBankData({ ...BankData, city: city })
                    setBankDataErrors({ ...BankDataErrors, city: Validate('City', 'isEmpty', city) })
                }}
                value={BankData.city}
            />

            <AppTextInput
                label='MICR Code'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'pasword_f'}
                placeholderText='MICR Code'
                value={BankData.MICRCode}
                errorMessage={BankDataErrors.MICRCode}
                onChangeText={(micrCode) => {
                    setBankData({ ...BankData, MICRCode: micrCode })
                    setBankDataErrors({ ...BankDataErrors, MICRCode: Validate('MICR Code', 'micrcode', micrCode) })
                }}

            />
            <AppTextInput
                label='Bank Account No'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'pasword_f'}
                placeholderText='Account No'
                value={BankData.accountNo}
                errorMessage={BankDataErrors.accountNo}
                onChangeText={(accountNo) => {
                    setBankData({ ...BankData, accountNo: accountNo })
                    setBankDataErrors({ ...BankDataErrors, accountNo: Validate('Account No', 'accountNo', accountNo) })
                }}

            />
            <AppTextInput
                label='IFSC Code'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'pasword_f'}
                placeholderText='IFSC Code'
                value={BankData.ifscCode}
                errorMessage={BankDataErrors.ifscCode}
                onChangeText={(ifscCode) => {
                    setBankData({ ...BankData, ifscCode: ifscCode })
                    setBankDataErrors({ ...BankDataErrors, ifscCode: Validate('IFSC Code', 'ifsc', ifscCode) })
                }}

            />
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
