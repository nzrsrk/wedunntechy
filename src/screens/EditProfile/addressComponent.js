import React from 'react';
import {
    View,
    Picker,
} from 'react-native';


import { AppTextInput } from '../../components/AppTextInput';


import { Validate } from '../../components/validate';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';


export const AddressComponent = ({ Address, setAddress, error, setError, streetAddressLabel }) => {

    return (
        <View>

            <AppTextInput
                label='Street Address'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                placeholderText={'Street Address'}
                value={Address.streetAddress}
                errorMessage={error.streetAddress}
                onChangeText={(streetAddress) => {
                    setAddress({ ...Address, streetAddress: streetAddress })
                    setError({ ...error, streetAddress: Validate('Street Address', 'isEmpty', streetAddress) })
                }}

            />

            <AppTextInput
                label='City / Town'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                placeholderText='City / Town'
                value={Address.city}
                errorMessage={error.city}
                onChangeText={(city) => {
                    setAddress({ ...Address, city: city })
                    setError({ ...error, city: Validate('City / Town', 'isEmpty', city) })
                }}

            />



            <AppTextInput
                label='District'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                placeholderText='District'
                value={Address.district}
                errorMessage={error.district}
                onChangeText={(district) => {
                    setAddress({ ...Address, district: district })
                    setError({ ...error, district: Validate('State', 'isEmpty', district) })
                }}

            />

            <AppTextInput
                label='State'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                placeholderText='State'
                value={Address.state}
                errorMessage={error.state}
                onChangeText={(state) => {
                    setAddress({ ...Address, state: state })
                    setError({ ...error, state: Validate('State', 'isEmpty', state) })
                }}

            />

            <AppTextInput
                label='Pin Code'
                inputStyle={{ marginBottom: heightPercentageToDP(2) }}
                icon={'location'}
                keyboardType={'numeric'}
                placeholderText='Pin Code'
                value={Address.pinCode}
                errorMessage={error.pinCode}
                onChangeText={(pinCode) => {
                    setAddress({ ...Address, pinCode: pinCode })
                    setError({ ...error, pinCode: Validate('Pin Code', 'isEmpty', pinCode) })
                }}

            />
        </View>
    )
}