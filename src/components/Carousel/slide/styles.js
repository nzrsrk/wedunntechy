import { StyleSheet } from 'react-native'
import Theme from '../../../styles/Theme'

export const styles = StyleSheet.create({
    slide: {
        paddingHorizontal: '1%',
        paddingBottom: '1%',
        paddingTop: '3%',
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    slideText: {
        width: '100%',
        textAlign: 'center',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        color: '#707070',
        // fontWeight: 'bold',
        fontFamily: "Roboto-Regular"

    },
});

export default styles;