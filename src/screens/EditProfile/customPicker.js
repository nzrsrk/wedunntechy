import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    View,
    Text,
    Picker,
    Platform,
} from 'react-native';

import Theme from '../../styles/Theme'
import styles from './styles'


import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from 'react-native-vector-icons';

import { normalize as Normalize } from '../../components/Normalize';

import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';

export const CustomPicker = (props) => {
    const { label, onchange, value, icon, pickerItems, errorMessage, Iositems } = props;

    return (
        <View style={{ marginBottom: heightPercentageToDP(2.5) }}>
            <Text style={[styles.label]}>{label}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.pickerIcon}>
                    <Icon
                        name={icon}
                        color={Theme.GREEN}
                        size={Normalize(14)}
                        config={icoMoonConfigSet}
                    />
                </View>
                <View style={styles.Pickerstyle}>
                    {Platform.OS === 'android' ?

                        <Picker
                            mode={'dialog'}
                            selectedValue={value}
                            style={{
                                width: '100%', color: '#BEB4B4', transform: [
                                    // { scaleX: .9 },
                                    { scaleY: .9 },
                                ]
                            }}
                            onValueChange={onchange}
                        >
                            <Picker.Item
                                label={'--------- Select ---------'}
                                value={'--------- Select ---------'}
                            />
                            {pickerItems}
                        </Picker> : <RNPickerSelect
                            items={
                                // console.log(Iositems)
                                Iositems?.map((item, index) => (
                                    { key: index, label: item, value: item }
                                ))
                            }

                            placeholder={{ label: '<--------- Select --------->', value: '' }}
                            value={value}
                            onValueChange={onchange}
                            style={{
                                inputIOSContainer: {
                                    marginLeft: heightPercentageToDP(1.5)
                                },

                                inputIOS: {
                                    height: heightPercentageToDP(4),

                                    // ...styles.pickerWrapper
                                },
                                iconContainer: {
                                    top: '30%',
                                    right: heightPercentageToDP(1.2),
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{ underlineColor: 'yellow' }}
                            Icon={() => {
                                return <AntDesign name="caretdown" size={Normalize(14)} color="gray" />;
                            }}
                        />
                    }
                </View>
            </View>
            {Boolean(errorMessage) ?
                <Text style={styles.error}>{errorMessage}</Text>
                : null}
        </View>
    )
}


