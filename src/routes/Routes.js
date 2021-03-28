import React, { useState, useEffect } from 'react';
import {
    Stylesheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Image,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';


import { AuthContext } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/Theme';
import FlashMessage from "react-native-flash-message";

// // import PushNotification from '../components/PushNotification';
// import PushNotification from '../components/PushNotificationnew';

import { navigationRef } from './NavigationService';

import NoConnectionScreen from "../screens/NoConnectionScreen";
import NetInfo from '@react-native-community/netinfo';
// import PushController from '../helper/PushController';

const BeforeLoginScreensStack = createStackNavigator();
const BeforeLoginScreens = () => {
    return (
        <BeforeLoginScreensStack.Navigator>
            <BeforeLoginScreensStack.Screen
                name="BeforeLoginScreens"
                component={BeforeLogin}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </BeforeLoginScreensStack.Navigator>
    )
}

// const AfterLoginScreensStack = createStackNavigator();
// const AfterLoginScreens = () => {
//     return (
//         <AfterLogin />
//     )
// }



const config = {
    animation: 'spring',
    config: {
        stiffness: 100000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const AuthenticationFlows = () => {

    const InitialLoginState = {
        userTocken: null,
        appLoader: true
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RetrieveTocken':
                return {
                    ...prevState,
                    userTocken: action.token,
                    appLoader: false
                };
            case 'Login':
                return {
                    ...prevState,
                    userTocken: action.token,
                    appLoader: false
                };
            case 'Logout':
                return {
                    ...prevState,
                    userTocken: null,
                    appLoader: false
                };
            case 'Register':
                return {
                    ...prevState,
                    userTocken: action.token,
                    appLoader: false
                };
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, InitialLoginState);
    const authContextMemo = React.useMemo(() => {
        return {
            signIn: async () => {
                loginState.appLoader = true;
                let userTocken = 'signIn';
                try {
                    await AsyncStorage.setItem('UserToken', userTocken);
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: 'Login', token: userTocken });
            },
            signUp: async () => {
                loginState.appLoader = true;
                let userTocken = 'signUp';
                try {
                    await AsyncStorage.setItem('UserToken', userTocken);
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: 'Register', token: userTocken });
            },
            signOut: async () => {
                loginState.appLoader = true;
                try {
                    await AsyncStorage.removeItem('UserToken');
                    await AsyncStorage.removeItem('userinfo');
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: 'Logout' });
            },
        }
    }, []);
    const [connectStatus, setConnectStatus] = useState(false)

    const getTocken = async () => {
        let userTocken = null;
        try {
            userTocken = await AsyncStorage.getItem('UserToken');
        } catch (e) {
            console.log(e);
        }
        dispatch({ type: 'RetrieveTocken', token: userTocken, });
    }
    useEffect(() => {
        getTocken()
        NetInfo.addEventListener(info => {
            setConnectStatus(info.isConnected && info.isInternetReachable)
        });
    }, [])

    return (
        <AuthContext.Provider value={authContextMemo}>

            <NavigationContainer ref={navigationRef}>
                {
                    loginState.appLoader ? <AuthLOadingScreen /> :
                        (
                            connectStatus ?
                                (loginState.userTocken ?
                                    <AfterLogin />
                                    : <BeforeLoginScreens />
                                )
                                : (
                                    <NoConnectionScreen />
                                ))
                }
            </NavigationContainer>
            {/* <PushController /> */}
            {/* <PushNotification />
         {Platform.OS === 'android' && <StatusBar style="light" backgroundColor={Theme.SECONDARY_COLOR} animated={true} />} */}
            <FlashMessage />
        </AuthContext.Provider>
    )
}




const AuthLOadingScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                    <ActivityIndicator />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}










export default function Routes() {

    return (
        <AuthenticationFlows />
    );

}