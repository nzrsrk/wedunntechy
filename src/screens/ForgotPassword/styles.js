import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


const styles = StyleSheet.create({

    borderStyleBase: {
        width: widthPercentageToDP(3),
        height: heightPercentageToDP(4.5)
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: widthPercentageToDP(3),
        height: heightPercentageToDP(4.5),
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    roundedTextInput: {
        padding: 0,
        borderRadius: 5,
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(6),
        ...Typography.elevation,
        flex: 1,
    },
    textInputContainer: {
        marginTop: heightPercentageToDP(2),
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginTop: heightPercentageToDP(.3),
    },
})

export default styles;