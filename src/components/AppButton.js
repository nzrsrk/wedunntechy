import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Theme from '../styles/Theme';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

// use AppButton
//  <AppButton type={'small/big'}    borderColor={}  onPress={}  title={} /> 



export const AppButton = (props) => {
    const { type, borderColor, onPress, title, style, disabled } = props;
    return (
        <TouchableOpacity
            style={[type === 'small' ? styles.smallButtonContainer : styles.largeButtonContainer, style,
            disabled && { borderColor: Theme.GRAY_OPACITY }
            ]}
            onPress={onPress}
            activeOpacity={0.5}
            disabled={disabled}
        >
            <Text style={[type === 'small' ? styles.smallButtonText : styles.largeButtonText,
            disabled && { color: Theme.GRAY_OPACITY }
            ]}>{title}</Text>
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    largeButtonContainer: {
        backgroundColor: Theme.WHITE,
        borderWidth: 2,
        height: heightPercentageToDP(5),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    largeButtonText: {
        fontSize: Theme.FONT_SIZE_LARGE,
        color: '#4B4B4B',
        textAlign: "center",
        justifyContent: 'center',
        fontFamily: "Roboto-Bold"
    },
    smallButtonContainer: {
        backgroundColor: Theme.WHITE,
        borderWidth: 1,
        height: heightPercentageToDP(4),
        margin: heightPercentageToDP(.5),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallButtonText: {
        fontSize: Theme.FONT_SIZE_MEDIUM,
        color: '#4B4B4B',
        textAlign: "center",
        justifyContent: 'center',
        fontFamily: "Roboto-Bold"

    },
});