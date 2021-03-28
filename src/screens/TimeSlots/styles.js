import { StyleSheet } from 'react-native';
import Typography from '../../styles/Typography';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';


import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';



export default StyleSheet.create({
    container: {
        ...Typography.container,
    },

    titleContainer:
    {
        borderWidth: 2,
        borderBottomWidth: 1,
        padding: widthPercentageToDP(1),
        flexDirection: 'row',
        borderColor: Theme.GREEN,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        alignItems: 'center'

    },
    titleText: {
        flex: 1,
        textAlign: 'left',
        ...GlobalStyles.TextMediumBold,
        color: Theme.GREEN,
        marginLeft: widthPercentageToDP(1)
    },

    contentContainer: {
        borderWidth: 2,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderColor: Theme.GREEN,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    align: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: Theme.GREEN,
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: Theme.GREEN,
        borderBottomColor: Theme.GREEN,
        borderBottomWidth: 1,

    },
    footeText: {
        padding: 8,
        ...GlobalStyles.TextSmallBold,
        color: Theme.BLUE,
        textAlign: 'center'
    },
    columnContent: {
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        padding: widthPercentageToDP(.5),
    },
    label: {
        ...GlobalStyles.TextSmallRegular,

        color: 'rgba(0,0,0,0.5)'
    },
    data: {
        ...GlobalStyles.TextSmallBold,
        fontSize: Theme.FONT_ELEVEN,
    },
    singleCol: {
        flex: 1,
        flexBasis: '100%'
    },
    noContentView: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: Theme.SCREEN_HEIGHT / 3,
        flexDirection: 'row',
        marginHorizontal: heightPercentageToDP(2),
    },
    noContentStyle: {
        color: '#8D8D8D',
        textAlignVertical: 'center',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Roboto-Regular'

    }

})