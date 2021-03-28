import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'
import GlobalStyles from '../../styles/GlobalStyles';

import { AppTextInput } from '../../components/AppTextInput';


import { Validate } from '../../components/validate';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { AddressComponent } from './addressComponent';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';



export const PersonalDetails = forwardRef(function ({ setactiveSection }, ref) {
    var date = new Date();
    const [show, setShow] = useState(false);

    const initialFields = {
        id: '',
        dealerName: '',
        dob: date,
        houseNo: ''
    }
    const initialFieldsError = {
        dealerName: '',
        dob: '',
        houseNo: ''
    }

    const [PersonalData, setPersonalData] = useState(initialFields);
    const [PersonalDataErrors, setPersonalDataErrors] = useState(initialFieldsError);

    const addressFields = {
        city: '',
        district: '',
        state: '',
        pinCode: '',
        streetAddress: ''
    }


    const addressFieldsError = {
        city: '',
        district: '',
        state: '',
        pinCode: '',
        streetAddress: ''
    }

    const [AddressData, setAddressData] = useState(addressFields);
    const [AddressError, setAddressError] = useState(addressFieldsError);



    const setDetails = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
        setPersonalData({
            ...PersonalData,
            id: details?.Id,
            dealerName: details?.NameOfDealer,
            dob: new Date(details?.DateOfBirth),
            houseNo: details?.HouseName,
        })

        setAddressData({
            ...AddressData,
            city: details?.CityTown,
            district: details?.District,
            state: details?.State,
            pinCode: details?.Pincode,
            streetAddress: details?.StreetAddress
        })
    }

    useEffect(() => {
        setDetails();
    }, []);


    const ValidatePersonalDetails = () => {
        let dealerNameerror = Validate('Name of the Dealer', 'isEmpty', PersonalData.dealerName)
        let doberror = Validate('Date of Birth', 'isEmpty', PersonalData.dob)
        let houseNoerror = Validate('House Name / House Number', 'isEmpty', PersonalData.houseNo)

        // Address

        let cityerror = Validate('City / Town', 'isEmpty', AddressData.city)
        let districterror = Validate('District', 'isEmpty', AddressData.district)
        let stateerror = Validate('State', 'isEmpty', AddressData.state)
        let pinCodeerror = Validate('Pin Code', 'isEmpty', AddressData.pinCode)
        let streetAddresserror = Validate('Street Address', 'isEmpty', AddressData.streetAddress)

        setPersonalDataErrors({
            ...PersonalDataErrors,
            dealerName: dealerNameerror,
            dob: doberror,
            houseNo: houseNoerror
        })

        setAddressError({
            ...AddressError,
            city: cityerror,
            district: districterror,
            state: stateerror,
            pinCode: pinCodeerror,
            streetAddress: streetAddresserror
        })
        // setTimeout(Submit(),3000)
        if (dealerNameerror === '' && doberror === ''
            && houseNoerror === '' && cityerror === '' && districterror === '' &&
            stateerror === '' && pinCodeerror === '' && streetAddresserror === '')
            return false
        else
            return true

    }



    const getData = () => {

        let data = {
            Id: PersonalData.id,
            NameOfDealer: PersonalData.dealerName,
            DateOfBirth: PersonalData.dob,
            HouseName: PersonalData.houseNo,
            CityTown: AddressData.city,
            District: AddressData.district,
            State: AddressData.state,
            Pincode: AddressData.pinCode,
            StreetAddress: AddressData.streetAddress

        }
        return data;
    }
    useImperativeHandle(ref, () => {
        return {
            Validate: ValidatePersonalDetails,
            // ClearFields: ClearFields,
            PersonalData: getData,
        };
    });

    const onChangeDOB = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setPersonalData({ ...PersonalData, dob: currentDate })
    };

    const showDatepicker = () => {
        setShow(true);
    };



    return (

        <View style={[styles.collapseContainerStyle, { paddingBottom: heightPercentageToDP(2) }]}>
            <AppTextInput
                label='Name of the Service Provider'
                inputStyle={GlobalStyles.commonPaddingV}
                icon={'user'}
                placeholderText='Name of the service provider'
                value={PersonalData.dealerName}
                errorMessage={PersonalDataErrors.dealerName}
                onChangeText={(name) => {
                    setPersonalData({ ...PersonalData, dealerName: name })
                    setPersonalDataErrors({ ...PersonalDataErrors, dealerName: Validate('Name of the Dealer', 'isEmpty', name) })
                }}

            />
            <View style={{ marginBottom: heightPercentageToDP(2) }}>
                <Text style={[styles.label]}>Date of Birth</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, marginHorizontal: widthPercentageToDP(1) }}
                >
                    <Text style={[styles.dobText, { alignSelf: 'center' }]}>
                        Month
                        </Text>
                    <Text style={[styles.dobText, { alignSelf: 'center' }]}>
                        Day
                        </Text>
                    <Text style={[styles.dobText, { alignSelf: 'center' }]}>
                        Year
                        </Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >

                    <TouchableOpacity style={styles.dobInput} onPress={showDatepicker}>
                        <Text style={styles.dobText}>
                            {moment(PersonalData.dob).format('MM')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dobInput} onPress={showDatepicker}>
                        <Text style={styles.dobText}>
                            {moment(PersonalData.dob).format('DD')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dobInput} onPress={showDatepicker}>
                        <Text style={styles.dobText}>
                            {moment(PersonalData.dob).format('YYYY')}
                        </Text>
                    </TouchableOpacity>

                </View>


                {Boolean(PersonalDataErrors.dob) ?
                    <Text style={styles.error}>{PersonalDataErrors.dob}</Text>
                    : null}
                {show && (
                    <View >
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={PersonalData.dob}
                            mode={'date'}
                            is24Hour={true}
                            display="spinner"
                            onChange={onChangeDOB}
                        />
                    </View>
                )}
            </View>
            <AppTextInput
                label='House Name / House Number'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                placeholderText='House Name / House Number'
                value={PersonalData.houseNo}
                errorMessage={PersonalDataErrors.houseNo}
                onChangeText={(houseNo) => {
                    setPersonalData({ ...PersonalData, houseNo: houseNo })
                    setPersonalDataErrors({ ...PersonalDataErrors, houseNo: Validate('House Name / House Number', 'isEmpty', houseNo) })
                }}

            />
            <Text style={[styles.label, { fontFamily: 'Roboto-Bold' }]}>Full Residential Address</Text>
            <AddressComponent Address={AddressData}
                setAddress={setAddressData}
                error={AddressError}
                setError={setAddressError}
            />

        </View >
    )
})

