import { StyleSheet } from 'react-native'
import Theme from '../../styles/Theme';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',

    },
    bullets: {
        bottom: 0,
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: '1%',
        marginTop: '2%'
    },

    greenCircle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        width: widthPercentageToDP(2),
        height: widthPercentageToDP(2),
        borderRadius: widthPercentageToDP(1),
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: Theme.GREEN,
    },

    bullet: {
        display: 'flex',
        flexDirection: 'row',
        margin: 3,
        width: widthPercentageToDP(2.5),
        height: widthPercentageToDP(2.5),
        borderRadius: widthPercentageToDP(1.25),
        borderWidth: 1,
        backgroundColor: '#fff',
    }

});

export default styles;