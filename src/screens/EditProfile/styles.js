import { StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.WHITE

    },
    imageWrapper: {
        height: Theme.SCREEN_HEIGHT / 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5F5F5',
    },
    image: {
        height: heightPercentageToDP(12),
        width: heightPercentageToDP(12),
        borderRadius: heightPercentageToDP(6),
    },
    imageContainer: {
        height: heightPercentageToDP(12.4),
        width: heightPercentageToDP(12.4),
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: heightPercentageToDP(6.2),
        borderWidth: 2,
        borderColor: Theme.GREEN
    },
    editWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editText: {
        marginHorizontal: widthPercentageToDP(.5),
        color: Theme.GREEN,
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: "Roboto-Regular"
    },

    collapseHeaderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: heightPercentageToDP(.8),
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(1),
        // marginHorizontal: 15,
        backgroundColor: Theme.BLUE
    },
    collapseTitle: {
        textAlign: 'center',
        marginHorizontal: widthPercentageToDP(1),
        color: Theme.WHITE
    },
    collapseContainerStyle: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#ddd',
        paddingHorizontal: widthPercentageToDP(2)
    },

    label: {
        color: '#4B4B4B',
        // fontWeight: 'bold',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: "Roboto-Regular",
        marginTop: 0,
        marginBottom: widthPercentageToDP(1),

    },

    checkbox: {
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0
    },
    checkboxLabel: {
        fontWeight: 'normal',
        fontSize: Theme.FONT_ELEVEN,
    },
    nextButtonStyle: {
        marginTop: heightPercentageToDP(2.5),
        width: Theme.SCREEN_WIDTH / 3 - 20,
        borderWidth: 2,
        // height: heightPercentageToDP(5),

    },

    nextTitleStyle: {
        color: Theme.DIM_GRAY,
        ...GlobalStyles.TextSmallBold
    },
    attatchButton: {
        marginLeft: 1,
        borderColor: Theme.GREEN,
        borderWidth: 2,
        // height: heightPercentageToDP(5),

    },
    textArea: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(4),
        width: '100%',
        borderRadius: 5,
        padding: 0,
        // marginTop: 10,
        paddingLeft: heightPercentageToDP(2),
        fontSize: Theme.FONT_SIZE_SMALL
        // backgroundColor: '#fff',
        // borderColor: '#ddd',
        // borderBottomWidth: 0,
        // borderLeftWidth: 1,
        // shadowColor: Theme.DARK_GRAY,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 10,
        // justifyContent: 'center',
        // height: heightPercentageToDP(4),
        // width: '100%',
        // borderRadius: 5,
        // // marginTop: 10,
        // paddingLeft: heightPercentageToDP(2),
        // fontSize: Theme.FONT_SIZE_SMALL
    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginTop: heightPercentageToDP(.3),
    },


    dobInput: {
        height: heightPercentageToDP(3.5),
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        justifyContent: 'center',
        width: '30%',
        borderRadius: 5,
        padding: 0,
        ...Typography.elevation,
        padding: widthPercentageToDP(.5)
    },
    dobText: {
        textAlign: 'center',
        fontSize: Theme.FONT_SIZE_SMALL,
    },
    pickerIcon: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: heightPercentageToDP(3.5),
        // marginTop: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    Pickerstyle: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        height: heightPercentageToDP(3.5),
        width: '80%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 0,
        // marginTop: 10,
        paddingLeft: heightPercentageToDP(2),
        fontSize: Theme.FONT_SIZE_SMALL
    },

    checkboxLabel: {
        fontWeight: 'normal',
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: 'Roboto-Regular'
    },

    checkbox: {
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 0,
        flexBasis: Theme.SCREEN_WIDTH / 3,
        marginRight: heightPercentageToDP(2),
        marginLeft: 0
    },
    modalContent: {
        backgroundColor: '#e8e8e8',
        padding: heightPercentageToDP(2),
        justifyContent: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    bottomModelTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_LARGE,
        padding: widthPercentageToDP(1),
        // color: Theme.WHITE
    },
    modalButtonLabels: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_SMALL,
        // color: Theme.WHITE,
        paddingVertical: widthPercentageToDP(.5)
    },
    modalIcon: {
        borderRadius: heightPercentageToDP(2.5),
        backgroundColor: '#ffff',
        width: heightPercentageToDP(5),
        height: heightPercentageToDP(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifyBtnStyle:
    {
        paddingBottom: '5%',
        paddingTop: '0%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    verifyBtnTitle: {
        fontSize: Theme.FONT_SIZE_SMALL
    }
})