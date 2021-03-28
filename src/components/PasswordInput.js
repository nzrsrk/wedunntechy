import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../styles/Theme';
import { Icon, icoMoonConfigSet } from '../styles/Icons';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from './Normalize'

// import and use as below for Text Input

// {/* <AppTextInput label='Mylabel' icon={<myIcon/>} placeholderText='placeholder' onChangeText={funct()}/> */ }


export const PasswordInput = (props) => {
    const [focus, setfocus] = useState(false);

    const { inputStyle,
        label,
        icon,
        placeholderText,
        onChangeText,
        value,
        errorMessage,
        keyboardType,
        maxLength,
        editable,
        required } = props;

    const [showPassword, setShowPassword] = useState(true);


    const togglePasswordView = () => {
        setShowPassword(!showPassword)
    }

    function InputIcon(name) {
        return (
            <Icon
                name={name}
                color={Theme.GREEN}
                size={normalize(14)}
                config={icoMoonConfigSet}
            />
        )
    }

    return (
        <View style={{ ...inputStyle, marginBottom: heightPercentageToDP(2) }}>
            <View style={{ flexDirection: 'row' }}>
                {Boolean(label) ?
                    <Text style={[styles.label, focus ? { color: Theme.GREEN } : { color: 'black' }]}>{label}</Text> : null}
                {Boolean(required) ?
                    <Text style={[styles.label, { color: "#cb4154" }]}>*</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconCotainer}>
                    {InputIcon(icon)}
                </View>
                <TextInput style={[styles.input,]}
                    editable={editable}
                    keyboardType={keyboardType}
                    secureTextEntry={showPassword}
                    placeholder={placeholderText}
                    onChangeText={onChangeText}
                    value={value}
                    maxLength={maxLength}
                    placeholderTextColor={'#8D8D8D'}
                    onFocus={() => setfocus(true)}
                    onBlur={() => setfocus(false)}
                >
                </TextInput>
                <View style={styles.passwordHide}>
                    <TouchableOpacity onPress={() => togglePasswordView()}>
                        <Icon
                            name={showPassword ? 'hide' : 'eye'}
                            color={Theme.DARK_GRAY}
                            size={normalize(14)}
                            config={icoMoonConfigSet}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {Boolean(errorMessage) ?
                <Text style={styles.error}>{errorMessage}</Text>
                : null}
        </View>
    )
}



const styles = StyleSheet.create({
    label: {
        color: '#4B4B4B',
        // fontWeight: 'bold',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: "Roboto-Regular",
        marginTop: 0,
        marginBottom: heightPercentageToDP(1),

    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginTop: heightPercentageToDP(.3),
    },

    inputContainer: {
        flexDirection: 'row',
        marginBottom: heightPercentageToDP(.5)
    },

    inputIconCotainer: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: heightPercentageToDP(4),
        // marginTop: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(4),
        width: '60%',
        padding: 0,
        // marginTop: 10,
        paddingLeft: heightPercentageToDP(2),
        fontSize: Theme.FONT_SIZE_SMALL
    },

    passwordHide: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: heightPercentageToDP(4),
        // marginTop: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
})