import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import styles from './styles';
import Theme from '../../styles/Theme';
// import and use as below for Text Input

// {/* <AppTextInput label='Mylabel' icon={<myIcon/>} placeholderText='placeholder' onChangeText={funct()}/> */ }


export const CustomTextArea = (props) => {
    const [focus, setfocus] = useState(false);
    const { inputStyle,
        secureTextEntry,
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

    return (
        <View style={{ marginBottom: heightPercentageToDP(3) }}>
            <Text style={[styles.label, focus && { color: Theme.GREEN }]}>{label}</Text>
            <TextInput
                style={styles.textArea}
                placeholder={placeholderText}
                onChangeText={onChangeText}
                value={value}
                onFocus={() => setfocus(true)}
                onBlur={() => setfocus(false)}
            />
            {Boolean(errorMessage) ?
                <Text style={styles.error}>{errorMessage}</Text>
                : null}
        </View>
    )
}



