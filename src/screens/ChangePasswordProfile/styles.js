import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    roundedTextInput: {
        padding: 0,
        borderRadius: 5,
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(6),
        ...Typography.elevation,
        flex: 1,
    },
    textInputContainer: {
        marginTop: heightPercentageToDP(2),
        width: '100%',

    },
    error: {
        color: "red",
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular",
        marginTop: heightPercentageToDP(3),
    },
})

export default styles;