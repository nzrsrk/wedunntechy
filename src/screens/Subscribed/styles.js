

import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


const styles = StyleSheet.create({
    image: {
        width: Theme.SCREEN_WIDTH,
        height: heightPercentageToDP(30)
    },


    alignCenter: {
        alignItems: 'center',
    },
    container: {
        marginVertical: heightPercentageToDP(4)
    },
    subscriptionText: {
        fontSize: Theme.FONT_TWNETY,
        fontFamily: 'Roboto-Light',
        color: Theme.BLUE
    },
    text2: {
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Light",
        textAlign: 'center'
    }

})

export default styles;

