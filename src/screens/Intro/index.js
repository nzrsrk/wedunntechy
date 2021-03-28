import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import styles from './styles';
import Theme from '../../styles/Theme';
import Carousel from '../../components/Carousel';
import { AppButton } from '../../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

/*---*/
import Logo from '../../assets/images/beforelogin/wedunn_logo';


function Intro({ navigation }) {

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.topContainer}>
                <View style={styles.logoContainer}>
                    <Logo />
                    {/* <Image source={require('../../assets/images/beforelogin/logoIntro.png')}
                        style={{ width: '70%', height: '40%' }}
                        resizeMode='contain'
                    /> */}
                </View>
                <View style={styles.carouselContainer}>
                    <Carousel
                        style='slide'
                        items={[{
                            title: 'No more worries about unemployment. Be the part of Wedunn family',
                        }, {
                            title: 'No more worries about unemployment. Be the part of Wedunn family',
                        }, {
                            title: 'No more worries about unemployment. Be the part of Wedunn family',
                        }]}
                    />

                </View>

            </View>
            <View style={styles.middleContainer}>
                <AppButton type='small' style={{ width: '100%', borderColor: Theme.GREEN }}
                    onPress={() => navigation.navigate('LogIn')} title=' Log In ' />
                <AppButton type='small' style={{ width: '100%', borderColor: Theme.BLUE }}
                    onPress={() => navigation.navigate('SignUp')} title=' Sign Up ' />
            </View>
            <View style={styles.bottomContainer}>
                <Image source={require('../../assets/images/beforelogin/flash.png')}
                    style={{ width: '100%', height: '25%' }}
                    resizeMode='contain' />
            </View>

        </SafeAreaView >
    );
}

export default Intro;