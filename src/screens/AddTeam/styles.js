

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
        // height: heightPercentageToDP(3.5),
        marginHorizontal: widthPercentageToDP(.8),
        borderColor: Theme.GRAY_OPACITY,
    },
    wrapper1: {
        marginTop: heightPercentageToDP(2),
    },
    pic: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(4),
        borderRadius: 20

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




})

export default styles;