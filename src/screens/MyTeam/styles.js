

import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
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
    contentWrapper: {
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
    },
    buttonStyles: {
        width: widthPercentageToDP(7),
        height: heightPercentageToDP(3.5),
        marginHorizontal: widthPercentageToDP(.8),
        borderColor: Theme.GRAY_OPACITY,
    },
    wrapper1: {
        borderBottomWidth: 1,
        borderColor: Theme.GRAY_OPACITY,
        paddingTop: heightPercentageToDP(2),
        flexDirection: 'column'
    },
    pic: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(4),
        borderRadius: 20
    },
    modalContainer: {
        borderColor: Theme.BLUE,
        borderWidth: 2,
        borderRadius: 5,
        // padding: 10,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    modal2Visible: {
        width: Theme.SCREEN_WIDTH - 25,
        paddingHorizontal: widthPercentageToDP(3),
        padding: heightPercentageToDP(1),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    triangle: {
        height: heightPercentageToDP(.5),
        width: widthPercentageToDP(.5),
        marginHorizontal: Theme.SCREEN_WIDTH / 2,
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Theme.BLUE,
        margin: 0,
        borderWidth: 0,
        borderColor: 'transparent',

    },
    popover: {
        marginTop: heightPercentageToDP(-3),
        alignItems: 'center',
        justifyContent: 'center',
        padding: heightPercentageToDP(.5),
        paddingHorizontal: widthPercentageToDP(.5)
    },

})

export default styles;