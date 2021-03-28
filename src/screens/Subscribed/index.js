import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import GlobalStyles from '../../styles/GlobalStyles';
import styles from './styles';
import Theme from '../../styles/Theme';



import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


export default function Subscription({ navigation }) {
    // set the active screen

    return (
        <ScrollView style={[GlobalStyles.container]}>

            <View style={[styles.alignCenter, styles.container]}>

                <View style={[styles.alignCenter, { paddingHorizontal: widthPercentageToDP(3), }]}>
                    <Text style={styles.subscriptionText}>Subscribed</Text>
                    <Icon
                        name='suscribe_thump'
                        color={Theme.GREY_1}
                        size={normalize(60)}
                        style={{ paddingTop: heightPercentageToDP(1) }}
                        config={icoMoonConfigSet}
                    />
                </View>

                <View style={[styles.alignCenter, GlobalStyles.commonPaddingV, { width: Theme.SCREEN_WIDTH - 30 }]}>
                    <Text style={[styles.text2, { paddingBottom: heightPercentageToDP(2) }]}>From 01 August 2020</Text>
                    <Text style={styles.text2}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature</Text>
                </View>

            </View>
            <Image
                style={styles.image}
                resizeMode='stretch'
                source={require('../../assets/images/others/subscription.png')}
            />
        </ScrollView>
    );
}
