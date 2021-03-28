import { Platform, StyleSheet } from 'react-native';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography'
import GlobalStyles from '../../styles/GlobalStyles';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
const styles = StyleSheet.create({

    forgotPassword: {
        marginTop: heightPercentageToDP(1),
        alignItems: 'center',
        alignSelf: 'center',
        color: '#4B4B4B',
        ...GlobalStyles.TextBoldLarge,

    },


})

export default styles;