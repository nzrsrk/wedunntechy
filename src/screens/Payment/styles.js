import { StyleSheet } from 'react-native';
import Typography from '../../styles/Typography';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


export default StyleSheet.create({
    container: {
        ...Typography.container,
    },
    containerEarnings:
    {
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: Theme.BLUE,
        borderRadius: 5,
    },
    earningsRow: {
        flexDirection: 'row',
        paddingVertical: heightPercentageToDP(.8),
        paddingHorizontal: widthPercentageToDP(.5)
    },


    earningsText: {
        marginLeft: widthPercentageToDP(1),
        fontFamily: "Roboto-Regular",
        fontSize: Theme.FONT_SIZE_SMALL,

        width: '35%',

    },
    rsText: {
        color: Theme.BLUE,
        fontFamily: "Roboto-Regular",
        fontSize: Theme.FONT_SIZE_SMALL
    },
    amountText: {
        color: Theme.GREEN,
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_SMALL
    },
    titleContainer:
    {
        borderWidth: 2,
        padding: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(2),
        flexDirection: 'row',
        borderColor: Theme.GREEN,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        justifyContent: 'space-between',

    },

    contentContainer: {
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: Theme.GRAY_OPACITY,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    },


    footer: {
        borderTopWidth: 1,
        borderTopColor: Theme.GREEN,
        padding: 3,
    },
    footeText: {
        paddingHorizontal: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(.5),
        color: Theme.BLUE,
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_SMALL
    }

})