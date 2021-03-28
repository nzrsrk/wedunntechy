import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Theme from '../styles/Theme';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { HeaderBackButton } from '@react-navigation/stack';
import { StatusBarHeight } from '../helper/Statusbar';


export default function GobackButton({ navigation, color }) {
    if (navigation.canGoBack() && Platform.OS === 'ios')
        return (
            <HeaderBackButton tintColor='black' style={{
                marginTop: StatusBarHeight,
            }} onPress={() => navigation.goBack(null)} />
        )
    else return null
}

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        paddingHorizontal: widthPercentageToDP(.5),
        paddingVertical: heightPercentageToDP(.5)


    },
    text: {
        fontSize: Theme.FONT_SIZE_LARGE,
        fontFamily: 'Roboto-Regular',
        padding: widthPercentageToDP(.5),
    }

})