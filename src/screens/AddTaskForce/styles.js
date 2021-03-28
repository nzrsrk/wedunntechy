

import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

const styles = StyleSheet.create({
    alignVertically: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    buttonStyles: {
        // height: heightPercentageToDP(3),
        borderColor: Theme.GRAY_OPACITY,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: heightPercentageToDP(1)
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.GRAY_OPACITY,
        height: heightPercentageToDP(4),
        ...GlobalStyles.commonPaddingH,
        borderRadius: 5
    },

    inputs: {
        height: '100%',
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    statusText: {
        color: '#616161',
        fontSize: Theme.FONT_ELEVEN,
        textAlign: 'center',
    },
    button2: {
        backgroundColor: Theme.GREEN,
        width: '45%',
        alignSelf: 'center',
        // marginVertical: heightPercentageToDP(3)
    }




})

export default styles;