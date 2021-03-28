import { StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

const styles = StyleSheet.create({
    container: {
        ...Typography.container,
        height: Theme.SCREEN_HEIGHT
    },

    checkbox: {
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
        flexBasis: '28%'
    },
    checkboxLabel: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
        fontSize: Theme.FONT_SIZE_SMALL,
    },
    text1: {
        fontSize: Theme.FONT_SIZE_MEDIUM,
        textAlign: 'left',
        fontFamily: "Roboto-Regular",
        color: '#4B4B4B',
        // marginTop: 3
    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        lineHeight: heightPercentageToDP(2),
    },

    forgotPassword: {
        marginTop: heightPercentageToDP(1),
        alignItems: 'center',
        alignSelf: 'center',
        color: '#4B4B4B',
        ...GlobalStyles.TextBoldLarge,
    },
    verifyBtnStyle:
    {
        paddingBottom: '5%',
        paddingTop: '0%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    verifyBtnTitle: {
        fontSize: Theme.FONT_SIZE_SMALL
    }

})

export default styles;