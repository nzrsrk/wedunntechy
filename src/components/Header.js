import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


import WedunnFlat from '../assets/images/others/wedunn_logo_flat';

// import Constants from 'expo-constants';
import { StatusBarHeight } from '../helper/Statusbar';

import { Icon, icoMoonConfigSet } from '../styles/Icons';

import Theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';

import Typography from '../styles/Typography';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from './Normalize'


export default function HeaderHome({ navigation }) {
    return (
        <View style={[styles.headerWrapper, GlobalStyles.commonPaddingH]}>
            <View style={styles.headerInner}>
                <View style={[styles.iconMainWrapper]}>

                    {
                        navigation.canGoBack() ?
                            <TouchableOpacity
                                style={[styles.singeIcon, { alignItems: 'flex-start', width: heightPercentageToDP(3) }]}
                                onPress={() => navigation.goBack()}
                            >
                                <Icon
                                    name='back'
                                    color={Theme.DIM_GRAY}
                                    size={normalize(25)}
                                    config={icoMoonConfigSet}
                                />
                            </TouchableOpacity>
                            : null
                    }

                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomestackNav')}
                        style={{
                            // width: widthPercentageToDP(18),
                            // height: heightPercentageToDP(8),
                        }}
                    >
                        <WedunnFlat />
                        {/* <Image source={require('../assets/images/others/wedunn_logo_flat.png')}
                            resizeMode={'contain'}
                            style={{ width: '100%', height: '100%' }} /> */}
                    </TouchableOpacity>
                </View>
                <View style={[styles.iconMainWrapper]}>

                    <TouchableOpacity style={styles.singeIcon} onPress={() => navigation.navigate('Notification')}>
                        <Icon
                            name='notification_1'
                            color={Theme.GREEN}
                            size={normalize(18)}
                            config={icoMoonConfigSet}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.singeIcon} onPress={() => navigation.navigate('Profile')}>
                        <Icon
                            name='user'
                            color={Theme.GREEN}
                            size={normalize(20)}
                            config={icoMoonConfigSet}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.singeIcon}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon
                            name='menu'
                            color={Theme.GREEN}
                            size={normalize(22)}
                            config={icoMoonConfigSet}
                        />
                    </TouchableOpacity>

                </View>
            </View>


        </View>
    )
}








const styles = StyleSheet.create({
    headerWrapper: {
        width: Theme.SCREEN_WIDTH,
        height: Theme.SCREEN_HEIGHT / 14,
        minHeight: heightPercentageToDP(5),
        // marginTop: StatusBarHeight,
        backgroundColor: Theme.WHITE,
    },
    headerInner: {
        zIndex: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
    },
    iconMainWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    singeIcon: {
        width: widthPercentageToDP(8),
        height: '100%',
        marginRight: widthPercentageToDP(1.2),
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})