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
    reviewContainer: {
        padding: 0,
        margin: 0
        // marginTop: 10,
    },
    title: {
        color: Theme.DARK_BLUE,
        marginRight: widthPercentageToDP(.5),
        fontFamily: "Roboto-Bold"

    },
    text: {
        ...GlobalStyles.TextSmallRegular,
        color: Theme.DIM_GRAY,

    },
    triangle: {
        height: heightPercentageToDP(.5),
        width: widthPercentageToDP(.5),
        marginHorizontal: Theme.SCREEN_WIDTH / 3 - 20,
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E8E8E8',
        margin: 0,
        borderWidth: 0,
        borderColor: 'transparent',

    }

})