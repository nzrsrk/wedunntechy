import { StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%'
        // width: '70%',
    },
    container2: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: '1%'
    },

    textContainer: {
        width: '55%',
        height: '100%',
        justifyContent: 'center'
    },

    voicenotes: {
        width: '100%',
        // height: '60%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
        // paddingBottom: heightPercentageToDP(2)
    },

    name: {
        fontSize: Theme.FONT_FIFTEEN,
        color: '#5f9ea0'
    },

    playbtn: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    pausebtn: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    delete: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    body: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    textsm: {
        marginTop: heightPercentageToDP(1),
        fontSize: Theme.FONT_ELEVEN,
        color: 'grey'
    },

});
