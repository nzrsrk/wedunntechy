import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Platform
} from 'react-native';

import Logo from '../assets/images/beforelogin/logo';

import Theme from '../styles/Theme';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { HeaderBackButton } from '@react-navigation/stack';

const Header = ({ navigation }) => {

    if (Platform.OS === 'android')
        return (
            null
        )
    else
        return (
            <View style={{ backgroundColor: Theme.SECONDARY_COLOR }}>
                <HeaderBackButton tintColor={'#fff'} onPress={() => navigation.goBack(null)} />
            </View>
        )
}
export const AppTopScreenTheme = (props) => {
    const { logo, image, text, imageleft, imageTop, navigation } = props;
    return (
        <View>
            <Header navigation={navigation} />
            <ImageBackground source={image} style={[styles.imageContainer]}>
                <View style={styles.container}>
                    <View style={[styles.logoWrap]}>
                        <Logo />
                        {/* <Image
                            source={require('../assets/images/beforelogin/Logo.png')}
                            resizeMode={'contain'}
                            style={{ width: '100%', height: '100%' }}
                        /> */}
                    </View>
                    <View style={[styles.textWrap]}>
                        <Text style={[styles.appText]}>
                            No more worries about unemployment. Be the part of Wedunn family
                </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>

    )

}


const styles = StyleSheet.create({

    imageContainer: {
        width: '100%',
        height: Theme.SCREEN_HEIGHT / 3,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(2),
    },
    logoWrap: {
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(8),
        paddingTop: '2%'
    },

    textWrap: {
        maxWidth: '60%',
        marginTop: heightPercentageToDP(2),
        marginRight: '5%'
    },
    appHead: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_TWENTYSIX,
        color: '#4B4B4B',
        marginBottom: heightPercentageToDP(.5)
    },
    appText: {
        fontFamily: 'Roboto-Regular',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        color: '#fff',
        marginBottom: heightPercentageToDP(.5),
        textAlign: 'justify'
    }


})
