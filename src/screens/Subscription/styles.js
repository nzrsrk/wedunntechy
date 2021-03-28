

import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';

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
    commonWrapper: {
        flexGrow: 1,
        justifyContent: 'space-around',
        paddingBottom: '5%',
    },
    buttonStyle: {
        backgroundColor: Theme.GREEN,
        paddingHorizontal: widthPercentageToDP(3),
        borderRadius: 20
    },
    alignCenter: {
        alignItems: 'center',
    },
    roundedTextInput: {
        padding: 0,
        marginVertical: 0,
        borderRadius: 5,
        height: '100%',
        width: widthPercentageToDP(15),
        borderWidth: 1,
        borderColor: Theme.DIM_GRAY,
        elevation: 0,
        // flex: 1
    },
    textInputContainer: {
        height: heightPercentageToDP(4),
        paddingHorizontal: 5,

    },
    buttonStyle2: {
        paddingVertical: 0,
        height: '100%',
        borderColor: Theme.BLUE,
        borderWidth: 2,
        paddingHorizontal: widthPercentageToDP(1),

    },
    buttonTitle: {
        paddingHorizontal: widthPercentageToDP(1),
        color: Theme.DIM_GRAY

    },
    containerProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: heightPercentageToDP(2)
    }
})

export default styles;