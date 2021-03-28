import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Theme from '../styles/Theme';

const NoConnectionScreen = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/no-internet-connection.gif')}
                resizeMode='center'
            // style={{ height: '50%' }}
            />
            {/* <Text style={[styles.text]}>Oops.....</Text> */}
            <Text style={styles.text}>Please check your Internet connection..!</Text>
            {/* <Button type="clear" title="Reload App" onPress={props.onCheck} /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: Theme.GREEN
        // paddingBottom: '10%'
    },
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: Theme.FONT_SIZE_EXTRA_LARGE,
    }
});
export default NoConnectionScreen