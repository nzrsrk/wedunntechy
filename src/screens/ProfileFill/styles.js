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
        flex: 1,
        backgroundColor: Theme.WHITE

    },
    imageWrapper: {
        paddingTop: '5%',
        paddingBottom: '1%',
        // height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5F5F5',
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '2%',
        paddingVertical: '1%'
    },
    image: {
        height: heightPercentageToDP(16),
        width: heightPercentageToDP(16),
        borderRadius: heightPercentageToDP(8),
        marginVertical: heightPercentageToDP(1),
        borderWidth: 2,
        borderColor: Theme.GREEN
    },
    editWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editText: {
        marginHorizontal: widthPercentageToDP(.5),
        color: Theme.GREEN,
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: "Roboto-Regular"
    },
    containersStyle: {
        width: '100%',
        backgroundColor: Theme.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        padding: heightPercentageToDP(2)
    },

    itemsContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    services: {
        borderWidth: 1,
        padding: widthPercentageToDP(.8),
        width: '35%',
        borderRadius: 25,
        borderColor: Theme.GREEN,
        margin: heightPercentageToDP(.3),
        alignItems: 'center'
    },
    bussinessContainer: {
        width: '100%',
        padding: heightPercentageToDP(2),
    },
    bussinessContainerInner: {
        padding: widthPercentageToDP(1),
        // paddingBottom: Platform.OS === 'ios' ? '15%' : '0%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        // flexBasis: '50%',
        marginVertical: heightPercentageToDP(.7),
    },
    day: {
        height: heightPercentageToDP(3),
        width: heightPercentageToDP(3),
        borderRadius: heightPercentageToDP(1.5),
        borderColor: Theme.PRIMARY_COLOR,
        backgroundColor: Theme.WHITE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 3
    },
    today: {
        height: heightPercentageToDP(3),
        width: heightPercentageToDP(3),
        borderRadius: heightPercentageToDP(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        ...Typography.elevation,
        backgroundColor: Theme.BLUE,
    },
    time: {
        marginHorizontal: heightPercentageToDP(.5),
        marginVertical: heightPercentageToDP(.5),
    },
    containerdetailsStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Theme.SCREEN_WIDTH,
        backgroundColor: Theme.WHITE,
        alignItems: 'center',
    },
    detailsAlign: {
        paddingVertical: heightPercentageToDP(1),
        flex: 1,
        flexBasis: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
        borderRightColor: '#E1E1E1',
        borderRightWidth: 1
    },
    collapseHeaderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: heightPercentageToDP(.8),
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(1),
    },
    collapseTitle: {
        textAlign: 'center',
        // marginHorizontal: 10,
        paddingHorizontal: heightPercentageToDP(2),
        color: Theme.WHITE
    },
    label: {
        textAlign: 'center',
        ...GlobalStyles.TextSmallLight
    },
    content: {
        textAlign: 'center',
        ...GlobalStyles.TextSmallRegular
    },
    detailsAlign2: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        paddingVertical: heightPercentageToDP(.5),
        marginVertical: heightPercentageToDP(.5),
    },
    label2: {
        textAlign: 'left',
        ...GlobalStyles.TextSmallLight
    },
    content2: {
        textAlign: 'left',
        ...GlobalStyles.TextSmallRegular
    },
})