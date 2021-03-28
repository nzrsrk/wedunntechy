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
        color: Theme.BLUE,
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: "Roboto-Bold",
        paddingLeft: widthPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    },
    detailsCard: {
        borderColor: 'rgba(0,0,0, .2)',
        borderWidth: 1,
        borderRadius: 5,
        ...Typography.elevation,
    },
    detailsCardInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: heightPercentageToDP(2),
        paddingHorizontal: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(2)
    },
    imgWrp: {
        flex: 1.5,
    },
    imputWrp: {
        flex: 2,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    field: {
        flex: 1,
        paddingRight: heightPercentageToDP(2),
        textAlign: 'right',
        fontWeight: 'bold'
    },
    content: {
        flex: 2,
        textAlign: 'left'
    },

    inputContainer: {
        // flexDirection: 'row',
        // alignSelf: 'center'
    },


    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 2,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: heightPercentageToDP(.1) },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(3.5),
        width: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 0,
        marginBottom: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(2),
        fontSize: Theme.FONT_SIZE_SMALL,

    },
    input2: {
        paddingTop: heightPercentageToDP(.5),
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 2,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: heightPercentageToDP(.1) },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(7.5),
        width: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 0,
        marginBottom: heightPercentageToDP(1.5),
        paddingHorizontal: heightPercentageToDP(2),
        fontSize: Theme.FONT_SIZE_SMALL,
        textAlignVertical: 'top'
    },
    buttonStyle:
    {
        width: Theme.SCREEN_WIDTH / 2 - 20,
        height: heightPercentageToDP(4.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontSize: Theme.FONT_SIZE_LARGE,
        fontFamily: 'Roboto-Bold',
        color: '#fff'
    },
    footer: {
        ...GlobalStyles.commonPaddingV,
        height: heightPercentageToDP(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
    },
    playbackStyle: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: heightPercentageToDP(.1) },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(3.5),
        width: '75%',
        borderRadius: 10,
        paddingHorizontal: widthPercentageToDP(1),
        paddingVertical: heightPercentageToDP(1),
        marginHorizontal: widthPercentageToDP(.5)
    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginBottom: heightPercentageToDP(.5),
    },
    recordBtn: {
        // backgroundColor: Theme.GREEN,
        // borderRadius: heightPercentageToDP(2.5),
        width: heightPercentageToDP(5),
        height: heightPercentageToDP(5),
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        paddingHorizontal: '3%',
        borderRadius: heightPercentageToDP(2.5)
    },
    recordTxt: {
        color: Theme.GREEN,
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_SMALL,
    }

})