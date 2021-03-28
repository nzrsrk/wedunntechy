import { StyleSheet } from 'react-native';
import Theme from '../styles/Theme';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.WHITE,
    },

    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionStyle: {
        paddingTop: 0,
        paddingBottom: heightPercentageToDP(.8),
    },
    elevation: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: Theme.DARK_GRAY,
        shadowOffset: { width: 0, height: heightPercentageToDP(.1) },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
    },
    //  before Login common styles
    commonWrapper: {
        // display: 'flex',
        flexGrow: 1,
        // justifyContent: 'space-between',
        // paddingBottom: '10%',
        marginBottom: '5%'
    },

    formContainer: {
        width: '100%',
        paddingHorizontal: '10%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: heightPercentageToDP(2),
        alignContent: 'center',
        marginTop: heightPercentageToDP(5),
        justifyContent: 'center',
        flex: 1

    },
    headingText: {
        color: Theme.BLUE,
        fontSize: Theme.FONT_TWENTYSIX,
        fontFamily: "Roboto-Bold",
        textAlign: 'left',
        width: '100%',
        marginBottom: heightPercentageToDP(2)

    },
    bottomContainer: {
        width: '100%',
        paddingHorizontal: '10%',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        marginBottom: Platform.OS === 'android' ? '10%' : '5%',
        // paddingTop: heightPercentageToDP(3)
    },
    bottomItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
        paddingHorizontal: '10%',
        paddingTop: heightPercentageToDP(1)
    },
    nmText: {
        fontFamily: "Roboto-Bold",
        color: Theme.DARK_GRAY,
        fontSize: Theme.FONT_SIZE_LARGE
    },
    bottomText: {
        color: Theme.BLUE,
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_LARGE,
    }


});