import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Theme from '../../styles/Theme'
import Typography from '../../styles/Typography';

const styles = StyleSheet.create({
    container: {
        ...Typography.container,
    },
    topContainer: {
        height: '50%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    logoContainer: {
        height: '80%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        width: '70%',
        height: '80%'

    },
    carouselContainer: {
        height: '30%',
        width: '75%',
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    courousel: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },


    middleContainer: {
        height: '30%',
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    bottomContainer: {
        marginBottom: 0,
        width: Theme.SCREEN_WIDTH,
        height: Theme.SCREEN_HEIGHT

    },

});

export default styles;