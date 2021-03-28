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
    notification_container: {
        justifyContent: 'space-between',
        ...GlobalStyles.commonPaddingH,
        ...GlobalStyles.commonPaddingV,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: Theme.GRAY_BLUE
    },
    title: {
        color: Theme.DARK_BLUE,
        ...GlobalStyles.TextMediumBold

    },
    text: {
        color: Theme.GRAY_BLUE,
        ...GlobalStyles.TextMediumRegular
    },
    noContentView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Theme.SCREEN_HEIGHT / 3,
        flexDirection: 'row',
        marginHorizontal: heightPercentageToDP(2),
    },
    noContentStyle: {
        color: '#8D8D8D',
        textAlignVertical: 'center',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Roboto-Regular'

    }
})