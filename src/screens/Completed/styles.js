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
        ...Typography.container
    },
    itemsContainer:
    {
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: Theme.GREEN,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        paddingVertical: heightPercentageToDP(.3),
        paddingHorizontal: widthPercentageToDP(.3),
    },
    footeText: {
        paddingHorizontal: widthPercentageToDP(1),
        paddingVertical: heightPercentageToDP(.5),
        ...GlobalStyles.TextSmallBold,
        color: Theme.BLUE,
    },
    titleContainer: {
        borderWidth: 2,
        borderBottomWidth: 0,
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(2),
        flexDirection: 'row',
        borderColor: Theme.GREEN,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        justifyContent: 'space-between',

    },


})