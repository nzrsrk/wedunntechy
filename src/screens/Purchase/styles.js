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
    title: {
        ...GlobalStyles.TextMediumBold,
        color: Theme.BLUE,
        paddingLeft: widthPercentageToDP(1)
    },
    buttonStyle:
    {
        width: Theme.SCREEN_WIDTH / 2 - heightPercentageToDP(4),
        // height: heightPercentageToDP(4.5),
        ...GlobalStyles.TextBoldLarge,
    },
    footer: {
        height: heightPercentageToDP(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(2),
        bottom: 0,
    },

    detailContainer: {
        ...GlobalStyles.commonPadding,
    },
    detailsCard: {
        width: '100%',
        borderColor: 'rgba(0,0,0, .2)',
        borderWidth: 1,
        borderRadius: 5,
        ...Typography.elevation,
        padding: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2)
    },

    contentContainer: {
        flexDirection: 'row',
        marginBottom: heightPercentageToDP(.5)
    },
    field: {
        flex: 1,
        paddingRight: heightPercentageToDP(2),
        textAlign: 'right',
        ...GlobalStyles.TextMediumBold,
        color: '#374045'
    },
    content: {
        ...GlobalStyles.TextMediumRegular,
        flex: 2,
        textAlign: 'left',
        color: '#374045'

    },
    purchaseList: {
        width: '100%',
        borderRadius: 3,
        ...Typography.elevation
    },
    heading: {
        backgroundColor: Theme.GREEN,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    purchaseContent: {
        backgroundColor: '#EFEFEF',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        flexDirection: 'column'
    },
    purchaseContentInner: {
        flexDirection: 'row'
    },
    items: {
        padding: widthPercentageToDP(.8),
        ...GlobalStyles.TextSmallRegular,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: Theme.WHITE,
        borderRightColor: 'rgba(0, 0, 0, 0.2)',
    },

    extraitems: {
        padding: widthPercentageToDP(.8),
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: Theme.WHITE,
        borderRightColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

    extraItemsText: {
        ...GlobalStyles.TextSmallRegular,
        textAlign: 'center',

    },

    modalContainer: {
        borderWidth: 2,
        borderColor: Theme.BLUE,
        padding: widthPercentageToDP(2),
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    modalbtnTitle1: {
        fontFamily: "Roboto-Regular",
        fontSize: Theme.FONT_SIZE_SMALL,
        color: "#fff",
        paddingHorizontal: heightPercentageToDP(2)
    },
    modalbtnStyle1: {
        borderColor: "transparent",
        height: heightPercentageToDP(4),
    },
    modalbtnTitle2: {
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_SMALL,
        color: "#4B4B4B",

    },
    modalbtnStyle2: {
        borderColor: "transparent",
        // height: heightPercentageToDP(4),

    },

})