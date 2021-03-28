import React from 'react';
import { StyleSheet } from 'react-native';
import Theme from './Theme';
import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';




const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    commonPadding: {
        paddingHorizontal: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(2)

    },
    commonPaddingH: {
        paddingHorizontal: heightPercentageToDP(2)
    },
    commonPaddingV: {
        paddingVertical: heightPercentageToDP(2)
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    HorizontalCenter: {
        alignItems: 'center',
    },
    verticalCenter: {
        justifyContent: 'center'
    },



    wrapper: {
        width: Theme.SCREEN_WIDTH,
        flex: 1,
        height: 'auto'
    },



    bannerText: {
        fontFamily: 'Roboto-Black',
        fontSize: Theme.FONT_TWENTYFIVE,
        color: '#fff'
    },




    headStyle1: {
        fontFamily: 'Roboto-Medium',
        color: Theme.GREY_1,
        fontSize: Theme.FONT_SIZE_LARGE,
        width: '100%',
        textAlign: 'center',
    },
    headStyle2: {
        fontFamily: 'Roboto-Bold',
        color: Theme.PRIMARY_COLOR,
        fontSize: Theme.FONT_SIZE_LARGE,
        width: '100%',
        textAlign: 'center',
        marginBottom: heightPercentageToDP(.5)
    },
    headStyle3: {
        fontFamily: 'Roboto-Regular',
        color: Theme.SECONDARY_COLOR,
        fontSize: Theme.FONT_SIZE_LARGE,
        width: '100%',
        textAlign: 'center',
    },
    headStyle4: {
        fontFamily: 'Roboto-Medium',
        color: Theme.GREY_1,
        fontSize: Theme.FONT_SIZE_LARGE,
        width: '100%',
        textAlign: 'left',
    },
    headStyle5: {
        fontFamily: 'Roboto-Bold',
        color: Theme.SECONDARY_COLOR,
        fontSize: Theme.FONT_THIRTEEN,
        width: 'auto',
        textAlign: 'left',
    },





    para1: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#444444',
        textAlign: 'center'
    },
    para2: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_ELEVEN,
        color: '#374045',
    },
    para3: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#444444',
        textAlign: 'left',
        // paddingBottom: heightPercentageToDP(2)
        // marginBottom: heightPercentageToDP(2)
    },
    para4: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#F32F2F',
        textAlign: 'left',
        marginBottom: heightPercentageToDP(1)
    },





    formWrapper: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        minHeight: Theme.SCREEN_HEIGHT - 180
    },







    button1: {
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: Theme.PRIMARY_COLOR,
        width: 'auto',
        borderRadius: 7,
    },
    button1Text: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#4B4B4B',
        lineHeight: 12,
    },


    button2: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#3D9ED4',
        width: '50%',
        borderRadius: 7,
    },
    button2Text: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#989898',
        lineHeight: Theme.FONT_THIRTEEN,
        textAlign: 'center'
    },



    button3: {
        borderWidth: 2,
        padding: 15,
        borderColor: Theme.SECONDARY_COLOR,
        width: '100%',
        borderRadius: 7,
    },
    button3Text: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_LARGE,
        color: '#4B4B4B',
        lineHeight: Theme.FONT_SIZE_LARGE,
        textAlign: 'center'
    },



    button4: {
        borderWidth: 1,
        padding: 15,
        borderColor: Theme.PRIMARY_COLOR,
        width: 'auto',
        minWidth: '33.3%',
        borderRadius: 7,
    },
    button4Text: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_THIRTEEN,
        color: Theme.PRIMARY_COLOR,
        lineHeight: Theme.FONT_THIRTEEN,
        textAlign: 'center'
    },


    button5: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#DFDFDF',
        width: 'auto',
        minWidth: '33.3%',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button5Text: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#1C1C1C',
        lineHeight: Theme.FONT_THIRTEEN,
        textAlign: 'center'
    },



    button6: {
        borderWidth: 2,
        padding: 10,
        borderColor: Theme.SECONDARY_COLOR,
        width: 'auto',
        borderRadius: 7,
    },
    button6Text: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#4B4B4B',
        lineHeight: Theme.FONT_THIRTEEN,
        textAlign: 'center'
    },



    button7: {
        padding: 10,
        paddingHorizontal: 15,
        borderColor: Theme.SECONDARY_COLOR,
        width: 'auto',
        backgroundColor: Theme.SECONDARY_COLOR,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button7Text: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
        color: '#fff',
        lineHeight: Theme.FONT_THIRTEEN,
        textAlign: 'center'
    },









    inputStyle: {
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 15,
        paddingVertical: 5,
        height: 40,
        justifyContent: 'center',
        color: '#707070',
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_THIRTEEN,
    },



    TextSmallRegular: {
        fontSize: Theme.FONT_THIRTEEN,
        fontFamily: "Roboto-Regular",
        color: '#374045'
    },
    TextSmallLight: {
        fontSize: Theme.FONT_THIRTEEN,
        fontFamily: "Roboto-Light",
    },
    TextSmallBold: {
        fontSize: Theme.FONT_THIRTEEN,
        fontFamily: "Roboto-Bold",
        color: '#374045'
    },
    TextMediumBold: {
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    TextMediumRegular: {
        fontFamily: "Roboto-Regular",
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    TextMediumLight: {
        fontFamily: "Roboto-Light",
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    TextBoldLarge: {
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_LARGE
    },
    TextExtraLargeBold: {
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_EXTRA_LARGE,
    },
    TextRegularLarge: {
        fontSize: Theme.FONT_SIZE_LARGE,
        fontFamily: "Roboto-Regular",
        color: '#374045'
    },

})

export default GlobalStyles;