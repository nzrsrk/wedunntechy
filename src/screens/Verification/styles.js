import { StyleSheet, Platform, Dimensions } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

export default StyleSheet.create({
    container: {
        ...Typography.container,
        height: Theme.SCREEN_HEIGHT
    },

    title: {
        color: Theme.BLUE,
        fontSize: Theme.FONT_TWENTYSIX,
        fontFamily: "Roboto-Bold",
        marginBottom: heightPercentageToDP(2),
        alignSelf: 'center',

    },
    content: {
        fontSize: Theme.FONT_SIZE_LARGE,
        fontFamily: "Roboto-Regular",
        color: '#444444',
        width: '75%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: '10%',
        // alignItems: 'center',
        // paddingHorizontal: '10%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: heightPercentageToDP(2),
        // alignContent: 'center',
        marginTop: heightPercentageToDP(5),
        // justifyContent: 'center',
        flex: 1

    },

})