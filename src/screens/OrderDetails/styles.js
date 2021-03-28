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
        width: Theme.SCREEN_WIDTH / 2 - 20,
        // height: heightPercentageToDP(4.5),
    },
    buttonStyle2: {
        borderColor: Theme.GREEN,
        borderWidth: 2,
        // height: heightPercentageToDP(4),
        width: Theme.SCREEN_WIDTH / 3 + 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
        ...GlobalStyles.commonPaddingH
    },
    collectbt: {
        backgroundColor: Theme.GREEN,
        width: '45%',
        margin: widthPercentageToDP(1),
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
        padding: heightPercentageToDP(1.5)
    },

    contentContainer: {
        flexDirection: 'row',
        marginBottom: heightPercentageToDP(.5)
    },
    field: {
        flex: 1,
        ...GlobalStyles.TextMediumBold,
        paddingRight: heightPercentageToDP(2),
        color: '#374045',
        textAlign: 'right',
    },
    content: {
        flex: 2,
        ...GlobalStyles.TextMediumRegular,
        textAlign: 'left',
        color: '#374045',

    },
    taskContainer: {
        marginTop: 8,
        padding: 0,
        alignSelf: 'center',
        width: '100%',
        ...GlobalStyles.commonPaddingH,
        borderColor: 'rgba(0,0,0, .2)',
        borderWidth: 1,
        borderRadius: 5,
        ...Typography.elevation,
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(.5),
    },

    text: {
        color: 'black',
        // padding: 10
    },

    btnText: {
        fontFamily: "Roboto-Medium",
        fontSize: Theme.FONT_SIZE_LARGE,
        marginLeft: widthPercentageToDP(1)
    },



    Btn: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    taskContent: {
        marginBottom: heightPercentageToDP(.8),
        ...GlobalStyles.TextMediumRegular,
    },
    modalContainer: {
        borderWidth: 2,
        borderColor: Theme.BLUE,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
    },
    modalCloseIcon: {
        backgroundColor: Theme.GREEN,
        borderRadius: 15,
        alignSelf: 'flex-end',
        top: heightPercentageToDP(-1),
        right: widthPercentageToDP(-.5)
    },
    modalButtonStyle:
    {
        width: Theme.SCREEN_WIDTH / 3,
        // height: 45,
    },
    modalTitleText: {
        color: Theme.GREEN,
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_TWNETY,
        paddingVertical: heightPercentageToDP(1)
    },
    modalContent: {

    },

    items: {
        paddingTop: heightPercentageToDP(.5),
        ...GlobalStyles.TextSmallRegular,
        textAlign: 'center',
        // borderRightWidth: 1,
        // borderBottomColor: Theme.WHITE,
        // borderColor: 'rgba(0, 0, 0, 0.2)',
        textAlignVertical: 'center'
    },
    itemsContainer: {
        borderRightWidth: 1,
        borderBottomColor: Theme.WHITE,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        // paddingHorizontal: widthPercentageToDP(1)
    }

})