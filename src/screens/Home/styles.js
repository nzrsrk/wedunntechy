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
    image: {
        width: '100%',
        height: Theme.SCREEN_HEIGHT / 5
    },

    title: {
        ...GlobalStyles.TextExtraLargeBold,
        color: Theme.BLUE_MEDIUM,
        paddingHorizontal: widthPercentageToDP(1),
        paddingVertical: heightPercentageToDP(1)
    },
    title2: {
        color: '#000',
        width: '100%',
        textAlign: 'center',
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    container2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        ...GlobalStyles.commonPadding,
        width: '100%'
    },
    container3: {
        flexDirection: 'row'
    },
    SwitchContainer: {

        width: heightPercentageToDP(3),
        height: heightPercentageToDP(1.6),
        borderRadius: 8,
        marginVertical: heightPercentageToDP(.3),
        borderColor: Theme.GREEN,
        borderWidth: 1

    },
    toggleContainer: {
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(1.4),
        borderRadius: 7,
    },
    toggleCircle: {
        width: heightPercentageToDP(1.4),
        height: heightPercentageToDP(1.4),
        borderRadius: 7,
    },
    itemContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: Theme.SCREEN_WIDTH - 20,
        borderColor: 'rgba(0,0,0, .2)',
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    button: {
        flexDirection: 'row',
        ...Typography.alignCenter,
        width: '50%'
    },
    border: {
        borderColor: 'rgba(0,0,0, .2)',
        borderWidth: 1
    },
    pic: {
        borderRadius: 16,
        width: widthPercentageToDP(3.2),
        height: heightPercentageToDP(3.2),
    },
    btnText: {
        color: Theme.WHITE,
        paddingRight: widthPercentageToDP(1),
        ...GlobalStyles.TextBoldLarge
    },

    borderbottomStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0, .2)',
    },
    locWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: "wrap"
    },
    locInner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flexWrap: "wrap",
        paddingHorizontal: widthPercentageToDP(.8),
        paddingVertical: heightPercentageToDP(.2),
        marginBottom: heightPercentageToDP(1),
        marginTop: heightPercentageToDP(.5),
    },

})

