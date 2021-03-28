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
        alignContent: 'center',
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    commonWrapper: {
        flexGrow: 1,
        // justifyContent: 'space-between',
        ...GlobalStyles.commonPaddingV
    },
    personalDetailsWrapper: {
        flexDirection: 'row',
        alignContent: 'center',
        // borderColor: Theme.GREEN,
        // borderBottomWidth: 3
    },
    imageContainer: {
        flexDirection: 'column',
        // width: '40%',
        paddingHorizontal: widthPercentageToDP(4)
    },
    pic: {
        borderRadius: heightPercentageToDP(8),
        width: heightPercentageToDP(16),
        height: heightPercentageToDP(16),
    },
    icon1: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: heightPercentageToDP(1.5),
        flexDirection: 'row'
    },

    nameContainer: {
        flexDirection: 'column',
        width: Theme.SCREEN_WIDTH / 2,
        paddingVertical: widthPercentageToDP(5),
    },
    name: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_LARGE,
        marginBottom: heightPercentageToDP(1),
        color: Theme.DARK_BLUE,
    },
    text: {
        ...GlobalStyles.TextSmallRegular,
        color: Theme.DARK_BLUE,

    },
    rating: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(1),
        ...GlobalStyles.TextSmallRegular,
        width: '100%',
        fontFamily: "Roboto-regular",
        color: Theme.DARK_BLUE,

    },
    ratingText: {
        ...GlobalStyles.TextSmallRegular,
        color: Theme.DARK_BLUE,
        marginLeft: widthPercentageToDP(.5),

    },
    itemsContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.GREEN,
        paddingVertical: '5%',
        borderRadius: 5,
    },
    text2: {
        ...GlobalStyles.TextSmallBold,
        color: Theme.BLUE,
        marginBottom: widthPercentageToDP(1.8),
        margin: heightPercentageToDP(.5),
    },
    services: {
        borderWidth: 1,
        padding: widthPercentageToDP(1),
        width: '35%',
        borderRadius: 25,
        borderColor: Theme.GREEN,
        margin: heightPercentageToDP(1),
        alignItems: 'center'
    },
    available: {
        flexDirection: 'row',
        padding: widthPercentageToDP(.5),
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    text3: {
        ...GlobalStyles.TextMediumRegular,
        color: Theme.DARK_BLUE,
    },
    text5: {
        ...GlobalStyles.TextSmallRegular,
        color: Theme.DARK_BLUE,
    },
    num: {
        fontFamily: "Roboto-Bold",
        color: Theme.BLUE
    },
    serviceDetailsWrapper: {
        paddingVertical: heightPercentageToDP(3),
        alignContent: 'center',
        justifyContent: 'center',
    },
    text4: {
        ...GlobalStyles.TextSmallRegular,
    },
    buttonStyle: {
        borderColor: Theme.GREEN,
        borderWidth: 2,
        // height: heightPercentageToDP(4),
        width: Theme.SCREEN_WIDTH / 2.5,
        marginRight: widthPercentageToDP(.5),
    },
    teamDetailsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomWrapper2: {
        justifyContent: 'space-between',
        // height: 30,
        alignSelf: 'center',
        marginLeft: heightPercentageToDP(2),
        flex: 1
    },
    moreDetWrapper: {
        paddingHorizontal: '5%',
        alignSelf: 'flex-end'
    },
    moreText: {
        color: Theme.BLUE,
        marginLeft: heightPercentageToDP(.5),
        fontSize: Theme.FONT_THIRTEEN,
        fontFamily: 'Roboto-Bold'
    },
    offerContainer: {
        flexDirection: 'row',
        // flex: 1,
        flexWrap: 'wrap',
        paddingVertical: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})